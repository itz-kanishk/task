import React from "react";
import { useState } from "react";

const From_app = () => {
  const [title, setTitle] = useState("");
  const [assign_to, setAssign_to] = useState("");
  const [deadline, setDeadline] = useState("");
  const [completed, setCompleted] = useState(false);
  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Post Blog
          </h2>
        </div>
        <form className="mt-8 space-y-6" action="#" method="POST">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Title
          </h2>
          <div className="rounded-md shadow-sm -space-y-px">
            <input
              id="title"
              name="title"
              type="text"
              required
              className="appearance-none rounded-none relative block
w-full px-3 py-2 border border-gray-300
placeholder-gray-500 text-gray-900 rounded-t-md
focus:outline-none focus:ring-indigo-500
focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Title"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                content
                <br></br>
              </h2>
              <input
                id="content"
                name="content"
                type="text"
                required
                className="appearance-none rounded-none relative block
w-full px-3 py-2 border border-gray-300
placeholder-gray-500 text-gray-900 rounded-b-md
focus:outline-none focus:ring-indigo-500
focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Content"
                onChange={(e) => {
                  setAssign_to(e.target.value);
                }}
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center
py-2 px-4 border border-transparent text-sm font-medium
rounded-md text-white bg-indigo-600 hover:bg-indigo-700
focus:outline-none focus:ring-2 focus:ring-offset-2
focus:ring-indigo-500"
              onClick={async (e) => {
                e.preventDefault();
                const id = localStorage.getItem("token");
                const data = {
                  title: title,
                  assign_to: assign_to,
                  user_id: id,
                };
                const response = await fetch(
                  "http://localhost:3001/api/tasks",
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                  }
                );
                const result = await response.json();
                //if error come then send back to home page
                console.log(result);
                window.location.href = "/home";
              }}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default From_app;
