import AdminSidebar from "@/components/admin/sidebar"

import { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 p-8 pt-16 lg:pt-8 overflow-auto">
        {children}
      </div>
    </div>
  )
}

