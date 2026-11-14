<script setup>
	import Navbar from	'./components/Navbar.vue'
	import HomePage from './pages/HomePage.vue'
	import Footer from './components/Footer.vue'
</script>

<Navbar />
	<div class="main-wrapper">
		<div class="container">
			<RouterView />
		</div>
	</div>
<Footer />

</template>
