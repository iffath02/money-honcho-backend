const express = require("express")
const router = express.Router()

const Category = require("../models/category")

router.use(express.json())

router.get("/", (req, res) => {
  Category.findAll().then(categories => res.json(categories))
})

router.post("/", (req, res) => {
  const { name } = req.body
  Category.create(name).then(category => res.json(category))
})

module.exports = router
