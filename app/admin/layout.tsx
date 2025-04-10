import AdminSidebar from "@/components/admin/sidebar"
import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";

import { ReactNode } from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions)
  console.log("session", session)
  if (!session || session.user.role !== "ADMIN") {
    notFound()
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 p-8 pt-16 lg:pt-8 overflow-auto">
        {children}
      </div>
    </div>
  )
}

