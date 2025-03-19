"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  MoreHorizontal,
  Download,
  Filter,
  RefreshCw,
  Eye,
  CreditCard,
  Building2,
  User,
  Calendar,
  Clock,
  CheckCircle,
  FileText,
  ArrowUpRight,
} from "lucide-react"

// Sample payments data
const payments = [
  {
    id: "INV-001",
    amount: 199.0,
    status: "paid",
    date: "2023-10-15",
    customer: "John Smith",
    company: "Acme Inc",
    plan: "Pro Plan",
    method: "credit_card",
    card: "**** **** **** 4242",
    email: "john@acmeinc.com",
  },
  {
    id: "INV-002",
    amount: 299.0,
    status: "paid",
    date: "2023-10-14",
    customer: "Sarah Johnson",
    company: "TechCorp",
    plan: "Enterprise Plan",
    method: "paypal",
    email: "sarah@techcorp.com",
  },
  {
    id: "INV-003",
    amount: 99.0,
    status: "pending",
    date: "2023-10-13",
    customer: "Michael Chen",
    company: "DevStudio",
    plan: "Basic Plan",
    method: "credit_card",
    card: "**** **** **** 5555",
    email: "michael@devstudio.com",
  },
  {
    id: "INV-004",
    amount: 499.0,
    status: "paid",
    date: "2023-10-12",
    customer: "Emily Davis",
    company: "GrowthLabs",
    plan: "Enterprise Plan",
    method: "bank_transfer",
    email: "emily@growthlabs.com",
  },
  {
    id: "INV-005",
    amount: 199.0,
    status: "failed",
    date: "2023-10-11",
    customer: "David Wilson",
    company: "MarketPro",
    plan: "Pro Plan",
    method: "credit_card",
    card: "**** **** **** 1234",
    email: "david@marketpro.com",
  },
  {
    id: "INV-006",
    amount: 99.0,
    status: "paid",
    date: "2023-10-10",
    customer: "Jessica Brown",
    company: "ContentCo",
    plan: "Basic Plan",
    method: "paypal",
    email: "jessica@contentco.com",
  },
  {
    id: "INV-007",
    amount: 299.0,
    status: "refunded",
    date: "2023-10-09",
    customer: "Robert Taylor",
    company: "AnalyticsAI",
    plan: "Pro Plan",
    method: "credit_card",
    card: "**** **** **** 9876",
    email: "robert@analyticsai.com",
  },
]

