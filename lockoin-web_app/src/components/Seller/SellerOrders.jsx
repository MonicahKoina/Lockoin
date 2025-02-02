import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import PocketBaseContext from "../../pb/PocketBaseContext";
import { List, Typography, Card, Button, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const { Title } = Typography;

const SellerOrders = () => {
  const pb = useContext(PocketBaseContext);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem("pocketbase_auth")) || {};
  const sellerId = user?.record?.id || "N/A";

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const records = await pb.collection("orders").getFullList({
          filter: `seller_id = "${sellerId}"`,
          sort: "-created",
          expand: "buyer_id",
        });
        setOrders(records);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [pb, sellerId]);

  useEffect(() => {
    const unsubscribe = pb.collection("orders").subscribe("*", async () => {
      const updatedRecords = await pb.collection("orders").getFullList({
        filter: `seller_id = "${sellerId}"`,
        sort: "-created",
        expand: "buyer_id",
      });
      setOrders(updatedRecords);
    });

    return () => {
      unsubscribe();
    };
  }, [pb, sellerId]);

  const handleAccept = async (orderId) => {
    try {
      await pb.collection("orders").update(orderId, {
        status: "Accepted",
      });
      message.success("Order accepted!");
      navigate(`/delivery/${orderId}`);
    } catch (error) {
      console.error("Error accepting order:", error);
      message.error("Failed to accept order.");
    }
  };

  const handleDecline = async (order) => {
    try {
      await pb.collection("orders").update(order.id, {
        status: "Declined",
      });

      await pb.collection("notifications").create({
        user_id: order.buyer_id,
        message: `Your order for ${order.product_name} has been declined by the seller.`,
        type: "order_declined",
      });

      message.warning("Order declined. Buyer has been notified.");
    } catch (error) {
      console.error("Error declining order:", error);
      message.error("Failed to decline order.");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row lg:h-screen bg-white">
      {/* Left Side - Image */}
      <div className="hidden lg:block lg:w-1/2 lg:h-full mt-10">
        <img
          src="https://i.pinimg.com/736x/df/0e/6c/df0e6cc2eacca5443b1dbba1471e8948.jpg"
          alt="Seller Orders"
          className="h-auto max-h-[70vh] w-auto"
        />
      </div>

      {/* Right Side - Orders List */}
      <div className="w-full lg:w-1/2 p-6 overflow-y-auto">
        <Title level={3} className="text-center">
          Your Orders
        </Title>
        <List
          grid={{ gutter: 16, column: 1 }}
          dataSource={orders}
          renderItem={(item) => (
            <List.Item>
              <Card title={`Order: ${item.product_name}`} bordered={false}>
                <p>
                  <strong>Buyer:</strong> {item.expand?.buyer_id?.firstName}{" "}
                  {item.expand?.buyer_id?.lastName}
                </p>
                <p>
                  <strong>Quantity:</strong> {item.quantity}
                </p>
                <p>
                  <strong>Total Price:</strong> KES {item.total_price}
                </p>
                <p>
                  <strong>Delivery Info:</strong>{" "}
                  {item.delivery_info || "Not available"}
                </p>
                <div className="flex gap-4">
                  <Button type="primary" onClick={() => handleAccept(item.id)}>
                    Accept
                  </Button>
                  <Button
                    className="bg-gray-600 text-white"
                    type="default"
                    onClick={() => handleDecline(item)}
                    icon={<DeleteOutlined />}
                  >
                    Decline
                  </Button>
                </div>
              </Card>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default SellerOrders;
