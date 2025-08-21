"use client"

import React, { useState } from 'react';

const WalletSection: React.FC = () => {
  const [balance, setBalance] = useState(100.0); // Example balance
  const [transactions] = useState([
    { id: 1, type: 'Donation', amount: 50, date: '2025-08-20' },
    { id: 2, type: 'Top Up', amount: 100, date: '2025-08-19' },
  ]);
  const [isLowBalance, setIsLowBalance] = useState(balance < 50);

  const handleAddFunds = () => {
    setBalance(balance + 50);
    setIsLowBalance(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50 p-3">
      <div className="bg-white shadow-xl rounded-3xl p-8  flex flex-col items-center space-y-6">
        <div className="w-full flex justify-between items-center">
          <h2 className="text-3xl font-semibold text-blue-600">My Wallet</h2>
          <div className="flex items-center space-x-2">
            <span className="text-gray-500">Balance</span>
            <span className="text-3xl font-bold text-blue-600">₱{balance.toFixed(2)}</span>
          </div>
        </div>

        {isLowBalance && (
          <div className="bg-yellow-200 text-yellow-800 p-3 rounded-lg text-center text-sm w-full">
            <p>Your balance is low. Please add funds to continue supporting your cause.</p>
          </div>
        )}

        <div className="w-full flex justify-between items-center space-x-2">
          <button className="py-1 px-2 grow bg-blue-100 text-blue-600 rounded-lg shadow-md hover:bg-blue-200 transition duration-200">
            Donate Now
          </button>
          <button className="py-1 px-2 grow bg-blue-100 text-blue-600 rounded-lg shadow-md hover:bg-blue-200 transition duration-200">
            Transaction History
          </button>
          <button
            onClick={handleAddFunds}
            className="py-1 px-2 grow bg-gradient-to-r from-blue-600 to-blue-500 text-white text-lg font-semibold rounded shadow-md hover:from-blue-500 hover:to-blue-400 transition duration-300 ease-in-out"
          >
            Add Funds
          </button>
        </div>

        <div className="w-full  space-y-4">
          <h3 className="text-lg font-semibold text-blue-600">Recent Transactions</h3>
          <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
            {transactions.length === 0 ? (
              <p>No transactions yet.</p>
            ) : (
              transactions.map((transaction) => (
                <div key={transaction.id} className="flex justify-between mb-3">
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-600">{transaction.type}</span>
                    <span className="text-xs text-gray-500">{transaction.date}</span>
                  </div>
                  <span className="font-semibold text-blue-600">₱{transaction.amount}</span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="w-full mt-6 bg-blue-100 text-blue-600 p-4 rounded-lg shadow-sm">
          <p className="text-sm">Use my referral code to invite others and earn rewards:</p>
          <div className="mt-2 text-lg font-semibold">REF12345</div>
        </div>
      </div>
    </div>
  );
};

export default WalletSection;
