const db = require("../db")
const bcrypt = require("bcrypt")

class Users {
  static create(name, email, password) {
    const sql =
      "insert into table users (name, email, password) values ($1, $2, $3) returning *;"

    return bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(password, salt))
      .then(hash => db.query(sql, [name, email, hash]))
  }
  static update(id, name, email, password) {
    let sql = "UPDATE users SET "
    let values = []
    let index = 1

    if (name) {
      sql += `name = $${index},`
      values.push(name)
      index++
    }

    if (email) {
      sql += `email = $${index}, `
      values.push(email)
      index++
    }

    if (password) {
      bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => {
          sql += `password = $${index}, `
          values.push(hash)
          index++
        })
    }

    sql = sql.slice(0, -2) // remove the last comma and space
    sql += ` WHERE id = $${index};`
    values.push(id)

    return db.query(sql, values)
  }
}

module.exports = Users
