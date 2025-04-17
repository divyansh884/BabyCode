import React, { useState } from 'react';
import './App.css';
import { ArrowUpIcon } from '@heroicons/react/24/solid';

const causes = [
  {
    title: 'Ensure Education For Every Poor Children',
    raised: 20000,
    goal: 35000,
    percentage: 70,
    image: '/image1.png',
  },
  {
    title: 'Providing Healthy Food For The Children',
    raised: 20000,
    goal: 35000,
    percentage: 25,
    image: '/image2.png',
  },
  {
    title: 'Supply Drinking Water For The People',
    raised: 20000,
    goal: 35000,
    percentage: 50,
    image: '/image3.png',
  },
  {
    title: 'Ensure Education For Every Poor Children',
    raised: 20000,
    goal: 35000,
    percentage: 70,
    image: '/image1.png',
  },
  {
    title: 'Providing Healthy Food For The Children',
    raised: 20000,
    goal: 35000,
    percentage: 25,
    image: '/image3.png',
  },
  {
    title: 'Supply Drinking Water For The People',
    raised: 20000,
    goal: 35000,
    percentage: 50,
    image: '/image2.png',
  },
];

const Navbar = ({ openModal }) => (
  <nav className="w-full bg-white shadow-sm py-10 px-20 flex justify-between items-center">
    <div className="text-3xl font-extrabold text-blue-900 tracking-wide">BetterBlues</div>
    <div className="flex items-center space-x-16 -pr-10">
      <ul className="flex space-x-10 text-blue-900 font-medium text-base">
        <li className="cursor-pointer hover:text-green-500 transition">Home</li>
        <li className="cursor-pointer hover:text-green-500 transition">About</li>
        <li className="cursor-pointer hover:text-green-500 transition">Latest Causes</li>
        <li className="cursor-pointer hover:text-green-500 transition">Social Events</li>
        <li className="cursor-pointer hover:text-green-500 transition">Blog</li>
        <li className="cursor-pointer hover:text-green-500 transition">Contact</li>
      </ul>
      <button
        onClick={openModal}
        className="bg-green-500 hover:bg-green-600 text-white px-20 py-6 font-semibold transition"
      >
        Donate
      </button>
    </div>
  </nav>
);

const CauseCard = ({ title, raised, goal, percentage, image }) => (
  <div className="bg-white cursor-pointer rounded-lg overflow-hidden shadow-md transition-transform duration-300 transform hover:scale-105 hover:shadow-lg">
    <img src={image} alt={title} className="w-full h-64 object-cover" />
    <div className="p-4">
      <h3 className="text-2xl font-semibold text-blue-900 mb-10 leading-snug">{title}</h3>
      <div className="w-full bg-gray-200 h-2 rounded-full mb-6 relative">
        <div
          className="bg-green-500 h-2 rounded-full"
          style={{ width: `${percentage}%` }}
        ></div>
        <p
          className="text-green-600 font-bold text-lg absolute -top-7"
          style={{ left: `calc(${percentage}% - 1.5rem)` }}
        >
          {percentage}%
        </p>
      </div>
      <div className="flex justify-between text-sm text-blue-900">
        <span>
          Raised: <strong className="text-blue-900 text-lg font-semibold">${raised.toLocaleString()}</strong>
        </span>
        <span>
          Goal: <strong className="text-blue-900 text-lg font-semibold">${goal.toLocaleString()}</strong>
        </span>
      </div>
    </div>
  </div>
);


const DonationModal = ({ isOpen, closeModal, handleDonate }) => {
  const [donationAmount, setDonationAmount] = useState('');

  const handleAmountChange = (e) => {
    setDonationAmount(e.target.value);
  };

  const handleSubmit = () => {
    if (donationAmount && !isNaN(donationAmount) && donationAmount > 0) {
      handleDonate(donationAmount);
      closeModal();
    } else {
      alert('Please enter a valid donation amount');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-6">Enter Donation Amount</h2>
        <input
          type="number"
          value={donationAmount}
          onChange={handleAmountChange}
          placeholder="Enter amount in INR"
          className="w-full p-3 border rounded-lg mb-6"
        />
        <div className="flex justify-between">
          <button
            onClick={closeModal}
            className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg"
          >
            Donate
          </button>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleDonate = (amount) => {
    const parsedAmount = parseFloat(amount);
    if (window.Razorpay) {
      const options = {
        key: 'rzp_test_2eyDsrT3RRQSLQ', 
        amount: parsedAmount * 100,
        currency: 'INR',
        name: 'BetterBlues',
        description: 'Donation for a Cause',
        image: 'https://your-logo-url.com/logo.png',
        handler: function (response) {
          alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
        },
        prefill: {
          name: 'Donor Name',
          email: 'donor@example.com',
          contact: '9999999999',
        },
        notes: {
          address: 'BetterBlues Foundation',
        },
        theme: {
          color: '#10B981',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } else {
      alert('Razorpay is not available.');
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar openModal={openModal} />
      <DonationModal isOpen={isModalOpen} closeModal={closeModal} handleDonate={handleDonate} />
      <main className="px-10 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-40">
        {causes.map((cause, index) => (
          <CauseCard key={index} {...cause} />
        ))}
      </main>
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-4 right-4 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition duration-300"
      >
        <ArrowUpIcon className="h-6 w-6" />
      </button>
    </div>
  );
};

export default App;
