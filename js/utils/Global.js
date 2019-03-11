// import global from './StorageUtil'
import {storage} from './Storage'
import {USER_KEY} from '../config/Config'


//用户登录数据
global.user = {
    loginState: '',//登录状态
    userData: '',//用户数据
    secret: '',
    address: '',
};

storage.load(USER_KEY, function (data) {
    if (data && data.secret && data.address) {
        global.user = {
            loginState: true,//登录状态
            userData: {},//用户数据
            secret: data.secret,
            address: data.address
        };
    }

})


//刷新的时候重新获得用户数据
// storage.load({
//     key: 'loginState',
// }).then(ret => {
//
//     global.user = {
//         loginState: true,//登录状态
//         userData: {},//用户数据
//         secret: ret.secret,
//         address: ret.address
//     };
//     console.warn(global.user)
// }).catch(err => {
//     console.warn(err)
//     global.user.loginState = false;
// })