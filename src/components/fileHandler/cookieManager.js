import {Cookies, useCookies} from "react-cookie";


export function createAuthTokenCookie(token) {

    let d = new Date();
    d.setTime(d.getTime() + 1000 * 60 * 60 * 10);
    document.cookie = "authTokenCookie=" + token + "; expires=" + d.toUTCString() + "; path=/";
}

export function getAuthToken() {
    console.log(document.cookie)
}