import AddQuestionForm from "@/components/add-question/add-question";
import ResponsiveSection from "@/components/ui/responsive-section";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col w-full items-center gap-4">
      <ResponsiveSection className=" w-full sm:max-w-[600px] lg:max-w-[800px]">
        <AddQuestionForm />
      </ResponsiveSection>
    </div>
  );
};

export default page;
