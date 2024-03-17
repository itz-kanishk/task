import React from "react";
import { useState, useEffect } from "react";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    // send id from local storage in get request
    const id = localStorage.getItem("token");
    console.log(id);
    //make a get request to the backend to get all the blogs with id in params
    fetch(`http://localhost:3001/api/tasks/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setBlogs(data);
      });
  }, []);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {blogs.map((blog) => (
        <div key={blog._id} className="border p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
          <p>{blog.assign_to}</p>
          <p>{blog.created_at}</p>
          {blog.completed ? <p>completed</p> : <p>not completed</p>}
          <button
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md"
            onClick={async () => {
              const id = localStorage.getItem("token");
              const response = await fetch(
                `http://localhost:3001/api/tasks/${blog._id}`,
                {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ user_id: id }),
                }
              );
              const result = await response.json();
              console.log(result);
              window.location.reload();
            }}
          >
            completed/not completed
          </button>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
