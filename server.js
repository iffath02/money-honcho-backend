const express = require("express")
const app = express()
const config = require("./config")
const expenseController = require("./controllers/expense_controller")
const userController = require("./controllers/user_controller")
const categoryController = require("./controllers/category_controller")

app.use(express.static("public"))
app.use(express.json())

app.use("/api/expenses", expenseController)
app.use("/api/users", userController)
app.use("/api/category", categoryController)

app.listen(config.port, () => {
  console.log(`listening on port ${config.port}`)
})
