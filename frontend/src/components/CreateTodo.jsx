import React, { useState } from "react";

const CreateTodo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  return (
    <div>
      <input
        type="text"
        placeholder="title"
        onChange={function (e) {
          const value = e.target.value;
          setTitle(value);
        }}
      />
      <br /> <br />
      <input
        type="text"
        placeholder="description"
        onChange={function (e) {
          const value = e.target.value;
          setDescription(value);
        }}
      />
      <br /> <br />
      <button
        onClick={() => {
          fetch(
            "http://localhost:3000/todo",

            {
              method: "POST",
              body:JSON.stringify({
                title: title,
                description: description,
              }),
              headers:{
                "Content-Type":"application/json"
              }
            }
          ).then(async function (res) {
            const json = await res.json();

            alert("Todo Added");
          });
        }}
      >
        Add a todo
      </button>
    </div>
  );
};

export default CreateTodo;
