const express = require("express")
const router = express.Router()
const Users = require("../models/users")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

router.use(express.json())

// router.get("/", (req, res) => {
//   Users.findAll().then(users => res.json(users))
// })

router.get("/:user_id", (req, res, next) => {
  const user_id = req.params.user_id
  Users.findOneById(user_id).then(user => res.json(user))
})

router.post("/", (req, res, next) => {
  const { name, email, password } = req.body
  Users.create(name, email, password).then(user => res.json(user))
})

router.put("/:id", (req, res, next) => {
  const id = req.params
  const { name, email, password } = req.body
  Users.update(id, name, email, password).then(user => res.json(user))
})

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body
  try {
    let user = await Users.findOneByEmail(email)
    let match = await bcrypt.compare(password, user.password_digest)

    if (!match) throw new Error("invalid email or password")
    let token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      process.env.SECRET,
      {
        expiresIn: "24h",
      }
    )
    res.json(token)
  } catch (err) {
    console.log(err)
    next(err)
  }
})

module.exports = router
