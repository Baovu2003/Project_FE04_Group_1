


import React, { useEffect } from "react";
import { Form, Input, Button, Checkbox, Card, message, Col, Row } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getCookie } from "../../../Helpers/Cookie.helper";
import { get, post } from "../../../Helpers/API.helper";
import { ApiResponse, User } from "../../../actions/types";
import { showSuccessAlert } from "../../../Helpers/alerts";
import { userActions } from "../../../actions/UserAction";

// Interface definitions

interface LoginResponse {
  tokenUser: string;
  user: User;
}

interface LoginFormValues {
  username: string;
  password: string;
  remember: boolean;
}

const LoginUser: React.FC = () => {
  const [form] = Form.useForm<LoginFormValues>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const tokenUser = getCookie("tokenUser");
  console.log("tokenUser", tokenUser)

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const accountByToken: ApiResponse = await get(`http://localhost:5000/user/${tokenUser}`);
        console.log("accountByToken.account", accountByToken.user);

        if (accountByToken && accountByToken.user) {
          dispatch(userActions(accountByToken));
          navigate("/");
        } else {
          throw new Error("User not found in the response.");
        }
      } catch (error) {
        console.error("Error fetching account by token:", error);
        navigate("/user/login");
      }
    };

    if (tokenUser) {
      fetchApi();
    } else {
      navigate("/user/login");
    }
  }, [tokenUser, dispatch, navigate]);


  const handleSubmit = async (values: LoginFormValues) => {
    try {
      const data: LoginResponse = await post("http://localhost:5000/user/login", {
        email: values.username,
        password: values.password,
      });

      console.log(data)
      if (data.tokenUser) {
        showSuccessAlert("Success!", "You have logged in successfully.");
        document.cookie = `tokenUser=${data.tokenUser}; path=/; max-age=86400`;
        document.cookie = `token=; path=/; max-age=0`; // Clear token cookie

        // Dispatch both account and role
        dispatch(userActions({
          user: data.user,
        }));


        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        throw new Error("Token not received. Login failed.");
      }
    } catch (error) {
      if (error instanceof Error) {
        message.error(error.message);
      } else {
        message.error("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#f0f2f5',
      }}
    >
      <Card style={{ width: 800, padding: '24px' }}>
        <Row gutter={16}>
          <Col span={12} className="text-center">
            <img
              src="/images/Login.png"
              alt="Logo"
              style={{ height: '200px', width: '200px' }}
            />
          </Col>
          <Col span={12}>
            <h2 style={{ textAlign: 'center', marginBottom: '24px' }}>Sign in</h2>
            <Form
              form={form}
              name="login"
              onFinish={handleSubmit}
              initialValues={{ remember: true }}
              layout="vertical"
            >
              <Form.Item
                name="username"
                rules={[{ required: true, message: "Please input your username!" }]}
              >
                <Input
                  prefix={<UserOutlined />}
                  placeholder="Username"
                  size="large"
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[{ required: true, message: "Please input your password!" }]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Password"
                  size="large"
                />
              </Form.Item>

              <Form.Item name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: '100%' }}
                  size="large"
                >
                  Login
                </Button>
              </Form.Item>
            </Form>
            <Link
              to={`/user/password/forgot`}
              className={`btn btn-primary me-2 `}
            >
              Forgot password
            </Link>

          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default LoginUser;
