<script lang="ts">
	import { onMount } from 'svelte';
	import { animate } from 'motion';

	const birthday: Date = new Date(2003, 3, 21);
	// @ts-ignore
	const age: number = Math.floor((new Date() - birthday) / 31556952000);
	const bio: string = `Short About Me: I'm Esteban Escartin. I go by Pillow online. I'm a ${age} year old 4th year student at CSUF. I play a lot of osu! and Monster Hunter Wilds, and do a lot of coding in my free time. I am a former Google SWE Intern, current ACM VP at CSUF, Co-Director for Fullyhacks 2025, and an incoming Google SWE.`;

	const titles: string[] = [
		'Former ACM VP @ CSUF',
		'Google SWE',
		'LeetCode Connessieur (1000+)',
		'Fullyhacks 2025 Co-Director',
		'Pillow!',
		'Hunting Horn/Dual Blades Main',
		'Cat Lover',
		'osu! Player',
		'Matcha Addict',
		`${age} year old 🫨`,
		'Aspiring Photographer',
		'Amateur Baker',
		'Scared of Rust',
		'Korean Food Lover',
		'Former Google SWE AR Intern',
		'Vim User btw',
		'Ashley, Hannah, Timmy, Joel 🥹🫶'
	];
	let title_element: HTMLParagraphElement;
	let title_element_mobile: HTMLParagraphElement;

	async function cycleTitles(elem: HTMLParagraphElement) {
		let i = 0;
		const titles_copy = [...titles];
		titles_copy.sort(() => Math.random() - 0.5);
		while (true) {
			await animate(elem, { y: [0, -10], opacity: [1, 0] }, { duration: 0.2 });
			elem.textContent = titles_copy[i];
			await animate(elem, { y: [10, 0], opacity: [0, 1] }, { duration: 0.2 });
			await new Promise((resolve) => setTimeout(resolve, 3000));
			i = (i + 1) % titles_copy.length;
		}
	}

	onMount(() => {
		cycleTitles(title_element_mobile);
		cycleTitles(title_element);
	});
</script>

<!-- Laptops -->
<div class="hidden w-8/12 items-center justify-between md:flex">
	<div class="flex flex-col items-start justify-center">
		<div class="flex items-center justify-start">
			<div class="gradient-p1-p3 mr-8 h-32 w-0.5"></div>
			<div class="flex flex-col items-start justify-center">
				<h1 class="text-5xl font-bold">Hello, I'm Esteban</h1>
				<h2 class="mt-2 text-lg">
					I'm a software developer a.k.a. <span class="font-bold">Pillow</span>
				</h2>
				<p bind:this={title_element} class="mt-2 text-lg font-light opacity-0">The Goat 🐐</p>
			</div>
		</div>
		<div>
			<p class="m-8 max-w-100 text-sm font-light text-wrap">
				{bio}
			</p>
		</div>
	</div>
	<div class="gradient-p1-p3 flex aspect-square h-[40vh] items-center justify-center rounded-full">
		<img
			src="https://avatars.githubusercontent.com/u/104609738?v=4"
			alt="Github Profile"
			class="aspect-square h-[98%] rounded-full"
		/>
	</div>
</div>
<!-- Mobile -->
<div class="flex h-[60vh] w-[75vw] flex-col items-center justify-center md:hidden">
	<div class="gradient-p1-p3 flex aspect-square w-[40%] items-center justify-center rounded-full">
		<img
			src="https://avatars.githubusercontent.com/u/104609738?v=4"
			alt="Github Profile"
			class="aspect-square h-[98%] rounded-full"
		/>
	</div>
	<div class="mt-10 text-3xl font-bold"><h1>Hello, I'm Esteban</h1></div>
	<div class="gradient-p1-p3-hori mt-4 h-0.5 w-[90%]"></div>
	<div class="mt-4 text-sm">
		<h1>I'm a software developer a.k.a. <span class="font-bold">Pillow</span></h1>
	</div>
	<div>
		<p bind:this={title_element_mobile} class="mt-4 text-sm font-light opacity-0">The Goat 🐐</p>
	</div>
	<div class="gradient-p1-p3-hori mt-4 mb-10 h-0.5 w-[20%]"></div>
	<div><p class="text-center text-xs font-light">{bio}</p></div>
</div>
<div class="flex h-[10vh] w-[75vw] flex-col items-center justify-center md:hidden"></div>
