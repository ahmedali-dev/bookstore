const express = require('express');
const validation = require('./../../utilities/validation');
const adminBookCon = require('./../../controllers/admin/admin.books_controller');
const router = express.Router();

router.get('/', adminBookCon.getAllBooks)
router.get('/:id',
    [
        adminBookCon.validation.id,
    ],
    validation,
    adminBookCon.getBookById
);
router.get('/f/filter', adminBookCon.getBooksUsingFilter);
router.get('/search/:title', [adminBookCon.validation.title], validation, adminBookCon.getBookByTitle);
router.put('/book/:id',
    [
        adminBookCon.validation.id
    ],
    validation,
    adminBookCon.updateVisibleBook
)

module.exports = router;