const con = require("./connect");
const cart = require("./cart");
const uuid = require("crypto").randomUUID;
class orders {
  constructor() {}

  async getOrders({ user_id }) {
    console.log("🚀 ~ orders ~ getOrders ~ user_id:", user_id);
    const sql = "SELECT * FROM orders WHERE orders.user_id = ? ORDER BY orders.created DESC";
    const [result] = await con.execute(sql, [user_id]);
    const items = await Promise.all(
      result.map(async (order) => {
        console.log(order);
        const orderItemSql = await this.getOrder_items({ order_id: order.id });
        console.log("🚀 ~ orders ~ getOrders ~ orderItemSql:", orderItemSql);
        let finalData = { shipping: order.shipping, status: order.status, orders: orderItemSql };
        return finalData;
      })
    );
    console.log("🚀 ~ orders ~ getOrders ~ items:", items);
    return items;
  }

  async getOrderBySeller({ seller_id }) {
    console.log("🚀 ~ orders ~ getOrders ~ user_id:", seller_id);
    const sql = `SELECT orders.*, users.username, users.email, users.avatar 
      FROM orders 
      JOIN users ON orders.user_id = users.id 
      WHERE orders.seller_id = ?
      ORDER BY orders.created DESC
      `;
    const [result] = await con.execute(sql, [seller_id]);
    const items = await Promise.all(
      result.map(async (order) => {
        console.log(order);
        const orderItemSql = await this.getOrder_items({ order_id: order.id });
        console.log("🚀 ~ orders ~ getOrders ~ orderItemSql:", orderItemSql);
        let finalData = {
          user: { username: order.username, email: order.email, avatar: order.avatar },
          shipping: order.shipping,
          status: order.status,
          orders: orderItemSql,
        };
        return finalData;
      })
    );
    console.log("🚀 ~ orders ~ getOrders ~ items:", items);
    return items;
  }

  async getOrderBySellerById({ seller_id, id }) {
    console.log("🚀 ~ orders ~ getOrders ~ user_id:", seller_id);
    const sql = `SELECT orders.*,address.username as name,government.gov, address.mobile,address.address, address.city, users.username, users.email, users.avatar 
      FROM orders 
      JOIN users ON orders.user_id = users.id
      join address on orders.address_id = address.id
      join government on address.government = government.id
      WHERE orders.seller_id = ? and orders.id = ?
      ORDER BY orders.created DESC
      `;
    const [result] = await con.execute(sql, [seller_id, id]);
    console.log("🚀 ~ orders ~ getOrderBySellerById ~ result:", result);
    const items = await Promise.all(
      result.map(async (order) => {
        console.log(order);
        const orderItemSql = await this.getOrder_items({ order_id: order.id });
        console.log("🚀 ~ orders ~ getOrders ~ orderItemSql:", orderItemSql);
        let finalData = {
          user: { username: order.username, email: order.email, avatar: order.avatar },
          shipping: order.shipping,
          orders: orderItemSql,
          address: {
            username: order.name,
            mobile: order.mobile,
            government: order.gov,
            city: order.city,
            address: order.address,
          },
        };
        return finalData;
      })
    );
    console.log("🚀 ~ orders ~ getOrders ~ items:", items);
    return items;
  }

  async getOrderBySellerSearch({ seller_id, search }) {
    console.log("🚀 ~ orders ~ getOrders ~ user_id:", seller_id);
    const sql = `SELECT orders.*,address.username as name,government.gov, address.mobile,address.address, address.city, users.username, users.email, users.avatar 
      FROM orders 
      JOIN users ON orders.user_id = users.id
      join address on orders.address_id = address.id
      join government on address.government = government.id
      WHERE orders.seller_id = ? and users.username like '%${search}%' || users.email like '%${search}%'
      || address.mobile like '%${search}%' || address.username like '%${search}%'
      ORDER BY orders.created DESC
      `;
    const [result] = await con.execute(sql, [seller_id]);
    console.log("🚀 ~ orders ~ getOrderBySellerById ~ result:", result);
    const items = await Promise.all(
      result.map(async (order) => {
        console.log(order);
        const orderItemSql = await this.getOrder_items({ order_id: order.id });
        console.log("🚀 ~ orders ~ getOrders ~ orderItemSql:", orderItemSql);
        let finalData = {
          user: { username: order.username, email: order.email, avatar: order.avatar },
          shipping: order.shipping,
          orders: orderItemSql,
          address: {
            username: order.name,
            mobile: order.mobile,
            government: order.gov,
            city: order.city,
            address: order.address,
          },
        };
        return finalData;
      })
    );
    console.log("🚀 ~ orders ~ getOrders ~ items:", items);
    return items;
  }

  async getTotalOrderUsingGovernment({ seller_id }) {
    const sql = `select count(o.id) as totalOrder, g.id as govId, g.gov  from orders o
      join 
        address a on o.address_id = a.id 
      join
        government g on a.government = g.id
      where o.seller_id = ? group by g.gov`;
    const booksql = `select count(id) as bookCount from books where user_id = ?`;

    const [result] = await con.execute(sql, [seller_id]);
    const [[bookResult]] = await con.execute(booksql, [seller_id]);
    console.log(
      "%c ->",
      "🚀 ~ getTotalOrderUsingGovernment ~ bookResult:",
      bookResult,
      "background: #222; color: #bada55"
    );
    return { order: result, book: bookResult };
  }

  async addOrder({ user_id, seller_id, address_id }) {
    const sql = "insert into orders (id,user_id,seller_id,address_id) values (?,?,?,?)";
    let id = uuid();
    const [result] = await con.execute(sql, [id, user_id, seller_id, address_id]);
    result.insertId = id;
    return result;
  }

  async updateOrder({ seller_id, order_id, shipping, status }) {
    const sql = "update orders set shipping = ?,status=? where seller_id = ? and id = ?";
    const [result] = await con.execute(sql, [shipping, status, seller_id, order_id]);

    return result;
  }

  async deleteOrder({ order_id, seller_id }) {
    const sql = "delete from orders where order_id = ? and seller_id = ?";
    const [result] = await con.execute(sql, [order_id, seller_id]);
    return result;
  }

  async getOrder_items({ order_id }) {
    const sql =
      "select o.*, b.title,b.cover,b.price, b.user_id as seller_id from order_items o join books b on o.book_id = b.id where o.order_id = ? ";
    const [result] = await con.execute(sql, [order_id]);
    return result;
  }

  async addOrder_items({ order_id, book_id, count }) {
    const sql = "insert into order_items (order_id, book_id, count) values (?,?,?)";
    const [result] = await con.execute(sql, [order_id, book_id, count]);
    return result;
  }

  async updateOrder_items({ order_id, user_id }) {
    const cartData = await cart.getCart(user_id);
    const sql = "update order_items set count = ? where order_id = ? and book_id = ?";
    const [result] = await con.execute(sql, [cartData[0].count, order_id, cartData[0].book_id]);
    return result;
  }

  async deleteOrder_items({ order_id, user_id }) {
    const sql = "delete from order_items where order_id = ? and book_id = ?";
    const [result] = await con.execute(sql, [order_id, user_id]);
    return result;
  }
}

module.exports = new orders();
