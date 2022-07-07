import styled from "styled-components";
import { useState, useEffect } from "react";
import { StarRatingWithEmpty } from "./StarRating";
import { AiFillDelete } from "react-icons/ai";
import { RiEdit2Fill } from "react-icons/ri";
import { useDeleteReview } from "queries/reviewQuery";
import ReviewEditForm from "./ReviewEditForm";
import { CardHeader, CardText } from "./landmark.style";
import { useRecoilValue } from "recoil";
import { userState } from "states";

export const ReviewCard = ({ review, idx }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { userNickName, content, rating, createdAt, id, userId } = review;

  const loginUserId = useRecoilValue(userState)?.id;

  const deleteReview = useDeleteReview();

  const handleDeleteReview = () => {
    deleteReview.mutate(id);
  };

  useEffect(() => {
    if (loginUserId === userId) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [userId, loginUserId]);

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {isEditing ? (
        <ReviewEditForm review={review} setIsEditing={setIsEditing} />
      ) : (
        <ReviewCardContainer idx={idx}>
          <CardHeader>
            <StarRatingWithEmpty number={rating} />
            <CardText>{userNickName}</CardText>
            <CardText color="gray03">{createdAt.slice(0, 10)}</CardText>
            {isVisible && (
              <>
                {" "}
                <IconContainer>
                  <RiEdit2Fill
                    size="1.7rem"
                    cursor="pointer"
                    onClick={() => setIsEditing(true)}
                  />
                  <TrashBox size="1.7rem" onClick={handleDeleteReview} />
                </IconContainer>
              </>
            )}
          </CardHeader>
          <CardContent>
            <CardText>{content}</CardText>
          </CardContent>
        </ReviewCardContainer>
      )}
    </>
  );
};

const ReviewCardContainer = styled.div`
  width: 100%;
  border-top: ${(props) =>
    props.idx === 0 ? "none" : `1px dashed ${props.theme.colors.secondary}`};
`;

const CardContent = styled.div`
  width: 100%;
  padding: 5% 0;
`;

const IconContainer = styled.div`
  margin-left: auto;
  width: auto;
`;

const TrashBox = styled(AiFillDelete)`
  cursor: pointer;
  margin-left: 5px;
`;

export default ReviewCard;
