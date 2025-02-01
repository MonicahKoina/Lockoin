import { useNavigate } from "react-router-dom";
import { Button, Card } from "antd";
import {
  BankOutlined,
  DollarCircleOutlined,
  SendOutlined,
  WalletOutlined,
} from "@ant-design/icons";
import Transaction from "/assets/Business Checking Account.jpeg";

const BuyerDashboard = () => {
  const navigate = useNavigate();
  const amount = 34000;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start p-6 sticky">
        {/* Transaction Image */}
        <div className="flex justify-center">
          <img
            src={Transaction}
            alt="Transaction"
            className="h-auto max-h-[70vh] w-auto"
          />
        </div>

        {/* Account Balance and Actions */}
        <div>
          <Card className="bg-blue-400 text-white text-center p-6 rounded-xl shadow-md">
            <div className="text-3xl font-semibold flex items-center justify-center">
              <DollarCircleOutlined className="mr-2" />
              {amount.toLocaleString()} KES
            </div>
            <p className="text-lg mt-2">
              <WalletOutlined className="mr-2" /> In Lockoin Account
            </p>
          </Card>

          {/* Buttons */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            <Button type="dashed" icon={<DollarCircleOutlined />}>
              Fund Wallet
            </Button>
            <Button type="dashed" icon={<BankOutlined />}>
              Withdraw
            </Button>
          </div>

          <Button
            type="primary"
            onClick={() => navigate("/CreateOrder")}
            block
            icon={<SendOutlined />}
            className="mt-6"
          >
            New Lockoin Transaction
          </Button>

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
                    Payment to Dubois B4
                  </p>
                  <p className="text-sm text-gray-500">Jan 23, 2025</p>
                </div>
                <p className="font-semibold text-red-500">- KES 350.00</p>
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </>
  );
};

export default BuyerDashboard;
