import {defineStore} from 'pinia';
import { reactive } from 'vue';

export const useGlobalStore = defineStore('global', () => {
	let user = reactive({
		email: localStorage.getItem("email") || null,
		isAdmin: null
	});

	function getUserDetails(email){
		user.email = email;
	}

	return {
		user,
		getUserDetails
	}
});