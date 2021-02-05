const aws = require('aws-sdk')
const multer = require('multer');
const multerS3 =require('multer-s3')


aws.config.update({
    secretAccessKey: '8SyWhn6b4iYDY5ddvjW1dBWkEP8IMOZMT7Y8m3Ev',
    accessKeyId: 'AKIAJAHOB4Y6QHFY3DMQ'
})


const s3 = new aws.S3()

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'amanzone-clone-v1',
        acl: 'public-read',
        metadata: (req, file, cb) => {
            cb(null, { fieldName: file.fieldname });
        },
        key: (req, file, cb) => {
            cb(null, Date.now().toString())
        }
    })
})

module.exports = upload
