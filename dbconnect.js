let mongoose = require("mongoose");
let con = mongoose.connect(
  "mongodb+srv://elearninfotech1:dKznzpMi4wyeUZ6x@db4pmlp.syfzkjl.mongodb.net/?retryWrites=true&w=majority&appName=db4pmlp"
);

if (con) {
  console.log("connected");
} else {
  console.log("unable to connected");
}
