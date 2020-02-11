import React, { Component } from "react";
import { Form, Segment, Button } from "semantic-ui-react";
import services from "../../services/service";
import PubSub from "pubsub-js";

class MnemonicTab extends Component {
    render() {
        return (
            <Form size="large">
                <Segment stacked>
                    <Form.TextArea
                        placeholder="12 words"
                        name="mmic"
                        // value={this.state.mmic}
                        onChange={this.handleChange}
                    />
                    <Form.Input
                        fluid
                        icon="user"
                        iconPosition="left"
                        name="path"
                        // value={this.state.path}
                        onChange={this.handleChange}
                    />
                    <Button onClick={this.handleGenMicc}>随机生成</Button>
                    <br/>
                    <br/>

                    <Form.Button onClick={this.onMMICClick} color="teal" fluid size="large">
                        助记词导入(下一步)
                    </Form.Button>
                </Segment>
            </Form>
        );
    }
}

export default MnemonicTab;
