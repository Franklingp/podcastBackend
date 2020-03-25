// 'use strict'

// //Middleware to manage the files

// const multer = require('multer');
// const path = require('path');


// const storage = multer.diskStorage({
// 	destination: path.join(__dirname, '../uploads/audio'),
// 	filename: (req, file, cb) => {
// 		console.log(file);
// 		cb(null, file.originalpath);
// 	}
// });



// function multerMiddleware(req, res, next){

// 	let storage = multer.diskStorage({
// 		destination: path.join(__dirname, '../uploads/audio'),
// 		filename: (req, file, cb) => {
// 			console.log(file);
// 			cb(null, file.originalpath);
// 		}
// 	});

// 	multer({
// 		storage: storage,
// 		dest: path.join(__dirname, '../uploads/audio'),
// 		fileFilter: (req, file, cb) => {
// 			const filetype = /mp3/;
// 			const mimetype = filetype.test(file.mimetype);
// 			const ext = filetype.test(path.extname(file.originalname));
// 			if( mimetype && ext){
// 				return cb(null, true);
// 			}else{
// 				return cb("Debe se subir un formato de imagen valido (jpg, png, jpeg o gif)");
// 			}
// 		}
// 	}).single('audio');
// 	next();
// };



// function multerMiddleware(req, res, next){
// 	let storage = multer.diskStorage({
// 		destination: (req, file, cb) => {
// 			cb(null, path.join(__dirname, '../uploads/audio'));
// 		},
// 		filename: (req, file, cb) => {
// 			cb(null, file.fieldname);
// 		}
// 	});

// 	const upload = multer({ storage: storage });
// 	return 
// 	next();
// }

// module.exports = multerMiddleware;