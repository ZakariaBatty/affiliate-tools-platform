import React, { Suspense } from "react";
import ToolsLoadingPadmin from "./loading";
import ToolsClientPageAdmin from "./ToolsClientPage";
import { getAllToolsAdmin, getCategoriesAdmin, getTags } from "@/app/actions/admin/data-fetching";

const ToolsPage = async () => {
  const [tools, categories, tags] = await Promise.all([getAllToolsAdmin(), getCategoriesAdmin(), getTags()])

  return (
    <Suspense fallback={<ToolsLoadingPadmin />}>
      <ToolsClientPageAdmin initialTools={tools} categories={categories} tags={tags} />
    </Suspense>
  );
};

export default ToolsPage;
