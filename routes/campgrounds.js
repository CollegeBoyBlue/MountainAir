const express = require('express');
const router = express.Router();
const catchAsync = require('../utilities/catchAsync');
const { isLoggedIn, isAuthor, campgroundValidation} = require('../middleware');
const campgrounds = require('../controllers/campgrounds');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });


router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn, upload.array('image'), campgroundValidation, catchAsync(campgrounds.printNewCamp))

router.get('/new', isLoggedIn, campgrounds.newCampForm);

router.route('/:id')
    .get(catchAsync(campgrounds.showCamp))
    .put(isLoggedIn, isAuthor, upload.array('image'), campgroundValidation, catchAsync(campgrounds.pageEditSubmit))
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCamp));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.pageEdit));

module.exports = router;