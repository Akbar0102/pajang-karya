import React from "react";
import { formatDate } from "@/utils/formatDate";
import parse from "html-react-parser";

export const ReviewProjectDashboard = ({ review }) => {
  const formattedDate = formatDate(review.createdAt);
  const isReviewNotEmpty = review.review.trim() !== "";

  return (
    <main className="space-y-8">
      <section className="flex flex-col gap-2">
        <h1 className="text-xl font-semibold ">Review</h1>
        <p>this is review on your project</p>
      </section>
      <section>
        {isReviewNotEmpty ? (
          <div>
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <p className="text-[32px] font-normal text-grey hover:text-violet">
                {`${review.firstName} ${review.lastName}`}
              </p>
              <p className="text-base font-normal text-grey">{formattedDate}</p>
            </div>
            <div className="border-b-1 border-black-100 py-7 mb-7 flex flex-col gap-y-3">
              <div className="text-lg font-normal italic">
                {parse(review.review)}
              </div>
            </div>
          </div>
        ) : (
          <div>
            <p>No review available</p>
          </div>
        )}
      </section>
    </main>
  );
};
