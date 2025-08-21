"use client"
import React, { useState } from 'react'
import { Wallet as WalletIcon } from 'lucide-react'
import { User } from '@/types'
import Modal from './Modal'
// import { setCurrentSession } from 'app/profile/profile_page/[email]/page'

interface WalletProps {
    user: User;
    getUsers: () => User[];
}

const setUsersInStorage = (users: User[]) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('donateTransparentlyUsers', JSON.stringify(users));
    }
};

export const updateAddBalance = (user: User | undefined, users: User[], amount: string) => {
    if (!user) {
        alert("User is required to update balance.");
        return;
    }

    const parsedAmount = parseFloat(amount || "0");
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
        alert("Invalid amount.");
        return;
    }

    const userIndex = users.findIndex(u => u.email.toLowerCase() === user.email.toLowerCase());

    if (userIndex !== -1) {
        const updatedUsers = users.map((u, index) =>
            index === userIndex
                ? {
                    ...u,
                    balance: (parseFloat(u.balance?.toString() || "0")) + parsedAmount
                }
                : u
        );

        setUsersInStorage(updatedUsers);

        user.balance = (parseFloat(user.balance?.toString() || "0")) + parsedAmount;

        localStorage.setItem('donateTransparentlyCurrentUser', JSON.stringify(updatedUsers[userIndex]));
        console.log("new balance: " + user.balance);
    } else {
        alert("Failed to verify User");
    }
};

export const updateDeductBalance = (user: User | undefined, users: User[], amount: string) => {
    if (!user) {
        alert("User is required to update balance.");
        return;
    }

    const parsedAmount = parseFloat(amount || "0");
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
        alert("Invalid amount.");
        return;
    }

    const userIndex = users.findIndex(u => u.email.toLowerCase() === user.email.toLowerCase());

    if (userIndex !== -1) {
        const updatedUsers = users.map((u, index) =>
            index === userIndex
                ? {
                    ...u,
                    balance: (parseFloat(u.balance?.toString() || "0")) - parsedAmount
                }
                : u
        );

        setUsersInStorage(updatedUsers);

        user.balance = (parseFloat(user.balance?.toString() || "0")) - parsedAmount;

        localStorage.setItem('donateTransparentlyCurrentUser', JSON.stringify(updatedUsers[userIndex]));
        console.log("new balance: " + user.balance);
    } else {
        alert("Failed to verify User");
    }
};


const Wallet: React.FC<WalletProps> = ({ user, getUsers }) => {

    // // Function to handle balance change
    // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const value = parseFloat(e.target.value);
    //     setUser({ ...user, balance: value });  // Update the balance correctly
    // }

    const users = getUsers();

    const [isOpen, setIsModalOpen] = useState(false)

    const [amount, setAmount] = useState("");
    const [selectedAmount, setSelectedAmount] = useState("");

    const [paymentMethod, setPaymentMethod] = useState("credit-card");

    const handleAmountChange = (e: { target: { value: React.SetStateAction<string> } }) => {
        setSelectedAmount("");
        setAmount(e.target.value);
    };

    const handleSubmit = () => {

        updateAddBalance(user, users, amount);

        onClose(); // Close the modal
    };


    const onClose = () => {
        setIsModalOpen(false)
    }

    return (
        <div className="flex items-center justify-between bg-white px-5 py-3 rounded-2xl shadow-lg max-w-4xl mx-auto">
            <div className="font-semibold flex items-center space-x-3">
                <WalletIcon className='text-blue-600' />  <span className='text-xl'>My Wallet</span>
            </div>

            <div className="flex items-center space-x-6 text-xs">
                <div className="text-lg font-bold text-gray-700">
                    ₱{new Intl.NumberFormat('en-US').format(user.balance)}.00
                </div>
                <button
                    onClick={() => { setIsModalOpen(true) }}
                    className="cursor-pointer bg-gradient-to-br font-bold from-purple-500 to-pink-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    Add Funds
                </button>
            </div>
            <Modal isOpen={isOpen} onClose={onClose} title="Add Balance">
                <div className="space-y-4 p-2 pt-3">
                    {/* Predefined Amounts */}
                    <div className="grid grid-cols-3 gap-4">
                        {[10, 25, 50, 100, 250, 500].map((amount) => (
                            <button
                                key={amount}
                                className={`px-4 py-2 border border-gray-200 rounded-lg text-sm font-semibold ${selectedAmount == amount.toString()
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    }`}
                                onClick={() => {
                                    setAmount(amount.toString());
                                    setSelectedAmount(amount.toString())
                                }}
                            >
                                ${amount}
                            </button>
                        ))}
                    </div>

                    {/* Custom Amount Input */}
                    <div className="flex items-center space-x-2">
                        <input
                            type="number"
                            placeholder="Enter custom amount"
                            value={amount}
                            onChange={handleAmountChange}
                            className="px-4 py-2 w-full border rounded-lg"
                        />
                    </div>

                    {/* Payment Method Options */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Payment Method</label>
                        <div className="flex space-x-4 mt-2">
                            <label className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    name="payment-method"
                                    value="credit-card"
                                    checked={paymentMethod === "credit-card"}
                                    onChange={() => setPaymentMethod("credit-card")}
                                />
                                <span>Credit Card</span>
                            </label>
                            <label className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    name="payment-method"
                                    value="paypal"
                                    checked={paymentMethod === "paypal"}
                                    onChange={() => setPaymentMethod("paypal")}
                                />
                                <span>PayPal</span>
                            </label>
                        </div>
                    </div>

                    <div className="flex justify-between mt-6 space-x-2">
                        <button
                            onClick={onClose}
                            className="w-full py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={!amount || parseFloat(amount) <= 0}
                            className={`w-full py-2 rounded-lg transition
    ${!amount || parseFloat(amount) <= 0
                                    ? "bg-gray-300 text-gray-500"
                                    : "bg-gradient-to-br from-purple-600 to-pink-600 text-white hover:bg-blue-700"
                                }`}
                        >
                            Add Funds
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default Wallet
