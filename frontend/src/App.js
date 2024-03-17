import React from "react";
import "./App.css";
import From_app from "./form";
import BlogList from "./list";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
// const blogs = [
//   {
//     id: 1,
//     title: "First Blog",
//     content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//   },
//   {
//     id: 2,
//     title: "Second Blog",
//     content:
//       "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
//   },
//   {
//     id: 3,
//     title: "Third Blog",
//     content:
//       "Fusce consequat dui nec augue fermentum, vel fermentum libero fermentum.",
//   },
// ];
function App() {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    fetch("https://blog-1-ki7f.onrender.com/blogs")
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data);
      });
  }, []);
  return (
    <div className="">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <div className="m-20">
                <BlogList blogs={blogs} />
                <button
                  className="p-20 mt-20 group relative w-full flex justify-center
py-2 px-4 border border-transparent text-sm font-medium
rounded-md text-white bg-indigo-600 hover:bg-indigo-700
focus:outline-none focus:ring-2 focus:ring-offset-2
focus:ring-indigo-500"
                  onClick={() => {
                    window.location.href = "/form";
                  }}
                >
                  <a href="/form">Post Blog</a>
                </button>
              </div>
            }
          />
          <Route path="/form" element={<From_app />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;