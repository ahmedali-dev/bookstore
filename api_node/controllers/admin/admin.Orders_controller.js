const orderDb = require('./../../db/orders');
const {body, param} = require('express-validator');
const {ApiError} = require('./../../utilities/ApiError');


class OrdersController {
    constructor() {
    }

    validation = {
        id: param('id').isString().notEmpty().withMessage("orderId is required"),
        search: param('search').isString().notEmpty().withMessage("search is required"),
        shipping: body('shipping').isDecimal().notEmpty().withMessage("shipping is required"),
        status: body('status').isString().notEmpty().withMessage("status is required"),
    }

    async getOrders(req, res, next) {
        const {page = 1, pageSize = 20} = req.query;

        try {
            const result = await orderDb.getAllOrder({page, pageSize});
            return res.status(200).json(result);
        } catch (e) {
            console.log('admin_books_controller ~ getOrders error:', e);
            return next(ApiError.customError(500, 'something went wrong'));
        }
    }

    async getOrderById(req, res, next) {
        const {id} = req.params;
        try {
            const result = await orderDb.getOrderItemsByOrderId({id});
            return res.status(200).json(result);
        } catch (e) {
            console.log('admin_books_controller ~ getOrderByIdError:', e);
            return next(ApiError.customError(404, 'Order not found'))
        }
    }

    async searchInOrder(req, res, next) {
        const {search} = req.params;
        try {
            const result = await orderDb.searchInOrdersUsingEmailOrName({search});
            return res.status(200).json(result);
        } catch (e) {
            console.log('admin_books_controller ~ searchInOrder error:', e);
            return next(ApiError.customError(500, 'Something went wrong'));
        }
    }

    async updateOrderById(req, res, next) {
        const {id} = req.params;
        const {shipping, status} = req.body;
        try {
            const statusAv = ["pending", "processing", "delivered", "cancelled"];
            if (!statusAv.includes(status.toLowerCase())) {
                return next(
                    ApiError.customError(404, "status not allow pls choose " + statusAv.join("--"))
                );
            }

            const updateOrder = await orderDb.updateOrderUsingId({id, shipping, status});
            return res.status(200).json(updateOrder);
        } catch (e) {
            return next(ApiError.customError(500, 'something went wrong'));
        }
    }


    async FilterOrderByDate(req,res,next) {
        const {start = 0, end=0} = req.query;
        try{
            if(!start || !end) {
                return  next(ApiError.customError(500, 'set start and end before filer'))                                                                                        
            }
            const result = await orderDb.FilterOrderByCreated({start, end})
            res.status(200).json(result);
        }catch(e) {
            console.log("getBookUsinFilter ~ =>", e);
            return next(ApiError.customError(500, 'something went wrong'));
        }
    }
}

module.exports = new OrdersController();