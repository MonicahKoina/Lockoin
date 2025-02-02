import { useNavigate } from "react-router-dom";
import { Button, Card } from "antd";
import {
  BankOutlined,
  UnorderedListOutlined,
  WalletOutlined,
} from "@ant-design/icons";

const SellerDashboard = () => {
  const navigate = useNavigate();
  const amount = 34000;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start p-6 sticky">
        {/* Transaction Image */}
        <div className="flex justify-center">
          <img
            src="https://i.pinimg.com/736x/48/d5/d3/48d5d33f5b439bf6a956a38fa42ab4fa.jpg"
            alt="Transaction"
            className="h-auto max-h-[70vh] w-auto"
          />
        </div>

        {/* Account Balance and Actions */}
        <div>
          <Card className="bg-blue-400 text-white text-center p-6 rounded-xl shadow-md">
            <div className="text-3xl font-semibold flex items-center justify-center">
              Balance<br></br>
              KES. {amount.toLocaleString()}
            </div>
            <p className="text-lg mt-2">
              <WalletOutlined className="mr-2" /> In Lockoin Account
            </p>
          </Card>

          {/* Buttons */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            <Button type="dashed" icon={<BankOutlined />}>
              Withdraw
            </Button>
            <Button
              type="primary"
              icon={<UnorderedListOutlined />}
              onClick={() => navigate("/orders")}
            >
              View Orders
            </Button>
          </div>

          {/* Recent Transactions */}
          <Card className="mt-6 shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                Recent Transactions
              </h2>
              <button className="text-blue-500 hover:underline">See All</button>
            </div>
            <ul className="space-y-4">
              <li className="flex items-center justify-between p-4 bg-gray-100 rounded-xl">
                <div>
                  <p className="font-bold text-gray-800">
                    Payment from Buyer Monicah
                  </p>
                  <p className="text-sm text-gray-500">Jan 23, 2025</p>
                </div>
                <p className="font-semibold text-green-500">+ KES 5,000.00</p>
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </>
  );
};

export default SellerDashboard;
