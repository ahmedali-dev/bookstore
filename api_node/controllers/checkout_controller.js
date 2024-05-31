const checkout = require("./../db/checkout");
const { ApiError } = require("../utilities/ApiError");
const cart = require("./../db/cart");
const books = require("./../db/books");
const address = require("./../db/address");
const { param, body } = require("express-validator");
class checkoutController {
  //   constructor() {
  //     checkout = checkout;
  //     cart = cart;
  //     address = address;
  //     books = books;
  //   }

  validation = [
    param("id").isString().notEmpty().isLength({ min: 1 }).withMessage("Order ID is required"),
  ];
  async getOrders(req, res, next) {
    try {
      const { id: user_id } = req.user;
      const orders = await checkout.getOrders({ user_id });
      res.status(200).json(orders);
    } catch (error) {
      console.log("🚀 ~ checkoutController ~ getOrders ~ error:", error);
      next(ApiError.customError(404, "No order found"));
    }
  }

  async getOrderBySeller(req, res, next) {
    try {
      const { id: seller_id } = req.user;
      const orders = await checkout.getOrderBySeller({ seller_id });
      res.status(200).json(orders);
    } catch (error) {
      console.log("🚀 ~ checkoutController ~ getOrderBySeller ~ error:", error);
      next(ApiError.customError(404, "No order found"));
    }
  }

  validationSearch = [
    param("search").isString().notEmpty().isLength({ min: 1 }).withMessage("Search is required"),
  ];
  async getOrderBySellerSearch(req, res, next) {
    try {
      const { id: seller_id } = req.user;
      const { search } = req.params;
      const orders = await checkout.getOrderBySellerSearch({ seller_id, search });
      res.status(200).json(orders);
    } catch (error) {
      console.log("🚀 ~ checkoutController ~ getOrderBySeller ~ error:", error);
      next(ApiError.customError(404, "No order found"));
    }
  }

  async getOrderBySellerById(req, res, next) {
    try {
      const { id: seller_id } = req.user;
      const { id } = req.params;
      const orders = await checkout.getOrderBySellerById({ seller_id, id });
      res.status(200).json(orders);
    } catch (error) {
      console.log("🚀 ~ checkoutController ~ getOrderBySeller ~ error:", error);
      next(ApiError.customError(404, "No order found"));
    }
  }

  async createOrder(req, res, next) {
    try {
      const { id: user_id } = req.user;
      console.log("🚀 ~ checkoutController ~ createOrder ~ user_id:", user_id);

      const getUserCart = await cart.getCart(user_id);
      console.log("🚀 ~ checkoutController ~ createOrder ~ getUserCart:", getUserCart);

      if (getUserCart.length === 0) {
        return next(ApiError.customError(404, "No cart found"));
      }

      let seller_id = "";
      let order_id = "";

      for (const item of getUserCart) {
        const getBookFromDb = await books.getBookById("where b.id = ?", [item.book_id]);

        if (getBookFromDb.length === 0) {
          return next(ApiError.customError(404, "No book found"));
        }

        const seller_idFromDb = getBookFromDb[0].user_id;

        if (seller_id !== seller_idFromDb) {
          seller_id = seller_idFromDb;

          const getUserAddress = await address.getAddress(user_id);
          console.log(
            "🚀 ~ checkoutController ~ getUserCart.map ~ getUserAddress:",
            getUserAddress
          );

          if (getUserAddress.length === 0) {
            return next(ApiError.customError(404, "No address found"));
          }

          const createOrder = await checkout.addOrder({
            user_id,
            seller_id: seller_idFromDb,
            address_id: getUserAddress[0].id,
          });

          order_id = createOrder.insertId;
        }
        console.log({ order_id, book_id: item.book_id, count: item.count });

        await checkout.addOrder_items({ order_id, book_id: item.book_id, count: item.count });
        await cart.deleteAllCart(user_id);
      }

      res.status(200).json({ message: "Order created successfully" });
    } catch (error) {
      console.log("🚀 ~ checkoutController ~ createOrder ~ error:", error);
      next(ApiError.customError(500, "Failed to create order"));
    }
  }

  updateValidation = [
    this.validation[0],
    body("status").isString().notEmpty().withMessage("status is require"),
    // body("shipping").isDecimal().withMessage("not valid value"),
  ];
  async updateOrder(req, res, next) {
    const { id: seller_id } = req.user;
    const { id } = req.params;
    const { status, shipping = 0 } = req.body;
    try {
      const statusAv = ["pending", "processing", "delivered", "cancelled"];
      if (!statusAv.includes(status.toLowerCase())) {
        return next(
          ApiError.customError(404, "status not allow pls choose " + statusAv.join("--"))
        );
      }

      const updateOrder = await checkout.updateOrder({ seller_id, order_id: id, shipping, status });
      if (!updateOrder.affectedRows) {
        return next(ApiError.customError(400, "pls try again letter"));
      }

      res.status(200).json({ msg: "updated order" });
    } catch (error) {
      console.log("🚀 ~ checkoutController ~ updateOrder ~ error:", error);
      next(ApiError.customError(400, "some error pls try again letter"));
    }
  }

  // get Total order using government
  async getTotalOrder(req, res, next) {
    const { id: seller_id } = req.user;
    console.log("d---------------->", req.user);
    console.log("🚀 ~ checkoutController ~ getTotalOrder ~ seller_id:", seller_id);
    try {
      const getTotalGov = await checkout.getTotalOrderUsingGovernment({ seller_id });
      res.status(200).json(getTotalGov);
    } catch (error) {
      console.log("🚀 ~ checkoutController ~ getTotalOrder ~ error:", error);
      next(ApiError.customError(500, "Something went wrong"));
    }
  }
}

module.exports = new checkoutController();
