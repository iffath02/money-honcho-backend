const db = require("../db")

class Expenses {
  static findAll(user_id) {
    const sql = `select e.*, c.name AS category from expenses e join category c ON e.category_id = c.id where user_id = $1`
    return db.query(sql, [user_id]).then(res => res.rows)
  }

  static create(user_id, category_id, spent_on, amount) {
    const sql = `insert into expenses (user_id, category_id, spent_on, amount) values ($1, $2, $3, $4) returning *;`
    return db
      .query(sql, [user_id, category_id, spent_on, amount])
      .then(res => res.rows[0])
  }

  static destroy(id) {
    const sql = `delete from expenses where id = $1 returning *;`
    return db.query(sql, [id]).then(res => res.rows[0])
  }

  static update(id, user_id, category_id, spent_on, amount) {
    const sql = `update expenses set user_id = $1, category_id = $2, spent_on = $3, amount = $4 where id=$5 returning *;`
    return db
      .query(sql, [user_id, category_id, spent_on, amount, id])
      .then(res => res.rows[0])
  }

  static chart(user_id) {
    const sql = `select c.name AS category, SUM(e.amount) AS total_amount
    from expenses e
    join category c ON e.category_id = c.id
    where e.user_id = $1
    group by c.name
    order by total_amount DESC;`
    return db.query(sql, [user_id]).then(res => res.rows)
  }
}
module.exports = Expenses
