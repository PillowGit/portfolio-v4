<script lang="ts">
	import { onMount } from 'svelte';
	import { animate } from 'motion';

	let { message, time, callback, onDismiss, ...others } = $props();

	let timer: any = null;

	let notification_div: HTMLElement;
	let progressbar: HTMLElement;

	onMount(() => {
		animate(notification_div, { opacity: 1, y: [5, 0] }, { duration: 0.2 }).then(() => {
			animate(
				progressbar,
				{ opacity: 0.7, width: 0 },
				{ duration: time / 1000, ease: 'easeInOut' }
			).then(() => {
				animate(notification_div, { opacity: 0, y: 5 }, { duration: 0.2 }).then(() => {
					callback();
					onDismiss();
				});
			});
		});
	});
</script>

<div
	class="pointer-events-none absolute top-8 left-0 z-50 flex min-h-2 w-screen items-center justify-center opacity-0"
	bind:this={notification_div}
>
	<div
		class="border-tint dark:border-tintd bg-bg dark:bg-bgd flex max-w-84 flex-col items-center justify-start rounded-xl border-2"
	>
		<div class="h-1 w-[85%] rounded-lg"></div>
		<p class="px-4 py-2">
			{message}
		</p>
		<div bind:this={progressbar} class="gradient-p1-p3-circle h-1 w-[90%] rounded-xl"></div>
	</div>
</div>
