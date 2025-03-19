"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Search, Filter, Download, CreditCard, CheckCircle, ChevronRight, Printer, Copy } from "lucide-react"
import CompanyDashboardLayout from "@/components/company-dashboard-layout"

export default function CompanyPaymentsPage() {
  const [timeRange, setTimeRange] = useState("all")
  const [invoiceOpen, setInvoiceOpen] = useState(false)
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null)

  // Mock subscription data
  const subscription = {
    plan: "Pro",
    status: "Active",
    amount: 199.99,
    billingPeriod: "Monthly",
    nextBillingDate: "April 18, 2025",
    paymentMethod: {
      type: "Credit Card",
      last4: "4242",
      expiry: "05/26",
      brand: "Visa",
    },
  }

  // Mock invoices data
  const invoices = [
    {
      id: "INV-2025-001",
      date: "Mar 18, 2025",
      amount: 199.99,
      status: "Paid",
      items: [{ name: "Pro Plan - Monthly Subscription", amount: 199.99 }],
    },
    {
      id: "INV-2025-000",
      date: "Feb 18, 2025",
      amount: 199.99,
      status: "Paid",
      items: [{ name: "Pro Plan - Monthly Subscription", amount: 199.99 }],
    },
    {
      id: "INV-2024-012",
      date: "Jan 18, 2025",
      amount: 199.99,
      status: "Paid",
      items: [{ name: "Pro Plan - Monthly Subscription", amount: 199.99 }],
    },
    {
      id: "INV-2024-011",
      date: "Dec 18, 2024",
      amount: 199.99,
      status: "Paid",
      items: [{ name: "Pro Plan - Monthly Subscription", amount: 199.99 }],
    },
    {
      id: "INV-2024-010",
      date: "Nov 18, 2024",
      amount: 199.99,
      status: "Paid",
      items: [{ name: "Pro Plan - Monthly Subscription", amount: 199.99 }],
    },
    {
      id: "INV-2024-009",
      date: "Oct 18, 2024",
      amount: 199.99,
      status: "Paid",
      items: [{ name: "Pro Plan - Monthly Subscription", amount: 199.99 }],
    },
  ]

  const viewInvoice = (invoice: any) => {
    setSelectedInvoice(invoice)
    setInvoiceOpen(true)
  }

  return (
    <CompanyDashboardLayout>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Payments & Billing</h1>
          <p className="text-white/70">Manage your subscription and billing information</p>
        </div>

        <div className="flex items-center gap-4">
          <Button className="bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:opacity-90">
            <CreditCard className="mr-2 h-4 w-4" />
            Update Payment Method
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="border-white/10 bg-white/5 md:col-span-2">
          <CardHeader>
            <CardTitle className="text-white">Current Subscription</CardTitle>
            <CardDescription className="text-white/70">
              Details about your current plan and billing cycle
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border border-white/10 bg-white/5 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-white">{subscription.plan} Plan</h3>
                  <Badge className="mt-1 bg-green-600 text-white">{subscription.status}</Badge>
                </div>
                <Button className="bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:opacity-90">
                  Upgrade Plan
                </Button>
              </div>

              <Separator className="my-6 bg-white/10" />

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h4 className="text-sm font-medium text-white/70">Billing Amount</h4>
                  <p className="text-lg font-bold text-white">
                    ${subscription.amount.toFixed(2)}/{subscription.billingPeriod.toLowerCase()}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-white/70">Next Billing Date</h4>
                  <p className="text-lg font-bold text-white">{subscription.nextBillingDate}</p>
                </div>
              </div>

              <Separator className="my-6 bg-white/10" />

              <div>
                <h4 className="mb-2 text-sm font-medium text-white/70">Payment Method</h4>
                <div className="flex items-center gap-3">
                  <div className="rounded-md bg-white/10 p-2">
                    <CreditCard className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-white">
                      {subscription.paymentMethod.brand} ending in {subscription.paymentMethod.last4}
                    </p>
                    <p className="text-sm text-white/70">Expires {subscription.paymentMethod.expiry}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Button variant="outline" className="border-white/10 text-white hover:bg-white/10">
                  Change Plan
                </Button>
                <Button variant="outline" className="border-white/10 text-white hover:bg-white/10">
                  Cancel Subscription
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-white/5">
          <CardHeader>
            <CardTitle className="text-white">Billing Summary</CardTitle>
            <CardDescription className="text-white/70">Overview of your billing activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium text-white/70">Current Period</h4>
                <p className="text-lg font-bold text-white">Mar 18 - Apr 17, 2025</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-white/70">Total Billed (YTD)</h4>
                <p className="text-lg font-bold text-white">$599.97</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-white/70">Payment Status</h4>
                <div className="mt-1 flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                  <p className="font-medium text-white">Up to date</p>
                </div>
              </div>
            </div>

            <Button className="mt-6 w-full bg-white/10 text-white hover:bg-white/20" variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download Tax Documents
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6 border-white/10 bg-white/5">
        <CardHeader>
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div>
              <CardTitle className="text-white">Invoice History</CardTitle>
              <CardDescription className="text-white/70">View and download your past invoices</CardDescription>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
                <Input
                  type="text"
                  placeholder="Search invoices..."
                  className="w-[200px] rounded-md border-white/10 bg-white/5 pl-10 text-white placeholder:text-white/50"
                />
              </div>

              <Tabs value={timeRange} onValueChange={setTimeRange} className="w-[200px]">
                <TabsList className="grid w-full grid-cols-2 bg-white/5">
                  <TabsTrigger value="recent">Recent</TabsTrigger>
                  <TabsTrigger value="all">All Time</TabsTrigger>
                </TabsList>
              </Tabs>

              <Button variant="outline" size="icon" className="border-white/10 text-white hover:bg-white/10">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="p-4 text-left text-sm font-medium text-white/70">Invoice</th>
                  <th className="p-4 text-left text-sm font-medium text-white/70">Date</th>
                  <th className="p-4 text-left text-sm font-medium text-white/70">Amount</th>
                  <th className="p-4 text-left text-sm font-medium text-white/70">Status</th>
                  <th className="p-4 text-right text-sm font-medium text-white/70">Actions</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice) => (
                  <tr key={invoice.id} className="border-b border-white/10 hover:bg-white/5">
                    <td className="p-4 font-medium text-white">{invoice.id}</td>
                    <td className="p-4 text-white">{invoice.date}</td>
                    <td className="p-4 text-white">${invoice.amount.toFixed(2)}</td>
                    <td className="p-4">
                      <Badge
                        className={invoice.status === "Paid" ? "bg-green-600 text-white" : "bg-yellow-600 text-white"}
                      >
                        {invoice.status}
                      </Badge>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 text-white/70 hover:bg-white/10 hover:text-white"
                          onClick={() => viewInvoice(invoice)}
                        >
                          View
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-white/70 hover:bg-white/10 hover:text-white"
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Invoice Detail Sheet */}
      <Sheet open={invoiceOpen} onOpenChange={setInvoiceOpen}>
        <SheetContent className="w-full max-w-lg overflow-y-auto border-white/10 bg-black sm:max-w-2xl">
          {selectedInvoice && (
            <div className="flex h-full flex-col">
              <SheetHeader className="border-b border-white/10 pb-4">
                <SheetTitle className="text-2xl text-white">Invoice {selectedInvoice.id}</SheetTitle>
                <SheetDescription className="text-white/70">Invoice details and payment information</SheetDescription>
              </SheetHeader>

              <div className="flex-1 overflow-y-auto py-6">
                <div className="mb-8 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="relative h-8 w-8 overflow-hidden rounded-full bg-gradient-to-br from-purple-600 to-blue-500">
                      <div className="absolute inset-0 flex items-center justify-center text-white font-bold">T</div>
                    </div>
                    <span className="text-xl font-bold text-white">ToolsHub</span>
                  </div>
                  <Badge
                    className={
                      selectedInvoice.status === "Paid" ? "bg-green-600 text-white" : "bg-yellow-600 text-white"
                    }
                  >
                    {selectedInvoice.status}
                  </Badge>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="text-sm font-medium text-white/70">Invoice Number</h3>
                    <p className="text-white">{selectedInvoice.id}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-white/70">Invoice Date</h3>
                    <p className="text-white">{selectedInvoice.date}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-white/70">Billing From</h3>
                    <p className="text-white">ToolsHub, Inc.</p>
                    <p className="text-sm text-white/70">123 Tech Avenue</p>
                    <p className="text-sm text-white/70">San Francisco, CA 94103</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-white/70">Billing To</h3>
                    <p className="text-white">Acme Corporation</p>
                    <p className="text-sm text-white/70">456 Business Street</p>
                    <p className="text-sm text-white/70">New York, NY 10001</p>
                  </div>
                </div>

                <Separator className="my-6 bg-white/10" />

                <div>
                  <h3 className="mb-4 text-lg font-medium text-white">Invoice Items</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b border-white/10">
                          <th className="p-2 text-left text-sm font-medium text-white/70">Description</th>
                          <th className="p-2 text-right text-sm font-medium text-white/70">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedInvoice.items.map((item: any, index: number) => (
                          <tr key={index} className="border-b border-white/10">
                            <td className="p-2 text-white">{item.name}</td>
                            <td className="p-2 text-right text-white">${item.amount.toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr>
                          <td className="p-2 text-right font-medium text-white">Total</td>
                          <td className="p-2 text-right font-bold text-white">${selectedInvoice.amount.toFixed(2)}</td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>

                <Separator className="my-6 bg-white/10" />

                <div>
                  <h3 className="mb-4 text-lg font-medium text-white">Payment Information</h3>
                  <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center gap-3">
                      <div className="rounded-md bg-white/10 p-2">
                        <CreditCard className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-white">Visa ending in 4242</p>
                        <p className="text-sm text-white/70">Payment processed on {selectedInvoice.date}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 rounded-lg border border-white/10 bg-white/5 p-4">
                  <p className="text-sm text-white/70">
                    If you have any questions about this invoice, please contact our support team at
                    <a href="mailto:billing@toolshub.com" className="ml-1 text-purple-500 hover:underline">
                      billing@toolshub.com
                    </a>
                  </p>
                </div>
              </div>

              <div className="border-t border-white/10 pt-4">
                <div className="flex flex-wrap justify-end gap-2">
                  <Button
                    variant="outline"
                    className="border-white/10 text-white hover:bg-white/10"
                    onClick={() => setInvoiceOpen(false)}
                  >
                    Close
                  </Button>
                  <Button variant="outline" className="border-white/10 text-white hover:bg-white/10">
                    <Copy className="mr-2 h-4 w-4" />
                    Copy Invoice URL
                  </Button>
                  <Button variant="outline" className="border-white/10 text-white hover:bg-white/10">
                    <Printer className="mr-2 h-4 w-4" />
                    Print
                  </Button>
                  <Button className="bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:opacity-90">
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF
                  </Button>
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </CompanyDashboardLayout>
  )
}

