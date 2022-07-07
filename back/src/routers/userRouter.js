import { Router } from "express";
import * as Joi from "joi";
import { joiPassword } from "joi-password";

import { UserService } from "../services/userService";
import { loginRequired, s3Single } from "../middlewares";
import { idValidator } from "../validators"; // id가 혹시 비어있는지 또는 누락됐는지를 검사

const userRouter = Router();

// 새 회원 등록하기 (프로필 이미지는 기본 이미지로 설정됨)
userRouter.post("/account/register", async (req, res, next) => {
  try {
    const registerValidator = Joi.object({
      email: Joi.string()
        .trim()
        .empty()
        .email({ minDomainSegments: 2 })
        .required(),
      password: joiPassword.string().noWhiteSpaces().min(8).required(), // 특수문자, 숫자, 알파벳 허용
      nickname: Joi.string().trim().empty().min(2).required(),
    });

    const { email, password, nickname } = await registerValidator.validateAsync(
      req.body,
    );

    const newUser = await UserService.addUser({
      email,
      password,
      nickname,
    });

    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
});

// 회원 로그인하기
userRouter.post("/account/login", async (req, res, next) => {
  try {
    const loginValidator = Joi.object({
      email: Joi.string().trim().empty().required(),
      password: joiPassword.string().noWhiteSpaces().min(8).required(), // 특수문자, 숫자, 알파벳 허용
    });

    const { email, password } = await loginValidator.validateAsync(req.body);

    const user = await UserService.loginUser({ email, password });

    res.status(200).send(user);
  } catch (err) {
    next(err);
  }
});

// 회원 정보 가져오기
userRouter.get("/user", loginRequired, async (req, res, next) => {
  try {
    const userId = await idValidator.validateAsync(req.currentUserId);

    const user = await UserService.findUser({ userId });

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
});

//회원 수정하기
userRouter.put("/user", loginRequired, async (req, res, next) => {
  try {
    const userId = req.currentUserId;

    // nickname만 수정할 수 있게 검사 (이메일, 비밀번호는 수정하면 안됨)
    const editValidator = Joi.object({
      nickname: Joi.string().trim().empty().min(2).required(),
    }).length(1);

    const toUpdate = await editValidator.validateAsync(req.body);

    const updatedUser = await UserService.setUser({ userId, toUpdate });

    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
});

// 회원 탈퇴하기
userRouter.delete("/user", loginRequired, async (req, res, next) => {
  try {
    const userId = req.currentUserId;

    const user = await UserService.withdrawUser({ userId });

    res.status(200).send(user);
  } catch (err) {
    next(err);
  }
});

// 프로필 이미지 변경하기
userRouter.put(
  "/user/profileImg",
  loginRequired,
  s3Single("profile"),
  async (req, res, next) => {
    try {
      const userId = req.currentUserId;

      const fileValidator = Joi.any().empty().required();
      await fileValidator.validateAsync(req.file);

      const { location } = req.file;

      const imageName = location.split("amazonaws.com/")[1];
      const toUpdate = { profileImgUrl: imageName };

      const updatedUser = await UserService.setProfileImg({ userId, toUpdate });

      res.status(201).json(updatedUser);
    } catch (err) {
      next(err);
    }
  },
);

// 인증한 랜드마크를 회원 스탬프에 추가하기
userRouter.post("/user/stamp", loginRequired, async (req, res, next) => {
  try {
    const userId = req.currentUserId;

    const tourId = await idValidator.validateAsync(req.body.tourId);

    const tourIntoStamp = await UserService.addStamp({
      userId,
      tourId,
    });

    res.status(201).json(tourIntoStamp);
  } catch (err) {
    next(err);
  }
});

// 회원의 exp(경험치) 증가시키기
userRouter.post("/user/exp", loginRequired, async (req, res, next) => {
  try {
    const userId = req.currentUserId;

    const expValidator = Joi.number().min(-100).max(100).empty().required(); // 한번에 증가시킬 포인트의 허용 범위
    const point = await expValidator.validateAsync(req.body.point);

    const upgradeUser = await UserService.addExp({ userId, point });

    res.status(201).json(upgradeUser);
  } catch (err) {
    next(err);
  }
});

export { userRouter };
