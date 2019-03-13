let nacl = require('tweetnacl')
let nacl_util = require('tweetnacl-util')
let nacl_sealedbox = require('tweetnacl-sealedbox-js');
let ed2curve = require('ed2curve')
let sha256 = require("fast-sha256");
import { randomBytes } from 'react-native-randombytes'

nacl.setPRNG(randomBytes)

function sha256Bytes(data) {
    return Buffer.from(sha256.hash(data))
}

function HexStringToUint8Array(hexString) {
    return new Uint8Array(hexString.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
}

function uint8ArrayToHex(u8Array) {
    return new Buffer(u8Array).toString("hex")
}


//加密
export function encodeString(msg, receivePublicKey) {
    let dmsg = nacl_util.decodeUTF8(msg)
    let u8boxPk = ed2curve.convertPublicKey(HexStringToUint8Array(receivePublicKey))
    console.warn(uint8ArrayToHex(u8boxPk))
    let uint8Array = nacl_sealedbox.seal(dmsg,u8boxPk)
    return uint8ArrayToHex(uint8Array)
}

export function decodeString(encodeMsg, secret) {
    let hash = sha256Bytes(new Buffer(secret))
    let signKeyPair = nacl.sign.keyPair.fromSeed(hash);
    let dhKeys = ed2curve.convertKeyPair(signKeyPair);
    let result = nacl_sealedbox.open(HexStringToUint8Array(encodeMsg), dhKeys.publicKey, dhKeys.secretKey)
    return nacl_util.encodeUTF8(result)
}