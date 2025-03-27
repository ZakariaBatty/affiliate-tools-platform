import { AlertCircle, Check } from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

export function AlertAuth({ message, success }: { message: string, success: boolean }) {
  return (
    <Alert variant="destructive">
      {success ? (<Check className="h-4 w-4" />) : (<AlertCircle className="h-4 w-4" />)}
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        {message}
      </AlertDescription>
    </Alert>
  )
}
