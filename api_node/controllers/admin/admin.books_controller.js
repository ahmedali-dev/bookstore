const booksdb = require('../../db/books');
const {body, param} = require('express-validator');
const {ApiError} = require("../../utilities/ApiError");

class AdminBooks_controller {
    constructor() {
    }

    validation = {
        id: param('id').isString().notEmpty().withMessage("orderId is required"),
        title: param('title').isString().notEmpty().withMessage("title is required"),
    }

    async getAllBooks(req, res, next) {
        const {page = 1, pageSize = 20} = req.query;

        try {
            const result = await booksdb.getAllBooks(page, pageSize);
            return res.status(200).json(result);
        } catch (e) {
            console.log('admin_books_controller ~ getAllBooks error:', e);
            return next(ApiError.customError(500, 'something went wrong'));
        }
    }

    async getBooksUsingFilter(req,res,next) {
        const {start = 0, end=0} = req.query;
        try{
            if(!start || !end) {
                return  next(ApiError.customError(500, 'set start and end before filer'))                                                                                        
            }
            const where = "where b.created >= ? and b.created <= ?";
            const result = await booksdb.getAllBooks(1,100, where, [start,end])
            res.status(200).json(result);
        }catch(e) {
            console.log("getBookUsinFilter ~ =>", e);
            return next(ApiError.customError(500, 'something went wrong'));
        }
    }

    async getBookByTitle(req, res, next) {
        const {title} = req.params;
        try {
            const result = await booksdb.getBookByTitle(title);
            return res.status(200).json(result);
        } catch (e) {
            console.log('admin_books_controller ~ getBookByTitleError:', e);
            next(ApiError.customError(500, 'something went wrong'));
        }
    }

    async updateVisibleBook(req, res, next) {
        const {id} = req.params;
        try {
            const result = await booksdb.updateVisibleBook(id);
            return res.status(200).json(result);
        } catch (e) {
            console.log('admin_books_controller ~ updateVisibleBook error:', e);
            return next(ApiError.customError(500, 'Something went wrong'));
        }
    }

    async getBookById(req, res, next) {
        const {id} = req.params;

        try {
            const getBookFromDb = await booksdb.getBookById('where b.id=?', [id]);
            if (!getBookFromDb) {
                return next(ApiError.customError(404, 'Book not found'));
            }

            return res.status(200).json(getBookFromDb);
        } catch (e) {
            console.log('admin_books_controller ~ getBookByIdError:', e);
            return next(ApiError.customError(500, 'Something went wrong'));
        }
    }
}

// AdminBooks_controller.prototype.validate = function(req, res, next) {}
module.exports = new AdminBooks_controller();