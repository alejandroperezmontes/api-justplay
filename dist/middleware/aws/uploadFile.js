"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const multer_s3_1 = __importDefault(require("multer-s3"));
const client_s3_1 = require("@aws-sdk/client-s3");
const config_1 = __importDefault(require("../../config"));
const s3Config = new client_s3_1.S3Client({
    region: config_1.default.AWS_REGION,
    credentials: {
        accessKeyId: config_1.default.AWS_ACCESS_KEY_ID,
        secretAccessKey: config_1.default.AWS_SECRET_ACCESS_KEY
    }
});
const uploadFile = (0, multer_1.default)({
    storage: (0, multer_s3_1.default)({
        s3: s3Config,
        bucket: 'just-play-images',
        metadata(req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key(req, file, cb) {
            cb(null, `${Date.now().toString()}-${file.originalname}`);
        },
        acl: 'public-read'
    })
});
exports.default = uploadFile;
