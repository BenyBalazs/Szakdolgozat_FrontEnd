import React from 'react';
import axios from 'axios';

const USER_PATH = "/user"

export async function loginFunction(username, password) {

    let userLogin = {username: username, password: password}
    return await axios.post(USER_PATH + "/login", userLogin)

}
