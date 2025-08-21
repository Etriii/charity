import { Donation } from "./index";
export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  type: 'donor' | 'charity';
  avatar?: string;
  createdAt: string;
  // Donor specific fields
  totalDonated?: number;
  donationCount?: number;
  // Charity specific fields
  description?: string;
  mission?: string;
  category?: string;
  totalReceived?: number;
  donorCount?: number;
  website?: string;
  logo?: string;
  coverImage?: string;
  establishedYear?: number;
  location?: string;
  donationHistory?: Donation[];
}

