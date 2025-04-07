import React, { Suspense } from "react";
import ToolsLoadingPadmin from "./loading";
import ToolsClientPageAdmin from "./ToolsClientPage";
import { getAllToolsAdmin, getCategoriesAdmin } from "@/app/actions/admin/data-fetching";

const ToolsPage = async () => {
  //  get server sesion 

  // check if user connect and role user if admin
  // Fetch data for the tools and categories
  const [tools, categories] = await Promise.all([getAllToolsAdmin(), getCategoriesAdmin()])
  console.log({ tools, categories });

  return (
    <Suspense fallback={<ToolsLoadingPadmin />}>
      <ToolsClientPageAdmin initialTools={tools} categories={categories} />
    </Suspense>
  );
};

export default ToolsPage;
