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
		(async () => {
			let i = 0;
			titles.sort(() => Math.random() - 0.5);
			while (true) {
				await animate(title_element, { y: [0, -10], opacity: [1, 0] }, { duration: 0.2 });
				title_element.textContent = titles[i];
				await animate(title_element, { y: [10, 0], opacity: [0, 1] }, { duration: 0.2 });
				await new Promise((resolve) => setTimeout(resolve, 3000));
				i = (i + 1) % titles.length;
			}
		})();
	});
</script>

<div class="flex w-8/12 flex-col items-center justify-between md:flex-row">
	<div class="flex flex-col items-start justify-center">
		<div class="flex items-center justify-start">
			<div class="gradient-p1-p3 mr-8 h-32 w-0.5"></div>
			<div class="flex flex-col items-start justify-center">
				<h1 class="text-2xl font-bold md:text-5xl">Hello, I'm Esteban</h1>
				<p class="mt-2 md:text-lg">I'm a software developer aka Pillow</p>
				<p bind:this={title_element} class="mt-2 font-light opacity-0 md:text-lg">Somebody</p>
			</div>
		</div>
	</div>
	<div
		class="gradient-p1-p3 mt-14 flex aspect-square items-center justify-center rounded-full sm:h-44 md:mt-0 md:h-[40vh]"
	>
		<img
			src="https://avatars.githubusercontent.com/u/104609738?v=4"
			alt="Github Profile"
			class="aspect-square h-[98%] rounded-full"
		/>
	</div>
</div>
