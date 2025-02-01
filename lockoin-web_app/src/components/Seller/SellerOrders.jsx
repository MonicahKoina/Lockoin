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
        console.log("Fetching orders for seller ID:", sellerId);
        const records = await pb.collection("orders").getFullList({
          filter: `seller_id = "${sellerId}"`,
          sort: "-created",
          expand: "buyer_id", // Expanding the buyer_id field to get buyer details
        });
        console.log("Fetched orders:", records);
        setOrders(records);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [pb, sellerId]);

  useEffect(() => {
    const unsubscribe = pb.collection("orders").subscribe("*", async (e) => {
      console.log("Real-time update received:", e);
      const updatedRecords = await pb.collection("orders").getFullList({
        filter: `seller_id = "${sellerId}"`,
        sort: "-created",
        expand: "buyer_id", // Expanding the buyer_id field to get buyer details
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

      // Create notification for the buyer
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
    <div className="mt-6 flex flex-col lg:flex-row h-screen">
      {/* Left Side - Image, hidden on small screens */}
      <div className="hidden lg:block w-full lg:w-1/2 h-1/2 lg:h-full">
        <img
          src="https://i.pinimg.com/736x/ae/79/c3/ae79c3631efaa65805cdf99f460c84c6.jpg"
          alt="Seller Orders"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Side - Orders List */}
      <div className="w-full lg:w-1/2 h-1/2 lg:h-full p-8 overflow-y-auto bg-white">
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
                  <strong>Buyer:</strong>
                  {item.expand?.buyer_id?.firstName || "N/A"}{" "}
                  {item.expand?.buyer_id?.lastName || "N/A"}
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
                <Button type="primary" onClick={() => handleAccept(item.id)}>
                  Accept
                </Button>
                <Button
                  className="bg-red-600 text-white"
                  type="danger"
                  onClick={() => handleDecline(item)}
                  icon={<DeleteOutlined />}
                  style={{ marginLeft: "10px" }}
                >
                  Decline
                </Button>
              </Card>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default SellerOrders;
