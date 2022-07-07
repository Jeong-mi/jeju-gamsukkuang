import dotenv from "dotenv";
import AWS from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";
import moment from "moment";

dotenv.config();
// 프론트 단에서 axios에 header: {"content-type": "multipart/form-data"}
// 컨텐츠 타입을 명시해줘야 한다!
const s3 = new AWS.S3({
	accessKeyId: process.env.AWS_ACCESS_KEY,
	secretKey: process.env.AWS_SECRET_ACCESS_KEY,
	region: process.env.AWS_REGION,
});

const storage = (purpose) => {
	return multerS3({
		s3: s3,
		acl: "public-read",
		bucket: `${process.env.AWS_S3_BUCKET}/${purpose}`,
		contentType: multerS3.AUTO_CONTENT_TYPE,
		key: (req, file, cb) => {
			const ext = file.mimetype.split("/")[1];
			const dateTime = moment().format("YYYYMMDDHHmmss");
	
			if (!["png", "jpg", "jpeg", "gif", "bmp"].includes(ext)) {
				return cb(new Error("system.error.noImageFile"));
			}
	
			cb(
				null,
				`${dateTime}_${Math.floor(Math.random() * 10000).toString()}_${
					file.originalname
				}`
			);
		},
	});
};

const s3Single = (purpose) => {
	const limits = {
		fileSize: 5242880 * 2, //10MB
	};

	const upload = multer({
		storage: storage(purpose),
		limits,
	}).single("imgFile");

	return upload;
};

const s3Multi = (purpose) => {
	const limits = {
		fileSize: 5242880 * 4, //20MB
	};

	const upload = multer({
		storage: storage(purpose),
		limits,
	}).array("imgFile");

	return upload;
};

module.exports = { s3Single, s3Multi };
