import styled from "styled-components";
import { useState } from "react";
import { LEVEL_LIST, AWS_URL } from "./constants";
import Button from "components/button/Button";
import {
  InfoBox,
  NickName,
  Email,
  Level,
  Coloring,
  ProfileImg,
  ImgContainer,
} from "./mypage.style";
import ProfileEditForm from "./ProfileEditForm";

const Profile = ({ email, nickname, experience, profileImgUrl }) => {
  const level = parseInt(parseInt(experience) / 10);
  const [isEditing, setIsEditing] = useState(false);
  console.log(profileImgUrl);

  const handleClick = () => {
    setIsEditing(true);
  };

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {isEditing ? (
        <ProfileEditForm
          nickname={nickname}
          email={email}
          level={level}
          setIsEditing={setIsEditing}
          profileImgUrl={profileImgUrl}
        />
      ) : (
        <ProfileBox>
          <ImgContainer>
            <ProfileImg src={AWS_URL + profileImgUrl} />
          </ImgContainer>

          <InfoBox>
            <NickName>{nickname}</NickName>
            <Email>{email}</Email>
            <Level>
              Lv. <Coloring>{LEVEL_LIST[level].level}</Coloring>
            </Level>
            <div>
              <Button onClick={handleClick}>회원정보 수정</Button>
            </div>
          </InfoBox>
        </ProfileBox>
      )}
    </>
  );
};

const ProfileBox = styled.div`
  height: 200px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  @media screen and ${({ theme }) => theme.breakPoint} {
    justify-content: space-evenly;
  }
`;

export default Profile;
