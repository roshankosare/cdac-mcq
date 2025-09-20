"use client";

import React, { useState } from "react";
import QuestionFilter from "./question-filter";
import QuestionList from "./question-list";

const categoriesList = ["java", "aptitude"];
const Questions = () => {
  const [category, setCategory] = useState<string>(categoriesList[0]);
  return (
    <div className=" w-full flex flex-col gap-y-8">
      <QuestionFilter
        selectedCategory={category}
        setCategory={setCategory}
        categories={categoriesList}
      />
      <QuestionList category={category} />
    </div>
  );
};

export default Questions;
