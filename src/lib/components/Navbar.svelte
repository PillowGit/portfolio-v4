<script lang="ts">
	import { page } from '$app/state';
	import { animate, hover, press } from 'motion';
	import { onMount } from 'svelte';

	let pathname = page.url.pathname;

	interface NavItem {
		name: string;
		href: string;
		hoverCallback?: () => void;
	}
	const navitems: NavItem[] = [
		{ name: 'Home', href: '/' },
		{ name: 'About', href: '/about' },
		{ name: 'Projects', href: '/projects' },
		{ name: 'Skills', href: '/skills' },
		{ name: 'Contact', href: '/contact' }
	];

	function createHoverHandle(outer: HTMLElement, diamond: HTMLElement, bar: HTMLElement) {
		return hover(outer, () => {
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
	}

	// Since navigating to a new page does *not* remount the Navbar component, we need to manually
	// remove the hover effect when we click on a new page and add a hover effect to the old page
	function updateHoverEffects(oldPathname: string, newPathname: string) {
		const anims = [];
		const index_old = navitems.findIndex((item) => item.href === oldPathname);
		const index_new = navitems.findIndex((item) => item.href === newPathname);
		if (index_old === -1 || index_new === -1) {
			return;
		}
		// Get all elements
		const old_outer = document.getElementById(`${navitems[index_old].name}-outer`);
		const old_diamond = document.getElementById(`${navitems[index_old].name}-diamond`);
		const old_bar = document.getElementById(`${navitems[index_old].name}-bar`);
		if (!old_outer || !old_diamond || !old_bar) {
			return;
		}
		const new_outer = document.getElementById(`${navitems[index_new].name}-outer`);
		const new_diamond = document.getElementById(`${navitems[index_new].name}-diamond`);
		const new_bar = document.getElementById(`${navitems[index_new].name}-bar`);
		if (!new_outer || !new_diamond || !new_bar) {
			return;
		}
		// First remove hover effect from the one we clicked on
		if (navitems[index_new].hoverCallback) {
			navitems[index_new].hoverCallback();
		}
		navitems[index_new].hoverCallback = undefined;
		// Then gracefully transition to the "clicked" state
		anims.push(
			animate(new_diamond, { opacity: 0, rotate: 0 }, { duration: 0.2, ease: 'easeInOut' })
		);
		anims.push(animate(new_bar, { opacity: 1, width: 32 }, { duration: 0.2, ease: 'easeInOut' }));
		anims.push(animate(new_outer, { scale: 1 }, { duration: 0.2, ease: 'easeInOut' }));
		// Animate the old page back to its original unhovered state
		anims.push(
			animate(old_diamond, { opacity: 0, rotate: 0 }, { duration: 0.2, ease: 'easeInOut' })
		);
		anims.push(animate(old_bar, { opacity: 0, width: 0 }, { duration: 0.2, ease: 'easeInOut' }));
		anims.push(animate(old_outer, { scale: 1 }, { duration: 0.2, ease: 'easeInOut' }));
		// And finally add hover effect to the old page and update the pathname
		if (navitems[index_old].hoverCallback) {
			navitems[index_old].hoverCallback();
		}
		navitems[index_old].hoverCallback = createHoverHandle(old_outer, old_diamond, old_bar);
		pathname = newPathname;
	}

	onMount(() => {
		navitems.forEach(({ name, href }) => {
			// Grab elements for this nav component
			const diamond = document.getElementById(`${name}-diamond`);
			const bar = document.getElementById(`${name}-bar`);
			const outer = document.getElementById(`${name}-outer`);
			if (!diamond || !bar || !outer) {
				return;
			}
			// Skip styling for the nav element for the page we are on
			let this_elements_hover: undefined | (() => void);
			if (pathname !== href) {
				this_elements_hover = createHoverHandle(outer, diamond, bar);
			}
			// Create an onhover animation
			// Find index of the current nav elements entry
			const i = navitems.findIndex((item) => item.name === name);
			navitems[i].hoverCallback = this_elements_hover;
			// When the the user clicks it, remove the hover effect and add a hover effect to the old page
			press(outer, () => {
				updateHoverEffects(pathname, href);
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
				<a
					{href}
					class="mx-5 my-8 flex flex-col items-center justify-center hover:cursor-pointer"
					id={`${name}-outer`}
				>
					<div class="flex h-2 items-center justify-center">
						<div
							class="gradient-p1-p3-circle aspect-square h-full opacity-0"
							id={`${name}-diamond`}
						></div>
					</div>
					<div><h3 class="px-1 pt-1">{name}</h3></div>
					<div class="flex h-2 flex-col items-center justify-end">
						<div
							class={pathname === href
								? 'gradient-p1-p3-hori h-[1.5px] w-8'
								: 'gradient-p1-p3-hori h-[1.5px] w-0'}
							id={`${name}-bar`}
						></div>
					</div>
				</a>
			{/each}
		</div>
		<!-- Right -->
		<div class="h-4 min-w-4/12"></div>
	</div>
</div>

<style>
</style>
