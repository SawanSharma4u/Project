import React, { useState } from "react";
import { signIn } from "../services/api";
import './Auth.css'
export default function Auth() {
  const [cred, setCred] = useState({
    email: "",
    password: "",
  });
  const changeHandler = (e) => {
    setCred({ ...cred, [e.target.name]: e.target.value });
  };
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
        const {data: jwt} = await signIn(cred);
        localStorage.setItem("token", jwt.data);
        window.location = "/";
    } catch (error) {
        console.log(error)
    }

  };
  return (
    <div className="auth">
      <form onSubmit={handleSubmit}>
        <h1>Sign In</h1>
        <input
          type="email"
          name="email"
          onChange={changeHandler}
          value={cred.email}
          placeholder="Enter Your Email"
          required
        />
        <br/>
        <input
          type="password"
          name="password"
          onChange={changeHandler}
          value={cred.password}
          placeholder="Enter Password"
          required
        />
        <br/>
        <button type="submit">SignIn</button>
      </form>
    </div>
  );
}
