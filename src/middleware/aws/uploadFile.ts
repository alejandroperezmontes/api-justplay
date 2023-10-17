import multer from 'multer';
import multerS3 from 'multer-s3';
import { S3Client } from '@aws-sdk/client-s3';

import configuration from '../../config';

const s3Config = new S3Client({
  region: configuration.AWS_REGION,
  credentials: {
    accessKeyId: configuration.AWS_ACCESS_KEY_ID,
    secretAccessKey: configuration.AWS_SECRET_ACCESS_KEY
  }
});

const uploadFile = multer({
  storage: multerS3({
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

export default uploadFile;
