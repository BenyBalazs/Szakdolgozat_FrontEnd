import React from 'react';
import axios from 'axios';

const USER_PATH = "/user"

export async function registerFunction(username, email ,password) {

    let register = {username: username, email: email ,password: password}
    return await axios.post(USER_PATH + "/register", register)

}