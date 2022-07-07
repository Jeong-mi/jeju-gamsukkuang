import Joi from "joi";
import { Router } from "express";

import { loginRequired } from "../middlewares/";
import { ReviewService } from "../services/reviewService.js";
import { s3Multi } from "../middlewares/multerS3";

const reviewRouter = Router();

// 리뷰 작성
reviewRouter.post(
  "/review",
  loginRequired,
  s3Multi("review"),
  async (req, res, next) => {
    try {
      const bodySchema = Joi.object().keys({
        tourId: Joi.string().trim().empty().required(),
        content: Joi.string().trim().empty().required(),
        rating: Joi.number().integer().min(1).max(5).required(),
      });
      const idSchema = Joi.string().empty().required();

      await bodySchema.validateAsync(req.body);
      await idSchema.validateAsync(req.currentUserId);

      const loginUserId = req.currentUserId;
      const { tourId, content, rating } = req.body;

      const newReview = await ReviewService.addReview({
        loginUserId,
        tourId,
        content,
        rating,
      });

      res.status(201).json(newReview);
    } catch (err) {
      next(err);
    }
  },
);

// 해당 랜드마크의 전체 리뷰 목록 가져오기
// total: 전체 리뷰 갯수
// totalPage: 전체 페이지 갯수
// reviews: 실제 리뷰 정보
reviewRouter.get("/review/:tourId/list", async (req, res, next) => {
  try {
    const paramSchema = Joi.object().keys({
      tourId: Joi.string().trim().empty().required(),
    });

    const querySchema = Joi.object().keys({
      page: Joi.number().integer().min(1),
      limit: Joi.number().integer().min(1),
    });

    await paramSchema.validateAsync(req.params);
    await querySchema.validateAsync(req.query);

    const page = +req.query.page || 1;
    const limit = +req.query.limit || 10;
    const { tourId } = req.params;

    const getReviews = {
      tourId,
      page,
      limit,
    };

    const reviews = await ReviewService.getReviews({ getReviews });

    res.status(200).json(reviews);
  } catch (err) {
    next(err);
  }
});

// 해당 랜드마크 리뷰 요약 정보 가져오기
// totalReview : 전체 리뷰 갯수
// avgRating : 평점 평균
// starRating : 각 평점 별 리뷰 갯수
reviewRouter.get("/review/:tourId/info", async (req, res, next) => {
  try {
    const paramSchema = Joi.object().keys({
      tourId: Joi.string().trim().empty().required(),
    });

    await paramSchema.validateAsync(req.params);

    const { tourId } = req.params;
    const reviewInfo = await ReviewService.getReviewInfo({ tourId });

    res.status(200).json(reviewInfo);
  } catch (err) {
    next(err);
  }
});

// 리뷰 수정
reviewRouter.put(
  "/review/:id",
  loginRequired,
  s3Multi("review"),
  async (req, res, next) => {
    try {
      const paramSchema = Joi.object().keys({
        id: Joi.string().trim().empty().required(),
      });
      const bodySchema = Joi.object().keys({
        content: Joi.string().trim().empty().required(),
        rating: Joi.number().integer().min(1).max(5).required(),
      });
      const idSchema = Joi.string().empty().required();

      await idSchema.validateAsync(req.currentUserId);
      await paramSchema.validateAsync(req.params);
      await bodySchema.validateAsync(req.body);

      const loginUserId = req.currentUserId;
      const { id: reviewId } = req.params;

      let toUpdate = req.body;

      const editedReview = await ReviewService.setReview({
        loginUserId,
        reviewId,
        toUpdate,
      });

      res.status(201).json(editedReview);
    } catch (err) {
      next(err);
    }
  },
);

// 리뷰 삭제
reviewRouter.delete("/review/:id", loginRequired, async (req, res, next) => {
  try {
    const paramSchema = Joi.object().keys({
      id: Joi.string().trim().empty().required(),
    });
    const idSchema = Joi.string().empty().required();

    await idSchema.validateAsync(req.currentUserId);
    await paramSchema.validateAsync(req.params);

    const loginUserId = req.currentUserId;
    const { id: reviewId } = req.params;

    const deleteResult = await ReviewService.deleteReview({
      loginUserId,
      reviewId,
    });

    res.status(200).send(deleteResult);
  } catch (err) {
    next(err);
  }
});

export { reviewRouter };
