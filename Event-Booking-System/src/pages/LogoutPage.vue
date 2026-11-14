<script setup>
	import { onBeforeMount } from 'vue';
	import { useRouter } from 'vue-router' ;
	import { useGlobalStore} from '../stores/global.js'
	
	const router = useRouter();
	const { getUserDetails } = useGlobalStore();

	onBeforeMount(() => {
		localStorage.clear();
		getUserDetails(null);
		router.push({ path: '/login' });
	})
</script>