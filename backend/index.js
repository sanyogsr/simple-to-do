const express = require("express");
const { createTodo, updateTodo } = require("./types");
const { todo, connectDb } = require("./db");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());
connectDb();

app.post("/todo", async function (req, res) {
  const createPayload = req.body;
  const parsePayload = createTodo.safeParse(createPayload);

  if (!parsePayload.success) {
    return res.status(411).json({ msg: "You sent me wrong inputs" });
  }

  // Create new todo
  await todo.create({
    title: createPayload.title,
    description: createPayload.description,
    completed: false,
  });

  // Respond with success message
  res.json({ msg: "Todo created successfully" });
});

app.put("/completed", async function (req, res) {
  const createPayload = req.body;
  const parsePayload = updateTodo.safeParse(createPayload);

  if (!parsePayload.success) {
    return res.status(411).json({ msg: "You sent me wrong inputs" });
  }

  const updatedTodo = await todo.updateOne(
    { _id: req.body.id },
    { $set: { completed: true } }
  );

  if (updatedTodo.nModified === 0) {
    return res.status(404).json({ msg: "Todo not found or already completed" });
  }

  res.json({ msg: "Todo marked as completed" });
});

app.get("/todos", async (req, res) => {
  const todos = await todo.find({}); // Fetch all todos

  res.json({ todos }); // Correctly return the todos
});

app.listen(3000, () => {
  console.log("server has started on port 3000");
});
