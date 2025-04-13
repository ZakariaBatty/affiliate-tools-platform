import React, { Suspense } from "react";
import LoadingTag from "./loading";
import TagsClientPage from "./TagClientPage";
import { getTagsWithCount } from "@/app/actions/admin/data-fetching";

const page = async () => {
  const tags = await getTagsWithCount();

  return (
    <Suspense fallback={<LoadingTag />}>
      <TagsClientPage initialTags={tags} />
    </Suspense>
  );
};

export default page;
