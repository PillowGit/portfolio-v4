<script lang="ts">
	import Notification from '$lib/components/Notification.svelte';

	let showingNotification: boolean = $state(false);
	let notificationMessage: string = $state('');
	let notificationCallback: () => void = $state(() => {});
	let notificationTimeout: number = $state(3000);

	function showNotification(message: string, time: number, callback: () => void) {
		notificationMessage = message;
		notificationTimeout = time;
		notificationCallback = callback;
		showingNotification = true;
	}

	function dismissNotification() {
		showingNotification = false;
	}

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
			showNotification('Please fill out all fields', 3000, () => {
				isSubmitting = false;
			});
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
				showNotification('Message sent!', 3000, () => {
					name = '';
					contact = '';
					message = '';
					isSubmitting = false;
				});
			} else {
				showNotification('Error: ' + data.error, 5000, () => {
					isSubmitting = false;
				});
			}
		} catch (error: any) {
			console.error('Error submitting form:', error);
			isSubmitting = false;
		}
	}
</script>

{#if showingNotification}
	<Notification
		message={notificationMessage}
		time={notificationTimeout}
		onDismiss={dismissNotification}
		callback={notificationCallback}
	/>
{/if}

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
					placeholder="Pillow"
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
					placeholder="Hello, I would like to..."
					required
					bind:value={message}
					class="border-tint dark:border-tintd w-full rounded-md border-2 px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
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
					placeholder={`etc. "@pillo. on discord"`}
					bind:value={contact}
					class="border-tint dark:border-tintd w-full rounded-md border-2 px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
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
