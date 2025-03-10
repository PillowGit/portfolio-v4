<script lang="ts">
	import '../app.css';
	import Navbar from '$lib/components/Navbar.svelte';
	import Navmenu from '$lib/components/Navmenu.svelte';
	let { children } = $props();
</script>

<title>Pillow</title>
<div class="hidden md:block">
	<Navbar />
</div>
<div class="md:hidden">
	<Navmenu />
</div>
<div class="flex min-h-screen w-screen flex-col items-center justify-center">
	{@render children()}
</div>
