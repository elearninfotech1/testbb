let express = require("express");
require("./dbconnect");
let Treatment = require("./Model/treatmentModel");
let Signup = require("./Model/signupModel");
let Employee = require("./Model/employeeModel");
let cors = require("cors");

let app = express();
app.use(express.json());
app.use(cors());

app.post("/treatment", async (req, res) => {
  let treatment = new Treatment(req.body);
  let result = await treatment.save();
  res.send(result);
});

app.post("/employee", async (req, res) => {
  let emp = new Employee(req.body);
  let result = await emp.save();
  res.send(result);
});

app.get("/treatment", async (req, res) => {
  let results = await Treatment.find();
  res.send(results);
});

app.delete("/treatment/:id", async (req, res) => {
  let result = await Treatment.deleteOne({ _id: req.params.id });
  res.send(result);
});

app.get("/treatment/:id", async (req, res) => {
  let result = await Treatment.findOne({ _id: req.params.id });
  res.send(result);
});

app.put("/treatment/:id", async (req, res) => {
  let result = await Treatment.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  res.send(result);
});

app.post("/signup", async (req, res) => {
  let { name, email, password, cpassword, phone, address } = req.body;
  let exists = await Signup.findOne({ email: email });
  if (exists) {
    res.send("User Already Exists");
  } else if (password !== cpassword) {
    res.send("Conform Password is not matched");
  } else {
    let user = new Signup(req.body);
    let result = await user.save();
    res.send(result);
  }
});

app.post("/login", async (req, res) => {
  let { email, password } = req.body;
  let exists = await Signup.findOne({ email: email });
  if (!exists) {
    res.send("User Not Found");
  } else if (exists.password !== password) {
    res.send("Invalid Credentials");
  } else {
    res.send("Valid");
  }
});

app.get("*", async (req, res) => {
  res.send("<h1>Invalid URL</h1>");
});

app.listen(4000);
