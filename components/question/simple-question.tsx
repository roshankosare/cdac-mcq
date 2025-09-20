import { Question } from "@/lib/generated/prisma";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { Button } from "../ui/button";

type Props = {
  question: Question;
};

const SimpleQuestion: React.FC<Props> = ({ question }) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [inputOptionDisable, setInputOptionDisable] = useState<boolean>(false);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [likes, setLikes] = useState<number>(question.likeCount);
  const [disableLike, setDisableLike] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSelect = (opt: string) => {
    setSelected(opt);
    setError(null); // clear error if user selects something
    setInputOptionDisable(true);
  };

  const handleSubmitLike = async () => {
    try {
      const response = await fetch(`/api/question/like/${question.id}`, {
        method: "PATCH",
      });

      setLikes((value) => value + 1);
    } catch (err) {
      console.log(err);
    } finally {
      setDisableLike(true);
    }
  };

  const handleViewAnswer = () => {
    if (!selected) {
      setError("⚠️ Please select an option before viewing the answer.");
      return;
    }
    setShowAnswer(true);
  };

  return (
    <div
      key={question.id}
      className="border rounded-lg p-4 shadow bg-white flex flex-col gap-y-3"
    >
      <h2 className="font-semibold text-gray-800">{question.description}</h2>

      {/* Options as radio buttons */}
      <div className="flex flex-col gap-y-2">
        {question.options.map((opt, idx) => {
          const isSelected = selected === opt;
          const isCorrect = opt === question.correctOption;

          return (
            <label
              key={idx}
              className={cn(
                "flex items-center gap-x-4 text-sm rounded px-2 py-1",
                showAnswer &&
                  isSelected &&
                  (isCorrect
                    ? "bg-green-100 text-green-700 border border-green-400"
                    : "bg-red-100 text-red-700 border border-red-400")
              )}
            >
              <input
                type="radio"
                name={question.id.toString()}
                value={opt}
                checked={isSelected}
                onChange={() => handleSelect(opt)}
                disabled={inputOptionDisable}
              />
              {opt}
            </label>
          );
        })}
      </div>

      {error && <p className="text-red-500 text-xs">{error}</p>}

      <div className="flex flex-row gap-x-4">
        <p className="text-xs text-gray-500">
          Likes: {likes} | Categories: {question.category.join(", ")}
        </p>
      </div>

      <div className="flex flex-row gap-x-4">
        <Button className="max-w-[150px]" onClick={handleViewAnswer}>
          View Answer
        </Button>

        <Button
          className="max-w-[80px]"
          onClick={handleSubmitLike}
          disabled={disableLike}
        >
          Like
        </Button>
      </div>

      {showAnswer && (
        <p className="text-sm">Answer: {` ${question.correctOption}`}</p>
      )}
    </div>
  );
};

export default SimpleQuestion;
