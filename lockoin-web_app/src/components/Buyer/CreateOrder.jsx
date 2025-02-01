import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Input,
  InputNumber,
  Form,
  Typography,
  Space,
  message,
  Modal,
} from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import PocketBaseContext from "../../pb/PocketBaseContext";

const { Title } = Typography;

const CreateOrder = () => {
  const navigate = useNavigate();
  const pb = useContext(PocketBaseContext);
  const [form] = Form.useForm();
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);
  const [total, setTotal] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [orderData, setOrderData] = useState(null);

  const user = JSON.parse(localStorage.getItem("pocketbase_auth")) || {};
  const buyerId = user?.record?.id || "N/A";

  const updateTotal = (newQuantity, newPrice) => {
    const newTotal = newQuantity * newPrice;
    setTotal(newTotal);
    form.setFieldsValue({ total: newTotal });
  };

  const handleSubmit = async (values) => {
    try {
      const orderDetails = {
        buyer_id: buyerId,
        seller_name: values.businessName,
        product_name: values.product,
        quantity: values.quantity,
        price_per_item: values.price,
        total_price: values.quantity * values.price,
        delivery_info: values.deliveryInfo,
        status: "pending",
      };

      setOrderData(orderDetails);
      setIsModalVisible(true);
    } catch (error) {
      console.error(error);
      message.error("An error occurred while processing your order.");
    }
  };

  const handleConfirmOrder = async () => {
    try {
      const order = await pb.collection("orders").create(orderData);

      // Notify the seller
      await pb.collection("notifications").create({
        seller_id: orderData.seller_id,
        title: "New Order Received",
        message: `You have received an order for ${orderData.quantity} ${orderData.product_name}(s).`,
      });

      message.success("Order confirmed and seller notified!");
      // Redirect the buyer to the dashboard after confirmation
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      message.error("Failed to confirm the order.");
    } finally {
      setIsModalVisible(false);
    }
  };

  return (
    <div className="container mx-auto px-4 mt-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Image Section */}
        <div className="hidden md:block">
          <img
            src="https://i.pinimg.com/736x/94/e8/1d/94e81d1c34fa16b05b6d6ad9ada21cbe.jpg"
            alt="Order"
            className="w-full h-auto object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Form Section */}
        <div className="bg-white p-6 w-full">
          <Space direction="vertical" size="large" className="w-full">
            <Title level={3} className="text-center">
              Create a new order
            </Title>
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              initialValues={{ quantity: 1, price: 0, total: 0 }}
            >
              <Form.Item
                label="Seller's Business Name"
                name="businessName"
                rules={[
                  { required: true, message: "Enter seller's business name." },
                ]}
              >
                <Input placeholder="Enter seller's business name" />
              </Form.Item>

              <Form.Item
                label="Product Name"
                name="product"
                rules={[{ required: true, message: "Enter product name." }]}
              >
                <Input placeholder="Enter product name" />
              </Form.Item>

              <Form.Item
                label="Product Quantity"
                name="quantity"
                rules={[{ required: true, message: "Enter a valid quantity." }]}
              >
                <div className="flex items-center gap-2">
                  <Button
                    icon={<MinusOutlined />}
                    onClick={() => {
                      const newQuantity = Math.max(1, quantity - 1);
                      setQuantity(newQuantity);
                      updateTotal(newQuantity, price);
                    }}
                  />
                  <InputNumber
                    min={1}
                    value={quantity}
                    onChange={(value) => {
                      setQuantity(value);
                      updateTotal(value, price);
                    }}
                  />
                  <Button
                    icon={<PlusOutlined />}
                    onClick={() => {
                      const newQuantity = quantity + 1;
                      setQuantity(newQuantity);
                      updateTotal(newQuantity, price);
                    }}
                  />
                </div>
              </Form.Item>

              <Form.Item
                label="Price (per item)"
                name="price"
                rules={[{ required: true, message: "Enter the price." }]}
              >
                <InputNumber
                  min={0}
                  formatter={(value) =>
                    `KES ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/KES\s?|(,*)/g, "")}
                  onChange={(value) => {
                    setPrice(value);
                    updateTotal(quantity, value);
                  }}
                  className="w-full"
                />
              </Form.Item>

              <Form.Item label="Total Price" name="total">
                <InputNumber
                  disabled
                  value={total}
                  formatter={(value) =>
                    `KES ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  className="w-full"
                />
              </Form.Item>

              <Form.Item
                label="Delivery Information"
                name="deliveryInfo"
                rules={[{ required: true, message: "Enter delivery details." }]}
              >
                <Input.TextArea
                  rows={4}
                  placeholder="Enter delivery address or instructions"
                />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" className="w-full">
                  Proceed
                </Button>
              </Form.Item>
            </Form>
          </Space>
        </div>
      </div>

      {/* Order Confirmation Modal */}
      <Modal
        title="Order Confirmation"
        visible={isModalVisible}
        onOk={handleConfirmOrder}
        onCancel={() => setIsModalVisible(false)}
        okText="Confirm Order"
        cancelText="Cancel"
      >
        <p>
          <strong>Seller:</strong> {orderData?.seller_name}
        </p>
        <p>
          <strong>Product:</strong> {orderData?.product_name}
        </p>
        <p>
          <strong>Quantity:</strong> {orderData?.quantity}
        </p>
        <p>
          <strong>Total Price:</strong> KES {orderData?.total_price}
        </p>
        <p>
          <strong>Delivery Info:</strong> {orderData?.delivery_info}
        </p>
      </Modal>
    </div>
  );
};

export default CreateOrder;
