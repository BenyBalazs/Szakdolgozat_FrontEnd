import axios from "axios";

export async function getUserDetails() {
    console.log(localStorage.getItem('token'))
    return await axios.post('/administration/check', {token: localStorage.getItem('token')})
}

export async function getCategories(type) {
    let queryParams = {transactionType: type}
    return await axios.post('/category/query', {queryParams})
}

export async function postCreateTransaction(name, amount, date, type, category, owner) {

    let createRequest = {
        owner: owner,
        transactionData: {
            name: name,
            amount: amount,
            dateOfPayment: date,
            type: type,
            category: category
        }
    }

    return await axios.post('/transaction', createRequest)

}

export async function postCreateCategory(name, type) {

    let createRequest = {
        categoryData: {
            name: name,
            type: type,
        }
    }

    return await axios.post('/category', createRequest)
}