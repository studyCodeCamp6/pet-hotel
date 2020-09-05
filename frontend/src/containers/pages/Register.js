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
      <Option value="66">+66</Option>
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
        message: "register successfully",
      });
    } catch (error) {
      notification.error({
        message: error.response?.data?.message || "something went wrong",
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
                src={require("./pic/hotel_logo_black.png")}
              />
            </Row>
            <Form.Item
              name="username"
              label="Username"
              rules={[
                {
                  required: true,
                  message: "please input username!!",
                },
                {
                  validator(rule, val) {
                    let regex = /^[a-z0-9_-]{3,15}$/;
                    if (regex.test(val) && val) {
                      return Promise.resolve()
                    } else {
                      return Promise.reject("username should contain 3-15 characters or numbers")
                    }
                  }
                }
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: "please enter password!!",
                },
                {
                  validator(rule, val) {
                    let regex = /^[a-z0-9_-]{8,}$/;
                    if (regex.test(val) && val) {
                      return Promise.resolve()
                    } else {
                      return Promise.reject("password should contain 8 numbers or characters")
                    }
                  }
                }
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
                    return Promise.reject("confirm password not match password")
                  }
                })
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="firstname"
              label="Name"
              rules={[
                {
                  required: true,
                  message: "Please input your name!!",
                },
                {
                  validator(rule, val) {
                    let regex = /^[a-zA-Z]{3,}$/;
                    if (regex.test(val) && val) {
                      return Promise.resolve()
                    } else {
                      return Promise.reject("name should contain at least 3 characters")
                    }
                  }
                }
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="lastname"
              label="lastname"
              rules={[
                {
                  required: true,
                  message: "Please input your lastname!!"
                },
                {
                  validator(rule, val) {
                    let regex = /^[a-zA-Z]{3,}$/;
                    if (regex.test(val) && val) {
                      return Promise.resolve()
                    } else {
                      return Promise.reject("lastname should contain at least 3 characters")
                    }
                  }
                }
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="phone"
              label="Phone Number"
              rules={[
                {
                  required: true,
                  message: "Please input your phone number!",
                },
                {
                  validator(rule, val) {
                    let regex = /^[0-9]{9}$/;
                    if (regex.test(val) && val) {
                      return Promise.resolve()
                    } else {
                      return Promise.reject("phone number should contain 9 number")
                    }
                  }
                }
              ]}
            >
              <Input addonBefore={prefixSelector} />
            </Form.Item>

            <Form.Item
              name="email"
              label="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!"
                },
                {
                  validator(rule, val) {
                    let regex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
                    if (regex.test(val) && val) {
                      return Promise.resolve()
                    } else {
                      return Promise.reject("this is not email format")
                    }
                  }
                }
              ]}
            >
              <Input />
            </Form.Item>
            <Row justify="end">
              <Button htmlType="submit">Register</Button>
            </Row>
          </Form>
        </Col>
      </Row>
    </>
  );
}

export default withRouter(Register);
