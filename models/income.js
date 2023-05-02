const db = require("../db")

class Incomes {
  static findAll(user_id) {
    const sql =
      "SELECT  i.*, ia.type FROM income i JOIN income_accounts ia ON i.account_id = ia.id where i.user_id = $1;"
    return db.query(sql, [user_id]).then(res => res.rows)
  }

  static create(user_id, account_id, amount) {
    const sql = `insert into income (user_id, account_id, amount) values ($1, $2, $3) returning *;`
    return db.query(sql, [user_id, account_id, amount]).then(res => res.rows[0])
  }

  static destroy(id) {
    const sql = `delete from income where id = $1 returning *;`
    return db.query(sql, [id]).then(res => res.rows[0])
  }

  static update(id, user_id, account_id, amount) {
    const sql = `update income set user_id = $1, account_id = $2, amount = $3 where id=$4 returning *;`
    return db
      .query(sql, [user_id, account_id, amount, id])
      .then(res => res.rows[0])
  }

  static chart(user_id) {
    const sql = `SELECT ia.type, SUM(i.amount) as total_amount
    FROM income i
    JOIN income_accounts ia ON i.account_id = ia.id
    where i.user_id = $1
    GROUP BY ia.type
    order by total_amount DESC;`
    return db.query(sql, [user_id]).then(res => res.rows)
  }
}

module.exports = Incomes
