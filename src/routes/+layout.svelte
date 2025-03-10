<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<title>Pillow</title>
<div class="flex min-h-[80vh] w-screen flex-col items-center justify-center">
	{@render children()}
</div>
