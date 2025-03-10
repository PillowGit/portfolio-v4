<script lang="ts">
	import { onMount } from 'svelte';
	import { animate } from 'motion';

	onMount(() => {
		animate(title, { opacity: 1 }, { duration: 1 }).then(() => {
			animate(sub, { opacity: 1 }, { duration: 1.5 });
		});
	});
	let title: HTMLHeadingElement;
	let sub: HTMLHeadingElement;
</script>

<h1 bind:this={title} class="text-5xl font-bold opacity-0">pillow.dev</h1>
<h2 bind:this={sub} class="mt-8 text-xl opacity-0">rework coming soon</h2>
