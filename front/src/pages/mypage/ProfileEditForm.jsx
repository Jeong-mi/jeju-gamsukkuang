import { useState, useRef } from "react";
import {
  InfoBox,
  Email,
  Level,
  Coloring,
  ProfileImg,
  ImgContainer,
} from "./mypage.style";
import styled from "styled-components";
import Button from "components/button/Button";
import { LEVEL_LIST, AWS_URL } from "./constants";
import { useChangeNickname } from "queries/userQuery";
import theme from "../../styles/Theme";
import { RiEdit2Fill } from "react-icons/ri";
import { useMediaQuery } from "react-responsive";
import http from "libs/apiController";

const ProfileEditForm = ({
  nickname,
  email,
  level,
  setIsEditing,
  profileImgUrl,
}) => {
  const [editNickname, setEditNickname] = useState(nickname);
  const [editImgUrl, setEditImgUrl] = useState(profileImgUrl);
  const changeNickname = useChangeNickname();
  const data = { nickname: editNickname };
  const mediaQuery = useMediaQuery({ query: theme.breakPoint });
  const photoInput = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    changeNickname.mutate(data);
    setIsEditing(false);
    window.location.replace("/mypage");
  };

  const handleChangeImg = async (e) => {
    if (!e.target.files) return;

    const formData = new FormData();
    formData.append("imgFile", e.target.files[0]);
    try {
      const res = await http.put("user/profileImg", formData);
      setEditImgUrl(res.data.profileImgUrl);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ProfileBox>
      <FlexBox>
        <ImgContainer>
          <ProfileImg src={AWS_URL + editImgUrl} />
        </ImgContainer>
        <ImgUploadLabel>
          <RiEdit2Fill size="1.5rem" style={{ cursor: "pointer" }} />
          <input
            type="file"
            accept="image/*"
            ref={photoInput}
            onChange={handleChangeImg}
          />
        </ImgUploadLabel>
      </FlexBox>

      <InfoBox>
        <StyledInput
          name="nickname"
          type="text"
          value={editNickname}
          onChange={(e) => setEditNickname(e.target.value)}
        />
        <Email>{email}</Email>
        <Level>
          Lv. <Coloring>{LEVEL_LIST[level].level}</Coloring>
        </Level>
        {!mediaQuery ? (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button onClick={() => setIsEditing(false)}>취소</Button>
            <Button type="submit" onClick={handleSubmit}>
              완료
            </Button>
          </div>
        ) : (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button onClick={() => setIsEditing(false)}>취소</Button>
            <Button type="submit" onClick={handleSubmit}>
              완료
            </Button>
          </div>
        )}
      </InfoBox>
    </ProfileBox>
  );
};

export default ProfileEditForm;

const ProfileBox = styled.div`
  height: 200px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const StyledInput = styled.input`
  width: 150px;
  height: 35px;
  padding: 0 5%;
  letter-spacing: 0.5px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.gray02};
  outline: none;
  font-size: ${({ theme }) => theme.fontSizes.xxl};

  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.primary};
  }
`;

const FlexBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const ImgUploadLabel = styled.label`
  margin-left: auto;
  & > input {
    display: none;
  }
`;
