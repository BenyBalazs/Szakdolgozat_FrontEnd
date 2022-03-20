import axios from "axios";

export async function getUserDetails() {

   return await axios.post('/administration/check', {token: localStorage.getItem('token')})
}