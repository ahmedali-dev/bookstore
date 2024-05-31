const db = require("./connect");
const uuid = require("crypto").randomUUID;

class Orders {
    async getAllOrder({page, pageSize}) {
        const offset = (page - 1) * pageSize;
        let sql = `SELECT orders.*, users.username, users.email,users.avatar FROM orders`;
        sql += ` join users on orders.user_id = users.id`;
        sql += ` order by orders.updated desc limit ? offset ?`;

        const [result] = await db.query(sql, [pageSize, offset]);
        return result;
    }

    async searchInOrdersUsingEmailOrName({search}) {
        search = `%${search}%`;
        const sql = `select orders.*, 
        users.username, users.email,users.avatar
        FROM orders
        JOIN users on orders.user_id = users.id
        where (username LIKE ? OR email LIKE ?);`
        const [result] = await db.query(sql, [search, search]);
        return result;
    }

    async FilterOrderByCreated({start,end}) {
        let sql = `SELECT orders.*, users.username, users.email,users.avatar FROM orders`;
        sql += ` join users on orders.user_id = users.id`;
        sql += ` where orders.created >= ? and orders.created <= ? order by orders.updated desc`
        const [result] = await db.query(sql, [start,end]) ;
        return result;
    }
    async getOrderItemsByOrderId({id}) {
        let sqlForOrders = `select 
                        o.id as order_id, 
                        o.shipping,o.status,
                        a.id as address_id,a.*, g.gov 
                from orders o
                        JOIN address a on a.id = o.address_id
                        JOIN government g on g.id = a.government
                where o.id = ?
                order by o.created desc`;
        const [Orders] = await db.query(sqlForOrders, [id]);
        const address = {
            username: Orders[0].username,
            city: Orders[0].city,
            mobile: Orders[0].mobile,
            address: Orders[0].address,
            government: Orders[0].gov,
        };

        let sql = `select 
              i.id as orderItemId,i.count as orderItemCount,i.created,
              b.id as bookId, b.cover, b.title,b.count,b.price,
              c.name as category
          from order_items i
              join books b on b.id = i.book_id
              join categorys c on c.id = b.category_id
          WHERE
              i.order_id =? 
        `;

        const [result] = await db.query(sql, [id]);
        return {
            address,
            ordersItems: result,
            orderInfo: {
                id: Orders[0].order_id,
                shipping: Orders[0].shipping,
                status: Orders[0].status,
            },
        };
    }

    async updateOrderUsingId({id, status, shipping}) {
        let sql = `update orders set shipping = ?, status = ? where id = ?`
        const [result] = await db.query(sql, [shipping, status, id]);
        return result;
    }
}

module.exports = new Orders();
