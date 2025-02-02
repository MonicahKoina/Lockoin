import { useState, useEffect } from "react";
import { Form, Input, Button, Select, message, Spin } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import PocketBaseContext from "../../pb/PocketBaseContext";

const { TextArea } = Input;

const SellerDispute = () => {
  const pb = useContext(PocketBaseContext);
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();
  const { orderId } = useParams();

  const [form] = Form.useForm();

  // Fetch order details on page load
  useEffect(() => {
    const fetchOrder = async () => {
      setLoading(true);
      try {
        const order = await pb.collection("orders").getOne(orderId);
        setOrder(order);
      } catch (error) {
        message.error("Failed to load order.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId, pb]);

  // Handle form submission
  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      // Update the order status and decline reason
      await pb.collection("orders").update(orderId, {
        status: "declined", // Set the order status to "declined"
        decline_reason: values.decline_reason, // Save the decline reason
      });
      message.success("Order has been declined successfully!");
      navigate("/SellerDashboard"); // Redirect seller to their dashboard
    } catch (error) {
      message.error("Failed to decline order.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Spin size="large" className="block mx-auto" />;
  }

  return (
    <div className="container mx-auto px-4 mt-4">
      <h2 className="text-2xl font-semibold mb-4">Dispute Order</h2>
      <Form
        form={form}
        onFinish={handleSubmit}
        initialValues={{
          order_id: order?.id || "",
          product_name: order?.product_name || "",
          seller_name: order?.seller_name || "",
        }}
        layout="vertical"
      >
        <Form.Item label="Order ID" name="order_id">
          <Input disabled value={order?.id} />
        </Form.Item>
        <Form.Item label="Product Name" name="product_name">
          <Input disabled value={order?.product_name} />
        </Form.Item>
        <Form.Item label="Seller Name" name="seller_name">
          <Input disabled value={order?.seller_name} />
        </Form.Item>
        <Form.Item
          name="decline_reason"
          label="Reason for Declining"
          rules={[
            {
              required: true,
              message: "Please provide a reason for declining.",
            },
          ]}
        >
          <TextArea
            rows={4}
            placeholder="Enter reason for declining the order"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Submit Dispute
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SellerDispute;
