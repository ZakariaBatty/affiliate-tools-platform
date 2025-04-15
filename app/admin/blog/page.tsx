import React, { Suspense } from "react";
import BlogClientPage from "./BlogClientPage";
import BlogLoadingTable from "./loading";
import { getALLBlogsAdmin, getCategoriesAdmin, getTags } from "@/app/actions/admin/data-fetching";

const page = async () => {
  const [blogs, categories, tags] = await Promise.all([getALLBlogsAdmin(), getCategoriesAdmin(), getTags()])

  return (
    <Suspense fallback={<BlogLoadingTable />}>
      <BlogClientPage initialBlog={blogs} categories={categories} tags={tags} />
    </Suspense>
  );
};

export default page;
