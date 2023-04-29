const db = require("../db")

class Category {
  static findAll() {
    const sql = "select * from category;"
    return db.query(sql).then(res => res.rows)
  }
}
