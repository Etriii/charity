"use client";

import { Donation } from '../types/';

export interface PageProps {
  params: Promise<{ name: string; organizations?: string }>;
  onDonateClick?: () => void;
  setIsModalOpen?: (isOpen: boolean) => void;
  isLoggedIn?: boolean;
};

export type CharityStats = {
  name: string;
  totalReceived: number;
  organizations: string[];
  fullDescription: string;
  image: string;
  logo: string;
  established: string;
  category: string;
  location: string;
  donors: number;
  avgGift: number;
  donationHistory: Donation[];
};