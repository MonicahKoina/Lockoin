import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input, Form, Checkbox, Alert, message, Row, Col } from "antd";
import { usePocketBase } from "../../pb/PocketBaseProvider";
import sideImage from "/assets/Lockoin-side-image1.png";
import { ArrowLeftOutlined } from "@ant-design/icons";

function SignupSeller() {
  const [errorText, setErrorText] = useState("");
  const [loading, setLoading] = useState(false);
  const pb = usePocketBase();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    setErrorText("");
    setLoading(true);

    const {
      businessName,
      businessLocation,
      website,
      phoneNumber,
      email,
      password,
      passwordConfirm,
    } = values;

    if (password !== passwordConfirm) {
      setErrorText("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const data = {
        email,
        emailVisibility: false,
        password,
        passwordConfirm,
        businessName,
        businessLocation,
        website,
        phone: phoneNumber,
        role: "seller",
      };

      const record = await pb.collection("users").create(data);
      console.log("✅ Seller created:", record);

      // Show success message
      message.success("Account created successfully! Log in to continue.");

      // Redirect to login immediately after success
      navigate("/login");
    } catch (error) {
      console.error("Signup error:", error);
      if (error.response && error.response.data) {
        const apiError = Object.values(error.response.data).join(" ");
        setErrorText(apiError);
      } else {
        setErrorText(error.message || "An error occurred while registering.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden">
      {/* Side Image */}
      <div className="hidden md:flex md:w-1/2 h-screen">
        <img
          src={sideImage}
          alt="side-image"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Signup Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white px-4 md:px-6 h-screen">
        <div className="w-full max-w-lg flex flex-col">
          {/* Display error message */}
          {errorText && (
            <Alert message={errorText} type="error" className="mb-4" />
          )}

          {/* Back Button */}
          <button
            className="flex items-center text-gray-600 hover:text-blue-500 mb-6"
            onClick={() => navigate("/getstarted")}
          >
            <ArrowLeftOutlined className="mr-2" /> Back
          </button>

          <Form onFinish={handleSubmit} layout="vertical">
            <Row gutter={16}>
              {/* Business Name and Location side by side */}
              <Col span={12}>
                <Form.Item
                  label="Business Name"
                  name="businessName"
                  rules={[
                    {
                      required: true,
                      message: "Please input your business name!",
                    },
                  ]}
                >
                  <Input placeholder="Nike Footwear" />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label="Business Location (Optional)"
                  name="businessLocation"
                >
                  <Input placeholder="Limuru" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              {/* Website and Phone Number side by side */}
              <Col span={12}>
                <Form.Item
                  label="Website"
                  name="website"
                  rules={[
                    { type: "url", message: "Please input a valid URL!" },
                  ]}
                >
                  <Input placeholder="https://www.yourbusiness.com" />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label="Phone Number"
                  name="phoneNumber"
                  rules={[
                    {
                      required: true,
                      message: "Please input your phone number!",
                    },
                    {
                      pattern: /^\+?\d{7,15}$/,
                      message: "Enter a valid phone number.",
                    },
                  ]}
                >
                  <Input placeholder="+254-712345667" />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please input your email!" },
                { type: "email", message: "Enter a valid email address." },
              ]}
            >
              <Input placeholder="name@company.com" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
                {
                  min: 10,
                  message: "Password must be at least 10 characters long.",
                },
              ]}
            >
              <Input.Password placeholder="•••••••••" />
            </Form.Item>

            <Form.Item
              label="Confirm Password"
              name="passwordConfirm"
              dependencies={["password"]}
              rules={[
                { required: true, message: "Please confirm your password!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    return !value || getFieldValue("password") === value
                      ? Promise.resolve()
                      : Promise.reject(new Error("Passwords do not match."));
                  },
                }),
              ]}
            >
              <Input.Password placeholder="•••••••••" />
            </Form.Item>

            <Form.Item
              name="agree"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject("You must agree to the terms."),
                },
              ]}
            >
              <Checkbox>
                I agree to the <a href="#">terms and conditions</a>
              </Checkbox>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block loading={loading}>
                Sign Up
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default SignupSeller;
