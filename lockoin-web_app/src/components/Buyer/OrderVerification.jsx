import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  message,
  Rate,
  Upload,
  Typography,
  Card,
  Space,
  Radio,
} from "antd";
import {
  UploadOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const { Title } = Typography;

function OrderVerification() {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [deliveryStatus, setDeliveryStatus] = useState(null); // To track delivery status
  const navigate = useNavigate(); // useNavigate for redirecting

  const handleFileChange = (info) => {
    let newFileList = [...info.fileList];
    setFileList(newFileList);
  };

  const handleVerify = async (values) => {
    const { orderId, deliveryConfirmed, satisfactionRating, reason, files } =
      values;

    if (deliveryConfirmed === null) {
      message.error("Please confirm if the product was delivered!");
      return;
    }

    if (deliveryConfirmed === false && !reason) {
      message.error("Please provide a reason for non-delivery!");
      return;
    }

    // Notification logic based on delivery status
    let notificationMessage = "";
    if (deliveryConfirmed === true) {
      notificationMessage =
        "Verification complete. Funds will be released to the seller.";
    } else {
      notificationMessage =
        "Verification complete. Funds will be held until the dispute is resolved.";
    }

    // Display the appropriate notification
    message.success(notificationMessage);

    // Log the verification data
    console.log("Order Verification Data:", values);

    // Redirect to the dashboard after successful verification
    navigate("/dashboard");

    // Reset form after submission
    form.resetFields();
  };

  const handleDeliveryStatusChange = (e) => {
    setDeliveryStatus(e.target.value); // Update the delivery status based on user input
  };

  return (
    <div
      className="order-verification-container"
      style={{ display: "flex", justifyContent: "center", padding: "20px" }}
    >
      <Card
        style={{ width: "100%", maxWidth: "600px" }}
        title={
          <Title level={3} className="text-center">
            Order Verification
          </Title>
        }
        extra={
          <Space size="middle">
            <CheckCircleOutlined style={{ color: "green" }} />
            <CloseCircleOutlined style={{ color: "red" }} />
          </Space>
        }
      >
        <Form
          form={form}
          onFinish={handleVerify}
          layout="vertical"
          initialValues={{
            deliveryConfirmed: null,
            satisfactionRating: 3,
          }}
        >
          <Form.Item
            name="orderId"
            label="Order ID"
            rules={[{ required: true, message: "Please enter the order ID!" }]}
          >
            <Input placeholder="Enter the order ID" />
          </Form.Item>

          <Form.Item
            name="deliveryConfirmed"
            label="Has the product been delivered as agreed?"
            rules={[
              {
                required: true,
                message: "Please confirm if the product was delivered!",
              },
            ]}
          >
            <Radio.Group onChange={handleDeliveryStatusChange}>
              <Radio value={true}>Yes</Radio>
              <Radio value={false}>No</Radio>
            </Radio.Group>
          </Form.Item>

          {/* Display a reason input field only if "No" is selected */}
          {deliveryStatus === false && (
            <Form.Item
              name="reason"
              label="Reason for Non-delivery"
              rules={[{ required: true, message: "Please provide a reason!" }]}
            >
              <Input.TextArea
                placeholder="Explain why the product has not been delivered as agreed"
                rows={4}
              />
            </Form.Item>
          )}

          <Form.Item
            name="satisfactionRating"
            label="Buyer Satisfaction (1-5)"
            rules={[
              {
                required: true,
                message: "Please rate the buyer's satisfaction!",
              },
            ]}
          >
            <Rate />
          </Form.Item>

          <Form.Item
            name="files"
            label="Upload Evidence of Delivery"
            valuePropName="fileList"
            getValueFromEvent={(e) => e?.fileList}
          >
            <Upload
              action="/upload" // Set the upload action URL if needed
              listType="picture"
              beforeUpload={() => false} // Disable automatic upload
              onChange={handleFileChange}
              fileList={fileList}
            >
              <Button icon={<UploadOutlined />}>
                Upload Delivery Evidence
              </Button>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Verify and Release Funds
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default OrderVerification;
