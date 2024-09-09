const mongoose = require("mongoose");

async function connectDb() {
  await mongoose
    .connect(
      "mongodb+srv://sanyogsr:sanyog@cluster0.4htzv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    )
    .then((data) => {
      console.log("connected");
    })
    .catch((err) => {
      console.log(err);
    });
}

const TodoSchema = mongoose.Schema({
  title: String,
  description: String,
  completed: Boolean,
});

const todo = mongoose.model("todo", TodoSchema);

module.exports = {
  todo,
  connectDb,
};
