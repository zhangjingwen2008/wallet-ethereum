import React, { Component } from "react";
import AccountTab from "./accountTab";
import TransactionTab from "./transactionTab";
import SettingTab from "./settingTab";
import { ethers } from "ethers";
import service from "../../services/service";
import { Select } from "semantic-ui-react";

class Wallets extends Component {
    constructor(props) {
        super(props);
        //state变量，
        //1. 如果实现了构造函数，在构造函数内使用方式：this.state = {xxxx}
        //2. 如果在构造函数外使用，直接state= {xxxx}
        this.state = {
            wallets: props.wallets, //未连接到网络
            walletSelected: 0, //默认使用第0

            //与AccountTab(当前钱包相关的数据）
            address: "",
            balance: 0,
            txCount: 0,
            walletActive: "" //已经连接到区块链的钱包，可以直接与网络交互
        };
    }

    componentDidMount() {
        try {
            this.updateCurrentWallet(this.state.walletSelected);
            console.log("wallets数据:", this.state.wallets);
        } catch (error) {
            console.log(error);
        }
    }

    //获取wallet在指定以太网网络的详情 : address, balance, txCount
    async updateCurrentWallet(index) {
        //获取钱包
        // let wallet = this.state.wallets[this.state.walletSelected];
        let wallet = this.state.wallets[index];
        console.log("wallet 1111 : ", wallet);

        //连接到指定的网络
        //连接到巧克力，或ropsten等
        //1. 创建provider
        let provider = new ethers.providers.JsonRpcProvider(
            "http://127.0.0.1:7545"
        );
        console.log("provider 2222:", provider);
        //2. 钱包连接provider
        let walletActive = wallet.connect(provider);
        console.log("wallet 2222 : ", wallet);
        console.log("walletActive 3333 : ", walletActive);

        //获取address, balance, txCount
        let address = await walletActive.getAddress(); //会做一些处理
        let balance = await walletActive.getBalance();
        let txCount = await walletActive.getTransactionCount();

        console.log("address :", address);
        console.log("balance :", ethers.utils.formatEther(balance));
        console.log("txCount :", txCount);

        //设置到状态变量
        this.setState({ address, balance, txCount, walletActive });
    }

    onSendClick = async (txto, txvalue) => {
        console.log("txto: ", txto);
        console.log("txvalue: ", txvalue);

        //txto是否为有效地址
        if (!service.checkAddress(txto)) {
            alert("转账地址无效!");
            return;
        }

        //txvalue是否为数字
        if (isNaN(txvalue)) {
            alert("转账数字无效!");
            return;
        }

        //转账逻辑
        let walletActive = this.state.walletActive; //得到激活的钱包

        //这个转换动作必须做，否则不满足转账数据类型, 会出错
        txvalue = ethers.utils.parseEther(txvalue);
        console.log("txvalue222 : ", txvalue);

        try {
            let res = await walletActive.sendTransaction({
                to: txto,
                value: txvalue
            });
            console.log("转账返回结果详细信息 :", res);
            alert("转账成功!");

            //更新展示页面
            this.updateCurrentWallet(this.state.walletSelected);
        } catch (error) {
            alert("转账失败!");
            console.log(error);
        }
    };

    onChangeClicked = index => {
        console.log("当前选择的index:", index);
        this.updateCurrentWallet(index);
    };

    render() {
        let { wallet } = this.state;
        return (
            <div>
                {this.state.wallets.length > 1 && (
                    <Select
                        onChange={(event, data) => {
                            this.onChangeClicked(data.value);
                        }}
                        placeholder="请选择地址:"
                        options={service.addressIndexOptions}
                    />
                )}
                <AccountTab allInfo={this.state} />
                <TransactionTab onSendClick={this.onSendClick} />
                {this.state.walletActive && (
                    <SettingTab walletActive={this.state.walletActive} />
                )}
            </div>
        );
    }
}

export default Wallets;
