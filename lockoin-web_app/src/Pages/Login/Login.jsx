import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import side from "/assets/Lockoin-side-image1.png";
import PocketBaseContext from "../../pb/PocketBaseContext";
import { Button, Form, Input, message } from "antd";
import { LockOutlined, ArrowLeftOutlined } from "@ant-design/icons";

function Login() {
  const [loading, setLoading] = useState(false);
  const pb = useContext(PocketBaseContext);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    const { email, password } = values;
    setLoading(true);
    try {
      await pb.collection("users").authWithPassword(email, password);

      navigate("/dashboard");

      message.success("Welcome to Lockoin!");
    } catch (error) {
      console.error("Login failed:", error);
      message.error("Invalid Credentials. Please try again.");
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen ">
      {/* Left Side Image - Hidden on Small Screens */}
      <div className="hidden md:flex md:w-1/2 h-full">
        <img
          src={side}
          alt="Side illustration"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-6">
        <div className="max-w-md w-full p-8">
          {/* Back Button */}
          <button
            className="flex items-center text-gray-600 hover:text-blue-500 mb-4"
            onClick={() => navigate("/")}
          >
            <ArrowLeftOutlined className="mr-2" /> Back
          </button>

          {/* Form Title */}
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
            Login to Your Account
          </h2>

          {/* Login Form */}
          <Form
            onFinish={handleSubmit}
            layout="vertical"
            initialValues={{ email: "", password: "" }}
          >
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Please enter your email!" },
                { type: "email", message: "Invalid email format!" },
              ]}
            >
              <Input
                type="email"
                placeholder="name@domain.com"
                autoFocus
                className="rounded-md"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: "Please enter your password!" },
              ]}
            >
              <Input.Password
                placeholder="Your password"
                className="rounded-md"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                icon={<LockOutlined />}
                loading={loading}
                className="rounded-md"
              >
                Login
              </Button>
            </Form.Item>

            {/* Forgot Password Link */}
            <div className="text-center">
              <a
                href="/forgot-password"
                className="text-sm text-blue-500 hover:underline"
              >
                Forgot password?
              </a>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Login;
