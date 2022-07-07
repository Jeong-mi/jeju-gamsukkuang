import { Router } from "express";
import * as Joi from "joi";
import axios from "axios";
import exifr from "exifr";

import { TourService } from "../services/tourService";
import { loginRequired, s3Single } from "../middlewares/";
import { idValidator } from "../validators"; // id가 혹시 비어있는지 또는 누락됐는지를 검사

const tourRouter = Router();

// 전체 랜드마크 정보 가져오기
tourRouter.get("/tour", async (req, res, next) => {
  try {
    const allLandmarks = await TourService.getAllLandmarks({});

    res.status(200).send(allLandmarks);
  } catch (err) {
    next(err);
  }
});

// 텍스트로 검색한 랜드마크 정보 불러오기
tourRouter.get("/tour/search", async (req, res, next) => {
  try {
    // atlas search index 사용해서 한국어 검색 시 최소 2글자를 입력해야 함
    const queryValidator = Joi.string().trim().empty().min(2).required();
    await queryValidator.validateAsync(req.query.name);

    const { name } = req.query;
    const searchLandmark = await TourService.searchLandmark({ name });

    res.status(200).send(searchLandmark);
  } catch (err) {
    next(err);
  }
});

// 이미지로 검색한 랜드마크 정보 불러오기 (ai의 flask 서버와 연동)
tourRouter.post("/tour/image", s3Single("searchNauth"), async (req, res, next) => {
  try {
    const fileValidator = Joi.any().empty().required();
    await fileValidator.validateAsync(req.file);
    const { location, originalname } = req.file;

    // ai로 보내는 이미지 확장자가 jpg(JPG) 또는 jpeg(JPEG)가 아니라면 에러 띄우기
    const checkExtension = /(.jpg$|.JPG$|.jpeg$|.JPEG$)/gi;
    if (!checkExtension.test(originalname)) {
      throw new Error("extension only must be JPG, JPEG");
    }

    // exifr파일명에 영어, 숫자, 허용된 특수문자가 아닌 단어가 들어간다면 에러 띄우기
    const checkName = /^[A-Za-z0-9~.\-_]*$/;
    if (!checkName.test(originalname)) {
      throw new Error("Unknown file format");
    }

    let { latitude, longitude } = (await exifr.gps(location)) ?? {
      latitude: 0,
      longitude: 0,
    };
    if (latitude && longitude) {
      latitude = Number(latitude.toFixed(2));
      longitude = Number(longitude.toFixed(2));
    }

    const sendImage = await axios.post(
      "http://kdt-ai4-team08.elicecoding.com:5003/prediction",
      {
        imageURL: location, // s3에 저장된 이미지 url을 ai로 보내기
      },
      {
        headers: {
          "content-type": "application/json",
        },
      },
    );
    const { data } = sendImage;
    const result = {
      latitude,
      longitude,
      data,
    };

    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
});

// 랜드마크 ID로 특정 랜드마크 정보 가져오기
tourRouter.get("/tour/:id", async (req, res, next) => {
  try {
    const id = await idValidator.validateAsync(req.params.id);
    const landmark = await TourService.getLandmark({ id });

    res.status(200).send(landmark);
  } catch (err) {
    next(err);
  }
});

// 랜드마크에 좋아요 추가하기
tourRouter.put("/tour/:id/like", loginRequired, async (req, res, next) => {
  try {
    const userId = req.currentUserId;

    const id = await idValidator.validateAsync(req.params.id);
    const addLiketoLandmark = await TourService.addLike({
      id,
      currentUserId: userId,
    });

    res.status(200).json(addLiketoLandmark);
  } catch (err) {
    next(err);
  }
});

// 랜드마크에 좋아요 삭제하기
tourRouter.put("/tour/:id/dislike", loginRequired, async (req, res, next) => {
  try {
    const userId = req.currentUserId;

    const id = await idValidator.validateAsync(req.params.id);
    const removeLikefromLandmark = await TourService.removeLike({
      id,
      currentUserId: userId,
    });

    res.status(200).json(removeLikefromLandmark);
  } catch (err) {
    next(err);
  }
});

// 압력한 정렬 기준(criteria)대로 랜드마크 정렬하기
// like: 좋아요순, review: 리뷰수 순, rating: 평점 평균 순
tourRouter.get("/recommend/:criteria", async (req, res, next) => {
  try {
    const paramsValidator = Joi.string()
      .valid("like", "review", "rating")
      .trim()
      .empty()
      .required();
    const criteria = await paramsValidator.validateAsync(req.params.criteria);

    const sortedLandmarks = await TourService.sortBy({ criteria });

    res.status(200).json(sortedLandmarks);
  } catch (err) {
    next(err);
  }
});

export { tourRouter };
