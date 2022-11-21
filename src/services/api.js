import axios from "axios";

// const server_domain = "";
const server_domain = "https://project-api.onrender.com";

////////////////////////Auth////////////////////////
// function to send signin request to backend
export const signIn = (form) => {
  return axios.post(server_domain + "/signin", form);
};

// function to add user
export const addUser = (form) => {
  return axios.post(server_domain + "/adduser", form);
};

//get all users
export const getAllUsers = () => {
    return axios.get(server_domain + "/getusers");
}

//get user detail
export const getUser = (userId) => {
    return axios.get(server_domain + "/getuser/" + userId);
}

//edit user
export const editUserInfo = (form, userId) => {
    return axios.put(server_domain + "/edituser/" + userId, form);
}

//delete user
export const deleteUser = (userId) => {
    return axios.delete(server_domain + "/deleteuser/" + userId);
}

//reset bydefault password
export const resetPassword = (userId, form) => {
    return axios.put(server_domain + '/resetpassword/' + userId, form);
}