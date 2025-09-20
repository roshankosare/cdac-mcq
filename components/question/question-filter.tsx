import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  setCategory: (value: string) => void;
  categories: string[];
  selectedCategory: string;
};
const QuestionFilter: React.FC<Props> = ({
  categories,
  setCategory,
  selectedCategory,
}) => {
  return (
    <div className="w-full flex gap-x-4">
      {categories.map((value, i) => (
        <div
          key={i}
          className={cn(
            "border rounded-4xl px-4 py-2 text-center bg-white text-gray-700 uppercase cursor-pointer",
            selectedCategory === value && "bg-black text-white"
          )}
          onClick={() => setCategory(value)}
        >
          {value}
        </div>
      ))}
    </div>
  );
};

export default QuestionFilter;
