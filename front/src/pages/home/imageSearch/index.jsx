import { useCallback } from "react";
import { useRef } from "react";

import http from "libs/apiController";

import { ImageUploadBox } from "./imageSearch.style";

const ImageSearch = () => {
  const photoInput = useRef(null);

  const handleClick = useCallback(() => {
    if (!photoInput.current) return;

    photoInput.current.click();
  }, []);

  const handleUploadImage = useCallback((e) => {
    if (!e.target.files) return;

    const formData = new FormData();
    formData.append("imgFile", e.target.files[0]);

    try {
      http.post("tour/image", formData);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <ImageUploadBox onClick={handleClick}>
      📷 이미지로 검색하기
      <input
        type="file"
        accept="image/*"
        ref={photoInput}
        onChange={handleUploadImage}
      />
    </ImageUploadBox>
  );
};

export default ImageSearch;
