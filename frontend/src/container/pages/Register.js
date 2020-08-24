import React from "react";
import { Form, Input, Button, notification, Row, Select} from "antd";
import axios from "../../config/axios";
// import { withRouter } from "react-router-dom";

function Register(props) {
  const layout = {
    labelCol: {
      span: 10,
    },
    wrapperCol: {
      span: 20,
    },
  };

  const { Option } = Select;

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="86">+66</Option>
      </Select>
    </Form.Item>
  );

  const createUser = async (value) => {
    try {
      await axios.post("user/register", {
        username: value.user_id,
        password: value.password,
        name: value.name,
        lastname: value.lastname,
        phone: value.phone,
        address: value.address,
      });
      notification.success({
        message: "สมัครสำเร็จ",
      });
    } catch (error) {
      notification.error({
        message: error.response?.data?.message || "มีบางอย่างผิดพลาด",
      });
    }

    props.history.push("/login");
  };

  return (
    <>
      <Form
        span={20}
        style={{
          paddingTop: "5vh",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <h1>Register</h1>
      </Form>

      <Row
        span={20}
        style={{
          height: "40vh",
          justifyContent: "center",
          alignContent: "center",
          paddingTop: "40vh",
        }}
      >
        <Form
          {...layout}
          initialValues={{
            prefix: "+66",
          }}
          name="nest-messages"
          onFinish={(value) => createUser(value)}
        >
          <Form.Item
            name="user_id"
            label="user_id"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
            hasFeedback
          >
            <Input type="password" placeholder="Password" />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(
                    "The two passwords that you entered do not match!"
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="name"
            label="name"
            rules={[
              {
                required: true,
              },
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
              },
            ]}
          >
            <Input />
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

          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[
              { required: true, message: "Please input your phone number!" },
            ]}
          >
            <Input addonBefore={prefixSelector} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="address"
            label="address"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Row>
    </>
  );
}

export default Register;
// export default withRouter(Register);
