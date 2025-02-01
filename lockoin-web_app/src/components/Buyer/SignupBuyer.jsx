import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Checkbox, Row, Col, Alert, message } from "antd";
import { usePocketBase } from "../../pb/PocketBaseProvider";
import sideImage from "/assets/Lockoin-side-image1.png";
import { ArrowLeftOutlined } from "@ant-design/icons";

const SignupBuyer = () => {
  const [errorText, setErrorText] = useState("");
  const [loading, setLoading] = useState(false);
  const pb = usePocketBase();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    setErrorText("");
    setLoading(true);

    const {
      firstName,
      lastName,
      phoneNumber,
      address,
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
        firstName,
        lastName,
        phone: phoneNumber,
        address,
        email,
        emailVisibility: false,
        password,
        passwordConfirm,
        role: "buyer",
      };

      await pb.collection("users").create(data);
      message.success(
        "Account created successfully! Redirecting to login...",
        2
      );
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
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
    <section className="flex flex-col-reverse md:flex-row min-h-screen bg-gray-100">
      {/* Side Image (Hidden on small screens) */}
      <div className="w-full md:w-1/2 h-64 md:h-full hidden md:block">
        <img
          src={sideImage}
          alt="Signup Side"
          className="w-full h-full object-cover rounded-t-lg md:rounded-l-lg"
        />
      </div>

      {/* Signup Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white md:rounded-r-lg shadow-lg py-6 md:py-0 min-h-screen">
        <div className="w-full max-w-lg px-6 md:px-8">
          {/* Display error messages */}
          {errorText && (
            <Alert message={errorText} type="error" className="mb-4" />
          )}

          {/* Back to Get Started */}
          <button
            className="flex items-center text-gray-600 hover:text-blue-500 mb-6"
            onClick={() => navigate(-1)}
          >
            <ArrowLeftOutlined className="mr-2" /> Back
          </button>

          <Form layout="vertical" onFinish={handleSubmit}>
            <Row gutter={16}>
              <Col xs={24} sm={12}>
                <Form.Item
                  label="First Name"
                  name="firstName"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your first name.",
                    },
                  ]}
                >
                  <Input placeholder="First Name" />
                </Form.Item>
              </Col>

              <Col xs={24} sm={12}>
                <Form.Item
                  label="Last Name"
                  name="lastName"
                  rules={[
                    { required: true, message: "Please enter your last name." },
                  ]}
                >
                  <Input placeholder="Last Name" />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              label="Phone Number"
              name="phoneNumber"
              rules={[
                { required: true, message: "Please enter your phone number." },
                {
                  pattern: /^\+?\d{7,15}$/,
                  message: "Enter a valid phone number.",
                },
              ]}
            >
              <Input placeholder="+254-712345667" />
            </Form.Item>

            <Form.Item
              label="Address"
              name="address"
              rules={[
                { required: true, message: "Please enter your address." },
              ]}
            >
              <Input placeholder="Nairobi" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please enter your email." },
                { type: "email", message: "Enter a valid email address." },
              ]}
            >
              <Input placeholder="name@gmail.com" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please enter your password." },
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
                { required: true, message: "Please confirm your password." },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Passwords do not match."));
                  },
                }),
              ]}
            >
              <Input.Password placeholder="•••••••••" />
            </Form.Item>

            <Form.Item
              name="terms"
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
                I agree with the <a href="#">terms and conditions</a>.
              </Checkbox>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full"
                loading={loading}
              >
                Sign Up
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default SignupBuyer;
