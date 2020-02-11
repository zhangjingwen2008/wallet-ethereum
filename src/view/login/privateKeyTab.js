import React, { Component } from "react";
import { Form, Segment, Button } from "semantic-ui-react";
import services from "../../services/service";
import PubSub from "pubsub-js";

class PrivateKeyTab extends Component {
    state = {
        privateKey: "",
        wallet: {}
    };

    handleCreateClick = () => {
        //直接生成私钥即可，不要生成钱包
        let wallet = services.createRandomWallet();
        console.log("prikey :", wallet.privateKey);
        console.log("addr :", wallet.address);
        this.setState({
            privateKey: wallet.privateKey
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

        let wallet = services.createWalletByPrivatekey(privateKey);

        this.setState({
            wallet
        });

        //发布login成功的事件,
        //事件名字
        //传递的数据
        PubSub.publish("onLoginSuccessfully", wallet); //事件名字，事件传递数据

        console.log(this.state.wallet);
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
