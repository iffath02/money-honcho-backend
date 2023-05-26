const express = require("express")
const router = express.Router()
const Incomes = require("../models/income")

router.use(express.json())

router.get("/:user_id", (req, res, next) => {
  const user_id = req.params.user_id
  Incomes.findAll(user_id).then(incomes => res.json(incomes))
})

router.post("/:user_id", (req, res, next) => {
  const user_id = req.params.user_id
  const { account_id, amount } = req.body
  Incomes.create(user_id, account_id, amount).then(income => res.json(income))
})

router.put("/:id", (req, res, next) => {
  const id = req.params.id
  const { user_id, account_id, amount } = req.body
  Incomes.update(id, user_id, account_id, amount).then(income =>
    res.json(income)
  )
})

router.delete("/:id", (req, res, next) => {
  const id = req.params.id
  Incomes.destroy(id).then(income => res.json(income))
})

router.get("/chart/:user_id", (req, res, next) => {
  const user_id = req.params.user_id
  Incomes.chart(user_id).then(chart => res.json(chart))
})

module.exports = router
