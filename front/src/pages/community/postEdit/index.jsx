import React, { useMemo, useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import ReactQuill from "react-quill";

import http from "libs/apiController";
import HeadDropdown from "../post/headDropdown";
import { useGetPost } from "queries/communityQuery";

import styled from "styled-components";
import "react-quill/dist/quill.snow.css";
import theme from "../../../styles/Theme";

const PostEdit = () => {
  const mediaQuery = useMediaQuery({ query: theme.breakPoint });
  const params = useParams();
  const postId = params.id;
  const postItem = useGetPost(postId).data;

  console.log(postItem);

  const imageRef = useRef();
  const quillRef = useRef();

  const [reRender, setReRender] = useState(false);
  const [, setPrevPost] = useState({
    title: "",
    content: "",
    head: "",
  });

  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [isSelected, setInSelected] = useState(postItem.head);

  const headFunction = (itemValue) => {
    setInSelected(itemValue);
  };

  const onChangeTitle = (e) => {
    const item = e.target.value;
    setTitle(item);
  };

  const onChangeContents = (postContents) => {
    setContents(postContents);
  };

  const imageHandler = () => {
    imageRef.current.click();
  };

  const onChangeImageInput = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("imgFile", e.target.files[0]);

    try {
      const res = await http.post("community/image", formData);
      const IMG_URL = res.data[0];
      const editor = quillRef.current.getEditor();
      editor.root.innerHTML =
        editor.root.innerHTML + `<img src=${IMG_URL} /><br/>`;
    } catch (error) {
      console.log("이미지 업로드 실패");
    }
  };

  useEffect(() => {
    let prevContents = {
      title: postItem.title,
      content: postItem.content,
      head: postItem.head,
    };

    setPrevPost(prevContents);
    setContents(postItem.content);
    setTitle(postItem.title);
    setReRender(true);
  }, [postItem, reRender]);

  const onUpdate = async () => {
    let updateBoard = {
      title: title,
      content: contents,
      head: isSelected,
    };

    try {
      const res = await http.put(`/community/${postId}`, updateBoard);
      console.log("게시글 수정 성공", res.data);
      window.location.replace(`/community/${postId}`);
    } catch (error) {
      console.log("이미지 업로드 실패");
    }
  };

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline", "strike"],
          [{ color: [] }, { background: [] }, { align: [] }],
          ["link", "image"],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    };
  }, []);

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "align",
    "background",
    "link",
    "image",
  ];

  return (
    <PostBox>
      {!mediaQuery ? (
        <h2>✏️ 게시글 수정</h2>
      ) : (
        <section>
          <h2>✏️ 게시글 수정</h2>
        </section>
      )}
      <FlexBox>
        <HeadDropdown headFunction={headFunction} />
        <TitleBox>
          <input
            type="text"
            placeholder="게시글 제목을 입력해주세요"
            onChange={onChangeTitle}
            value={title}
          />
        </TitleBox>
      </FlexBox>
      <EditorBox>
        <ReactQuill
          ref={quillRef}
          name="postContents"
          defaultValue={postItem.content}
          onChange={onChangeContents}
          placeholder="내용을 입력해주세요"
          theme="snow"
          modules={modules}
          formats={formats}
        />
        <input
          hidden
          type="file"
          ref={imageRef}
          onChange={onChangeImageInput}
        />
      </EditorBox>
      <ButtonBox>
        <button type="button" onClick={onUpdate}>
          게시글 등록
        </button>
      </ButtonBox>
    </PostBox>
  );
};

export default PostEdit;

const PostBox = styled.div`
  width: 700px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;

  h2 {
    margin-top: 50px;
    font-size: 20px;
    font-weight: 600;
    justify-content: flex-start;
  }

  @media screen and ${({ theme }) => theme.breakPoint} {
    width: 100%;
    align-items: center;

    > section {
      display: flex;
      justify-content: flex-start;
      width: 90%;
    }
  }
`;

const FlexBox = styled.div`
  width: 700px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 30px 0;

  @media screen and ${({ theme }) => theme.breakPoint} {
    width: 100%;
    align-items: center;
    justify-content: space-around;
    padding-left: 2%;
  }
`;

const TitleBox = styled.div`
  input {
    width: 510px;
    padding: 11px 20px;
    border: 1px solid ${({ theme }) => theme.colors.gray02};
    border-radius: 5px;
  }

  @media screen and ${({ theme }) => theme.breakPoint} {
    display: flex;
    justify-content: center;
    width: 100%;
    input {
      width: 80%;
    }
  }
`;

const EditorBox = styled.div`
  width: 700px;

  .ql-editor {
    height: 400px;
  }

  @media screen and ${({ theme }) => theme.breakPoint} {
    width: 95%;

    .ql-editor {
      height: 500px;
    }
  }
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  width: 700px;
  margin: 0 auto;

  button {
    padding: 10px 20px;
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
    border: none;
    border-radius: 10px;
    cursor: pointer;
    margin: 30px 0;
  }

  @media screen and ${({ theme }) => theme.breakPoint} {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    button {
      margin: 30px 10px;
    }
  }
`;
