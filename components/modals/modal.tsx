import { useState, ReactNode } from "react";
import { PlusCircle, Pencil, AlertTriangle, X } from "lucide-react";

/**
 * @file Modal Component
 * @description A reusable modal component with different style types.
 * @param {object} props - The component props.
 * @param {boolean} props.isOpen - Controls the visibility of the modal.
 * @param {() => void} props.onClose - Function to call when the modal is closed.
 * @param {string} [props.title] - The title of the modal.
 * @param {ReactNode} props.children - The content to display inside the modal.
 * @param {"delete" | "update" | "read" | "create" | "information" | "warning"} [props.type] - The type of modal to display, which determines its styling.
 */
interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
    type?: "delete" | "update" | "read" | "create" | "information" | "warning";
}

const Modal = ({ isOpen, onClose, title, children, type = "information" }: ModalProps) => {
    if (!isOpen) return null;

    const typeStyles: Record<string, { bg: string; text: string; icon: string }> = {
        delete: { bg: "bg-red-50", text: "text-red-600", icon: "🗑️" },
        update: { bg: "bg-blue-50", text: "text-blue-600", icon: "🖋️" },
        read: { bg: "bg-gray-50", text: "text-gray-600", icon: "📖" },
        create: { bg: "bg-green-50", text: "text-green-600", icon: "✚" },
        information: { bg: "bg-indigo-50", text: "text-indigo-600", icon: "ℹ️" },
        warning: { bg: "bg-yellow-50", text: "text-yellow-600", icon: "⚠️" },
    };

    const style = typeStyles[type];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* background */}
            <div
                className="absolute inset-0 bg-gray-900 bg-opacity-50"
                onClick={onClose}
            ></div>

            {/* container */}
            <div className="relative bg-white rounded-xl shadow-2xl p-6 z-10 max-w-md w-full border border-gray-200">

                {/* close */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                    aria-label="Close modal"
                >
                    <X size={20} />
                </button>

                {/* title */}
                <div className={`flex items-center space-x-3 mb-4 ${style.bg} p-3 rounded-lg`}>
                    <span className={`text-xl ${style.text}`}>{style.icon}</span>
                    {title && <h2 className={`text-xl font-bold ${style.text}`}>{title}</h2>}
                </div>

                {/* content */}
                <div>{children}</div>
            </div>
        </div>
    );
};

export default function App() {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);

    const handleOpenCreateModal = () => setIsCreateModalOpen(true);
    const handleCloseCreateModal = () => setIsCreateModalOpen(false);

    const handleOpenUpdateModal = () => setIsUpdateModalOpen(true);
    const handleCloseUpdateModal = () => setIsUpdateModalOpen(false);

    const handleOpenWarningModal = () => setIsWarningModalOpen(true);
    const handleCloseWarningModal = () => setIsWarningModalOpen(false);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-8 font-sans antialiased">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight mb-2">
                    Modal Component Showcase
                </h1>
                <p className="text-lg text-gray-600 max-w-xl mx-auto">
                    Click the buttons below to see the different modal types in action.
                </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
                <button
                    onClick={handleOpenCreateModal}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-green-500 text-white font-medium rounded-lg shadow-md hover:bg-green-600 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
                >
                    <PlusCircle size={20} />
                    <span>Show Create Modal</span>
                </button>

                <button
                    onClick={handleOpenUpdateModal}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 text-white font-medium rounded-lg shadow-md hover:bg-blue-600 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                >
                    <Pencil size={20} />
                    <span>Show Update Modal</span>
                </button>


                <button
                    onClick={handleOpenWarningModal}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-yellow-500 text-white font-medium rounded-lg shadow-md hover:bg-yellow-600 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2"
                >
                    <AlertTriangle size={20} />
                    <span>Show Warning Modal</span>
                </button>
            </div>

            {/* components */}
            <Modal
                isOpen={isCreateModalOpen}
                onClose={handleCloseCreateModal}
                title="Create New Item"
                type="create"
            >
                <p className="text-gray-700">This is a modal for creating a new item. You can place a form here.</p>
                <div className="mt-4 flex justify-end gap-2">
                    <button
                        onClick={handleCloseCreateModal}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors duration-200"
                    >
                        Cancel
                    </button>
                    <button
                        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-200"
                    >
                        Create
                    </button>
                </div>
            </Modal>


            <Modal
                isOpen={isUpdateModalOpen}
                onClose={handleCloseUpdateModal}
                title="Update Record"
                type="update"
            >
                <p className="text-gray-700">This modal is for updating an existing record. Edit your content here.</p>
                <div className="mt-4 flex justify-end gap-2">
                    <button
                        onClick={handleCloseUpdateModal}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors duration-200"
                    >
                        Cancel
                    </button>
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
                    >
                        Update
                    </button>
                </div>
            </Modal>

            {/* Warning Modal */}
            <Modal
                isOpen={isWarningModalOpen}
                onClose={handleCloseWarningModal}
                title="Warning!"
                type="warning"
            >
                <p className="text-gray-700">
                    This action is important and requires your attention. Please read the information carefully before proceeding.
                </p>
                <div className="mt-4 flex justify-end gap-2">
                    <button
                        onClick={handleCloseWarningModal}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors duration-200"
                    >
                        Dismiss
                    </button>
                </div>
            </Modal>
        </div>
    );
}
