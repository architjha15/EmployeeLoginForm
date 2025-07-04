const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const port = 8000;

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb://127.0.0.1:27017/employees")
  .then(console.log("Database Connected!"))
  .catch((error) => console.log(error));

const employeeDetail = new mongoose.Schema({
  empId: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});


employeeDetail.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

const Emp = mongoose.model("emps", employeeDetail);

app.post("/register", async (req, res) => {
  const { empId, password } = req.body;
  try {
    const result = await Emp.create({
      empId,
      password,
    });
    console.log("User logged in: ", result);
    res.status(201).json({ msg: "Success", data: result });
  } catch (error) {
    res.status(500).json({ msg: "Error in logging in", error });
  }
});

app.listen(port, () =>
  console.log(`The server is running on http://localhost:${port}`)
);
