import ReviewCard from "./ReviewCard";
import { useGetReviewList } from "queries/reviewQuery";
import React from "react";
import { MdExpandMore } from "react-icons/md";
import styled from "styled-components";

const ReviewList = ({ id }) => {
  const { data, fetchNextPage } = useGetReviewList(id);
  const [isShow, setIsShow] = React.useState();

  const clickHandler = () => {
    fetchNextPage();
  };

  return (
    <div>
      {/* {data?.pages?.map((page, idx) => (
        <React.Fragment key={idx}>
          {page.reviews?.flatMap((review, idx) => (
            <React.Fragment key={review._id}>
              <ReviewCard review={review} idx={idx} />
            </React.Fragment>
          ))}
        </React.Fragment>
      ))} */}

      {data?.pages
        ?.flatMap((page) => {
          return page.reviews;
        })
        .map((review, idx) => (
          <ReviewCard review={review} idx={idx} key={review._id} />
        ))}

      {Number(data?.pages?.length) < Number(data?.pages?.[0].totalPage) && (
        <MoreReview onClick={clickHandler}>
          후기 더 보기 <MdExpandMore />{" "}
        </MoreReview>
      )}
    </div>
  );
};

const MoreReview = styled.div`
  cursor: pointer;
`;

export default ReviewList;
