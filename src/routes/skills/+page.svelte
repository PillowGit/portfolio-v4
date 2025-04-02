<script lang="ts">
	import { onMount } from 'svelte';
	import { animate } from 'motion';

	const techs: string[] =
		'adobe,airbnb,amazon,android,angular,bash,chrome,codepen,cpp,csharp,discord,docker,drive,dropbox,facebook,figma,firefox,flutter,gcal,git,gmail,google,googleshopping,html,instagram,jira,js,kotlin,latex,linux,node,notion,npm,onenote,paypal,pinterest,python,react,reddit,ruby,soundcloud,spotify,stackoverflow,steam,swift,tiktok,tor,trello,twitter,ubuntu,vue,weather,windows,youtube,vscode,teams,snapchat,php,mint,java,github,fedora,css,apple'
			.split(',')
			.map((value) => ({ value, sort: Math.random() }))
			.sort((a, b) => a.sort - b.sort)
			.map(({ value }) => value);

	function randBetween(x: number, y: number) {
		return Math.floor(Math.random() * (y - x + 1)) + x;
	}
	function randTech() {
		return techs[randBetween(0, techs.length - 1)];
	}

	onMount(() => {
		// Let techs flash on and off on their own async
		(async () => {
			for (const tech of techs) {
				const el = document.getElementById(tech);
				if (el) {
					el.style.filter = 'grayscale(1)';
				}
			}
			while (true) {
				const tech = randTech();
				const el = document.getElementById(tech);
				if (el) {
					animate(el, { filter: 'grayscale(0)', scale: 1.025 }, { duration: 0.1 }).then(
						async () => {
							animate(el, { scale: 1 }, { duration: 0.2 });
							await new Promise((resolve) => setTimeout(resolve, 5000));
							animate(el, { filter: 'grayscale(1)' }, { duration: 5 });
						}
					);
				}
				// wait rand interval from 10-500 ms
				const interval = randBetween(10, 100);
				await new Promise((resolve) => setTimeout(resolve, interval));
			}
		})();
	});
</script>

<h1 class="mb-6 text-2xl">Here's all the tech I've used:</h1>
<div class="flex max-w-[80vw] flex-wrap items-center justify-center gap-2 md:gap-4">
	{#each techs as tech}
		<img alt={tech} src={`/icons/tech/${tech}.svg`} class="aspect-square h-12" id={tech} />
	{/each}
</div>
