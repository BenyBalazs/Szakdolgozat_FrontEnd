export default function logout() {

    localStorage.removeItem('loggedIn')
    localStorage.removeItem('token')
}