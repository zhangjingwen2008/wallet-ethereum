import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import LoginTab from "./view/login/login";
import { Container } from "semantic-ui-react";
import PubSub from "pubsub-js"

class App extends Component {
    componentDidMount() {
        // 在挂载的时候，注册login登录成功订阅事件
        PubSub.subscribe('onLoginSuccessfully', this.onLoginSuccessfully)
    }

    onLoginSuccessfully = (eventMsg, data) => {
        console.log('eventMsg :', eventMsg)
        console.log('data :', data)
    }


    render() {
        return (
            <Container>
                <LoginTab />
            </Container>
        );
    }
}

export default App;
