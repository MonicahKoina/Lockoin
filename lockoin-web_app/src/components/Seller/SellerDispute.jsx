import { useState, useEffect, useContext } from "react";
import { Form, Input, Button, message, Spin, Card } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import PocketBaseContext from "../../pb/PocketBaseContext";

const { TextArea } = Input;

const SellerDispute = () => {
  const pb = useContext(PocketBaseContext);
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState(null);
  const [buyerName, setBuyerName] = useState(""); // State to hold buyer's name
  const [quantity, setQuantity] = useState(""); // State to hold order quantity
  const [price, setPrice] = useState(""); // State to hold order price
  const [deliveryInfo, setDeliveryInfo] = useState(""); // State to hold delivery info
  const navigate = useNavigate();
  const { orderId } = useParams();
  const [form] = Form.useForm();

  // Function to show messages
  const showMessage = (type, content) => {
    message.open({ type, content });
  };

  // Fetch order details on page load
  useEffect(() => {
    const fetchOrder = async () => {
      setLoading(true);
      try {
        const orderData = await pb.collection("orders").getOne(orderId, {
          expand: "buyer_id", // Expands the buyer's details
        });
        setOrder(orderData);

        // Extract and set the buyer's full name
        if (orderData.expand?.buyer_id) {
          const buyer = orderData.expand.buyer_id;
          setBuyerName(`${buyer.first_name} ${buyer.last_name}`);
        }

        // Set additional order details
        setQuantity(orderData.quantity);
        setPrice(orderData.total_price);
        setDeliveryInfo(orderData.delivery_info || "Not available");

        // Set the form fields once the order data is fetched
        form.setFieldsValue({
          order_id: orderData.id,
          product_name: orderData.product_name,
          buyer_name: `${orderData.expand?.buyer_id.first_name} ${orderData.expand?.buyer_id.last_name}`,
          quantity: orderData.quantity,
          total_price: orderData.total_price,
          delivery_info: orderData.delivery_info || "Not available",
        });
      } catch (error) {
        showMessage("error", "Failed to load order details.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId, pb, form]);

  // Handle form submission for declining the order
  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      // Update the order status to "declined" and include the reason
      await pb.collection("orders").update(orderId, {
        status: "declined",
        decline_reason: values.decline_reason,
      });
      showMessage("success", "Order has been declined successfully!");
      navigate("/SellerDashboard");
    } catch (error) {
      showMessage("error", "Failed to decline order.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Spin size="large" className="block mx-auto" />;
  }

  return (
    <div className="container mx-auto px-4 mt-4">
      <Card
        title="Decline Order"
        bordered={false}
        style={{ width: 500, margin: "0 auto" }} // Centered card with width control
      >
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item label="Order ID" name="order_id">
            <Input disabled />
          </Form.Item>
          <Form.Item label="Product Name" name="product_name">
            <Input disabled />
          </Form.Item>
          <Form.Item label="Buyer's Name" name="buyer_name">
            <Input disabled />
          </Form.Item>
          <Form.Item label="Quantity" name="quantity">
            <Input disabled />
          </Form.Item>
          <Form.Item label="Total Price" name="total_price">
            <Input disabled />
          </Form.Item>
          <Form.Item label="Delivery Info" name="delivery_info">
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="decline_reason"
            label="Reason for Declining Order"
            rules={[
              {
                required: true,
                message: "Please provide a reason for declining the order.",
              },
            ]}
          >
            <TextArea rows={4} placeholder="Enter reason for declining" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Submit Decline
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default SellerDispute;
