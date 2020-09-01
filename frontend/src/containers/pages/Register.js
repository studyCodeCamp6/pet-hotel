import React from "react";
import { Form, Input, Button, notification, Row, Col, Select } from "antd";
import axios from "../../config/axios";
import { withRouter } from "react-router-dom";

const formLayout = {
  labelCol: { xs: 24, sm: 24, md: 5, lg: 7, xl: 7 },
  wrapperCol: { xs: 24, sm: 24, md: 19, lg: 17, xl: 17 },
};

const { Option } = Select;
const prefixSelector = (
  <Form.Item name="prefix" noStyle>
    <Select style={{ width: 70 }}>
      <Option value="86">+66</Option>
    </Select>
  </Form.Item>
);

function Register(props) {
  const onFinish = async (values) => {
    try {
      await axios.post("/customers/register", {
        username: values.username,
        password: values.password,
        name: values.firstname,
        lastName: values.lastname,
        phoneNumber: values.phone,
        email: values.email,
      });

      props.history.push("/");
      notification.success({
        message: "สมัครสำเร็จ",
      });
    } catch (error) {
      notification.error({
        message: error.response?.data?.message || "มีบางอย่างผิดพลาด",
      });
    }
  };

  return (
    <>
      <Row justify="center" align="middle" style={{ height: "100%" }}>
        <Col xs={23} sm={20} md={20} lg={12} xl={10}>
          <Form {...formLayout} onFinish={onFinish}>
            <Row justify="center" style={{ margin: "20px" }}>
              <img
                style={{ width: "100%", maxWidth: "250px" }}
                alt="logo"
                src=""
              />
            </Row>
            <Form.Item
              name="username"
              label="Username"
              rules={[
                { required: true, message: "กรุณาใส่ Username ด้วยนะครับ" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: "กรุณาใส่ Password ด้วยครับ" },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
                        name="confirm"
                        label="Confirm Password"
                        hasFeedback
                        dependencies={['password']}
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(rule, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve()
                                    }
                                    return Promise.reject("Confirm password again please")
                                }
                            })
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
            <Form.Item
              name="firstname"
              label="Name"
              rules={[{ required: true, message: "กรุณาใส่ชื่อด้วยนะครับ" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="lastname"
              label="lastName"
              rules={[{ required: true, message: "กรุณาใสj=njvด้วยนะครับ" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="phone"
              label="Phone Number"
              rules={[
                { required: true, message: "Please input your phone number!" },
              ]}
            >
              <Input addonBefore={prefixSelector} />
            </Form.Item>

            <Form.Item
              name="email"
              label="email"
              rules={[
                {
                  type: "email",
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Row justify="end">
              <Button htmlType="submit">ลงทะเบียน</Button>
            </Row>
          </Form>
        </Col>
      </Row>
    </>
  );
}

export default withRouter(Register);
