import type { Metadata } from "next"
import { constructMetadata } from "@/lib/seo-config"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone, MapPin, Clock, Send, MessageSquare } from "lucide-react"

export const metadata: Metadata = constructMetadata({
  title: "Contact Us",
  description: "Get in touch with the ToolsHub team for questions, partnerships, or support",
  keywords: ["contact toolshub", "support", "partnership", "affiliate marketing help"],
})

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <main className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-4 bg-gradient-to-r from-white to-white/70 bg-clip-text text-4xl font-bold text-transparent md:text-5xl lg:text-6xl">
            Get In Touch
          </h1>
          <p className="mx-auto mb-12 max-w-2xl text-lg text-white/70">
            Have questions about our platform? Want to partner with us? We'd love to hear from you.
          </p>
        </div>

        <div className="grid gap-12 md:grid-cols-2">
          {/* Contact Form */}
          <div className="order-2 md:order-1">
            <Card className="border-white/10 bg-white/5">
              <CardContent className="p-6">
                <h2 className="mb-6 text-2xl font-bold text-white">Send Us a Message</h2>
                <form className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-white">
                        Name
                      </label>
                      <Input
                        id="name"
                        placeholder="Your name"
                        className="border-white/10 bg-white/5 text-white placeholder:text-white/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-white">
                        Email
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Your email"
                        className="border-white/10 bg-white/5 text-white placeholder:text-white/50"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium text-white">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      placeholder="How can we help you?"
                      className="border-white/10 bg-white/5 text-white placeholder:text-white/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-white">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Your message"
                      className="min-h-[150px] border-white/10 bg-white/5 text-white placeholder:text-white/50"
                    />
                  </div>

                  <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:opacity-90">
                    <Send className="mr-2 h-4 w-4" /> Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="order-1 md:order-2">
            <h2 className="mb-6 text-2xl font-bold text-white">Contact Information</h2>

            <div className="space-y-8">
              <div className="flex items-start">
                <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-blue-500">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">Email Us</h3>
                  <p className="mt-1 text-white/70">Our friendly team is here to help.</p>
                  <a href="mailto:hello@toolshub.com" className="mt-2 block text-purple-400 hover:text-purple-300">
                    hello@toolshub.com
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-blue-500">
                  <Phone className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">Call Us</h3>
                  <p className="mt-1 text-white/70">Mon-Fri from 8am to 5pm.</p>
                  <a href="tel:+1234567890" className="mt-2 block text-purple-400 hover:text-purple-300">
                    +1 (234) 567-890
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-blue-500">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">Location</h3>
                  <p className="mt-1 text-white/70">Come say hello at our office.</p>
                  <p className="mt-2 text-white/90">
                    123 Innovation Street
                    <br />
                    Tech District
                    <br />
                    San Francisco, CA 94103
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-blue-500">
                  <Clock className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">Working Hours</h3>
                  <p className="mt-1 text-white/70">We're here for you.</p>
                  <p className="mt-2 text-white/90">
                    Monday - Friday: 8:00 AM - 5:00 PM
                    <br />
                    Saturday: 10:00 AM - 2:00 PM
                    <br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <h3 className="mb-4 text-lg font-medium text-white">Connect With Us</h3>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
                  aria-label="Twitter"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
                  aria-label="LinkedIn"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
                  aria-label="GitHub"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <h2 className="mb-8 text-center text-2xl font-bold text-white md:text-3xl">Frequently Asked Questions</h2>

          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
            {[
              {
                question: "How can I list my tool on your platform?",
                answer:
                  "You can submit your tool by clicking on the 'Add Your Tool' button in the navigation bar and following the submission process.",
              },
              {
                question: "Do you offer affiliate partnerships?",
                answer:
                  "Yes, we have an affiliate program for tool creators. Please contact our partnerships team for more information.",
              },
              {
                question: "How long does it take to review a tool submission?",
                answer:
                  "We typically review new tool submissions within 2-3 business days to ensure quality and accuracy.",
              },
              {
                question: "Can I request a custom integration?",
                answer:
                  "Enterprise customers can request custom integrations. Please contact our sales team to discuss your specific needs.",
              },
            ].map((faq, index) => (
              <div key={index} className="rounded-lg border border-white/10 bg-white/5 p-6">
                <h3 className="mb-3 flex items-start gap-2 text-lg font-medium text-white">
                  <MessageSquare className="mt-1 h-5 w-5 shrink-0 text-purple-500" />
                  {faq.question}
                </h3>
                <p className="text-white/70">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-20">
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="aspect-video w-full rounded-lg bg-white/10">
              {/* This would be replaced with an actual map integration */}
              <div className="flex h-full items-center justify-center">
                <div className="text-center text-white/50">
                  <MapPin className="mx-auto mb-2 h-8 w-8" />
                  <p>Interactive map would be displayed here</p>
                  <p className="mt-2 text-sm">123 Innovation Street, Tech District, San Francisco, CA 94103</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

