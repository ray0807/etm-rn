import {transaction, crypto} from 'etm-js-rn'
import {TRANSFER_URL, SAVE_LOGIN_URL, USER_KEY, SECOND_PASSWD_URL, GET_TRANSCATIONS_URL} from '../config/Config'

import {storage} from './Storage'

responseData = {
    'success': false,
    'data': null
}

//发送代币
export function sendETM(receiveAddress, amount, msg, secret, secondSecret, callback) {
    let trs = transaction.createTransaction(receiveAddress, amount, msg, secret, secondSecret)


    fetch(TRANSFER_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'magic': 'personal',
            'version': ''
        },
        body: JSON.stringify({"transaction": trs}),
    }).then((response) => {
        if (response.ok) {
            return response.json();
        }
    }).then((json) => {
        callback(json)
        // if (json && json.success) {
        // }
    }).catch((error) => {
        console.error(error);
        callback(null)
    });
}

export function login(secret, secondSecret, callback) {
    fetch(SAVE_LOGIN_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'magic': 'personal',
            'version': ''
        },
        body: JSON.stringify({"publicKey": crypto.getKeys(secret).publicKey}),
    }).then((response) => {
        if (response.ok) {
            return response.json();
        }
    }).then((json) => {
        if (json && json.success) {
            global.user = {
                loginState: true,//登录状态
                userData: {},//用户数据
                secret: secret,
                address: json.account.address,
                secondSecret
            };
            callback(true)
            storage.save(USER_KEY, {
                "secret": secret,
                "address": json.account.address,
                'secondSecret': secondSecret
            })
        }
    }).catch((error) => {
        console.error(error);
        callback(false)
    });
}


export function setSecondPassword(secret, secondSecret, callback) {
    fetch(SECOND_PASSWD_URL, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'magic': 'personal',
            'version': ''
        },
        body: JSON.stringify({"secret": secret, "secondSecret": secondSecret}),
    }).then((response) => {
        if (response.ok) {
            return response.json();
        }
    }).then((json) => {
        callback(json)

        if (json && json.success) {

            global.user.secondSecret = secondSecret
            storage.save(USER_KEY, {
                "secret": secret,
                "address": global.user.address,
                "secondSecret": secondSecret
            })
        }
    }).catch((error) => {
        console.error(error);
        callback(false)
    });
}


//获取该用户前十条转账记录
//http://etm.red:8097/api/transactions?recipientId=A2uWo5F3YTyTbxqbpXKqyXmNJNA4oRrTb8&limit=10&orderBy=t_timestamp:desc
//http://etm.red:8097/api/transactions?senderId=A2uWo5F3YTyTbxqbpXKqyXmNJNA4oRrTb8&orderBy=t_timestamp:desc&limit=10
export function getBalanceTranscations(address, callback) {
    let incomeUrl = "http://etm.red:8097/api/transactions?recipientId=" + address + "&limit=10&orderBy=t_timestamp:desc"
    let outcomeUrl = "http://etm.red:8097/api/transactions?senderId=" + address + "&orderBy=t_timestamp:desc&limit=10"
    fetch(incomeUrl, {
        method: 'GET'
    }).then((response) => {
        if (response.ok) {
            return response.json();
        }
    }).then((json) => {
        callback(json)
    }).catch((error) => {
        console.error(error);
        callback(false)
    });

    fetch(outcomeUrl, {
        method: 'GET'
    }).then((response) => {
        if (response.ok) {
            return response.json();
        }
    }).then((json) => {
        callback(json)
    }).catch((error) => {
        console.error(error);
        callback(false)
    });
}
