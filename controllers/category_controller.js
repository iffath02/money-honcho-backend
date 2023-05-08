const express = require("express")
const router = express.Router()

const Category = require("../models/category")

router.use(express.json())

router.get("/expense", (req, res, next) => {
  Category.findAllExpense()
    .then(categories => res.json(categories))
    .catch(next)
})

router.get("/income", (req, res, next) => {
  Category.findAllIncome()
    .then(accounts => res.json(accounts))
    .catch(next)
})

router.post("/", (req, res, next) => {
  const { name } = req.body
  Category.create(name)
    .then(category => res.json(category))
    .catch(next)
})

module.exports = router
