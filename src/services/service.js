import {
    ethers
} from "ethers"



// 2. 随机创建一个新的钱包
let createRandomWallet = () => {
    let wallet = ethers.Wallet.createRandom()
    // console.log('w2 privateKey :', w2.privateKey)
    // console.log('w2 address :', w2.address)
    return wallet
}



//1. 指定私钥获取钱包
//私钥：256位，随机数种子：128位
let createWalletByPrivatekey = (privateKey) => {
    let w = new ethers.Wallet(privateKey)
    console.log('w1 privateKey :', w.privateKey)
    console.log('w1 address :', w.address)
    return w
}

let checkPrivateKey = (key) => {
    if (key === '') {
        return "不能为空!"
    }

    if (key.length != 66 && key.length != 64) {
        return "密钥长度为66位或64位16进制数字"
    }
    //^ : 开头
    //$ : 结尾
    //(0x)? : 可有可无
    //[0-9A-Fa-f]: 限定取值数据
    //{64}: 限定64个

    if (!key.match(/^(0x)?([0-9A-Fa-f]{64})$/)) {
        return "私钥为16进制表示,限定字符[0-9A-Fa-f]"
    }

    return ""
}



let service = {
    createRandomWallet,
    createWalletByPrivatekey,
    checkPrivateKey,
}

export default service