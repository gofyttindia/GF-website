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
import { CheckCircle, Loader2 } from "lucide-react"
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
  plan: z.string().min(1, "Please select a plan"),
  fitnessGoal: z.string().min(1, "Please select your fitness goal"),
  currentWeight: z.string().optional(),
  targetWeight: z.string().optional(),
  message: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

export default function FormPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

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
      plan: "",
      fitnessGoal: "",
      currentWeight: "",
      targetWeight: "",
      message: "",
    },
  })

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true)
    
    // Format the data for WhatsApp
    const message = `Hi FitneX! I'm interested in joining your fitness program.

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
Plan: ${data.plan}
${data.currentWeight ? `Current Weight: ${data.currentWeight} kg` : ''}
${data.targetWeight ? `Target Weight: ${data.targetWeight} kg` : ''}
${data.message ? `Message: ${data.message}` : ''}`

    // Encode the message for WhatsApp URL
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://whatsform.com/je9eve?text=${encodedMessage}`
    
    // Redirect to WhatsApp form
    window.open(whatsappUrl, '_blank')
    
    // Reset form after a delay
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      form.reset()
      setTimeout(() => setIsSubmitted(false), 3000)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="container mx-auto px-4 lg:px-6 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <Badge className="bg-orange-100 text-orange-800">Get Started</Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900">
              Start Your
              <span className="text-orange-600"> Transformation Journey</span>
            </h1>
            <p className="text-xl text-gray-600">
              Fill out the form below and we'll connect with you on WhatsApp to discuss your fitness goals and create a personalized plan.
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-2xl mx-auto">
            <Card className="p-8">
              <CardHeader className="p-0 mb-6">
                <CardTitle className="text-2xl">Join FitneX Today</CardTitle>
                <CardDescription>
                  Tell us about yourself and your fitness goals. We'll get back to you on WhatsApp within 24 hours.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                {isSubmitted && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <p className="text-green-800 font-medium">Form submitted successfully! Redirecting to WhatsApp...</p>
                  </div>
                )}
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* Name */}
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

                    {/* Phone */}
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>WhatsApp Number *</FormLabel>
                          <FormControl>
                            <Input 
                              type="tel" 
                              placeholder="+91 98765 43210" 
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            We'll contact you on this WhatsApp number
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Email */}
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address *</FormLabel>
                          <FormControl>
                            <Input 
                              type="email" 
                              placeholder="john@example.com" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Age */}
                    <FormField
                      control={form.control}
                      name="age"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Age *</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="25" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Marital Status */}
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

                    {/* Gender */}
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

                    {/* Country and City */}
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Country *</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="India" 
                                {...field} 
                              />
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
                              <Input 
                                placeholder="Mumbai" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Occupation */}
                    <FormField
                      control={form.control}
                      name="occupation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Occupation *</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Software Engineer" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Total Fitness Experience */}
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

                    {/* Fitness Goal */}
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

                    {/* Plan Selection */}
                    <FormField
                      control={form.control}
                      name="plan"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Select a Plan *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Choose your fitness plan" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Standard Plan">Standard Plan - ₹9,999 (3 months)</SelectItem>
                              <SelectItem value="Premium Plan">Premium Plan - ₹14,999 (3 months)</SelectItem>
                              <SelectItem value="Couple Plan">Couple Plan - ₹24,999 (3 months)</SelectItem>
                              <SelectItem value="Not Sure">Not Sure - Let's Discuss</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Weight Information */}
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="currentWeight"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Current Weight (kg)</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                placeholder="70" 
                                {...field} 
                              />
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
                              <Input 
                                type="number" 
                                placeholder="65" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Message */}
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Additional Message</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us more about your fitness journey, any injuries, or specific requirements..."
                              className="resize-none"
                              rows={4}
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Optional: Share any additional information that might help us serve you better
                          </FormDescription>
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
                      By submitting this form, you agree to be contacted via WhatsApp. We respect your privacy and will never spam you.
                    </p>
                  </form>
                </Form>
              </CardContent>
            </Card>

            {/* Info Section */}
            <div className="mt-12 grid md:grid-cols-3 gap-6">
              <Card className="p-6 text-center">
                <CardContent className="p-0 space-y-2">
                  <div className="text-3xl font-bold text-orange-600">24/7</div>
                  <p className="text-gray-600">Support Available</p>
                </CardContent>
              </Card>
              <Card className="p-6 text-center">
                <CardContent className="p-0 space-y-2">
                  <div className="text-3xl font-bold text-orange-600">1000+</div>
                  <p className="text-gray-600">Happy Members</p>
                </CardContent>
              </Card>
              <Card className="p-6 text-center">
                <CardContent className="p-0 space-y-2">
                  <div className="text-3xl font-bold text-orange-600">15+</div>
                  <p className="text-gray-600">Expert Trainers</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

