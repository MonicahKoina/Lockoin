import "react";

function About() {
  return (
    <div className="sm:flex items-center max-w-screen-xl">
      <div className="sm:w-1/2 p-10">
        <div className="image object-center text-center">
          <img src="https://i.imgur.com/WbQnbas.png" alt="Lockoin Logo" />
        </div>
      </div>
      <div className="sm:w-1/2 p-5">
        <div className="text">
          <span className="text-gray-500 border-b-2 border-lime-600 uppercase">
            About Us
          </span>
          <h2 className="my-4 font-bold text-3xl sm:text-4xl">
            About <span className="text-lime-600">LOCKOIN</span>
          </h2>
          <p className="text-gray-700">
            In the ever-evolving world of social commerce, one thing remains
            constant: the need for trust. LOCKOIN is here to fill that gap. We
            are a secure, reliable, and user-friendly escrow platform built to
            make online transactions safer for both buyers and sellers. By
            acting as a neutral intermediary, we hold funds securely until all
            terms of the transaction are met. This means buyers can shop with
            confidence, knowing they will only pay for what they receive, while
            sellers can rest assured that payment will be released once the deal
            is completed.
          </p>
          <p className="text-gray-700 mt-4">
            Our mission is simple: To create a trustworthy and seamless
            marketplace for people transacting on popular platforms like
            Instagram, TikTok, and WhatsApp. We have partnered with trusted
            financial institutions to offer a secure and efficient escrow
            process, ensuring that your hard-earned money is always protected.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
