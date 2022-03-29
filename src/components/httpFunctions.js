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
            categoryId: category
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

export async function putEditCategory(id ,name, type) {

    let editRequest = {
        categoryEntityData: {
            id: id,
            name: name,
            type: type,
        }
    }

    return await axios.put('/category', editRequest)
}

export async function deleteCategory(id) {
    return await axios.delete('/category/', {params: {id: id}})
}

export async function postQueryCategory(name, type, page, rows) {

    let queryRequest = {
        page: page === 0 ? 1 : page,
        row: rows,
        queryParams: {
            name: name,
            transactionType: type
        }
    }
    console.log(queryRequest)
    return await axios.post('/category/query', queryRequest)
}

export async function getCategoryById(id) {
    return await axios.get('/category/', {params: {id: id}})
}

export async function postTransactionQuery(owner ,name, dateFrom, dateTo, type, categoryId, page, row) {
    let queryRequest = {
        page: page === 0 ? 1 : page,
        row: row,
        queryParams: {
            owner: owner,
            name: name,
            dateOfPaymentFrom: dateFrom,
            dateOfPaymentTo: dateTo,
            type: type,
            categoryId: categoryId
        }
    }
    console.log(queryRequest)
    return await axios.post('/transaction/query', queryRequest)
}

export async function getFinanceDataById(id, owner) {
    return await axios.get('/transaction/', {params: {id: id, owner: owner}})
}

export async function putEditTransaction(id ,name, amount, date, type, category, owner) {

    let editRequest = {
        owner: owner,
        transactionEntityData: {
            id: id,
            name: name,
            amount: amount,
            dateOfPayment: date,
            type: type,
            categoryId: category
        }
    }
    return await axios.put('/transaction/', editRequest)
}

export async function postGetBalance(owner, from, to) {

    let balanceRequest = {
        owner: owner,
        dateOfPaymentFrom: from,
        dateOfPaymentTo: to,
    }
    console.log("balance request")
    console.log(balanceRequest)
    return await axios.post('/balance/', balanceRequest)
}

export async function deleteTransaction(id, owner) {
    return await axios.delete('/transaction/', {params: {id: id, owner: owner}})
}