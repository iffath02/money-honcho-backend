const express = require("express")
const app = express()
const config = require("./config")
const expenseController = require("./controllers/expense_controller")
const userController = require("./controllers/user_controller")
const categoryController = require("./controllers/category_controller")
const incomeController = require("./controllers/income_controller")
const checkToken = require("./lib/checkToken")
const cors = require("cors")

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://react-money-honcho.onrender.com",
    ],
    // methods: ["GET", "POST", "PUT", "DELETE"],
  })
)

app.use(express.static("public"))
app.use(express.json())
app.use(checkToken)

app.use("/api/expenses", expenseController)
app.use("/api/users", userController)
app.use("/api/category", categoryController)
app.use("/api/incomes", incomeController)

app.listen(config.port, () => {
  console.log(`listening on port ${config.port}`)
})
