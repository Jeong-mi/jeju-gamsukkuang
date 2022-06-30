import styled from "styled-components";

const StampImgLv1 = styled.img`
  position: absolute;
  width: 10%;
  top: 70%;
  left: 25%;
`;

const StampImgLv2 = styled.img`
  position: absolute;
  width: 12%;
  top: 45%;
  left: 20%;
  display: ${(props) => (props.level >= 1 ? "block" : "none")};
`;

const StampImgLv3 = styled.img`
  position: absolute;
  width: 13%;
  top: 10%;
  left: 30%;
  display: ${(props) => (props.level >= 2 ? "block" : "none")};
`;

const StampImgLv4 = styled.img`
  position: absolute;
  width: 13%;
  top: 0%;
  left: 50%;
  display: ${(props) => (props.level >= 3 ? "block" : "none")};
`;

const StampImgLv5 = styled.img`
  position: absolute;
  width: 13%;
  top: 15%;
  right: 20%;
  display: ${(props) => (props.level >= 4 ? "block" : "none")};
`;

const StampImgLv6 = styled.img`
  position: absolute;
  width: 12%;
  top: 45%;
  right: 20%;
  display: ${(props) => (props.level >= 5 ? "block" : "none")};
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 2rem;
  justify-content: space-evenly;
`;

const NickName = styled.div`
  font-weight: bold;
  font-size: ${({ theme }) => theme.fontSizes.xxl};
`;
const Email = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xl};
`;
const Level = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: bold;
`;

const Coloring = styled.span`
  color: ${({ theme }) => theme.colors.orange};
`;

export {
  StampImgLv1,
  StampImgLv2,
  StampImgLv3,
  StampImgLv4,
  StampImgLv5,
  StampImgLv6,
  InfoBox,
  NickName,
  Email,
  Level,
  Coloring,
};
