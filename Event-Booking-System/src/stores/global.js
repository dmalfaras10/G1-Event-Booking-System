import { defineStore } from 'pinia';
import { reactive } from 'vue';

export const useGlobalStore = defineStore('global', () => {
    // Mock user database
    const mockUsers = [
        { email: "admin@mail.com", isAdmin: true }
    ];

    let user = reactive({
        email: localStorage.getItem("email") || null,
        // Automatically check if the saved email in localStorage belongs to an admin on load
        isAdmin: (() => {
            const savedEmail = localStorage.getItem("email");
            const found = mockUsers.find(u => u.email === savedEmail);
            return found ? found.isAdmin : false;
        })()
    });

    function getUserDetails(email) {
        user.email = email;
        
        // Look up the user in mock data and assign their admin status
        const foundUser = mockUsers.find(u => u.email === email);
        if (foundUser) {
            user.isAdmin = foundUser.isAdmin;
        } else {
            user.isAdmin = false; // Default for any other email entered
        }
    }

    return {
        user,
        getUserDetails
    }
});