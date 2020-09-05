import React from "react";
import { Row, Col, Form, Input, Button, notification } from "antd";
import { Link } from "react-router-dom";
import axios from "../../config/axios";
import { withRouter } from "react-router-dom";
import LocalStorageService from "../../services/LocalStorage";

const formItemLayout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

function Login(props) {
  function onFinish({ username, password }) {
    axios
      .post("/customers/login", { username, password })
      .then((result) => {
        LocalStorageService.setToken(result.data.accessToken);
        props.setRole("user");
        props.history.push("/login");
        notification.success({
          message: "login successfully",
        });
      })
      .catch((err) => {
        notification.error({
          message: err.response?.data?.message || "failed to login",
        });
      });
  }

  const onFinished = (fieldsValue) => {
    const rangeTimeValue = fieldsValue["range-time-picker"];
    const values = {
      ...fieldsValue,
      "range-time-picker": [
        rangeTimeValue[0].format("YYYY-MM-DD HH:mm:ss"),
        rangeTimeValue[1].format("YYYY-MM-DD HH:mm:ss"),
      ],
    };
    console.log("Received values of form: ", values);
  };
  return (
    <Row style={{ height: "100vh" }} justify="center" align="middle">
      <Col xs={15} sm={7} md={9} lg={7} xl={6} xxl={5}>
        <img style={{ width: "100%" }} alt="logo" src={require("./pic/hotel_logo_black.png")} />
      </Col>
      <Col xs={0} sm={2} md={2} lg={2} xl={2} xxl={2}></Col>
      <Col xs={20} sm={9} md={9} lg={8} xl={6} xxl={5}>
        <Form
          name="time_related_controls"
          {...formItemLayout}
          onFinish={onFinished}
        ></Form>
        <Form onFinish={onFinish} {...formItemLayout}>
          <Row>
            <Form.Item
              style={{ width: "100%" }}
              label="Username"
              name="username"
              rules={[{ required: true, message: "please enter username" }]}
            >
              <Input />
            </Form.Item>
          </Row>
          <Row>
            <Form.Item
              style={{ width: "100%" }}
              label="Password"
              name="password"
              rules={[{ required: true, message: "please enter Password" }]}
            >
              <Input.Password />
            </Form.Item>
          </Row>
          <Row justify="space-around">
            <Col>
              <Link to="/register">
                <Button type="link">Register</Button>
              </Link>
            </Col>
            <Col>
              <Button htmlType="submit" type="primary">
                Login
              </Button>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
}

export default withRouter(Login);
