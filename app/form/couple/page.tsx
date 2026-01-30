'use client'

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Header, Footer } from "@/components/layout"
import { CheckCircle, Loader2, Users } from "lucide-react"
import { Label } from "@/components/ui/label"

const formSchema = z.object({
  // Partner 1
  name1: z.string().min(2, "Name must be at least 2 characters"),
  phone1: z.string().min(10, "Please enter a valid phone number"),
  email1: z.string().email("Please enter a valid email address"),
  age1: z.string().min(1, "Please enter your age"),
  gender1: z.string().min(1, "Please select your gender"),
  occupation1: z.string().min(1, "Please enter your occupation"),
  fitnessExperience1: z.string().min(1, "Please select your fitness experience"),
  fitnessGoal1: z.string().min(1, "Please select your fitness goal"),
  currentWeight1: z.string().optional(),
  targetWeight1: z.string().optional(),
  // Partner 2
  name2: z.string().min(2, "Partner name must be at least 2 characters"),
  phone2: z.string().min(10, "Please enter a valid phone number"),
  email2: z.string().email("Please enter a valid email address"),
  age2: z.string().min(1, "Please enter partner's age"),
  gender2: z.string().min(1, "Please select partner's gender"),
  occupation2: z.string().min(1, "Please enter partner's occupation"),
  fitnessExperience2: z.string().min(1, "Please select partner's fitness experience"),
  fitnessGoal2: z.string().min(1, "Please select partner's fitness goal"),
  currentWeight2: z.string().optional(),
  targetWeight2: z.string().optional(),
  // Shared
  country: z.string().min(1, "Please enter your country"),
  city: z.string().min(1, "Please enter your city"),
  packageDuration: z.string().min(1, "Please select package duration"),
  message: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

export default function CouplePlanForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const planName = "Couple Plan"

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name1: "",
      phone1: "",
      email1: "",
      age1: "",
      gender1: "",
      occupation1: "",
      fitnessExperience1: "",
      fitnessGoal1: "",
      currentWeight1: "",
      targetWeight1: "",
      name2: "",
      phone2: "",
      email2: "",
      age2: "",
      gender2: "",
      occupation2: "",
      fitnessExperience2: "",
      fitnessGoal2: "",
      currentWeight2: "",
      targetWeight2: "",
      country: "",
      city: "",
      packageDuration: "",
      message: "",
    },
  })

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true)
    
    try {
      const message = `Hi FitneX! We're interested in joining the Couple Plan.

PARTNER 1:
Name: ${data.name1}
Phone: ${data.phone1}
Email: ${data.email1}
Age: ${data.age1}
Gender: ${data.gender1}
Occupation: ${data.occupation1}
Fitness Experience: ${data.fitnessExperience1}
Fitness Goal: ${data.fitnessGoal1}
${data.currentWeight1 ? `Current Weight: ${data.currentWeight1} kg` : ''}
${data.targetWeight1 ? `Target Weight: ${data.targetWeight1} kg` : ''}

PARTNER 2:
Name: ${data.name2}
Phone: ${data.phone2}
Email: ${data.email2}
Age: ${data.age2}
Gender: ${data.gender2}
Occupation: ${data.occupation2}
Fitness Experience: ${data.fitnessExperience2}
Fitness Goal: ${data.fitnessGoal2}
${data.currentWeight2 ? `Current Weight: ${data.currentWeight2} kg` : ''}
${data.targetWeight2 ? `Target Weight: ${data.targetWeight2} kg` : ''}

LOCATION:
Country: ${data.country}
City: ${data.city}

Plan: ${planName}
Package Duration: ${data.packageDuration}
Price: ${data.packageDuration === "3 months" ? "₹24,999" : "₹47,999"}
${data.message ? `Message: ${data.message}` : ''}`

      const phoneNumber = "917702608961"
      
      // Step 1: Save form data to database/Google Forms
      try {
        await fetch('/api/forms/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...data,
            plan: planName,
            packageDuration: data.packageDuration,
            packagePrice: data.packageDuration === "3 months" ? "₹24,999" : "₹47,999",
          }),
        })
      } catch (error) {
        console.error('Error saving form data:', error)
        // Continue even if save fails
      }
      
      // Step 2: Send WhatsApp message
      const response = await fetch('/api/whatsapp/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          to: phoneNumber,
          method: 'meta', // WhatsApp Business API (Meta Cloud API)
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send message')
      }

      setIsSubmitting(false)
      setIsSubmitted(true)
      form.reset()
      setTimeout(() => setIsSubmitted(false), 5000)
      
    } catch (error: any) {
      console.error('Error sending WhatsApp message:', error)
      
      const message = `Hi FitneX! We're interested in joining the Couple Plan.

PARTNER 1:
Name: ${data.name1}
Phone: ${data.phone1}
Email: ${data.email1}
Age: ${data.age1}
Gender: ${data.gender1}
Occupation: ${data.occupation1}
Fitness Experience: ${data.fitnessExperience1}
Fitness Goal: ${data.fitnessGoal1}
${data.currentWeight1 ? `Current Weight: ${data.currentWeight1} kg` : ''}
${data.targetWeight1 ? `Target Weight: ${data.targetWeight1} kg` : ''}

PARTNER 2:
Name: ${data.name2}
Phone: ${data.phone2}
Email: ${data.email2}
Age: ${data.age2}
Gender: ${data.gender2}
Occupation: ${data.occupation2}
Fitness Experience: ${data.fitnessExperience2}
Fitness Goal: ${data.fitnessGoal2}
${data.currentWeight2 ? `Current Weight: ${data.currentWeight2} kg` : ''}
${data.targetWeight2 ? `Target Weight: ${data.targetWeight2} kg` : ''}

LOCATION:
Country: ${data.country}
City: ${data.city}

Plan: ${planName}
Package Duration: ${data.packageDuration}
Price: ${data.packageDuration === "3 months" ? "₹24,999" : "₹47,999"}
${data.message ? `Message: ${data.message}` : ''}`
      
      const phoneNumber = "917702608961"
      const encodedMessage = encodeURIComponent(message)
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
      window.open(whatsappUrl, '_blank')
      
      setIsSubmitting(false)
      setIsSubmitted(true)
      form.reset()
      setTimeout(() => setIsSubmitted(false), 3000)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="container mx-auto px-4 lg:px-6 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <Badge className="bg-purple-100 text-purple-800">Couple Plan</Badge>
            <div className="flex items-center justify-center gap-3">
              <Users className="h-8 w-8 text-purple-600" />
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900">
                Join Couple Plan
              </h1>
            </div>
            <p className="text-xl text-gray-600">
              Transform together! Get personalized plans for both partners with shared accountability and support.
            </p>
            <div className="flex items-center justify-center gap-6 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">₹24,999</div>
                <div className="text-sm text-gray-600">3 months</div>
              </div>
              <div className="text-gray-400">|</div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">₹47,999</div>
                <div className="text-sm text-gray-600">6 months</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-2xl mx-auto">
            <Card className="p-8 border-2 border-purple-200">
              <CardHeader className="p-0 mb-6">
                <CardTitle className="text-2xl">Couple Plan Application</CardTitle>
                <CardDescription>
                  Fill out the form below for both partners and we'll connect with you on WhatsApp to complete your enrollment.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                {isSubmitted && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <p className="text-green-800 font-medium">Message sent successfully! We'll get back to you soon.</p>
                  </div>
                )}
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    {/* Partner 1 Section */}
                    <div className="space-y-6 pb-6 border-b border-gray-200">
                      <h3 className="text-xl font-bold text-gray-900">Partner 1 Information</h3>
                      
                      <FormField
                        control={form.control}
                        name="name1"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="phone1"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>WhatsApp Number *</FormLabel>
                            <FormControl>
                              <Input type="tel" placeholder="+91 98765 43210" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email1"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address *</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="john@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="age1"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Age *</FormLabel>
                              <FormControl>
                                <Input type="number" placeholder="25" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="gender1"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Gender *</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="Male">Male</SelectItem>
                                  <SelectItem value="Female">Female</SelectItem>
                                  <SelectItem value="Other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="occupation1"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Occupation *</FormLabel>
                            <FormControl>
                              <Input placeholder="Software Engineer" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="fitnessExperience1"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Fitness Experience *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select experience" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Beginner (0-6 months)">Beginner (0-6 months)</SelectItem>
                                <SelectItem value="Intermediate (6 months - 2 years)">Intermediate (6 months - 2 years)</SelectItem>
                                <SelectItem value="Advanced (2-5 years)">Advanced (2-5 years)</SelectItem>
                                <SelectItem value="Expert (5+ years)">Expert (5+ years)</SelectItem>
                                <SelectItem value="No Experience">No Experience</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="fitnessGoal1"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Fitness Goal *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select goal" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Weight Loss">Weight Loss</SelectItem>
                                <SelectItem value="Muscle Gain">Muscle Gain</SelectItem>
                                <SelectItem value="Body Recomposition">Body Recomposition</SelectItem>
                                <SelectItem value="Strength Training">Strength Training</SelectItem>
                                <SelectItem value="General Fitness">General Fitness</SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="currentWeight1"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Current Weight (kg)</FormLabel>
                              <FormControl>
                                <Input type="number" placeholder="70" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="targetWeight1"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Target Weight (kg)</FormLabel>
                              <FormControl>
                                <Input type="number" placeholder="65" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    {/* Partner 2 Section */}
                    <div className="space-y-6 pb-6 border-b border-gray-200">
                      <h3 className="text-xl font-bold text-gray-900">Partner 2 Information</h3>
                      
                      <FormField
                        control={form.control}
                        name="name2"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="Jane Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="phone2"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>WhatsApp Number *</FormLabel>
                            <FormControl>
                              <Input type="tel" placeholder="+91 98765 43211" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email2"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address *</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="jane@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="age2"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Age *</FormLabel>
                              <FormControl>
                                <Input type="number" placeholder="25" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="gender2"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Gender *</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="Male">Male</SelectItem>
                                  <SelectItem value="Female">Female</SelectItem>
                                  <SelectItem value="Other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="occupation2"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Occupation *</FormLabel>
                            <FormControl>
                              <Input placeholder="Designer" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="fitnessExperience2"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Fitness Experience *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select experience" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Beginner (0-6 months)">Beginner (0-6 months)</SelectItem>
                                <SelectItem value="Intermediate (6 months - 2 years)">Intermediate (6 months - 2 years)</SelectItem>
                                <SelectItem value="Advanced (2-5 years)">Advanced (2-5 years)</SelectItem>
                                <SelectItem value="Expert (5+ years)">Expert (5+ years)</SelectItem>
                                <SelectItem value="No Experience">No Experience</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="fitnessGoal2"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Fitness Goal *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select goal" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Weight Loss">Weight Loss</SelectItem>
                                <SelectItem value="Muscle Gain">Muscle Gain</SelectItem>
                                <SelectItem value="Body Recomposition">Body Recomposition</SelectItem>
                                <SelectItem value="Strength Training">Strength Training</SelectItem>
                                <SelectItem value="General Fitness">General Fitness</SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="currentWeight2"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Current Weight (kg)</FormLabel>
                              <FormControl>
                                <Input type="number" placeholder="60" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="targetWeight2"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Target Weight (kg)</FormLabel>
                              <FormControl>
                                <Input type="number" placeholder="55" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    {/* Shared Location */}
                    <div className="space-y-6">
                      <h3 className="text-xl font-bold text-gray-900">Location</h3>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="country"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Country *</FormLabel>
                              <FormControl>
                                <Input placeholder="India" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>City *</FormLabel>
                              <FormControl>
                                <Input placeholder="Mumbai" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="packageDuration"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Select Package *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Choose package duration" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="3 months">3 months - ₹24,999</SelectItem>
                                <SelectItem value="6 months">6 months - ₹47,999 (Save ₹6,000)</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Additional Message</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Tell us more about your fitness journey together..."
                                className="resize-none"
                                rows={4}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-purple-600 hover:bg-purple-700" 
                      size="lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        "Submit & Continue on WhatsApp"
                      )}
                    </Button>

                    <p className="text-sm text-gray-500 text-center">
                      By submitting this form, you agree to be contacted via WhatsApp.
                    </p>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

