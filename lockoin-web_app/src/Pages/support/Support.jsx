import { useState } from "react";
import { Form, Input, Button, message, Divider } from "antd";
import { MailOutlined, PhoneOutlined } from "@ant-design/icons";

const Support = () => {
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (values) => {
    setLoading(true);
    try {
      // Simulate form submission
      console.log(values);
      message.success("Your message has been sent!");
    } catch (error) {
      message.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 md:px-8 lg:px-16">
      {/* Title */}
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800">
          Need Support?
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 mt-4">
          We are here to help! Please fill out the form below, and we'll get
          back to you as soon as possible.
        </p>
      </div>

      {/* Contact Form */}
      <section className="mb-12">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-800 mb-6 text-center">
          Contact Us
        </h2>
        <Form
          name="contact_form"
          layout="vertical"
          onFinish={handleFormSubmit}
          className="max-w-3xl mx-auto"
        >
          <Form.Item
            name="name"
            label="Your Name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input placeholder="Enter your name" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email Address"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Invalid email address!" },
            ]}
          >
            <Input placeholder="name@example.com" />
          </Form.Item>

          <Form.Item
            name="message"
            label="Message"
            rules={[{ required: true, message: "Please input your message!" }]}
          >
            <Input.TextArea placeholder="Write your message" rows={4} />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              icon={<MailOutlined />}
              loading={loading}
            >
              Send Message
            </Button>
          </Form.Item>
        </Form>
      </section>

      <Divider />

      {/* Contact Information */}
      <section>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-800 mb-6 text-center">
          Get in Touch
        </h2>
        <div className="space-y-4">
          <div className="flex items-center gap-4 justify-center sm:justify-start">
            <PhoneOutlined className="text-lime-600 text-2xl sm:text-3xl" />
            <span className="text-lg text-gray-600">+1 800-123-4567</span>
          </div>
          <div className="flex items-center gap-4 justify-center sm:justify-start">
            <MailOutlined className="text-lime-600 text-2xl sm:text-3xl" />
            <span className="text-lg text-gray-600">support@lockoin.com</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Support;
