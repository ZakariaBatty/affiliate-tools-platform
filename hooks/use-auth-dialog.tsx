"use client"

import { create } from "zustand"

type AuthDialogStore = {
  isOpen: boolean
  defaultTab: "login" | "register" | "reset"
  redirectUrl: string
  onSuccess?: () => void
  open: (options?: {
    defaultTab?: "login" | "register" | "reset"
    redirectUrl?: string
    onSuccess?: () => void
  }) => void
  close: () => void
}

export const useAuthDialog = create<AuthDialogStore>((set) => ({
  isOpen: false,
  defaultTab: "login",
  redirectUrl: "/",
  open: (options) =>
    set({
      isOpen: true,
      defaultTab: options?.defaultTab || "login",
      redirectUrl: options?.redirectUrl || "/dashboard",
      onSuccess: options?.onSuccess,
    }),
  close: () => set({ isOpen: false }),
}))

