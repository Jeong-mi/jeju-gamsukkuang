import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";
import { useRecoilValue } from "recoil";

import http from "libs/apiController";
import { userState } from "states";
import { useGetPost } from "queries/communityQuery";
import PostEdit from "../postEdit";

import styled from "styled-components";
import Modal from "components/modal";

const PostDetail = () => {
  const navigate = useNavigate();
  const params = useParams();
  const postId = params.id;
  const postItem = useGetPost(postId);
  const postUserId = postItem?.data?.userId;
  const loginUserId = useRecoilValue(userState);
  const [isVisible, setIsVisible] = useState(false);
  const [isEditable, setIsEditable] = useState(false);

  const handleDelete = async () => {
    try {
      await http.delete(`/community/${postId}`);
      window.location.replace("/community");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (loginUserId.id === postUserId) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [postUserId, loginUserId]);

  if (isEditable) return <PostEdit />;

  return (
    <PostDetailBox>
      <ContentBox>
        <h2>
          <span>[</span>
          {postItem?.data?.head === "question"
            ? "질문"
            : postItem?.data?.head === "info"
            ? "정보"
            : "잡담"}
          <span>]</span> {postItem?.data?.title}
        </h2>
        <span>
          {postItem?.data?.userNickName} ㆍ{" "}
          {`${postItem?.data?.createdAt}`.split("T")[0]}
        </span>
        <hr />
        <div>{ReactHtmlParser(`${postItem?.data?.content}`)}</div>
      </ContentBox>
      <section>
        <button
          type="button"
          onClick={() => {
            navigate("/community");
          }}
        >
          뒤로가기
        </button>
        {isVisible && (
          <>
            <button
              type="button"
              onClick={() => {
                setIsEditable(true);
              }}
            >
              수정하기
            </button>
            <button type="button" onClick={handleDelete}>
              삭제하기
            </button>
          </>
        )}
      </section>
    </PostDetailBox>
  );
};

export default PostDetail;

const PostDetailBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 50px 0;

  section {
    width: 800px;
    display: flex;
    justify-content: flex-end;
    margin: 0 auto;
    margin-top: 20px;

    button {
      width: 100px;
      padding: 7px 15px;
      margin-bottom: 30px;
      border: none;
      border-radius: 10px;
      font-size: 12px;
      font-weight: 600;
    }
    button:nth-child(1) {
      background: ${({ theme }) => theme.colors.gray02};
    }

    button:nth-child(2) {
      color: ${({ theme }) => theme.colors.white};
      background: #74c0fc;
      margin-left: 10px;
    }

    button:nth-child(3) {
      color: ${({ theme }) => theme.colors.white};
      background: #ff8787;
      margin-left: 10px;
    }
  }

  @media screen and ${({ theme }) => theme.breakPoint} {
    width: 100%;
    margin: 20px 0;

    section {
      width: 100%;
      margin-top: 15px;

      button {
        margin-right: 15px;
      }
    }
  }
`;

const ContentBox = styled.div`
  width: 800px;
  margin: 0 auto;
  box-shadow: 0 0 12px rgba(0, 0, 0, 8%);
  padding: 50px;

  h2 {
    font-size: 20px;
    font-weight: 600;

    span {
      font-size: 20px;
      color: ${({ theme }) => theme.colors.black};
    }
  }

  span {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.gray03};
  }

  hr {
    margin: 20px 0;
    border: 0.3px solid ${({ theme }) => theme.colors.gray02};
  }

  div {
    margin: 50px 0;

    img {
      max-width: 700px;
      @media screen and ${({ theme }) => theme.breakPoint} {
        max-width: 300px;
      }
    }
  }

  * {
    margin-bottom: 10px;
  }

  @media screen and ${({ theme }) => theme.breakPoint} {
    width: 100%;
    padding: 40px;
  }
`;
