"use client";

import { User, DonationRecord, Donation } from '../types/';

// get users from localstorage
export const getUsersFromStorage = (): User[] => {
    if (typeof window !== 'undefined') {
        const usersJson = localStorage.getItem('donateTransparentlyUsers');
        return usersJson ? JSON.parse(usersJson) : [];
    }
    return [];
};

export const setUsersInStorage = (users: User[]) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('donateTransparentlyUsers', JSON.stringify(users));
    }
};

export const getCurrentSession = (): User | null => {
    if (typeof window !== 'undefined') {
        const userJson = localStorage.getItem('donateTransparentlyCurrentUser');
        return userJson ? JSON.parse(userJson) : null;
    }
    return null;
};

export const setCurrentSession = (user: User) => {
    if (typeof window !== 'undefined') {
        if (user) {
            localStorage.setItem('donateTransparentlyCurrentUser', JSON.stringify(user));
        } else {
            localStorage.removeItem('donateTransparentlyCurrentUser');
        }
    }
};

// get donations from localstorage
export const getDonationsFromStorage = (): DonationRecord[] => {
    if (typeof window !== 'undefined') {
        const donationsJson = localStorage.getItem('donations');
        if (donationsJson) {
            try {
                const parsed = JSON.parse(donationsJson);
                return Array.isArray(parsed) ? parsed : [parsed];
            } catch (error) {
                console.error('Error parsing donations from localStorage:', error);
                return [];
            }
        }
    }
    return [];
};

// set donations to localstorage
export const setDonationsToStorage = (donations: DonationRecord[]) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('donations', JSON.stringify(donations));
    }
};

// get recent donations from localstorage
export const getRecentDonationsFromStorage = (): DonationRecord[] => {
    if (typeof window !== 'undefined') {
        const recentDonationsJson = localStorage.getItem('recentDonations');
        if (recentDonationsJson) {
            try {
                const parsed = JSON.parse(recentDonationsJson);
                return Array.isArray(parsed) ? parsed : [parsed];
            } catch (error) {
                console.error('Error parsing recent donations from localStorage:', error);
                return [];
            }
        }
    }
    return [];
};

// set recent donations to localstorage
export const setRecentDonationsToStorage = (donations: DonationRecord[]) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('recentDonations', JSON.stringify(donations));
    }
};

// update email in all donation records when user changes email
export const updateDonationEmailRecords = (oldEmail: string, newEmail: string) => {
    // update donations
    const donations = getDonationsFromStorage();
    const updatedDonations = donations.map(donation => {
        if (donation.email?.toLowerCase() === oldEmail.toLowerCase()) {
            return { ...donation, email: newEmail };
        }
        return donation;
    });
    setDonationsToStorage(updatedDonations);

    // update recent donations
    const recentDonations = getRecentDonationsFromStorage();
    const updatedRecentDonations = recentDonations.map(donation => {
        if (donation.email?.toLowerCase() === oldEmail.toLowerCase()) {
            return { ...donation, email: newEmail };
        }
        return donation;
    });
    setRecentDonationsToStorage(updatedRecentDonations);
};

// get donations for the current logged in user by email
export const getUserDonations = (userEmail: string): Donation[] => {
    const donations = getDonationsFromStorage();

    const filteredAndSorted = donations
        .filter(donation => donation.email?.toLowerCase() === userEmail.toLowerCase())
        .sort((a, b) => {
            const dateA = new Date(a.datetime || a.date);
            const dateB = new Date(b.datetime || b.date);

            return dateB.getTime() - dateA.getTime();
        });

    return filteredAndSorted.map(donation => ({
        organization: donation.organization || donation.charity || 'Unknown Organization',
        donation: `${donation.amount}`,
        date: donation.date || new Date(donation.datetime).toLocaleDateString(),
        type: donation.type,
        anonymous: donation.anonymous,
        charity: donation.charity,
        email: donation.email,
        amount: donation.amount,
        datetime: donation.datetime,
        donor: donation.donor,
    }));
};

// checks if email is unique (except current user)
export const isEmailUnique = (email: string, currentUserEmail: string): boolean => {
    const users = getUsersFromStorage();
    return !users.some(user =>
        user.email.toLowerCase() === email.toLowerCase() &&
        user.email.toLowerCase() !== currentUserEmail.toLowerCase()
    );
};