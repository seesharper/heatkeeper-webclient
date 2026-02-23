<script lang="ts">
	import { baseUrl } from '$lib/environment';
	import {
		Button,
		Input,
		Label,
		Badge,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';

	type MqttMessage = {
		topic: string;
		payload: string;
		timestamp: string;
	};

	let topic = '';
	let messages: MqttMessage[] = [];
	let es: EventSource | null = null;
	let status: 'idle' | 'connecting' | 'open' | 'error' = 'idle';

	function subscribe() {
		if (!topic.trim()) return;
		es?.close();
		messages = [];
		status = 'connecting';

		es = new EventSource(`${baseUrl}api/mqtt?topic=${encodeURIComponent(topic)}`, {
			withCredentials: true
		});

		es.onopen = () => {
			status = 'open';
		};

		es.onmessage = (ev) => {
			try {
				const msg: MqttMessage = JSON.parse(ev.data);
				messages = [msg, ...messages];
			} catch {
				// ignore parse errors
			}
		};

		es.onerror = () => {
			status = 'error';
		};
	}

	function unsubscribe() {
		es?.close();
		es = null;
		status = 'idle';
	}

	const badgeColor = (s: typeof status) => {
		switch (s) {
			case 'open': return 'green';
			case 'connecting': return 'yellow';
			case 'error': return 'red';
			default: return 'dark';
		}
	};
</script>

<svelte:head>
	<title>MQTT Client</title>
</svelte:head>

<div class="flex items-center gap-3 mb-6">
	<h1 class="text-2xl font-semibold">MQTT Client</h1>
	<Badge color={badgeColor(status)}>{status}</Badge>
</div>

<div class="flex items-end gap-3 mb-6">
	<div class="w-80">
		<Label for="topic" class="mb-1">Topic</Label>
		<Input id="topic" bind:value={topic} placeholder="e.g. sensors/#" />
	</div>
	{#if status === 'idle' || status === 'error'}
		<Button on:click={subscribe}>Subscribe</Button>
	{:else}
		<Button color="red" on:click={unsubscribe}>Unsubscribe</Button>
	{/if}
</div>

{#if messages.length > 0}
	<Table>
		<TableHead>
			<TableHeadCell>Timestamp</TableHeadCell>
			<TableHeadCell>Topic</TableHeadCell>
			<TableHeadCell>Payload</TableHeadCell>
		</TableHead>
		<TableBody>
			{#each messages as msg}
				<TableBodyRow>
					<TableBodyCell class="whitespace-nowrap">{new Date(msg.timestamp).toLocaleTimeString()}</TableBodyCell>
					<TableBodyCell>{msg.topic}</TableBodyCell>
					<TableBodyCell class="font-mono">{msg.payload}</TableBodyCell>
				</TableBodyRow>
			{/each}
		</TableBody>
	</Table>
{:else if status === 'open'}
	<p class="text-gray-500">Waiting for messages...</p>
{/if}
