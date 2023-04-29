const db = require("../db")
const bcrypt = require("bcrypt")

class Users {
  static findAll() {
    const sql = `select * from users;`
    return db.query(sql).then(res => res.rows)
  }

  static create(name, email, password) {
    const sql =
      "insert into users (name, email, password_digest) values ($1, $2, $3) returning *;"

    return bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(password, salt))
      .then(hash => db.query(sql, [name, email, hash]))
  }

  static update(id, name, email, password) {
    const sql = `update users set name = $1, email = $2, password = $3 where id = $4 returning *;`
    return bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(password, salt))
      .then(hash => db.query(sql, [name, email, hash, id]))
  }

  // let sql = "UPDATE users SET "
  // let values = []
  // let index = 1

  // if (name) {
  //   sql += `name = $${index},`
  //   values.push(name)
  //   index++
  // }

  // if (email) {
  //   sql += `email = $${index}, `
  //   values.push(email)
  //   index++
  // }

  // if (password) {
  //   bcrypt
  //     .genSalt(10)
  //     .then(salt => bcrypt.hash(password, salt))
  //     .then(hash => {
  //       sql += `password = $${index}, `
  //       values.push(hash)
  //       index++
  //     })
  // }

  // sql = sql.slice(0, -2) // remove the last comma and space
  // sql += ` WHERE id = $${index};`
  // values.push(id)

  // return db.query(sql, values)
}

module.exports = Users
