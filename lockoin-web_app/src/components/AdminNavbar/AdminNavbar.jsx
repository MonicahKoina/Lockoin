import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Drawer,
  Avatar,
  Button,
  Menu,
  Typography,
  Space,
  Dropdown,
  Badge,
} from "antd";
import {
  MenuOutlined,
  LockOutlined,
  DashboardOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  NotificationFilled,
  LogoutOutlined,
  BellOutlined,
  CheckCircleFilled,
  SendOutlined,
} from "@ant-design/icons";
import Logo from "/assets/Lockoin-logo.png";

function AdminNavbar() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  const user = JSON.parse(localStorage.getItem("pocketbase_auth"));

  const handleLogout = () => {
    // Clear auth data and navigate to login page
    localStorage.removeItem("pocketbase_auth");
    navigate("/Login");
  };
  const buyerMenuItems = [
    {
      key: "1",
      icon: <DashboardOutlined />,
      label: "Dashboard",
      onClick: () => navigate("/dashboard"),
    },
    {
      key: "4",
      icon: <SendOutlined />,
      label: "Create Order",
      onClick: () => navigate("/CreateOrder"),
    },
    {
      key: "5",
      icon: <CheckCircleFilled />,
      label: "Verify order",
      onClick: () => navigate("/orderverification"),
    },
  ];
  const menuItems = [
    {
      key: "1",
      icon: <DashboardOutlined />,
      label: "Dashboard",
      onClick: () => navigate("/dashboard"),
    },
    {
      key: "2",
      icon: <ShoppingCartOutlined />,
      label: "Orders",
      onClick: () => navigate("/orders"),
    },
    {
      key: "3",
      icon: <NotificationFilled />,
      label: "Notifications",
      onClick: () => navigate("/notification"),
    },
  ];

  return (
    <>
      <nav className="w-full px-6 h-16 flex items-center justify-between bg-white shadow-md">
        <Space>
          <Button
            type="text"
            icon={<MenuOutlined />}
            onClick={() => setVisible(true)}
            className="text-xl"
            aria-label="Open sidebar menu"
          />
          <img src={Logo} alt="Lockoin Logo" className="size-1/2" />
        </Space>
        <Space className="gap-4">
          <Badge count={2}>
            <BellOutlined
              style={{ fontSize: "20px", cursor: "pointer" }}
              onClick={() => navigate("/notification")}
            />
          </Badge>

          <Dropdown
            // trigger={["click"]}
            menu={{
              items: [
                {
                  key: "profile",
                  icon: <UserOutlined />,
                  label: "Profile",
                },
                {
                  key: "logout",
                  icon: <LogoutOutlined />,
                  label: "logout",
                  danger: true,
                },
              ],
            }}
          >
            <Space align="center">
              <Avatar icon={<UserOutlined />} />
              <Typography.Text>
                {user?.record?.firstName || user?.record?.businessName}
              </Typography.Text>
            </Space>
          </Dropdown>
        </Space>
      </nav>

      {/* Sidebar Drawer */}
      <Drawer
        title={
          <Space>
            <LockOutlined />
            <img src={Logo} alt="Lockoin Logo" className="size-1/2" />
          </Space>
        }
        placement="left"
        onClose={() => setVisible(false)}
        open={visible} // use "open" prop instead of "visible"
        width={200}
        footer={
          <Button
            icon={<LockOutlined />}
            onClick={handleLogout}
            type="primary"
            block
          >
            Logout
          </Button>
        }
        closable={false} // Optional: hides the close button
      >
        {user && user?.record?.role === "buyer" ? (
          <Menu
            mode="vertical"
            selectable
            items={buyerMenuItems}
            style={{ border: "none" }}
          />
        ) : (
          <Menu
            mode="vertical"
            style={{ border: "none" }}
            selectable
            items={menuItems}
          />
        )}
      </Drawer>
    </>
  );
}

export default AdminNavbar;
