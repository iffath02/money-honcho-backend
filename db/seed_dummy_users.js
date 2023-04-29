const User = require("../models/users")

User.create("iffath", "iffi@gmail.com", "pudding")
  .then(res => console.log(res.rows[0]))
  .catch(err => console.log(err))
