<script setup>

	import UserProfile from './pages/UserProfile.vue';

	import Navbar from	'./components/Navbar.vue'
	import HomePage from './pages/HomePage.vue'
	import Footer from './components/Footer.vue'

</script>


<template>

	<UserProfile class="main-wrapper" />

<Navbar />
	<div class="main-wrapper">
		<div class="container">
			<RouterView />
		</div>
	</div>
<Footer />


</template>
