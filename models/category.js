const db = require("../db")

class Category {
  static findAll() {
    const sql = "select * from category;"
    return db.query(sql).then(res => res.rows)
  }

  static create(name) {
    const sql = "insert into category (name) values ($1) returning *;"
    return db.query(sql, [name]).then(res => res.rows[0])
  }
}

module.exports = Category
