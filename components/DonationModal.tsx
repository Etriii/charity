import React, { useState } from 'react';
import { XMarkIcon, HeartIcon, CreditCardIcon, BanknotesIcon } from '@heroicons/react/24/solid';
import { getCurrentSession } from './DonationAuthContent';
interface DonationModalProps {
    isOpen: boolean;
    onClose: () => void;
    charityName: string;
    organizations: string[];
}

interface Donation {
  amount: number;
  charity: string;
  organization: string;
  type: string;
  date: string;     
  datetime: string; 
  anonymous: boolean;
  email: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const loggedInUserEmail = "user@example.com";

const DonationModal: React.FC<DonationModalProps> = ({ isOpen, onClose, charityName, organizations }) => {
    const [amount, setAmount] = useState<string>('');
    const [selectedOrganization, setSelectedOrganization] = useState<string>('random');
    const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
    const [paymentMethod, setPaymentMethod] = useState<string>('card');
    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    const presetAmounts = [10, 25, 50, 100, 250, 500];
        if (!isOpen) return null;

    const handleAmountClick = (presetAmount: number) => {
        setAmount(presetAmount.toString());
    };

const handleDonate = async () => {
  if (!amount || parseFloat(amount) <= 0) {
    alert('Please enter a valid donation amount');
    return;
  }

  setIsProcessing(true);

  setTimeout(() => {
    const currentUser = getCurrentSession();

    // create new donation
const newDonation: Donation = {
  amount: parseFloat(amount),
  charity: charityName,
  organization: selectedOrganization === 'random' ? 'Random Distribution' : selectedOrganization,
  type: selectedOrganization === 'random' ? 'Random' : 'Direct',
  date: new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  }),
  datetime: new Date().toISOString(),
  anonymous: isAnonymous,
  email: currentUser?.email || "none@anonymous.com",
};

    // recent donations
    const recentDonations: Donation[] = JSON.parse(localStorage.getItem("recentDonations") || "[]");
    recentDonations.unshift(newDonation);
    localStorage.setItem("recentDonations", JSON.stringify(recentDonations));

    // all donations
    const allDonations: Donation[] = JSON.parse(localStorage.getItem("donations") || "[]");
    allDonations.push(newDonation);
    localStorage.setItem("donations", JSON.stringify(allDonations));

    // triggers live updates
    window.dispatchEvent(new Event("donationsUpdated"));

    alert(`Thank you for your $${amount} donation to ${charityName}!`);

    setIsProcessing(false);
    onClose();

    // reset
    setAmount('');
    setSelectedOrganization('random');
    setIsAnonymous(false);
    setPaymentMethod('card');
  }, 2000);
};

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

            <div
                className="absolute inset-0 bg-black opacity-50"
                onClick={onClose}
            ></div>

            {/* modal */}
            <div className="relative bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto z-10">
                <div className="p-6">
                    {/* header */}
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-2">
                            <HeartIcon className="h-6 w-6 text-red-500" />
                            <h2 className="text-xl font-bold text-gray-900">Donate to {charityName}</h2>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <XMarkIcon className="h-6 w-6" />
                        </button>
                    </div>

                    {/* amount selection */}
                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                            Donation Amount ($)
                        </label>
                        <div className="grid grid-cols-3 gap-2 mb-3">
                            {presetAmounts.map((presetAmount) => (
                                <button
                                    key={presetAmount}
                                    onClick={() => handleAmountClick(presetAmount)}
                                    className={`py-2 px-3 rounded-lg border text-sm font-medium transition-colors ${amount === presetAmount.toString()
                                        ? 'bg-blue-100 border-blue-500 text-blue-700'
                                        : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100'
                                        }`}
                                >
                                    ${presetAmount}
                                </button>
                            ))}
                        </div>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="Enter custom amount"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            min="1"
                            step="1"
                        />
                    </div>

                    {/* org selection */}
                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                            Choose Organization
                        </label>
                        <select
                            value={selectedOrganization}
                            onChange={(e) => setSelectedOrganization(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        >
                            <option value="random">Random Distribution</option>
                            {organizations.map((org, index) => (
                                <option key={index} value={org}>
                                    {org}
                                </option>
                            ))}
                        </select>
                        <p className="text-xs text-gray-500 mt-1">
                            {selectedOrganization === 'random'
                                ? 'We will distribute your donation randomly among all organizations'
                                : `Your donation will go directly to ${selectedOrganization}`
                            }
                        </p>
                    </div>

                    {/* anonymous donation */}
                    <div className="mb-6">
                        <label className="flex items-center space-x-3">
                            <input
                                type="checkbox"
                                checked={isAnonymous}
                                onChange={(e) => setIsAnonymous(e.target.checked)}
                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <span className="text-sm font-medium text-gray-700">
                                Make this donation anonymous
                            </span>
                        </label>
                        <p className="text-xs text-gray-500 mt-1 ml-7">
                            Your name will not be displayed in the public donation history
                        </p>
                    </div>

                    {/* payment method */}
                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                            Payment Method
                        </label>
                        <div className="space-y-2">
                            <label className="flex items-center space-x-3">
                                <input
                                    type="radio"
                                    value="card"
                                    checked={paymentMethod === 'card'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                />
                                <CreditCardIcon className="h-5 w-5 text-gray-600" />
                                <span className="text-sm font-medium text-gray-700">Credit/Debit Card</span>
                            </label>
                            <label className="flex items-center space-x-3">
                                <input
                                    type="radio"
                                    value="bank"
                                    checked={paymentMethod === 'bank'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                />
                                <BanknotesIcon className="h-5 w-5 text-gray-600" />
                                <span className="text-sm font-medium text-gray-700">Bank Transfer</span>
                            </label>
                        </div>
                    </div>

                    {/* summary */}
                    {amount && parseFloat(amount) > 0 && (
                        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                            <h4 className="text-sm font-semibold text-gray-700 mb-2">Donation Summary:</h4>
                            <div className="text-sm text-gray-600 space-y-1">
                                <div className="flex justify-between">
                                    <span>Amount:</span>
                                    <span className="font-medium">${parseFloat(amount).toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>To:</span>
                                    <span className="font-medium">
                                        {selectedOrganization === 'random' ? 'Random Distribution' : selectedOrganization}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Anonymous:</span>
                                    <span className="font-medium">{isAnonymous ? 'Yes' : 'No'}</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* action */}
                    <div className="flex space-x-3">
                        <button
                            onClick={onClose}
                            className="flex-1 px-4 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleDonate}
                            disabled={!amount || parseFloat(amount) <= 0 || isProcessing}
                            className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium flex items-center justify-center space-x-2"
                        >
                            {isProcessing ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                                    <span>Processing...</span>
                                </>
                            ) : (
                                <>
                                    <HeartIcon className="h-4 w-4" />
                                    <span>Donate ${amount || '0'}</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DonationModal;