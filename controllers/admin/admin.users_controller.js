const userdb = require('./../../db/users');
const {ApiError} = require("../../utilities/ApiError");
const {body, param} = require("express-validator");

class AdminUsers_controller {
    constructor() {
    }

    validation = {
        userId: param('userId').isString().notEmpty().withMessage("userId is required"),
        search: param('search').isString().notEmpty().withMessage("search is required"),
    }

    async getUsers(req, res, next) {

        try {
            const result = await userdb.getAllUser();
            return res.status(200).json(result);
        } catch (e) {
            return next(ApiError.customError(500, e.message))
        }
    }


    async getUserById(req, res, next) {
        const {userId} = req.params;
        try {
            const result = await userdb.getUserById(userId, '*')
            return res.status(200).json(result);
        } catch (e) {
            return next(ApiError.userNotFound())
        }
    }

    async SearchInUsers(req, res, next) {
        const {search} = req.params;
        try {
            const result = await userdb.getUserByNameOrEmail({search});
            return res.status(200).json(result);
        } catch (e) {
            console.log('admin_books_controller ~ searchInUsers error:', e);
            return next(ApiError.customError(500, 'Something went wrong'));
        }
    }

    async updateUser(req, res, next) {
        const {userId} = req.params;
        try {
            const [user] = await userdb.getUserById(userId, 'id, suspended');

            if (!user) return next(ApiError.userNotFound());
            const updateData = {
                suspended: user.suspended ? 0 : 1
            }

            const result = await userdb.updateUser(userId, updateData);
            res.status(200).json(result);
        } catch (e) {
            return next(ApiError.customError(500, 'Failed to update user'));
        }
    }
}

module.exports = new AdminUsers_controller()