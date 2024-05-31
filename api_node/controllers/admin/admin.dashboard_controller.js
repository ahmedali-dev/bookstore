const dashboardDb = require('./../../db/dashboard');
const {validationResult} = require('express-validator');
const {ApiError} = require('./../../utilities/ApiError');

class AdminDashboardController {
    async getAllDashboard(req, res, next) {
        try {
            const results = await Promise.all([
                dashboardDb.getUserCount(),
                dashboardDb.getTotalBooks(),
                dashboardDb.getTotalOrders(),
                dashboardDb.getUserRegisterGroupByCreated(),
                dashboardDb.getNewUserRegistered(),
                dashboardDb.getNewBooks(),
                dashboardDb.getNewOrder()
            ]);

            const responseData = {
                userCount: results[0][0],
                totalBooks: results[1][0],
                totalOrders: results[2][0],
                userRegistered: results[3],
                newUser: results[4],
                newBooks: results[5],
                newOrders: results[6],
            };

            return res.status(200).json(responseData);
        } catch (error) {
            console.log(error)
            return next(ApiError.customError(500, 'Something went wrong'));
        }
    }
}

module.exports = new AdminDashboardController();
