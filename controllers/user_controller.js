const express = require("express")
const router = express.Router()
const Users = require("../models/users")

router.use(express.json())

router.get("/", (req, res) => {
  Users.findAll().then(users => res.json(users))
})

router.post("/", (req, res) => {
  const { name, email, password } = req.body
  Users.create(name, email, password).then(user => res.json(user))
})

router.put("/:id", (req, res) => {
  const id = req.params
  const { name, email, password } = req.body
  Users.update(id, name, email, password).then(user => res.json(user))
})

module.exports = router
