<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<title>Pillow</title>
<div class="flex min-h-screen w-screen flex-col items-center justify-center">
	{@render children()}
</div>
