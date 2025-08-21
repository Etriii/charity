import { Dispatch, SetStateAction } from 'react';

export type Message = { type: 'success' | 'error' | 'info'; text: string } | null;

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export interface User {
  id?: string;
  username?: string;
  email: string;
  password?: string;
  balance:number;
  createdAt: string;
}

export interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface CharityCardProps {
  name: string;
  description: string;
  received: number;
  organizations: string[];
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  setMainMessage: Dispatch<SetStateAction<Message>>;
  isLoggedIn: boolean;
}

export interface TestimonialCardProps {
  quote: string;
  author: string;
  title: string;
  imageSrc: string;
}

export interface HomePageProps {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  setMainMessage: Dispatch<SetStateAction<Message>>;
  isLoggedIn: boolean;
}

export interface HeaderProps {
  isLoggedIn: boolean;
  onLogout: () => void;
  onOpenModal: () => void;
   userEmail?: string;
}

export interface MessageDisplayProps {
  message: Message;
}

export type Donation = {
  amount: number;
  charity: string;
  organization: string;
  type: string;
  date: string;
  anonymous: boolean;
  email: string;
};