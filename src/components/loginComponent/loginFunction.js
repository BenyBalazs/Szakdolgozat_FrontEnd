import React from 'react';
import axios from 'axios';

const USER_PATH = "http://localhost:8080/api/user/"

export async function loginFunction(username, password) {

    let userLogin = {username: username, password: password}
    console.log(userLogin)
    return await axios.post(USER_PATH + "login", userLogin)

}
