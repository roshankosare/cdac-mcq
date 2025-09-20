import { Question } from "@/lib/generated/prisma";
import React, { useEffect, useState } from "react";
import SimpleQuestion from "./simple-question";
import { Button } from "../ui/button";

type Props = {
  category: string;
};

const QuestionList: React.FC<Props> = ({ category }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const limit = 5; // you can adjust this

  const fetchQuestions = async (pageNum: number) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `/api/question?category=${category}&page=${pageNum}&limit=${limit}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch questions");
      }

      const data = await response.json();

      setQuestions(data.questions);
      setHasMore(data.questions.length === limit); // if fewer than limit, no more pages
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1); // reset page when category changes
    fetchQuestions(1);
  }, [category]);

  const nextPage = () => {
    const newPage = page + 1;
    setPage(newPage);
    fetchQuestions(newPage);
  };

  const prevPage = () => {
    if (page > 1) {
      const newPage = page - 1;
      setPage(newPage);
      fetchQuestions(newPage);
    }
  };

  if (loading) return <p>Loading questions...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="flex w-full flex-col gap-y-4">
      {questions.length === 0 ? (
        <p>No questions found for {category}</p>
      ) : (
        <>
          {questions.map((q) => (
            <SimpleQuestion question={q} key={q.id} />
          ))}

          {/* Pagination controls */}
          <div className="flex justify-between items-center mt-4">
            <Button
              variant="outline"
              disabled={page === 1}
              onClick={prevPage}
            >
              Previous
            </Button>

            <span className="text-sm text-gray-600">Page {page}</span>

            <Button
              variant="outline"
              disabled={!hasMore}
              onClick={nextPage}
            >
              Next
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default QuestionList;
