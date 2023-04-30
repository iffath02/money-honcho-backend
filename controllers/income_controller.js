const express = require("express")
const router = express.Router()
const Incomes = require("../models/income")

router.use(express.json())

router.get("/", (req, res) => {
  const { user_id } = req.body
  Incomes.findAll(user_id).then(incomes => res.json(incomes))
})

router.post("/", (req, res) => {
  const { user_id, type, amount } = req.body
  Incomes.create(user_id, type, amount).then(income => res.json(income))
})

router.put("/:id", (req, res) => {
  const id = req.params.id
  const { user_id, type, amount } = req.body
  Incomes.update(id, user_id, category_id, type, amount).then(income =>
    res.json(income)
  )
})

router.delete("/:id", (req, res) => {
  const id = req.params.id
  Incomes.destroy(id)
})

router.get("/chart", (req, res) => {
  const { user_id } = req.body
  Incomes.chart(user_id).then(chart => res.json(chart))
})

module.exports = router
