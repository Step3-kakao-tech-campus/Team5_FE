import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { getMatchReviews } from "../apis/review";
import Spinner from "../components/common/atoms/Spinner";
import NoWritableReview from "../components/review/NoWritableReview";
import WritableReviewHeader from "../components/review/WritableReviewHeader";
import WritableReviewTemplate from "../components/review/WritableReviewTemplate";
import useDefaultErrorHandler from "../hooks/useDefaultErrorHandler";
import { getAvatarUrl } from "../utils/firebase";

export default function WritableReviewListPage() {
  const [isFetching, setIsFetching] = useState(true);
  const avatarRef = useRef(null);
  const { defaultErrorHandler } = useDefaultErrorHandler();
  const { data, isLoading } = useQuery(["/reviews/writable"], getMatchReviews, {
    onError: (error) => {
      defaultErrorHandler(error);
    },
  });

  useEffect(() => {
    if (isLoading) return;
    const getAvatar = async () => {
      avatarRef.current = await Promise.all(
        data?.matches?.map(async (match) => {
          const res = await getAvatarUrl(match.plannerId);
          return res;
        }),
      );
      setIsFetching(false);
    };
    getAvatar();
  }, [isLoading]);

  if (isFetching) return <Spinner />;
  return (
    <div className="w-full h-full">
      <WritableReviewHeader />
      {data?.matches?.length === 0 ? (
        <NoWritableReview />
      ) : (
        <WritableReviewTemplate
          matches={data.matches}
          avatars={avatarRef?.current}
        />
      )}
    </div>
  );
}
