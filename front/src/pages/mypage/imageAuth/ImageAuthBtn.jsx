import { ImgInputButton, InfoBox } from "./imageAuth.style";
import { InfoIcon } from "assets/svgs";

const ImageAuthBtn = ({ photoInput, handleUploadImage }) => {
  return (
    <>
      <ImgInputButton>
        📷 랜드마크 인증하고 스탬프 찍기!
        <input
          type="file"
          accept="image/*"
          ref={photoInput}
          onChange={handleUploadImage}
        />
      </ImgInputButton>
      <InfoBox>
        <p>
          <InfoIcon width={10} height={10} />
          이미지 검색 이용안내
        </p>
        <ul>
          <li>이미지 검색 기능은 jpg & jpeg 파일만 지원됩니다.</li>
          <li>
            파일명은 한글을 지원하지 않으며, 특수문자의 경우 ~ . - _ 만
            가능합니다.
          </li>
          <li>
            건물일 경우 전체가 다 보이게, 테마공원의 경우 입구를 찍어주세요
          </li>
        </ul>
      </InfoBox>
    </>
  );
};

export default ImageAuthBtn;
