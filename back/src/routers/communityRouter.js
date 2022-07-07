import Joi from "joi";
import { Router } from "express";

import { CommunityService } from "../services/communityService";
import { loginRequired } from "../middlewares/";
import { s3Multi } from "../middlewares/multerS3";

const communityRouter = Router();

// 게시글 작성
communityRouter.post("/community", loginRequired, async (req, res, next) => {
  try {
    const bodySchema = Joi.object().keys({
      title: Joi.string().trim().empty().required(),
      content: Joi.string().trim().empty().required(),
      head: Joi.string()
        .trim()
        .empty()
        .valid("free", "info", "question")
        .required(),
    });
    const idSchema = Joi.string().empty().required();

    await idSchema.validateAsync(req.currentUserId);
    await bodySchema.validateAsync(req.body);

    const loginUserId = req.currentUserId;
    const { title, content, head } = req.body;

    const newArticle = await CommunityService.addArticle({
      loginUserId,
      title,
      content,
      head,
    });

    res.status(201).json(newArticle);
  } catch (err) {
    next(err);
  }
});

// 게시글 이미지 파일 올리기
communityRouter.post(
  "/community/image",
  loginRequired,
  s3Multi("community"),
  async (req, res, next) => {
    try {
      const fileSchema = Joi.any().empty().required();
      const idSchema = Joi.string().empty().required();

      await idSchema.validateAsync(req.currentUserId);
      await fileSchema.validateAsync(req.files);

      // 이미지의 전체 url이 아닌 이미지의 이름만 가져온다.
      const images = req.files.map((image) => image.location);

      res.status(201).json(images);
    } catch (err) {
      next(err);
    }
  },
);

// 게시글 수정
communityRouter.put(
  "/community/:id",
  loginRequired,
  s3Multi("community"),
  async (req, res, next) => {
    try {
      const bodySchema = Joi.object().keys({
        title: Joi.string().trim().empty().required(),
        content: Joi.string().trim().empty().required(),
        head: Joi.string()
          .trim()
          .empty()
          .valid("free", "info", "question")
          .required(),
      });
      const idSchema = Joi.string().empty().required();

      await idSchema.validateAsync(req.currentUserId);
      await bodySchema.validateAsync(req.body);

      const loginUserId = req.currentUserId;
      const { id: articleId } = req.params;
      const { title, content, head } = req.body;

      let toUpdate = { title, content, head };

      const editedArticle = await CommunityService.setArticle({
        loginUserId,
        articleId,
        toUpdate,
      });

      res.status(201).json(editedArticle);
    } catch (err) {
      next(err);
    }
  },
);

// 특정 게시글 정보 가져오기
communityRouter.get("/community/:id", loginRequired, async (req, res, next) => {
  try {
    const paramSchema = Joi.object().keys({
      id: Joi.string().trim().empty().required(),
    });

    await paramSchema.validateAsync(req.params);

    const { id: articleId } = req.params;
    const article = await CommunityService.getArticle({ articleId });

    res.status(200).json(article);
  } catch (err) {
    next(err);
  }
});

// 전체 혹은 모든 말머리 게시글 정보 불러오기
// total: 전체 혹은 모든 말머리 게시글 갯수
// totalPage: 전체 혹은 모든 말머리 페이지 갯수
// articles: 실제 게시글 정보
communityRouter.get("/community", async (req, res, next) => {
  try {
    const querySchema = Joi.object().keys({
      page: Joi.number().integer().min(1),
      limit: Joi.number().integer().min(1),
      // 말머리가 공란일 경우, 전체 게시글을 불러온다.
      head: Joi.string().trim().empty().valid("", "free", "info", "question"),
    });

    await querySchema.validateAsync(req.query);

    const page = +req.query.page || 1;
    const limit = +req.query.limit || 10;
    const head = req.query.head;

    const getArticles = {
      page,
      limit,
      head,
    };

    const articles = await CommunityService.getArticles({ getArticles });

    res.status(200).send(articles);
  } catch (err) {
    next(err);
  }
});

// 게시글 삭제
communityRouter.delete(
  "/community/:id",
  loginRequired,
  async (req, res, next) => {
    try {
      const paramSchema = Joi.object().keys({
        id: Joi.string().trim().empty().required(),
      });
      const idSchema = Joi.string().empty().required();

      await idSchema.validateAsync(req.currentUserId);
      await paramSchema.validateAsync(req.params);

      const loginUserId = req.currentUserId;
      const { id: articleId } = req.params;

      const deletedArticle = await CommunityService.deleteArticle({
        articleId,
        loginUserId,
      });

      res.status(200).send(deletedArticle);
    } catch (err) {
      next(err);
    }
  },
);

// 해당 게시글에 좋아요 추가
communityRouter.put(
  "/community/:id/like",
  loginRequired,
  async (req, res, next) => {
    try {
      const paramSchema = Joi.object().keys({
        id: Joi.string().trim().empty().required(),
      });
      const idSchema = Joi.string().empty().required();

      await idSchema.validateAsync(req.currentUserId);
      await paramSchema.validateAsync(req.params);

      const userId = req.currentUserId;
      const { id: articleId } = req.params;

      const addLiketoArticle = await CommunityService.addLike({
        articleId,
        currentUserId: userId,
      });

      res.status(200).json(addLiketoArticle);
    } catch (err) {
      next(err);
    }
  },
);

// 해당 게시글에 좋아요 삭제
communityRouter.put(
  "/community/:id/dislike",
  loginRequired,
  async (req, res, next) => {
    try {
      const paramSchema = Joi.object().keys({
        id: Joi.string().trim().empty().required(),
      });
      const idSchema = Joi.string().empty().required();

      await idSchema.validateAsync(req.currentUserId);
      await paramSchema.validateAsync(req.params);

      const userId = req.currentUserId;
      const { id: articleId } = req.params;

      const removeLikefromArticle = await CommunityService.removeLike({
        articleId,
        currentUserId: userId,
      });

      res.status(200).json(removeLikefromArticle);
    } catch (err) {
      next(err);
    }
  },
);

export { communityRouter };
