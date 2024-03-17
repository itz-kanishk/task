import React from "react";
import "./App.css";
import From_app from "./form";
import BlogList from "./list";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./Login";
function App() {
  return (
    <div className="">
      <Router>
        <Routes>
          <Route
            path="/home"
            element={
              <div className="m-20">
                <BlogList />
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
          <Route path="/" element={<Login />} />
          <Route path="/form" element={<From_app />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
