import React, { Component } from "react";
import { Form, Segment, Button } from "semantic-ui-react";
import services from "../../services/service";
import PubSub from "pubsub-js";

class PrivateKeyTab extends Component {
    state = {
        privateKey: "",
        wallets: [] //数组
    };

    handleCreateClick = () => {
        //直接生成私钥即可，不要生成钱包
        // let wallet = services.createRandomWallet();
        // console.log("prikey :", wallet.privateKey);
        // console.log("addr :", wallet.address);

        //做了修改，视频里没有说
        let privateKey = services.createRandomKey();

        this.setState({
            privateKey
        });
    };

    //捕捉数据
    handleChange = (e, { name, value }) => {
        this.setState({
            [name]: value
        });
        console.log("name :", name);
        console.log("value :", value);
    };

    onPrivateLoginClick = () => {
        //获取私钥（自动生成，用户输入）
        let privateKey = this.state.privateKey;
        console.log("111 : ", privateKey);
        let res = services.checkPrivateKey(privateKey);

        if (res) {
            alert(res);
            return;
        }

        //单个钱包
        let wallet = services.createWalletByPrivatekey(privateKey);

        if (wallet) {
            let wallets = [];
            wallets.push(wallet); //得到了只有一个wallet的钱包数组

            this.setState({
                wallets
            });

            //发布login成功的事件,
            //事件名字
            //传递的数据
            PubSub.publish("onLoginSuccessfully", wallets); //事件名字，事件传递数据
            console.log(this.state.wallets);
        } else {
            alert("私钥生成钱包失败!");
        }
    };

    render() {
        return (
            <Form size="large">
                <Segment>
                    <Form.Input
                        fluid
                        icon="lock"
                        iconPosition="left"
                        placeholder="private key"
                        name="privateKey"
                        value={this.state.privateKey}
                        onChange={this.handleChange}
                    />{" "}
                    <Button onClick={this.handleCreateClick}> 随机生成 </Button>{" "}
                    <br />
                    <br />
                    <Button
                        color="teal"
                        fluid
                        size="large"
                        onClick={this.onPrivateLoginClick}
                    >
                        私钥导入(下一步){" "}
                    </Button>{" "}
                </Segment>{" "}
            </Form>
        );
    }
}

export default PrivateKeyTab;
