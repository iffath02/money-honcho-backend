const express = require("express")
const router = express.Router()
const Expenses = require("../models/expenses")

router.use(express.json())

router.get("/", (req, res) => {
  const { user_id } = req.body
  Expenses.findAll(user_id).then(expenses => res.json(expenses))
})

router.post("/", (req, res) => {
  const { user_id, category_id, spent_on, amount } = req.body
  Expenses.create(user_id, category_id, spent_on, amount).then(expense =>
    res.json(expense)
  )
})

router.put("/:id", (req, res) => {
  const id = req.params.id
  const { user_id, category_id, spent_on, amount } = req.body
  Expenses.update(id, user_id, category_id, spent_on, amount).then(expense =>
    res.json(expense)
  )
})

router.delete("/:id", (req, res) => {
  const id = req.params.id
  Expenses.destroy(id)
})

router.get("/chart", (req, res) => {
  const { user_id } = req.body
  Expenses.chart(user_id).then(chart => res.json(chart))
})

module.exports = router
