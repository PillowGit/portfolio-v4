<script lang="ts">
	let name: string = $state('');
	let contact: string = $state('');
	let message: string = $state('');

	let isSubmitting: boolean = $state(false);

	async function run_post() {
		if (isSubmitting) {
			return;
		}

		isSubmitting = true;

		// Check all fields
		if (!name || !contact || !message) {
			alert('Please fill out all fields.');
			setTimeout(() => {
				isSubmitting = false;
			}, 1000);
			return;
		}

		try {
			// Run post request
			const res = await fetch('/api/contact', {
				method: 'POST',
				body: JSON.stringify({ name, contact, message }),
				headers: { 'Content-Type': 'application/json' }
			});
			const data = await res.json();

			// Interpret response
			if (res.ok) {
				// TODO: Alert is temporary make a nicer notification later
				alert('Message sent successfully!');
				setTimeout(() => {
					name = '';
					contact = '';
					message = '';
					isSubmitting = false;
				}, 2000);
			} else {
				alert('Error: ' + data.error);
				setTimeout(() => {
					isSubmitting = false;
				}, 1000);
			}
		} catch (error: any) {
			console.error('Error submitting form:', error);
			isSubmitting = false;
		}
	}
</script>

<div
	class="gradient-p1-p3-hori mx-8 my-22 flex flex-col items-center justify-center rounded-xl p-[2.5px]"
>
	<div class="dark:bg-bgd bg-bg flex flex-col items-center justify-center rounded-xl p-6">
		<h2 class="mb-8 text-2xl font-bold">Want to contact me? Let's get in touch!</h2>

		<form onsubmit={run_post} class="flex w-full max-w-md flex-col items-center">
			<div class="mb-6 w-full">
				<label for="name" class="mb-1 block text-sm font-medium"
					><span class="text-red-600">*</span> Name</label
				>
				<input
					type="text"
					id="name"
					name="name"
					required
					bind:value={name}
					class="border-tint dark:border-tintd w-full rounded-md border-2 px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
				/>
			</div>

			<div class="mb-6 w-full">
				<label for="message" class="mb-1 block text-sm font-medium"
					><span class="text-red-600">*</span> Your message</label
				>
				<textarea
					id="message"
					name="message"
					rows="4"
					required
					bind:value={message}
					class="border-tint dark:border-tintd w-full rounded-md border-2 px-3 py-2 text-white focus:ring-2 focus:ring-purple-500 focus:outline-none"
				></textarea>
			</div>

			<div class="mb-6 w-full">
				<label for="contact_method" class="mb-1 block text-sm font-medium"
					><span class="text-red-600">*</span> How should I contact you?</label
				>
				<input
					type="text"
					id="contact_method"
					name="contact_method"
					required
					bind:value={contact}
					class="border-tint dark:border-tintd w-full rounded-md border-2 px-3 py-2 text-white focus:ring-2 focus:ring-purple-500 focus:outline-none"
				/>
			</div>

			<button
				type="submit"
				onclick={run_post}
				disabled={isSubmitting}
				class="rounded-md bg-purple-600 px-6 py-2 font-semibold text-white hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
			>
				{#if isSubmitting}
					Submitting...
				{:else}
					submit
				{/if}
			</button>
		</form>
	</div>
</div>
