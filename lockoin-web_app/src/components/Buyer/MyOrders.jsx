import { useEffect, useState, useContext } from "react";
import { Table, Tag, Space, Spin, message } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import PocketBaseContext from "../../pb/PocketBaseContext";

const MyOrders = () => {
  const pb = useContext(PocketBaseContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("pocketbase_auth")) || {};
  const buyerId = user?.record?.id || "N/A";

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const records = await pb.collection("orders").getFullList({
          filter: `buyer_id = '${buyerId}'`,
          sort: "-created",
          expand: "seller_id", // Expanding the reference to the seller
        });
        setOrders(records);
      } catch (error) {
        message.error("Failed to fetch orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [pb, buyerId]);

  const columns = [
    {
      title: "Product",
      dataIndex: "product_name",
      key: "product_name",
    },
    {
      title: "Seller",
      key: "seller",
      render: (_, record) => record.expand?.seller_id?.businessName || "N/A", // Accessing the expanded seller data
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Total Price",
      dataIndex: "total_price",
      key: "total_price",
      render: (price) => `KES ${price.toLocaleString()}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        if (!status) return <Tag color="default">Delivered</Tag>; // Handle undefined cases
        let color =
          status === "pending"
            ? "orange"
            : status === "completed"
            ? "green"
            : "red";
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <EyeOutlined style={{ cursor: "pointer", color: "#1890ff" }} />
        </Space>
      ),
    },
  ];

  return (
    <div className="container mx-auto px-4 mt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Image (Hidden on small screens) */}
        <div className="flex justify-center">
          <img
            src="https://i.pinimg.com/originals/14/b0/83/14b083af7954ae3e6417d0b4fc13b61e.gif"
            alt="Orders"
            className="h-auto max-h-[70vh] w-auto mt-16 hidden md:block" // Hidden on small screens, visible on medium and larger
          />
        </div>

        {/* Right: Orders Table */}
        <div className="bg-white p-6 w-full">
          <h2 className="text-2xl font-semibold mb-4">My Orders</h2>
          {loading ? (
            <Spin size="large" className="block mx-auto" />
          ) : (
            <Table columns={columns} dataSource={orders} rowKey="id" />
          )}
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
