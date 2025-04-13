'use client'

import { createCategory } from "@/app/actions/admin/category";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import React, { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";

type Props = {
  addCategorySheet: boolean;
  setAddCategorySheet: (open: boolean) => void;
  setSidebarOpen: (open: boolean) => void;
};


const AddCategorySheet = ({
  addCategorySheet,
  setAddCategorySheet,
  setSidebarOpen,
}: Props) => {
  const { toast } = useToast();
  const { pending } = useFormStatus();

  const formRef = React.useRef<HTMLFormElement>(null);

  const handleCreateCategory = async (prevState: any, formData: FormData) => {
    return await createCategory(formData);
  };

  const [state, formAction] = useActionState(handleCreateCategory, { error: "" });


  useEffect(() => {
    if ("success" in state && state.success) {
      setAddCategorySheet(false);
      setSidebarOpen(false);
      toast({
        title: "Category created successfully",
        description: "The category has been created successfully.",
        variant: "default",
      });
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <Sheet
      open={addCategorySheet}
      onOpenChange={(open) => {
        setAddCategorySheet(open);
        if (!open) {
          setTimeout(() => setSidebarOpen(false), 300);
        } else {
          setSidebarOpen(true);
        }
      }}
    >
      <SheetContent className="sm:max-w-[500px]" side="right">
        <SheetHeader>
          <SheetTitle>Add New Category</SheetTitle>
          <SheetDescription>Create a new blog category</SheetDescription>
        </SheetHeader>
        <form action={formAction} ref={formRef}>
          <div className="grid gap-4 py-4 mt-6">
            <div>
              <label htmlFor="name" className="text-sm font-medium mb-2 block">
                Category Name
              </label>
              <Input id="name" name="name" placeholder="Enter category name" />
              {"error" in state && typeof state.error === "object" && state.error?.name && (
                <p className="text-red-500 text-sm mt-1">{state.error.name.join(", ")}</p>
              )}
            </div>
            <div>
              <label htmlFor="description" className="text-sm font-medium mb-2 block">
                Description
              </label>
              <Textarea
                id="description"
                name="description"
                placeholder="Enter category description"
                className="min-h-[100px]"
              />
              {"error" in state && typeof state.error === "object" && state.error?.description && (
                <p className="text-red-500 text-sm mt-1">{state.error.description.join(", ")}</p>
              )}
            </div>
          </div>
          <SheetFooter className="mt-6">
            <Button
              variant="outline"
              onClick={() => {
                setAddCategorySheet(false);
                setTimeout(() => setSidebarOpen(false), 300);
              }}
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-white text-black hover:bg-purple-600 hover:text-white">
              {pending ? "creating ..." : "Create Category"}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default AddCategorySheet;
