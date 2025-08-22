import { Donation } from '../types/';

// Next.js page props interface - only for Next.js pages in app directory
export interface NextPageProps {
  params: Promise<{ name: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

// Component props interface - for reusable components that might need additional props
export interface ComponentPageProps {
  params: Promise<{ name: string; organizations?: string }>;
  onDonateClick?: () => void;
  setIsModalOpen?: (isOpen: boolean) => void;
  isLoggedIn?: boolean;
}

// Charity statistics type
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

// Static charity data type
export type StaticCharityData = {
  name: string;
  fullDescription: string;
  image: string;
  logo: string;
  established: string;
  category: string;
  location: string;
};

// Helper function to format currency
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Helper function to format date
export const formatDate = (date: string | Date): string => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

// Helper function to calculate donation statistics
export const calculateDonationStats = (donations: Donation[], charityName: string) => {
  const charityDonations = donations.filter(
    (donation) => donation.charity === charityName
  );

  const totalReceived = charityDonations.reduce(
    (sum, donation) => sum + donation.amount,
    0
  );

  const uniqueDonors = new Set(charityDonations.map(d => d.email));
  const donorCount = uniqueDonors.size;
  const avgGift = donorCount > 0 ? Math.round(totalReceived / donorCount) : 0;

  const donationHistory = charityDonations
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5) // Show only last 5 donations
    .map(donation => ({
      ...donation,
      donor: donation.anonymous ? "Anonymous Donor" : `Donor ${donation.email.split('@')[0]}`
    }));

  return {
    totalReceived,
    donorCount,
    avgGift,
    donationHistory,
  };
};