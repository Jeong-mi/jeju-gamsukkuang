import { Router } from "express";
import { UserService } from "../services/UserService";
import { loginRequired, s3Single } from "../middlewares";

import * as Joi from "joi";
import { joiPassword } from "joi-password";
import { idValidator } from "../validators"

const userRouter = Router();

// 회원 정보 가져오기 기능
userRouter.get("/account/:id", async (req, res, next) => {
	try {
		// userId의 유효성을 체크
		const userId = await idValidator.validateAsync(req.params.id);

		const user = await UserService.findUser({ userId });

		res.status(200).json(user);
	} catch (err) {
		next(err);
	}
});

// 회원 등록 기능 (프로필 이미지는 기본 이미지로 설정됨)
userRouter.post("/account/register", async (req, res, next) => {
	try {
		// 입력한 데이터의 유효성을 체크
		const registerValidator = Joi.object({
			email: Joi.string().trim().empty().email({ minDomainSegments: 2 }).required(),
			password: joiPassword.string().noWhiteSpaces().min(8).required(),
			nickname: Joi.string().trim().empty().min(2).required(),
		})
		const { email, password, nickname } = await registerValidator.validateAsync(req.body);

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

// 회원 로그인 기능
userRouter.post("/account/login", async (req, res, next) => {
	try {
		// 입력한 데이터의 유효성을 체크
		const loginValidator = Joi.object({
			email: Joi.string().trim().empty().required(),
			password: Joi.string().trim().empty().min(8).required(),
		})
		const { email, password } = await loginValidator.validateAsync(req.body);

		const user = await UserService.loginUser({ email, password });

		res.status(200).send(user);
	} catch (err) {
		next(err);
	}
});

// 회원 탈퇴 기능
userRouter.delete("/user", loginRequired, async (req, res, next) => {
	try {
		const userId = req.currentUserId;

		const user = await UserService.withdrawUser({ userId });

		res.status(200).send(user);
	} catch (err) {
		next(err);
	}
});

//회원 수정 기능
userRouter.put("/user", loginRequired, async (req, res, next) => {
	try {
		const userId = req.currentUserId;

		// nickname만 수정할 수 있게 체크 (이메일, 비밀번호는 수정하면 안됨)
		const editValidator = Joi.object({
			nickname: Joi.string().trim().empty().min(2).required()
		}).length(1);
		const toUpdate = await editValidator.validateAsync(req.body)

		const updatedUser = await UserService.setUser({ userId, toUpdate });

		res.status(200).json(updatedUser);
	} catch (err) {
		next(err);
	}
});

// 회원 스탬프 추가 기능
userRouter.post("/user/stamp", loginRequired, async (req, res, next) => {
	try {
		const userId = req.currentUserId;

		// tourId의 유효성을 체크
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

// exp(경험치) 증가시키기
userRouter.post("/user/exp", loginRequired, async (req, res, next) => {
	try {
		const userId = req.currentUserId;

		// 증가할 point의 유효성을 체크
		const expValidator = Joi.number().min(-100).max(100).empty().required()
		const point = await expValidator.validateAsync(req.body.point);

		const upgradeUser = await UserService.addExp({ userId, point });

		res.status(201).json(upgradeUser);
	} catch (err) {
		next(err);
	}
});

// 프로필 이미지 변경
userRouter.put(
	"/user/profileImg",
	loginRequired,
	s3Single(),
	async (req, res, next) => {
		try {
			const userId = req.currentUserId;

			const { location } = req.file;

			const imageName = location.split("amazonaws.com/")[1];
			const toUpdate = { profileImgUrl: imageName };

			const updatedUser = await UserService.setProfileImg({ userId, toUpdate });

			res.status(201).json(updatedUser);
		} catch (err) {
			next(err);
		}
	}
);

export { userRouter };
