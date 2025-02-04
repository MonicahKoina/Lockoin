import { useState, useContext, useEffect } from "react";
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

  // Automatically update total when quantity or price changes
  useEffect(() => {
    const newTotal = quantity * price;
    setTotal(newTotal);
    form.setFieldsValue({ total: newTotal });
  }, [quantity, price]);

  const handleSubmit = async (values) => {
    try {
      const orderDetails = {
        buyer_id: buyerId,
        seller_name: values.businessName,
        product_name: values.product,
        quantity: quantity, // Use state value
        price_per_item: price, // Use state value
        total_price: total, // Use state value
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
      await pb.collection("orders").create(orderData);
      message.success("Order confirmed!");
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
        <div className="hidden md:block">
          <img
            src="https://i.pinimg.com/736x/d5/a3/9d/d5a39d53dc65fb57ab961b6982519e22.jpg"
            alt="Order"
            className="h-auto max-h-[70vh] w-auto mb-10"
          />
        </div>

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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Form.Item
                  label="Seller's Business Name"
                  name="businessName"
                  rules={[
                    {
                      required: true,
                      message: "Enter seller's business name.",
                    },
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
              </div>

              {/* Product Quantity Field */}
              <Form.Item label="Product Quantity" name="quantity">
                <div className="flex items-center gap-2">
                  <Button
                    icon={<MinusOutlined />}
                    onClick={() => {
                      const newQuantity = Math.max(1, quantity - 1);
                      setQuantity(newQuantity);
                      form.setFieldsValue({ quantity: newQuantity });
                    }}
                  />
                  <InputNumber
                    min={1}
                    value={quantity}
                    onChange={(value) => {
                      setQuantity(value);
                      form.setFieldsValue({ quantity: value });
                    }}
                  />
                  <Button
                    icon={<PlusOutlined />}
                    onClick={() => {
                      const newQuantity = quantity + 1;
                      setQuantity(newQuantity);
                      form.setFieldsValue({ quantity: newQuantity });
                    }}
                  />
                </div>
              </Form.Item>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Price per Item Field */}
                <Form.Item label="Price (per item)" name="price">
                  <InputNumber
                    min={0}
                    formatter={(value) =>
                      `KES ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }
                    parser={(value) => value.replace(/KES\s?|[,]/g, "")}
                    onChange={(value) => {
                      setPrice(value);
                      form.setFieldsValue({ price: value });
                    }}
                    className="w-full"
                  />
                </Form.Item>

                {/* Total Price Field */}
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
              </div>

              {/* Delivery Information */}
              <Form.Item label="Delivery Information" name="deliveryInfo">
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
        open={isModalVisible}
        onOk={handleConfirmOrder}
        onCancel={() => setIsModalVisible(false)}
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
