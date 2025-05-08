<script lang="ts">
	import projectItems from '$lib/components/ProjectItems';
</script>

<div class="mt-32 h-0.5 w-0.5"></div>
{#each projectItems as item, i}
	<div
		bind:this={item.elementRef}
		class={i % 2 == 0
			? 'my-6 flex min-h-70 w-screen items-center justify-center p-4'
			: 'bg-tint dark:bg-tintd my-6 flex min-h-70 w-screen items-center justify-center p-4'}
	>
		<div
			class={i % 2 == 0
				? 'flex items-center justify-center'
				: 'flex flex-row-reverse items-center justify-center'}
		>
			<img
				class={i % 2 == 0
					? 'border-bgd dark:border-bg mr-12 max-h-52 max-w-88 rounded-sm'
					: 'border-bgd dark:border-bg ml-12 max-h-52 max-w-88 rounded-sm'}
				src={item.projectImage}
				alt={item.projectImageAlt}
			/>
			<div class="flex max-w-66 flex-col items-center justify-center">
				<h2 class="mb-4 text-2xl font-bold">{item.projectTitle}</h2>
				<p class="text-wrap">{item.projectDesc}</p>
				{#if item.projectLinks}
					<div class="mt-4 flex flex-row flex-wrap items-center justify-center space-x-4">
						<h3 class="font-bold">Links:</h3>
						{#each item.projectLinks as link}
							<a
								href={link.href}
								target="_blank"
								class={i % 2 == 0
									? 'border-tint dark:border-tintd hover:bg-tint dark:hover:bg-tintd rounded-lg border-2 p-1.5 transition hover:scale-115'
									: 'border-bg dark:border-bgd hover:bg-bg dark:hover:bg-bgd rounded-lg border-2 p-1.5 transition hover:scale-115'}
								>{link.label}</a
							>
						{/each}
					</div>
				{/if}
			</div>
		</div>
	</div>
{/each}
<div class="my-14"></div>
