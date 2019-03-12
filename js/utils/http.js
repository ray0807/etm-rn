import {transaction, crypto} from 'etm-js-rn'
import {TRANSFER_URL, SAVE_LOGIN_URL, USER_KEY} from '../config/Config'

import {storage} from './Storage'

responseData = {
    'success': false,
    'data': null
}

//发送代币
export function sendETM(receiveAddress, amount, msg, secret, secondSecret, callback) {
    let trs = transaction.createTransaction(receiveAddress, amount, msg, secret, secondSecret)

    console.warn(JSON.stringify({"transaction": trs}))

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

export function login(secret, callback) {
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
                address: json.account.address
            };
            callback(true)
            storage.save(USER_KEY, {"secret": secret, "address": json.account.address})
        }
    }).catch((error) => {
        console.error(error);
        callback(false)
    });
}
