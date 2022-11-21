import React, { useEffect, useState } from "react";
import {
  getAllUsers,
  editUserInfo,
  deleteUser,
  resetPassword,
  addUser,
} from "../services/api";
import "./Home.css";
import "./Auth.css";
export default function Home({ user }) {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState({
    fullName: user?.fullName,
    email: user?.email,
    password: user.password,
    mobile: user?.mobile,
  });
  const [newUser, setNewUser] = useState({
    fullName: "",
    email: "",
    password: "",
    mobile: "",
  });
  useEffect(() => {
    getAllUsers()
      .then((res) => setUsers(res.data.data))
      .catch((err) => console.log(err));
  }, [users]);
  const changeHandler = async (e) => {
    setEditUser({ ...editUser, [e.target.name]: e.target.value });
  };
  const changeHandler1 = async (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };
  const changeInfo = async (e) => {
    e.preventDefault();
    const { data } = await editUserInfo(editUser, user?.userId);
    console.log(data);
    alert("done");
    window.location = "/";
  };

  const deleteAccount = async (e) => {
    try {
      e.preventDefault();
      const { data } = await deleteUser(user?.userId);
      localStorage.clear();
      alert("deleted");
      window.location = "/";
    } catch (error) {
      alert(error);
    }
  };

  const resetCred = async (e) => {
    try {
      e.preventDefault();
      const { data } = await resetPassword(user?.userId, {
        defaultPassword: user?.defaultPassword,
      });
      alert("reset done");
      window.location = "/";
    } catch (error) {
      alert(error);
    }
  };
  const handleAddUser = async (e) => {
    try {
      e.preventDefault();
      const { data } = await addUser(newUser);
      alert("success");
      users.push(newUser);
      setNewUser({
        fullName: "",
        email: "",
        password: "",
        mobile: "",
      });
    } catch (error) {
      alert(error);
    }
  };
  return (
    <div className="home">
      <div className="top-sec">
        <div className="users">
          <h1>List of users</h1>
          <table>
            <tr style={{ border: "1px solid" }}>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
            </tr>
            {users.map((user) => {
              return (
                <tr>
                  <td>{user.fullName}</td>
                  <td>{user.email}</td>
                  <td>{user.mobile}</td>
                </tr>
              );
            })}
          </table>
        </div>
        <div className="adduser">
          <h1>Add User</h1>
          <form onSubmit={handleAddUser}>
            <input
              type="fullName"
              name="fullName"
              onChange={changeHandler1}
              value={newUser.fullName}
              placeholder="Enter Your Full Name"
              required
            />
            <br />
            <input
              type="email"
              name="email"
              onChange={changeHandler1}
              value={newUser.email}
              placeholder="Enter Your Email"
              required
            />
            <br />
            <input
              type="password"
              name="password"
              onChange={changeHandler1}
              value={newUser.password}
              placeholder="Enter Password"
              required
            />
            <br />
            <input
              type="mobile"
              name="mobile"
              onChange={changeHandler1}
              value={newUser.mobile}
              placeholder="Enter Your Mobile"
              required
            />
            <br />
            <button type="submit">Add User</button>
            <br />
          </form>
        </div>
      </div>
      <div className="userinfo">
        <h2>My Profile</h2>
        <form>
          <input
            type="fullName"
            name="fullName"
            onChange={changeHandler}
            value={editUser.fullName}
            placeholder="Enter Your Full Name"
            required
          />
          <br />
          <input
            type="email"
            name="email"
            onChange={changeHandler}
            value={editUser.email}
            placeholder="Enter Your Email"
            required
          />
          <br />
          <input
            type="password"
            name="password"
            onChange={changeHandler}
            value={editUser.password}
            placeholder="Enter Password"
            required
          />
          <br />
          <input
            type="mobile"
            name="mobile"
            onChange={changeHandler}
            value={editUser.mobile}
            placeholder="Enter Your Mobile"
            required
          />
          <br />
          <button onClick={changeInfo}>Update Info</button>
          <br />
          <button onClick={deleteAccount}>Delete Account</button>
          <br />
          <button onClick={resetCred}>Reset Password</button>
        </form>
      </div>
    </div>
  );
}
