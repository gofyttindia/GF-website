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
import { CheckCircle, Loader2, Dumbbell } from "lucide-react"
import { Label } from "@/components/ui/label"

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email address"),
  age: z.string().min(1, "Please enter your age"),
  maritalStatus: z.enum(["Yes", "No"], {
    required_error: "Please select your marital status",
  }),
  gender: z.string().min(1, "Please select your gender"),
  country: z.string().min(1, "Please enter your country"),
  city: z.string().min(1, "Please enter your city"),
  occupation: z.string().min(1, "Please enter your occupation"),
  fitnessExperience: z.string().min(1, "Please select your fitness experience"),
  fitnessGoal: z.string().min(1, "Please select your fitness goal"),
  packageDuration: z.string().min(1, "Please select package duration"),
  currentWeight: z.string().optional(),
  targetWeight: z.string().optional(),
  message: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

export default function StandardPlanForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const planName = "Standard Plan"

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      age: "",
      maritalStatus: undefined,
      gender: "",
      country: "",
      city: "",
      occupation: "",
      fitnessExperience: "",
      fitnessGoal: "",
      packageDuration: "",
      currentWeight: "",
      targetWeight: "",
      message: "",
    },
  })

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true)
    
    try {
      const packagePrice = data.packageDuration === "3 months" ? "₹9,999" : "₹17,999"
      const message = `Hi FitneX! I'm interested in joining the Standard Plan.

Name: ${data.name}
Phone: ${data.phone}
Email: ${data.email}
Age: ${data.age}
Marital Status: ${data.maritalStatus}
Gender: ${data.gender}
Country: ${data.country}
City: ${data.city}
Occupation: ${data.occupation}
Total Fitness Experience: ${data.fitnessExperience}
Fitness Goal: ${data.fitnessGoal}
Plan: ${planName}
Package Duration: ${data.packageDuration}
Price: ${packagePrice}
${data.currentWeight ? `Current Weight: ${data.currentWeight} kg` : ''}
${data.targetWeight ? `Target Weight: ${data.targetWeight} kg` : ''}
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
            packagePrice,
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
      
      // Option 2: Fallback to click-to-chat if API fails
      // Uncomment below if you want fallback behavior
      // const encodedMessage = encodeURIComponent(message)
      // const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
      // window.open(whatsappUrl, '_blank')
      
    } catch (error: any) {
      console.error('Error sending WhatsApp message:', error)
      
      // Fallback to click-to-chat if API fails
      const packagePrice = data.packageDuration === "3 months" ? "₹9,999" : "₹17,999"
      const message = `Hi FitneX! I'm interested in joining the Standard Plan.

Name: ${data.name}
Phone: ${data.phone}
Email: ${data.email}
Age: ${data.age}
Marital Status: ${data.maritalStatus}
Gender: ${data.gender}
Country: ${data.country}
City: ${data.city}
Occupation: ${data.occupation}
Total Fitness Experience: ${data.fitnessExperience}
Fitness Goal: ${data.fitnessGoal}
Plan: ${planName}
Package Duration: ${data.packageDuration}
Price: ${packagePrice}
${data.currentWeight ? `Current Weight: ${data.currentWeight} kg` : ''}
${data.targetWeight ? `Target Weight: ${data.targetWeight} kg` : ''}
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

      <section className="py-20 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="container mx-auto px-4 lg:px-6 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <Badge className="bg-orange-100 text-orange-800">Standard Plan</Badge>
            <div className="flex items-center justify-center gap-3">
              <Dumbbell className="h-8 w-8 text-orange-600" />
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900">
                Join Standard Plan
              </h1>
            </div>
            <p className="text-xl text-gray-600">
              Get personalized diet and workout plans with weekly check-ins. Perfect for those starting their fitness journey.
            </p>
            <div className="flex items-center justify-center gap-6 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">₹9,999</div>
                <div className="text-sm text-gray-600">3 months</div>
              </div>
              <div className="text-gray-400">|</div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">₹17,999</div>
                <div className="text-sm text-gray-600">6 months</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-2xl mx-auto">
            <Card className="p-8 border-2 border-orange-200">
              <CardHeader className="p-0 mb-6">
                <CardTitle className="text-2xl">Standard Plan Application</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll connect with you on WhatsApp to complete your enrollment.
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
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
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
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>WhatsApp Number *</FormLabel>
                          <FormControl>
                            <Input type="tel" placeholder="+91 98765 43210" {...field} />
                          </FormControl>
                          <FormDescription>We'll contact you on this WhatsApp number</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
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

                    <FormField
                      control={form.control}
                      name="age"
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
                      name="maritalStatus"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>Marital Status *</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-row space-x-6"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="Yes" id="married-yes" />
                                <Label htmlFor="married-yes" className="cursor-pointer">Yes</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="No" id="married-no" />
                                <Label htmlFor="married-no" className="cursor-pointer">No</Label>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="gender"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Gender *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select your gender" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Male">Male</SelectItem>
                              <SelectItem value="Female">Female</SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
                              <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

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
                      name="occupation"
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
                      name="fitnessExperience"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Total Fitness Experience *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select your fitness experience" />
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
                      name="fitnessGoal"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Fitness Goal *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select your primary goal" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Weight Loss">Weight Loss</SelectItem>
                              <SelectItem value="Muscle Gain">Muscle Gain</SelectItem>
                              <SelectItem value="Body Recomposition">Body Recomposition</SelectItem>
                              <SelectItem value="Strength Training">Strength Training</SelectItem>
                              <SelectItem value="General Fitness">General Fitness</SelectItem>
                              <SelectItem value="Competition Prep">Competition Prep</SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

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
                              <SelectItem value="3 months">3 months - ₹9,999</SelectItem>
                              <SelectItem value="6 months">6 months - ₹17,999 (Save ₹2,000)</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="currentWeight"
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
                        name="targetWeight"
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

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Additional Message</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us more about your fitness journey..."
                              className="resize-none"
                              rows={4}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      className="w-full bg-orange-600 hover:bg-orange-700" 
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

