import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  return (
    <div className="w-full min-h-screen flex items-center justify-center flex-col lg:flex-row bg-[#f3f4f6]">
      <div className="w-full md:w-auto flex gap-0 md:gap-40 flex-col md:flex-row items-center justify-center">
        {/* right side */}
        <div className="w-full md:w-1/3 p-4 md:p-1 flex flex-col justify-center items-center">
          <form className="form-container w-full md:w-[400px] flex flex-col gap-y-8 bg-white px-10 pt-14 pb-14">
            <div className="">
              <p className="text-blue-600 text-3xl font-bold text-center">
                Welcome!
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <label htmlFor="email" className="text-sm font-semibold">
                Email
              </label>
              <input
                type="text"
                placeholder="Email"
                className="input-box"
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <label htmlFor="password" className="text-sm font-semibold">
                Password
              </label>
              <input
                type="password"
                placeholder="Password"
                className="input-box"
                required
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <label htmlFor="name" className="text-sm font-semibold">
                Name
              </label>
              <input
                type="text"
                placeholder="Name"
                className="input-box"
                required
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  onClick={(e) => {
                    setIsAdmin(e.target.checked);
                  }}
                />
                <p>Want to be admin</p>
              </div>
              <button
                className="submit-btn"
                style={{
                  backgroundColor: "#4CAF50",
                  color: "white",
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
                onClick={async (e) => {
                  e.preventDefault();
                  const res = await fetch("http://localhost:3001/api/users", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      name: name,
                      email: email,
                      password: password,
                      is_admin: isAdmin,
                    }),
                  });
                  const data = await res.json();
                  console.log(data);
                  //store the token in local storage
                  localStorage.setItem("token", data._id);
                  if (data._id) {
                    window.location.href = "/home";
                  } else {
                    window.alert("something went wrong!");
                  }
                }}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
