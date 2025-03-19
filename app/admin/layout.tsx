import AdminSidebar from "@/components/admin/sidebar"

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 p-8 pt-16 lg:pt-8 overflow-auto">
        {children}
      </div>
    </div>
  )
}

