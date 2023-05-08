const express = require("express")
const router = express.Router()
const Expenses = require("../models/expenses")

router.use(express.json())

router.get("/:user_id", (req, res, next) => {
  const user_id = req.params.user_id
  Expenses.findAll(user_id)
    .then(expenses => res.json(expenses))
    .catch(next)
})

router.post("/:user_id", (req, res, next) => {
  const user_id = req.params.user_id
  const { category_id, spent_on, amount } = req.body
  Expenses.create(user_id, category_id, spent_on, amount).then(expense =>
    res.json(expense).catch(next)
  )
})

router.put("/:id", (req, res, next) => {
  const id = req.params.id
  const { user_id, category_id, spent_on, amount } = req.body
  Expenses.update(id, user_id, category_id, spent_on, amount).then(expense =>
    res.json(expense).catch(next)
  )
})

router.delete("/:id", (req, res, next) => {
  const id = req.params.id
  Expenses.destroy(id)
    .then(expense => res.json(expense))
    .catch(next)
})

router.get("/chart/:user_id", (req, res, next) => {
  const user_id = req.params.user_id
  Expenses.chart(user_id)
    .then(chart => res.json(chart))
    .catch(next)
})

module.exports = router
