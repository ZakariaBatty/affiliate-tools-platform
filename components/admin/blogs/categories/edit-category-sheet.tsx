'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { Category } from "@/types";
import React, { useActionState, useEffect, useRef } from "react";
import { updateCategory } from '@/app/actions/admin/category';
import { useToast } from "@/components/ui/use-toast";

type Props = {
  editCategorySheet: boolean;
  setEditCategorySheet: (open: boolean) => void;
  setSidebarOpen: (open: boolean) => void;
  selectedCategory: Category;
};

;
const EditCategorySheet = ({ editCategorySheet, setEditCategorySheet, setSidebarOpen, selectedCategory }: Props) => {

  const { toast } = useToast();

  const formRef = useRef<HTMLFormElement>(null);

  const updateCategoryWithId = async (prevState: any, formData: FormData) => {
    return await updateCategory(selectedCategory.id, formData);
  };

  const [state, formAction, isPending] = useActionState(updateCategoryWithId, undefined);


  useEffect(() => {
    if (state?.success) {
      setEditCategorySheet(false);
      setSidebarOpen(false);
      toast({
        title: 'Category updated successfully',
        description: 'The category has been updated successfully.',
        variant: 'default',
      });
    }
  }, [state?.success]);


  return (
    <Sheet
      open={editCategorySheet}
      onOpenChange={(open) => {
        setEditCategorySheet(open);
        setSidebarOpen(open);
      }}
    >
      <SheetContent className="sm:max-w-[500px]" side="right">
        <SheetHeader>
          <SheetTitle>Edit Category</SheetTitle>
          <SheetDescription>Make changes to the category</SheetDescription>
        </SheetHeader>

        <form action={formAction} ref={formRef}>
          <div className="grid gap-4 py-4 mt-6">
            <div>
              <label htmlFor="name" className="text-sm font-medium mb-2 block">
                Category Name
              </label>
              <Input id="name" name="name" defaultValue={selectedCategory.name} />

              {state?.error && (
                <div className="text-red-500 text-sm mt-2">{typeof state.error === 'string' ? state.error : JSON.stringify(state.error.name && state.error.name.join(", "))}</div>
              )}

            </div>

            <div>
              <label htmlFor="slug" className="text-sm font-medium mb-2 block">
                Slug
              </label>
              <Input disabled id="slug" defaultValue={selectedCategory.slug} />
            </div>

            <div>
              <label htmlFor="description" className="text-sm font-medium mb-2 block">
                Description
              </label>
              <Textarea
                id="description"
                name="description"
                defaultValue={selectedCategory.description || ''}
                placeholder="Enter category description"
                className="min-h-[100px]"
              />

              {state?.error && (
                <div className="text-red-500 text-sm mt-2">{typeof state.error === 'string' ? state.error : JSON.stringify(state.error.description && state.error.description.join(", "))}</div>
              )}
            </div>
          </div>


          <SheetFooter className="mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setEditCategorySheet(false);
                setSidebarOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button disabled={isPending} type="submit" className="bg-white text-black hover:bg-purple-600 hover:text-white">
              {isPending ? "Saving ...." : "Save Changes"}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default EditCategorySheet;
