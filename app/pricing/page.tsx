import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check, X, HelpCircle } from "lucide-react"

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <main className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-4 bg-gradient-to-r from-white to-white/70 bg-clip-text text-4xl font-bold text-transparent md:text-5xl lg:text-6xl">
            Choose Your Plan
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-white/70">
            Find the perfect plan for your needs. All plans include access to our platform with different levels of
            features.
          </p>

          <Tabs defaultValue="monthly" className="mx-auto mb-12 w-full max-w-xs">
            <TabsList className="grid w-full grid-cols-2 bg-white/5">
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="yearly">Yearly (Save 20%)</TabsTrigger>
            </TabsList>

            <TabsContent value="monthly">
              <div className="mt-2 text-center text-sm text-white/50">Billed monthly. Cancel anytime.</div>
            </TabsContent>

            <TabsContent value="yearly">
              <div className="mt-2 text-center text-sm text-white/50">Billed annually. Cancel anytime.</div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {/* Free Plan */}
          <Card className="border-white/10 bg-white/5 transition-all duration-300 hover:border-white/20 hover:bg-white/10">
            <CardHeader>
              <CardTitle className="text-white">Free</CardTitle>
              <CardDescription className="text-white/70">For individuals just getting started</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold text-white">$0</span>
                <span className="text-white/70">/month</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="mr-2 mt-0.5 h-5 w-5 shrink-0 text-green-500" />
                  <span className="text-white/90">Save up to 5 tools</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 mt-0.5 h-5 w-5 shrink-0 text-green-500" />
                  <span className="text-white/90">Basic comparison features</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 mt-0.5 h-5 w-5 shrink-0 text-green-500" />
                  <span className="text-white/90">Limited tool details</span>
                </li>
                <li className="flex items-start">
                  <X className="mr-2 mt-0.5 h-5 w-5 shrink-0 text-red-500" />
                  <span className="text-white/50">Performance tracking</span>
                </li>
                <li className="flex items-start">
                  <X className="mr-2 mt-0.5 h-5 w-5 shrink-0 text-red-500" />
                  <span className="text-white/50">Advanced filtering</span>
                </li>
                <li className="flex items-start">
                  <X className="mr-2 mt-0.5 h-5 w-5 shrink-0 text-red-500" />
                  <span className="text-white/50">Priority support</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-white/10 text-white hover:bg-white/20">Get Started</Button>
            </CardFooter>
          </Card>

          {/* Pro Plan */}
          <Card className="relative border-purple-500/50 bg-gradient-to-br from-purple-900/20 to-blue-900/20 transition-all duration-300 hover:border-purple-500">
            <div className="absolute -top-5 left-0 right-0 mx-auto w-fit rounded-full bg-gradient-to-r from-purple-600 to-blue-500 px-4 py-1 text-xs font-medium text-white">
              Most Popular
            </div>
            <CardHeader>
              <CardTitle className="text-black/70">Pro</CardTitle>
              <CardDescription className="text-black/70">For professionals and power users</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold text-black/70">$9.99</span>
                <span className="text-black/60">/month</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="mr-2 mt-0.5 h-5 w-5 shrink-0 text-green-500" />
                  <span className="text-black/90">Save unlimited tools</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 mt-0.5 h-5 w-5 shrink-0 text-green-500" />
                  <span className="text-black/90">Advanced comparison features</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 mt-0.5 h-5 w-5 shrink-0 text-green-500" />
                  <span className="text-black/90">Full tool details</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 mt-0.5 h-5 w-5 shrink-0 text-green-500" />
                  <span className="text-black/90">Performance tracking</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 mt-0.5 h-5 w-5 shrink-0 text-green-500" />
                  <span className="text-black/90">Advanced filtering</span>
                </li>
                <li className="flex items-start">
                  <X className="mr-2 mt-0.5 h-5 w-5 shrink-0 text-red-500" />
                  <span className="text-black/50">Team collaboration</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:opacity-90">
                Get Started
              </Button>
            </CardFooter>
          </Card>

          {/* Enterprise Plan */}
          <Card className="border-white/10 bg-white/5 transition-all duration-300 hover:border-white/20 hover:bg-white/10">
            <CardHeader>
              <CardTitle className="text-white">Enterprise</CardTitle>
              <CardDescription className="text-white/70">For teams and businesses</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold text-white">$49.99</span>
                <span className="text-white/70">/month</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="mr-2 mt-0.5 h-5 w-5 shrink-0 text-green-500" />
                  <span className="text-white/90">Everything in Pro</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 mt-0.5 h-5 w-5 shrink-0 text-green-500" />
                  <span className="text-white/90">Team collaboration</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 mt-0.5 h-5 w-5 shrink-0 text-green-500" />
                  <span className="text-white/90">API access</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 mt-0.5 h-5 w-5 shrink-0 text-green-500" />
                  <span className="text-white/90">Custom reports</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 mt-0.5 h-5 w-5 shrink-0 text-green-500" />
                  <span className="text-white/90">Dedicated support</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 mt-0.5 h-5 w-5 shrink-0 text-green-500" />
                  <span className="text-white/90">White-label options</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-white/10 text-white hover:bg-white/20">Contact Sales</Button>
            </CardFooter>
          </Card>
        </div>

        <div className="mt-16">
          <h2 className="mb-8 text-center text-2xl font-bold text-white md:text-3xl">Compare Plans</h2>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="p-4 text-left text-white">Features</th>
                  <th className="p-4 text-center text-white">Free</th>
                  <th className="p-4 text-center text-white">
                    <div className="flex items-center justify-center gap-2">
                      Pro
                      <Badge className="bg-gradient-to-r from-purple-600 to-blue-500 text-white">Popular</Badge>
                    </div>
                  </th>
                  <th className="p-4 text-center text-white">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/10">
                  <td className="p-4 text-white">Saved Tools</td>
                  <td className="p-4 text-center text-white/70">Up to 5</td>
                  <td className="p-4 text-center text-white/70">Unlimited</td>
                  <td className="p-4 text-center text-white/70">Unlimited</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="p-4 text-white">Tool Comparison</td>
                  <td className="p-4 text-center text-white/70">Basic</td>
                  <td className="p-4 text-center text-white/70">Advanced</td>
                  <td className="p-4 text-center text-white/70">Advanced</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="p-4 text-white">Tool Details</td>
                  <td className="p-4 text-center text-white/70">Limited</td>
                  <td className="p-4 text-center text-white/70">Full</td>
                  <td className="p-4 text-center text-white/70">Full + Custom</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="p-4 text-white">Performance Tracking</td>
                  <td className="p-4 text-center">
                    <X className="mx-auto h-5 w-5 text-red-500" />
                  </td>
                  <td className="p-4 text-center">
                    <Check className="mx-auto h-5 w-5 text-green-500" />
                  </td>
                  <td className="p-4 text-center">
                    <Check className="mx-auto h-5 w-5 text-green-500" />
                  </td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="p-4 text-white">Advanced Filtering</td>
                  <td className="p-4 text-center">
                    <X className="mx-auto h-5 w-5 text-red-500" />
                  </td>
                  <td className="p-4 text-center">
                    <Check className="mx-auto h-5 w-5 text-green-500" />
                  </td>
                  <td className="p-4 text-center">
                    <Check className="mx-auto h-5 w-5 text-green-500" />
                  </td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="p-4 text-white">Team Collaboration</td>
                  <td className="p-4 text-center">
                    <X className="mx-auto h-5 w-5 text-red-500" />
                  </td>
                  <td className="p-4 text-center">
                    <X className="mx-auto h-5 w-5 text-red-500" />
                  </td>
                  <td className="p-4 text-center">
                    <Check className="mx-auto h-5 w-5 text-green-500" />
                  </td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="p-4 text-white">API Access</td>
                  <td className="p-4 text-center">
                    <X className="mx-auto h-5 w-5 text-red-500" />
                  </td>
                  <td className="p-4 text-center">
                    <X className="mx-auto h-5 w-5 text-red-500" />
                  </td>
                  <td className="p-4 text-center">
                    <Check className="mx-auto h-5 w-5 text-green-500" />
                  </td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="p-4 text-white">Support</td>
                  <td className="p-4 text-center text-white/70">Community</td>
                  <td className="p-4 text-center text-white/70">Email</td>
                  <td className="p-4 text-center text-white/70">Dedicated</td>
                </tr>
                <tr>
                  <td className="p-4"></td>
                  <td className="p-4 text-center">
                    <Button className="w-full bg-white/10 text-white hover:bg-white/20">Get Started</Button>
                  </td>
                  <td className="p-4 text-center">
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:opacity-90">
                      Get Started
                    </Button>
                  </td>
                  <td className="p-4 text-center">
                    <Button className="w-full bg-white/10 text-white hover:bg-white/20">Contact Sales</Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-20">
          <h2 className="mb-8 text-center text-2xl font-bold text-white md:text-3xl">Frequently Asked Questions</h2>

          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
            {[
              {
                question: "Can I change my plan later?",
                answer: "Yes, you can upgrade or downgrade your plan at any time. Changes will be applied immediately.",
              },
              {
                question: "Is there a free trial for paid plans?",
                answer: "Yes, we offer a 14-day free trial for all paid plans. No credit card required to start.",
              },
              {
                question: "How does billing work?",
                answer: "We bill monthly or yearly depending on your chosen plan. You can cancel at any time.",
              },
              {
                question: "What payment methods do you accept?",
                answer: "We accept all major credit cards, PayPal, and bank transfers for Enterprise plans.",
              },
              {
                question: "Can I get a refund?",
                answer: "We offer a 30-day money-back guarantee if you're not satisfied with our service.",
              },
              {
                question: "Do you offer discounts for non-profits?",
                answer: "Yes, we offer special pricing for non-profit organizations. Please contact our sales team.",
              },
            ].map((faq, index) => (
              <div key={index} className="rounded-lg border border-white/10 bg-white/5 p-6">
                <h3 className="mb-3 flex items-start gap-2 text-lg font-medium text-white">
                  <HelpCircle className="mt-1 h-5 w-5 shrink-0 text-purple-500" />
                  {faq.question}
                </h3>
                <p className="text-white/70">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 rounded-xl border border-white/10 bg-gradient-to-br from-purple-900/20 to-blue-900/20 p-8 text-center md:p-12">
          <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl">Ready to get started?</h2>
          <p className="mx-auto mb-8 max-w-2xl text-white/70">
            Join thousands of users who are already discovering and comparing the best tools for their business.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:opacity-90 sm:w-auto">
              Sign Up Now
            </Button>
            <Button variant="outline" className="w-full border-white/10 hover:text-white hover:bg-white/10 sm:w-auto">
              Contact Sales
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