export default function PaymentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [viewPaymentSheet, setViewPaymentSheet] = useState(false)
  const [selectedPayment, setSelectedPayment] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.company.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = selectedStatus === "all" || payment.status === selectedStatus

    return matchesSearch && matchesStatus
  })

  const handleViewPayment = (payment) => {
    setSelectedPayment(payment)
    setViewPaymentSheet(true)
    setSidebarOpen(true)
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Paid</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>
      case "failed":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Failed</Badge>
      case "refunded":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Refunded</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const getPaymentMethodIcon = (method) => {
    switch (method) {
      case "credit_card":
        return <CreditCard className="h-4 w-4 text-muted-foreground" />
      case "paypal":
        return <div className="h-4 w-4 text-blue-500 font-bold">P</div>
      case "bank_transfer":
        return <Building2 className="h-4 w-4 text-muted-foreground" />
      default:
        return <CreditCard className="h-4 w-4 text-muted-foreground" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Payments</h1>
          <p className="text-muted-foreground">Manage payments and invoices</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" className="h-9 w-9">
            <Download className="h-4 w-4" />
            <span className="sr-only">Download</span>
          </Button>
          <Button variant="outline" size="icon" className="h-9 w-9">
            <RefreshCw className="h-4 w-4" />
            <span className="sr-only">Refresh</span>
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search invoices..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex flex-1 items-center gap-2">
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
              <SelectItem value="refunded">Refunded</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" className="h-9 w-9">
            <Filter className="h-4 w-4" />
            <span className="sr-only">Filter</span>
          </Button>
        </div>
      </div>

      <div className="rounded-lg border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPayments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                  No payments found. Try adjusting your filters.
                </TableCell>
              </TableRow>
            ) : (
              filteredPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-md bg-gray-100 flex items-center justify-center">
                        <FileText className="h-5 w-5 text-gray-500" />
                      </div>
                      <span className="font-medium">{payment.id}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">${payment.amount.toFixed(2)}</span>
                  </TableCell>
                  <TableCell>{getStatusBadge(payment.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span>{payment.date}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span>{payment.customer}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Building2 className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span>{payment.company}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{payment.plan}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleViewPayment(payment)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="mr-2 h-4 w-4" />
                          Download invoice
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <ArrowUpRight className="mr-2 h-4 w-4" />
                          View in Stripe
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* View Payment Sheet */}
      {selectedPayment && (
        <Sheet
          open={viewPaymentSheet}
          onOpenChange={(open) => {
            setViewPaymentSheet(open)
            setSidebarOpen(open)
          }}
        >
          <SheetContent className="w-[70%] sm:max-w-[70%] overflow-y-auto" side="right">
            <SheetHeader>
              <SheetTitle>Invoice {selectedPayment.id}</SheetTitle>
              <SheetDescription>Payment details and invoice information</SheetDescription>
            </SheetHeader>
            <div className="mt-6 space-y-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-2/3 space-y-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-2xl font-bold">Invoice {selectedPayment.id}</h2>
                      <p className="text-muted-foreground">Issued on {selectedPayment.date}</p>
                    </div>
                    <div>{getStatusBadge(selectedPayment.status)}</div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Billed To</p>
                      <p className="font-medium">{selectedPayment.customer}</p>
                      <p>{selectedPayment.company}</p>
                      <p>{selectedPayment.email}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Issued By</p>
                      <p className="font-medium">Affiliate Tools Platform</p>
                      <p>123 Marketing Street</p>
                      <p>San Francisco, CA 94103</p>
                      <p>billing@affiliatetools.com</p>
                    </div>
                  </div>

                  <div className="border rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Description</TableHead>
                          <TableHead className="text-right">Quantity</TableHead>
                          <TableHead className="text-right">Unit Price</TableHead>
                          <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>
                            <div>
                              <p className="font-medium">{selectedPayment.plan}</p>
                              <p className="text-sm text-muted-foreground">Monthly Subscription</p>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">1</TableCell>
                          <TableCell className="text-right">${selectedPayment.amount.toFixed(2)}</TableCell>
                          <TableCell className="text-right">${selectedPayment.amount.toFixed(2)}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                    <div className="bg-muted p-4">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>${selectedPayment.amount.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between mt-1">
                        <span>Tax</span>
                        <span>$0.00</span>
                      </div>
                      <div className="flex justify-between mt-4 font-bold">
                        <span>Total</span>
                        <span>${selectedPayment.amount.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="md:w-1/3 space-y-6">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-3">Payment Information</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-muted-foreground">Payment Method</p>
                        <div className="flex items-center mt-1">
                          {getPaymentMethodIcon(selectedPayment.method)}
                          <span className="ml-2 font-medium">
                            {selectedPayment.method === "credit_card"
                              ? "Credit Card"
                              : selectedPayment.method === "paypal"
                                ? "PayPal"
                                : selectedPayment.method === "bank_transfer"
                                  ? "Bank Transfer"
                                  : "Other"}
                          </span>
                        </div>
                        {selectedPayment.card && <p className="text-sm mt-1">{selectedPayment.card}</p>}
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Payment Date</p>
                        <p className="font-medium">{selectedPayment.date}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Transaction ID</p>
                        <p className="font-medium">txn_{Math.random().toString(36).substring(2, 10)}</p>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-3">Subscription Details</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-muted-foreground">Plan</p>
                        <p className="font-medium">{selectedPayment.plan}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Billing Cycle</p>
                        <p className="font-medium">Monthly</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Next Billing Date</p>
                        <p className="font-medium">
                          {
                            new Date(
                              new Date(selectedPayment.date).setMonth(new Date(selectedPayment.date).getMonth() + 1),
                            )
                              .toISOString()
                              .split("T")[0]
                          }
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Button variant="outline" className="w-full">
                      <Download className="mr-2 h-4 w-4" />
                      Download Invoice
                    </Button>
                    <Button variant="outline" className="w-full">
                      <ArrowUpRight className="mr-2 h-4 w-4" />
                      View in Stripe
                    </Button>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="font-medium mb-3">Payment Timeline</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="mr-3 mt-0.5">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                      <p className="font-medium">Payment successful</p>
                      <p className="text-sm text-muted-foreground">
                        Payment of ${selectedPayment.amount.toFixed(2)} was processed successfully
                      </p>
                      <p className="text-xs text-muted-foreground flex items-center mt-1">
                        <Clock className="h-3 w-3 mr-1" />
                        {selectedPayment.date} at 10:30 AM
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="mr-3 mt-0.5">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                      <p className="font-medium">Invoice created</p>
                      <p className="text-sm text-muted-foreground">Invoice {selectedPayment.id} was created</p>
                      <p className="text-xs text-muted-foreground flex items-center mt-1">
                        <Clock className="h-3 w-3 mr-1" />
                        {selectedPayment.date} at 10:29 AM
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <SheetFooter className="mt-6">
              <Button
                variant="outline"
                onClick={() => {
                  setViewPaymentSheet(false)
                  setSidebarOpen(false)
                }}
              >
                Close
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      )}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/20 z-40" style={{ pointerEvents: "all", cursor: "not-allowed" }} />
      )}
    </div>
  )
}

