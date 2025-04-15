"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface StatusFilterProps {
  selectedStatus: string
  setSelectedStatus: (status: string) => void
}

export default function StatusFilter({ selectedStatus, setSelectedStatus }: StatusFilterProps) {
  return (
    <Select value={selectedStatus} onValueChange={setSelectedStatus}>
      <SelectTrigger className="w-full md:w-[180px]">
        <SelectValue placeholder="Status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Status</SelectItem>
        <SelectItem value="published">Published</SelectItem>
        <SelectItem value="draft">Draft</SelectItem>
      </SelectContent>
    </Select>
  )
}
