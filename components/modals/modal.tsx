"use client";
import { ReactNode } from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
    type?: "delete" | "update" | "read" | "create" | "information" | "warning";
}

export default function Modal({ isOpen, onClose, title, children, type = "information" }: ModalProps) {
    if (!isOpen) return null;


    const typeStyles: Record<string, { bg: string; text: string; icon: string }> = {
        delete: { bg: "bg-red-50", text: "text-red-600", icon: "🗑️" },
        update: { bg: "bg-blue-50", text: "text-blue-600", icon: "✏️" },
        read: { bg: "bg-gray-50", text: "text-gray-600", icon: "📖" },
        create: { bg: "bg-green-50", text: "text-green-600", icon: "➕" },
        information: { bg: "bg-indigo-50", text: "text-indigo-600", icon: "ℹ️" },
        warning: { bg: "bg-yellow-50", text: "text-yellow-600", icon: "⚠️" },
    };

    const style = typeStyles[type];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Background */}
            <div
                className="absolute inset-0 bg-black opacity-50"
                onClick={onClose}
            ></div>

            {/* Content */}
            <div className="relative bg-white rounded-lg shadow-lg p-6 z-10 max-w-md w-full">

                {/* Close */}
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                >
                    ✕
                </button>

                {/* Title w/ Icon */}
                <div className="flex items-center space-x-2 mb-4">
                    <span className={`text-xl ${style.text}`}>{style.icon}</span>
                    {title && <h2 className={`text-xl font-bold ${style.text}`}>{title}</h2>}
                </div>

                {/* Body */}
                <div>{children}</div>

            </div>
        </div>
    );
}
