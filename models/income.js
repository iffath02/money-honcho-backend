const db = require("../db")

class Income {
  static findAll(user_id) {
    const sql = "select * from income where user_id = $1;"
    return db.query(sql, [user_id]).then(res => res.rows)
  }

  static create(user_id, type, amount) {
    const sql = `insert into income (user_id, type, amount) values ($1, $2, $3) returning *;`
    return db.query(sql, [user_id, type, amount]).then(res => res.rows[0])
  }

  static destroy(id) {
    const sql = `delete from income where id = $1;`
    return db.query(sql, [id])
  }

  static update(id, user_id, type, amount) {
    const sql = `update income set user_id = $1, type = $2, amount = $3 where id=$4 returning *;`
    return db.query(sql, [user_id, type, amount, id]).then(res => res.rows[0])
  }

  static chart(user_id) {
    const sql = `SELECT type, SUM(amount) as total_amount
    FROM income
    WHERE user_id = $1
    GROUP BY type
    ORDER BY total_amount DESC`
    return db.query(sql, [user_id]).then(res => res.rows)
  }
}

module.exports = Income
