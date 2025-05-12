<script lang="ts">
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import { animate, type AnimationPlaybackControls } from 'motion';
	import navitems from './Navitems';

	let pathname = $state(page.url.pathname);
	let oldpathname = pathname;

	const links_left_spacing = 20; // in px

	let is_dark_mode: boolean = $state(false);

	let opened: boolean = $state(false);
	let bg_click_catcher: HTMLButtonElement;
	$effect(() => {
		if (opened) {
			animate(bg_click_catcher, { top: '0' }, { duration: 0.2, ease: 'easeInOut' });
			for (let i = 0; i < navitems.length; i++) {
				setTimeout(() => {
					const el = navitems[i].elementRef;
					if (el) {
						animate(el, { left: `${links_left_spacing}px` }, { duration: 0.2, ease: 'easeInOut' });
					}
				}, i * 50);
			}
		} else {
			for (let i = navitems.length - 1; i >= 0; i--) {
				setTimeout(
					() => {
						const el = navitems[i].elementRef;
						if (el) {
							animate(el, { left: `-50vw` }, { duration: 0.2, ease: 'easeInOut' });
						}
					},
					50 * (i - navitems.length - 1) * -1
				);
			}
			animate(bg_click_catcher, { top: '-150vh' }, { duration: 0.2, ease: 'easeInOut' });
		}
	});

	function linkClicked(name: string) {
		// Animate the underline
		if (oldpathname === name) {
			return;
		}
		const old_bar: HTMLElement | null = document.getElementById(`${oldpathname}-navmenu-bar`);
		const new_bar: HTMLElement | null = document.getElementById(`${name}-navmenu-bar`);
		if (!old_bar || !new_bar) {
			opened = false;
			return;
		}
		animate(old_bar, { width: '0%' }, { duration: 0.2, ease: 'easeInOut' });
		animate(new_bar, { width: '75%' }, { duration: 0.2, ease: 'easeInOut' });
		oldpathname = name;
		opened = false;
	}

	onMount(() => {
		// Update dark mode state
		const dark_mode_query = window.matchMedia('(prefers-color-scheme: dark)');
		is_dark_mode = dark_mode_query.matches;
		dark_mode_query.addEventListener('change', (e) => {
			is_dark_mode = e.matches;
		});
		// Update pathname
		for (let i = 0; i < navitems.length; i++) {
			if (navitems[i].href === pathname) {
				oldpathname = navitems[i].name;
				break;
			}
		}
	});
</script>

{#each navitems as { name, href }, i}
	<a
		class="bg-tint dark:bg-tintd pointer-events-auto fixed top-[88px] left-[-50vw] z-30 flex h-10 flex-col items-center justify-center rounded-lg opacity-95"
		style={`top: ${88 + (40 + 20) * i}px;`}
		{href}
		bind:this={navitems[i].elementRef}
		id={`${name}-navmenu-button`}
		onclick={() => {
			linkClicked(name);
		}}
	>
		<h1 class="px-2 pt-2">{name}</h1>
		<div
			id={`${name}-navmenu-bar`}
			class={href === pathname
				? 'gradient-p1-p3-hori mb-2 min-h-[1.5px] w-[75%]'
				: 'gradient-p1-p3-hori mb-2 min-h-[1.5px] w-[0%]'}
		></div>
	</a>
{/each}
<button
	bind:this={bg_click_catcher}
	class="bg-tint dark:bg-tintd fixed top-[-100vh] left-0 z-20 h-[100%] w-screen opacity-50 backdrop-blur-md"
	onclick={() => (opened = false)}
	aria-label="Close menu"
></button>

<button
	class="gradient-p1-p3-hori fixed top-5 left-5 z-10 flex aspect-square h-12 items-center justify-center rounded-[6px]"
	onclick={() => (opened = true)}
>
	<div
		class="bg-bg dark:bg-bgd flex aspect-square h-[95%] items-center justify-center rounded-[5px]"
	>
		<img
			src={is_dark_mode ? '/icons/menu_icon_dark.svg' : '/icons/menu_icon.svg'}
			alt="menu"
			class="aspect-square h-[75%]"
		/>
	</div>
</button>
