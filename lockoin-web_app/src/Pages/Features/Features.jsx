import "react";
import {
  LockOutlined,
  WalletOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons"; // Import Ant Design Icons

function Features() {
  return (
    <section>
      {/* Container */}
      <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-20 max-h-[75vh]">
        {/* Title */}
        <div className="flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold md:text-5xl">
            Why Choose <span className="text-lime-600">LOCKOIN</span>?
          </h2>
          <p className="mb-8 mt-4 max-w-lg text-base text-gray-500 md:mb-12 md:text-lg lg:mb-16">
            Our platform is designed to bring trust and security to every
            transaction. Here’s how we make online commerce safer.
          </p>
        </div>
        {/* Content */}
        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 md:gap-4 lg:gap-6">
          {/* Item: Secure Escrow */}
          <div className="grid gap-6 rounded-md border border-solid border-gray-300 p-8 md:p-10">
            <LockOutlined className="inline-block h-12 w-24 text-lime-600" />
            <h3 className="text-xl font-semibold">Secure Escrow</h3>
            <p className="text-sm text-gray-500">
              We act as a trusted intermediary, holding funds in escrow until
              both buyers and sellers confirm satisfaction.
            </p>
          </div>
          {/* Item: Payment Protection */}
          <div className="grid gap-6 rounded-md border border-solid border-gray-300 p-8 md:p-10">
            <WalletOutlined className="inline-block h-12 w-24 text-lime-600" />
            <h3 className="text-xl font-semibold">Payment Protection</h3>
            <p className="text-sm text-gray-500">
              Both buyers and sellers are protected—buyers receive what they
              paid for, while sellers are guaranteed payment.
            </p>
          </div>
          {/* Item: Fast & Easy Transactions */}
          <div className="grid gap-6 rounded-md border border-solid border-gray-300 p-8 md:p-10">
            <CheckCircleOutlined className="inline-block h-12 w-24 text-lime-600" />
            <h3 className="text-xl font-semibold">Fast & Easy Transactions</h3>
            <p className="text-sm text-gray-500">
              A seamless experience from start to finish—simple, clear steps to
              complete transactions quickly and securely.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;
