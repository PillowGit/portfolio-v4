<script lang="ts">
	import { onMount } from 'svelte';
	import { animate } from 'motion';

	const titles: string[] = [
		'ACM Vice President @ CSUF',
		'Incoming Google SWE',
		'Former Google SWE Intern',
		'LeetCode Connessieur (800+)',
		'Computer Science Tutor',
		'CSUF CS Lab Assistant',
		'Fullyhacks 2025 Co-Director',
		'Pillow',
		'Hunting Horn/Dual Blades Main',
		'Cat Lover'
	];
	let title_element: HTMLParagraphElement;

	onMount(() => {
		const cycle = async (elem: HTMLParagraphElement) => {
			let i = 0;
			titles.sort(() => Math.random() - 0.5);
			while (true) {
				await animate(elem, { y: [0, -10], opacity: [1, 0] }, { duration: 0.2 });
				title_element.textContent = titles[i];
				await animate(elem, { y: [10, 0], opacity: [0, 1] }, { duration: 0.2 });
				await new Promise((resolve) => setTimeout(resolve, 3000));
				i = (i + 1) % titles.length;
			}
		};
		cycle(title_element);
	});
</script>

<!-- Laptops -->
<div class="hidden w-8/12 items-center justify-between md:flex">
	<div class="flex flex-col items-start justify-center">
		<div class="flex items-center justify-start">
			<div class="gradient-p1-p3 mr-8 h-32 w-0.5"></div>
			<div class="flex flex-col items-start justify-center">
				<h1 class="text-5xl font-bold">Hello, I'm Esteban</h1>
				<p class="mt-2 text-lg">I'm a software developer aka Pillow</p>
				<p bind:this={title_element} class="mt-2 text-lg font-light opacity-0">The Goat 🐐</p>
			</div>
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
