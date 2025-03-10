<script lang="ts">
	import { page } from '$app/state';
	import { animate, hover } from 'motion';
	import { onMount } from 'svelte';

	const pathname = page.url.pathname;

	interface NavItem {
		name: string;
		href: string;
	}
	const navitems: NavItem[] = [
		{ name: 'Home', href: '/' },
		{ name: 'About', href: '/about' },
		{ name: 'Projects', href: '/projects' },
		{ name: 'Skills', href: '/skills' },
		{ name: 'Contact', href: '/contact' }
	];

	onMount(() => {
		navitems.forEach(({ name }) => {
			// Grab elements for each nav component
			const diamond = document.getElementById(`${name}-diamond`);
			const bar = document.getElementById(`${name}-bar`);
			const outer = document.getElementById(`${name}-outer`);
			if (!diamond || !bar || !outer) {
				return;
			}
			// Skip the one we are on
			if (pathname === `/${name.toLowerCase()}`) {
				return;
			}
			// Animate on group hover
			hover(outer, () => {
				const diamondAnim = animate(
					diamond,
					{ opacity: [0, 1], rotate: [0, 90 + 45] },
					{ duration: 0.2 }
				);
				const barAnim = animate(
					bar,
					{ opacity: [0, 1], width: [0, 32] },
					{ duration: 0.2, ease: 'easeInOut' }
				);
				const outerAnim = animate(outer, { scale: [1, 1.2] }, { duration: 0.2, ease: 'easeInOut' });

				return () => {
					diamondAnim.stop();
					animate(diamond, { opacity: 0, rotate: 0 }, { duration: 0.2, ease: 'easeInOut' });
					barAnim.stop();
					animate(bar, { opacity: 0, width: 0 }, { duration: 0.2, ease: 'easeInOut' });
					outerAnim.stop();
					animate(outer, { scale: 1 }, { duration: 0.2, ease: 'easeInOut' });
				};
			});
		});
		console.log('hi');
	});
</script>

<div class="fixed top-0 left-0 z-10 w-screen">
	<div class="flex min-h-10 w-full items-center justify-between backdrop-blur-xs">
		<!-- Left -->
		<div class="flex min-h-4 min-w-4/12 items-center">
			<div class="mr-5"></div>
			{#each navitems as { name, href }, i}
				<div class="mx-5 my-8 flex flex-col items-center justify-center" id={`${name}-outer`}>
					<div class="flex h-2 items-center justify-center">
						<div
							class="gradient-p1-p3-circle aspect-square h-full opacity-0"
							id={`${name}-diamond`}
						></div>
					</div>
					<div><h3 class="px-1 pt-1">{name}</h3></div>
					<div class="flex h-2 flex-col items-center justify-end">
						<div class="gradient-p1-p3-hori h-[1.5px] w-0" id={`${name}-bar`}></div>
					</div>
				</div>
			{/each}
		</div>
		<!-- Right -->
		<div class="h-4 min-w-4/12"></div>
	</div>
</div>

<style>
</style>
