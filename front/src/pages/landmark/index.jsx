import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "components/button/Button";
import ReviewSection from "./ReviewSection";
import Loader from "components/loader";
import { useGetLandmark } from "queries/landmarkQuery";

const Landmark = () => {
  const params = useParams();
  const id = params.id;
  const { data, status } = useGetLandmark(id);
  const { image, krTitle, address, description, phoneno } =
    data?.landmark || {};
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/map/${data?.landmark?.id}`);
  };

  if (status === "loading") return <Loader />;
  return (
    <>
      <LandmarkContainer>
        <ImgContainer img={image} />
        <DetailContainer>
          <Header>
            <DetailTitle>{krTitle}</DetailTitle>
            <Button color="gray03" onClick={handleClick}>
              길찾기
            </Button>
          </Header>

          <DetailContent>
            <DetailTabRow>
              <DetailTabHead>
                <DetailHighlight>주소</DetailHighlight>
              </DetailTabHead>
              <DetailTabCell>
                <p>{address}</p>
              </DetailTabCell>
            </DetailTabRow>
            <DetailTabRow>
              <DetailTabHead>
                <DetailHighlight>소개</DetailHighlight>
              </DetailTabHead>
              <DetailTabCell>
                <p>{description}</p>
              </DetailTabCell>
            </DetailTabRow>
            <DetailTabRow>
              <DetailTabHead>
                <DetailHighlight>연락처</DetailHighlight>
              </DetailTabHead>
              <DetailTabCell>
                <p>{phoneno}</p>
              </DetailTabCell>
            </DetailTabRow>
          </DetailContent>
        </DetailContainer>
      </LandmarkContainer>
      <ReviewSection id={id} />
    </>
  );
};

const LandmarkContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-bottom: 10%;

  @media screen and ${({ theme }) => theme.breakPoint} {
    flex-direction: column;
    align-items: center;
  }
`;

const ImgContainer = styled.div`
  width: 50%;
  height: 400px;
  background-image: url(${(props) => props.img});
  background-size: cover;
  background-repeat: no-repeat;
  z-index: -1;

  @media screen and ${({ theme }) => theme.breakPoint} {
    width: 100%;
  }
`;

const DetailContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 5%;

  @media screen and ${({ theme }) => theme.breakPoint} {
    width: 100%;
  }
`;

const DetailTitle = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xxxl};
  font-weight: bold;

  @media screen and ${({ theme }) => theme.breakPoint} {
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
  }
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5%;

  @media screen and ${({ theme }) => theme.breakPoint} {
    flex-direction: column;
  }
`;

const DetailHighlight = styled.p`
  font-weight: bold;
`;

const DetailContent = styled.div`
  display: table;
  width: 100%;
  border-spacing: 10px;
`;

const DetailTabRow = styled.div`
  display: table-row;
`;

const DetailTabCell = styled.div`
  display: table-cell;
  width: 80%;
`;

const DetailTabHead = styled.div`
  display: table-cell;
  width: 20%;
`;

export default Landmark;
