import { createTag, updateTag } from "@/app/actions/admin/tag";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useToast } from "@/components/ui/use-toast";
import { TagFull } from "@/types";
import React, { useActionState, useEffect, useRef } from "react";

type Pros = {
  addTagSheet: boolean;
  setAddTagSheet: (open: boolean) => void;
  setSidebarOpen: (open: boolean) => void;
}

export const AddTagSheet = ({ addTagSheet, setAddTagSheet, setSidebarOpen }: Pros) => {

  const { toast } = useToast()

  const formRef = useRef<HTMLFormElement>(null);

  const handleCreateTag = async (prevState: any, formData: FormData) => {
    return await createTag(formData);
  };

  const [state, formAction, isPending] = useActionState(handleCreateTag, undefined);


  useEffect(() => {
    if (state?.success) {
      setAddTagSheet(false);
      setSidebarOpen(false);
      toast({
        title: 'Tag created successfully',
        description: 'The Tag has been created successfully.',
        variant: 'default',
      });
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <Sheet
      open={addTagSheet}
      onOpenChange={(open) => {
        setAddTagSheet(open)
        setSidebarOpen(open)
      }}
    >
      <SheetContent className="sm:max-w-[500px]" side="right">
        <SheetHeader>
          <SheetTitle>ADD New Tag</SheetTitle>
          <SheetDescription>Create a new blog tag</SheetDescription>
        </SheetHeader>
        <form action={formAction} ref={formRef}>

          <div className="grid gap-4 py-4 mt-6">
            <div>
              <label htmlFor="name" className="text-sm font-medium mb-2 block">
                Tag Name
              </label>
              <Input id="name" name="name" placeholder="Enter tag name" />
              {state?.error && (
                <div className="text-red-500 text-sm mt-2">{typeof state.error === 'string' ? state.error : JSON.stringify(state.error.name && state.error.name.join(", "))}</div>
              )}
            </div>
          </div>
          <SheetFooter className="mt-6">
            <Button
              variant="outline"
              onClick={() => {
                setAddTagSheet(false)
                setSidebarOpen(false)
              }}
            >
              Cancel
            </Button>
            <Button disabled={isPending} type="submit" className="bg-white text-black hover:bg-purple-600 hover:text-white">{isPending ? "Creating..." : "Create tag"}</Button>
          </SheetFooter>
        </form>

      </SheetContent>
    </Sheet>
  );
};
