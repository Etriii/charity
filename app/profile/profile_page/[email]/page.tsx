"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, ArrowLeft } from "lucide-react";

type Donation = { organization: string; donation: string; date: string };
type UserType = {
  name: string;
  email: string;
  profileImage: string;
  donationHistory: Donation[];
};

export default function UserProfile(): JSX.Element {
  const router = useRouter();

  // main user state (editable)
  const [user, setUser] = useState<UserType>({
    name: "John Doe",
    email: "john.doe@example.com",
    profileImage: "/images/default_user.jpg",
    donationHistory: [
      { organization: "Red Cross", donation: "$50", date: "2024-07-01" },
      { organization: "UNICEF", donation: "$75", date: "2024-06-15" },
      { organization: "Save the Children", donation: "$40", date: "2024-05-20" },
    ],
  });

  // which field is being edited (null = not editing)
  const [editingField, setEditingField] = useState<"name" | "email" | null>(null);
  const isEditing = editingField !== null;

  // temporary values while editing
  const [tempName, setTempName] = useState<string>(user.name);
  const [tempEmail, setTempEmail] = useState<string>(user.email);

  // confirmation modal
  const [showConfirm, setShowConfirm] = useState(false);

  // Begin editing a field — also init temp values from current user
  const startEditing = (field: "name" | "email") => {
    setEditingField(field);
    setTempName(user.name);
    setTempEmail(user.email);
  };

  // Cancel editing (revert temp values)
  const handleCancel = () => {
    setEditingField(null);
    setTempName(user.name);
    setTempEmail(user.email);
    setShowConfirm(false);
  };

  // Click Save -> show confirmation modal
  const handleSaveClick = () => {
    setShowConfirm(true);
  };

  // Confirm: apply temp values to user and exit edit mode
  const confirmSave = () => {
    setUser((prev) => ({ ...prev, name: tempName, email: tempEmail }));
    setEditingField(null);
    setShowConfirm(false);
  };

  return (
    <div className="bg-white min-h-screen px-6 py-8">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
      >
        <ArrowLeft size={20} className="mr-2" />
        Back
      </button>

      {/* Main column (centered) */}
      <div className="max-w-2xl mx-auto flex flex-col">
        {/* Profile Picture */}
        <img
          src={user.profileImage}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover border border-gray-300 mb-6"
        />

        {/* Name + Edit */}
        <div className="flex items-center gap-3 mb-4">
          {editingField === "name" ? (
            <input
              type="text"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              className="border rounded px-2 py-1 text-lg font-bold w-full max-w-xs"
              aria-label="Edit name"
            />
          ) : (
            <h2 className="text-2xl font-bold">{user.name}</h2>
          )}

          <button
            className="p-1 text-blue-600 hover:text-blue-800"
            onClick={() => startEditing("name")}
            aria-label="Edit name button"
          >
            <Pencil size={16} />
          </button>
        </div>

        {/* Email + Edit */}
        <div className="flex items-center gap-3 mb-8">
          {editingField === "email" ? (
            <input
              type="email"
              value={tempEmail}
              onChange={(e) => setTempEmail(e.target.value)}
              className="border rounded px-2 py-1 text-gray-700 w-full max-w-xs"
              aria-label="Edit email"
            />
          ) : (
            <p className="text-gray-600">{user.email}</p>
          )}

          <button
            className="p-1 text-blue-600 hover:text-blue-800"
            onClick={() => startEditing("email")}
            aria-label="Edit email button"
          >
            <Pencil size={16} />
          </button>
        </div>

        {/* Donation History */}
        <div className="w-full">
          <h3 className="text-xl font-semibold mb-4">Donation History</h3>

          <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="py-2 px-4 border-b text-left">Organization</th>
                <th className="py-2 px-4 border-b text-left">Donation</th>
                <th className="py-2 px-4 border-b text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {user.donationHistory.map((d, i) => (
                <tr key={i} className="text-gray-800">
                  <td className="py-2 px-4 border-b">{d.organization}</td>
                  <td className="py-2 px-4 border-b">{d.donation}</td>
                  <td className="py-2 px-4 border-b">{d.date}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Save / Cancel Buttons (aligned right) */}
          {isEditing && (
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={handleSaveClick}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Save Changes
              </button>
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Confirmation modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full text-center">
            <p className="text-lg font-semibold mb-4">Are you sure?</p>
            <div className="flex justify-center gap-6">
              <button
                onClick={confirmSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Yes
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// export default UserProfile;