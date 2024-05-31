const db = require('./connect');

class Dashboard {
    async getUserCount() {
        const sql = `select count(*) as count from users`;
        const [result] = await db.query(sql);
        return result
    }

    async getTotalOrders() {
        const sql = `select count(*) as count from orders`;
        const [result] = await db.query(sql);
        return result
    }

    async getTotalBooks() {
        const sql = `select count(*) as count from books`;
        const [result] = await db.query(sql);
        return result
    }

    async getUserRegisterGroupByCreated() {
        const sql = `SELECT COUNT(id) AS counts, MONTHNAME(created) AS month_name
            FROM users
            GROUP BY MONTHNAME(created);
        `
        const [result] = await db.query(sql);
        return result
    }

    async getNewUserRegistered() {
        const sql = `SELECT *
                FROM users
                WHERE admin =0 and created >= DATE_SUB(NOW(), INTERVAL 30 DAY);
        `
        const [result] = await db.query(sql);
        return result;
    }

    async getNewBooks() {
        const sql = `select * from books where created >= DATE_SUB(NOW(), INTERVAL 30 DAY);`
        const [result] = await db.query(sql);
        return result
    }


    async getNewOrder() {
        const sql = `select o.*, u.username, u.email,u.avatar from orders o 
                join users u on o.user_id = u.id
            where o.created >= DATE_SUB(NOW(), INTERVAL 30 DAY);`
        const [result] = await db.query(sql);
        return result
    }

    3
}

module.exports = new Dashboard;