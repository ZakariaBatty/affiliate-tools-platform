import React, { Suspense } from "react";
import CategoriesClientPage from "./CategoryClientPage";
import LoadingCategory from "./loading";
import { getCategoriesWithCount } from "@/app/actions/admin/data-fetching";

const page = async () => {
  const categories = await getCategoriesWithCount()
  return (
    <Suspense fallback={<LoadingCategory />}>
      <CategoriesClientPage initialCategories={categories} />
    </Suspense>
  );
};

export default page;
