import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export default function PolicyPage() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <main className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8">
            <h1 className="mb-2 text-4xl font-bold text-white">Terms & Policies</h1>
            <p className="text-lg text-white/70">Last updated: March 18, 2025</p>
          </div>

          <div className="mb-8 flex gap-4 overflow-x-auto rounded-lg border border-white/10 bg-white/5 p-2">
            <Button variant="ghost" className="text-white hover:bg-white/10 hover:text-white">
              <Link href="#terms">Terms of Service</Link>
            </Button>
            <Button variant="ghost" className="text-white hover:bg-white/10 hover:text-white">
              <Link href="#privacy">Privacy Policy</Link>
            </Button>
            <Button variant="ghost" className="text-white hover:bg-white/10 hover:text-white">
              <Link href="#cookies">Cookie Policy</Link>
            </Button>
            <Button variant="ghost" className="text-white hover:bg-white/10 hover:text-white">
              <Link href="#affiliate">Affiliate Policy</Link>
            </Button>
            <Button variant="ghost" className="text-white hover:bg-white/10 hover:text-white">
              <Link href="#refund">Refund Policy</Link>
            </Button>
          </div>

          <div className="space-y-10 rounded-lg border border-white/10 bg-white/5 p-8">
            <section id="terms">
              <h2 className="mb-4 text-2xl font-bold text-white">Terms of Service</h2>
              <div className="space-y-4 text-white/70">
                <p>
                  Welcome to ToolsHub. By accessing or using our platform, you agree to be bound by these Terms of
                  Service and all applicable laws and regulations. If you do not agree with any of these terms, you are
                  prohibited from using or accessing this site.
                </p>

                <h3 className="text-xl font-semibold text-white">1. Use License</h3>
                <p>
                  Permission is granted to temporarily access the materials on ToolsHub's website for personal,
                  non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and
                  under this license you may not:
                </p>
                <ul className="ml-6 list-disc space-y-2">
                  <li>Modify or copy the materials</li>
                  <li>Use the materials for any commercial purpose or for any public display</li>
                  <li>Attempt to reverse engineer any software contained on the website</li>
                  <li>Remove any copyright or other proprietary notations from the materials</li>
                  <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
                </ul>

                <h3 className="text-xl font-semibold text-white">2. Disclaimer</h3>
                <p>
                  The materials on ToolsHub's website are provided on an 'as is' basis. ToolsHub makes no warranties,
                  expressed or implied, and hereby disclaims and negates all other warranties including, without
                  limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or
                  non-infringement of intellectual property or other violation of rights.
                </p>

                <h3 className="text-xl font-semibold text-white">3. Limitations</h3>
                <p>
                  In no event shall ToolsHub or its suppliers be liable for any damages (including, without limitation,
                  damages for loss of data or profit, or due to business interruption) arising out of the use or
                  inability to use the materials on ToolsHub's website, even if ToolsHub or a ToolsHub authorized
                  representative has been notified orally or in writing of the possibility of such damage.
                </p>
              </div>
            </section>

            <Separator className="bg-white/10" />

            <section id="privacy">
              <h2 className="mb-4 text-2xl font-bold text-white">Privacy Policy</h2>
              <div className="space-y-4 text-white/70">
                <p>
                  At ToolsHub, we take your privacy seriously. This Privacy Policy explains how we collect, use,
                  disclose, and safeguard your information when you visit our website or use our platform.
                </p>

                <h3 className="text-xl font-semibold text-white">1. Information We Collect</h3>
                <p>We may collect personal information that you voluntarily provide to us when you:</p>
                <ul className="ml-6 list-disc space-y-2">
                  <li>Register on our platform</li>
                  <li>Subscribe to our newsletter</li>
                  <li>Request customer support</li>
                  <li>Participate in surveys or promotions</li>
                </ul>
                <p>This information may include your name, email address, phone number, and company information.</p>

                <h3 className="text-xl font-semibold text-white">2. How We Use Your Information</h3>
                <p>We may use the information we collect about you to:</p>
                <ul className="ml-6 list-disc space-y-2">
                  <li>Create and manage your account</li>
                  <li>Provide and maintain our services</li>
                  <li>Process transactions</li>
                  <li>Send administrative information</li>
                  <li>Send marketing and promotional communications</li>
                  <li>Respond to inquiries and offer support</li>
                  <li>Request feedback</li>
                  <li>Improve our platform</li>
                </ul>

                <h3 className="text-xl font-semibold text-white">3. Disclosure of Your Information</h3>
                <p>
                  We may share information we have collected about you in certain situations. Your information may be
                  disclosed as follows:
                </p>
                <ul className="ml-6 list-disc space-y-2">
                  <li>
                    By Law or to Protect Rights: If we believe the release of information is appropriate to comply with
                    the law
                  </li>
                  <li>
                    Third-Party Service Providers: We may share your information with third parties that perform
                    services for us
                  </li>
                  <li>Marketing Communications: With your consent, or with an opportunity to opt out</li>
                </ul>
              </div>
            </section>

            <Separator className="bg-white/10" />

            <section id="cookies">
              <h2 className="mb-4 text-2xl font-bold text-white">Cookie Policy</h2>
              <div className="space-y-4 text-white/70">
                <p>
                  This Cookie Policy explains how ToolsHub uses cookies and similar technologies to recognize you when
                  you visit our website. It explains what these technologies are and why we use them, as well as your
                  rights to control our use of them.
                </p>

                <h3 className="text-xl font-semibold text-white">1. What Are Cookies</h3>
                <p>
                  Cookies are small data files that are placed on your computer or mobile device when you visit a
                  website. Cookies are widely used by website owners in order to make their websites work, or to work
                  more efficiently, as well as to provide reporting information.
                </p>

                <h3 className="text-xl font-semibold text-white">2. Why We Use Cookies</h3>
                <p>We use cookies for several reasons:</p>
                <ul className="ml-6 list-disc space-y-2">
                  <li>Essential cookies: Required for the operation of our website</li>
                  <li>Analytical/performance cookies: Allow us to recognize and count visitors</li>
                  <li>Functionality cookies: Enable us to personalize content for you</li>
                  <li>
                    Targeting cookies: Record your visit to our website, the pages you visit, and the links you follow
                  </li>
                </ul>

                <h3 className="text-xl font-semibold text-white">3. Your Choices Regarding Cookies</h3>
                <p>
                  If you prefer to avoid the use of cookies on the website, you must first disable the use of cookies in
                  your browser and then delete the cookies saved in your browser associated with this website. You may
                  use this option for preventing the use of cookies at any time.
                </p>
              </div>
            </section>

            <Separator className="bg-white/10" />

            <section id="affiliate">
              <h2 className="mb-4 text-2xl font-bold text-white">Affiliate Policy</h2>
              <div className="space-y-4 text-white/70">
                <p>
                  ToolsHub's Affiliate Policy governs the relationship between ToolsHub and its affiliate partners who
                  promote our platform and receive compensation for referrals.
                </p>

                <h3 className="text-xl font-semibold text-white">1. Affiliate Program</h3>
                <p>
                  The ToolsHub Affiliate Program allows individuals and organizations to earn commissions by promoting
                  ToolsHub and referring new customers. Affiliates receive a unique tracking link and are paid for
                  qualified referrals according to the commission structure outlined in their affiliate agreement.
                </p>

                <h3 className="text-xl font-semibold text-white">2. Commission Structure</h3>
                <p>
                  Affiliates earn a commission on qualified referrals that result in a paid subscription to ToolsHub.
                  Commission rates vary based on the affiliate tier and the subscription plan purchased.
                </p>

                <h3 className="text-xl font-semibold text-white">3. Promotional Guidelines</h3>
                <p>Affiliates must adhere to the following guidelines when promoting ToolsHub:</p>
                <ul className="ml-6 list-disc space-y-2">
                  <li>Clearly disclose affiliate relationships in accordance with FTC guidelines</li>
                  <li>Only make claims about ToolsHub that are accurate and can be substantiated</li>
                  <li>Do not engage in spamming, misleading advertising, or any illegal promotional tactics</li>
                  <li>Do not bid on ToolsHub trademarks in search engine advertising</li>
                </ul>
              </div>
            </section>

            <Separator className="bg-white/10" />

            <section id="refund">
              <h2 className="mb-4 text-2xl font-bold text-white">Refund Policy</h2>
              <div className="space-y-4 text-white/70">
                <p>
                  Our Refund Policy outlines the guidelines for requesting refunds for ToolsHub subscriptions and
                  services.
                </p>

                <h3 className="text-xl font-semibold text-white">1. Subscription Refunds</h3>
                <p>
                  We offer a 14-day money-back guarantee for new subscriptions. If you are not satisfied with our
                  service, you may request a full refund within 14 days of your initial purchase. After this period,
                  refunds are generally not provided for subscription fees.
                </p>

                <h3 className="text-xl font-semibold text-white">2. How to Request a Refund</h3>
                <p>
                  To request a refund, please contact our support team at support@toolshub.com with your account
                  information and the reason for your refund request. Our team will review your request and respond
                  within 2 business days.
                </p>

                <h3 className="text-xl font-semibold text-white">3. Refund Processing</h3>
                <p>
                  Approved refunds will be processed to the original payment method used for the purchase. Depending on
                  your payment provider, it may take 5-10 business days for the refund to appear in your account.
                </p>
              </div>
            </section>
          </div>

          <div className="mt-8 rounded-lg border border-white/10 bg-white/5 p-6 text-center">
            <h3 className="mb-2 text-xl font-semibold text-white">Have Questions About Our Policies?</h3>
            <p className="mb-4 text-white/70">
              Our support team is here to help you understand our terms and policies.
            </p>
            <Button className="bg-white text-black hover:bg-purple-600 hover:text-white transition-colors">
              <Link href="/contact">Contact Support</Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

