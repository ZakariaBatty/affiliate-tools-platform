import { updateTag } from "@/app/actions/admin/tag";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { TagFull } from "@/types";
import React, { useActionState, useEffect, useRef } from "react";

type Pros = {
  editTagSheet: boolean;
  setEditTagSheet: (open: boolean) => void;
  setSidebarOpen: (open: boolean) => void;
  selectedTag: TagFull
}

export const EditTagSheet = ({ editTagSheet, setEditTagSheet, setSidebarOpen, selectedTag }: Pros) => {

  const { toast } = useToast()

  const formRef = useRef<HTMLFormElement>(null);

  const updateTagWithId = async (prevState: any, formData: FormData) => {
    return await updateTag(selectedTag.id, formData);
  };

  const [state, formAction, isPending] = useActionState(updateTagWithId, undefined);


  useEffect(() => {
    if (state?.success) {
      setEditTagSheet(false);
      setSidebarOpen(false);
      toast({
        title: 'Tag updated successfully',
        description: 'The Tag has been updated successfully.',
        variant: 'default',
      });
    }
  }, [state]);

  return (
    <Sheet
      open={editTagSheet}
      onOpenChange={(open) => {
        setEditTagSheet(open)
        setSidebarOpen(open)
      }}
    >
      <SheetContent className="sm:max-w-[500px]" side="right">
        <SheetHeader>
          <SheetTitle>Edit Tag</SheetTitle>
          <SheetDescription>Make changes to the tag</SheetDescription>
        </SheetHeader>
        <form action={formAction} ref={formRef}>

          <div className="grid gap-4 py-4 mt-6">
            <div>
              <label htmlFor="name" className="text-sm font-medium mb-2 block">
                Tag Name
              </label>
              <Input id="name" name="name" defaultValue={selectedTag.name} />
              {state?.error && (
                <div className="text-red-500 text-sm mt-2">{typeof state.error === 'string' ? state.error : JSON.stringify(state.error.name && state.error.name.join(", "))}</div>
              )}
            </div>
            <div>
              <label htmlFor="slug" className="text-sm font-medium mb-2 block">
                Slug
              </label>
              <Input disabled id="slug" name="slug" defaultValue={selectedTag.slug} />
            </div>
          </div>
          <SheetFooter className="mt-6">
            <Button
              variant="outline"
              onClick={() => {
                setEditTagSheet(false)
                setSidebarOpen(false)
              }}
            >
              Cancel
            </Button>
            <Button disabled={isPending} type="submit" className="bg-white text-black hover:bg-purple-600 hover:text-white">{isPending ? "Saving..." : "Save Changes"}</Button>
          </SheetFooter>
        </form>

      </SheetContent>
    </Sheet>
  );
};
