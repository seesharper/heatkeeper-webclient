<script lang="ts">
	import { Button, Checkbox, Label, Modal, Radio, Select, Input } from 'flowbite-svelte';

	export let id = '';
	export let label = 'Schedule';
	export let value: string = '';

	// UI state
	let isOpen = false;
	type Mode = 'specific' | 'intervalMinutes' | 'intervalHours';
	let mode: Mode = 'specific';

	// Days: 0=Sun, 1=Mon, ... 6=Sat (cron standard)
	const dayLabels = [
		{ key: 0, label: 'Sun' },
		{ key: 1, label: 'Mon' },
		{ key: 2, label: 'Tue' },
		{ key: 3, label: 'Wed' },
		{ key: 4, label: 'Thu' },
		{ key: 5, label: 'Fri' },
		{ key: 6, label: 'Sat' }
	];
	let selectedDays: Set<number> = new Set([0, 1, 2, 3, 4, 5, 6]);

	// Time values
	let specificTime = '08:00'; // HH:MM
	let everyMinutes: number | string = 15;
	let everyHours: number | string = 1;

	// Helpers
	const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);

	// Reactive preview so UI updates immediately when controls change
	$: cronPreview = (() => {
		if (selectedDays.size === 0) return value || '* * * * *';
		const dow = Array.from(selectedDays)
			.sort((a, b) => a - b)
			.join(',');
		if (mode === 'specific') {
			const [hh, mm] = specificTime.split(':');
			return `${parseInt(mm)} ${parseInt(hh)} * * ${dow}`;
		}
		if (mode === 'intervalMinutes') {
			return `*/${everyMinutes} * * * ${dow}`;
		}
		return `0 */${everyHours} * * ${dow}`;
	})();

	// Names for rendering
	const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

	function daysDescription(days: number[]): string {
		const sorted = [...new Set(days)].sort((a, b) => a - b);
		const isWeekdays = sorted.length === 5 && sorted.every((d, i) => d === i + 1);
		const isWeekends = sorted.length === 2 && sorted[0] === 0 && sorted[1] === 6;
		if (sorted.length === 7) return 'every day';
		if (isWeekdays) return 'weekdays';
		if (isWeekends) return 'weekends';
		return sorted.map((d) => dayNames[d]).join(', ');
	}

	function describe(
		mode: Mode,
		days: Set<number>,
		time: string,
		nMin: number | string,
		nHour: number | string
	) {
		const dd = daysDescription(Array.from(days));
		if (mode === 'specific') return `At ${time} on ${dd}`;
		if (mode === 'intervalMinutes') return `Every ${nMin} minute(s) on ${dd}`;
		return `Every ${nHour} hour(s) at :00 on ${dd}`;
	}

	// Live description for builder state
	$: descriptionPreview = describe(mode, selectedDays, specificTime, everyMinutes, everyHours);

	// Description based on current value outside modal
	function describeFromCron(expr: string): string {
		const trimmed = (expr || '').trim();
		if (!trimmed) return 'Not scheduled';
		const parts = trimmed.split(/\s+/);
		if (parts.length !== 5) return `Custom cron: ${expr}`;
		const [min, hour, _dom, _mon, dowStr] = parts;
		const days = new Set(parseDow(dowStr));
		if (min.startsWith('*/') && hour === '*')
			return `Every ${min.slice(2)} minute(s) on ${daysDescription(Array.from(days))}`;
		if (min === '0' && hour.startsWith('*/'))
			return `Every ${hour.slice(2)} hour(s) at :00 on ${daysDescription(Array.from(days))}`;
		const mm = parseInt(min);
		const hh = parseInt(hour);
		if (!isNaN(mm) && !isNaN(hh))
			return `At ${pad(hh)}:${pad(mm)} on ${daysDescription(Array.from(days))}`;
		return `Custom cron: ${expr}`;
	}
	$: displayDescription = describeFromCron(value);

	function openBuilder() {
		// Try to parse existing value to prefill controls
		tryParse(value);
		isOpen = true;
	}

	function apply() {
		value = cronPreview;
		isOpen = false;
	}

	function toggleDay(day: number) {
		if (selectedDays.has(day)) selectedDays.delete(day);
		else selectedDays.add(day);
		selectedDays = new Set(selectedDays);
	}

	function tryParse(expr: string) {
		// Supported patterns from this builder only
		// 1) "M H * * DOW"
		// 2) "*/N * * * DOW"
		// 3) "0 */N * * DOW"
		const parts = expr.trim().split(/\s+/);
		if (parts.length !== 5) return;

		const [min, hour, dom, mon, dowStr] = parts;
		// Parse DOW as list of numbers 0-6 or names
		const parsedDays = parseDow(dowStr);
		if (parsedDays.length) selectedDays = new Set(parsedDays);

		if (min.startsWith('*/') && hour === '*') {
			// every N minutes
			const n = parseInt(min.slice(2));
			if (!isNaN(n)) {
				mode = 'intervalMinutes';
				everyMinutes = n;
				return;
			}
		}
		if (min === '0' && hour.startsWith('*/')) {
			// every N hours at minute 0
			const n = parseInt(hour.slice(2));
			if (!isNaN(n)) {
				mode = 'intervalHours';
				everyHours = n;
				return;
			}
		}
		// specific time
		const mm = parseInt(min);
		const hh = parseInt(hour);
		if (!isNaN(mm) && !isNaN(hh)) {
			mode = 'specific';
			specificTime = `${pad(hh)}:${pad(mm)}`;
		}
	}

	function parseDow(dow: string): number[] {
		if (!dow) return [];
		const mapNameToNum: Record<string, number> = {
			sun: 0,
			mon: 1,
			tue: 2,
			wed: 3,
			thu: 4,
			fri: 5,
			sat: 6
		};
		const out: number[] = [];
		const items = dow.split(',');
		for (const it of items) {
			const t = it.trim();
			if (t === '*') return [0, 1, 2, 3, 4, 5, 6];
			if (/^\d+$/.test(t)) {
				const n = parseInt(t, 10);
				if (n >= 0 && n <= 6) out.push(n);
			} else {
				const m = mapNameToNum[t.slice(0, 3).toLowerCase()];
				if (m !== undefined) out.push(m);
			}
		}
		return out;
	}
</script>

<div class="space-y-2">
	<Label for={id} class="mb-2">{label}</Label>
	<div class="flex gap-2 items-center">
		<div class="flex-1 p-2 bg-gray-50 dark:bg-gray-700 rounded border border-gray-300 dark:border-gray-600">
			{displayDescription}
		</div>
		<Button on:click={openBuilder} color="primary" size="sm">Edit</Button>
	</div>

	<Modal bind:open={isOpen} size="lg" autoclose>
		<svelte:fragment slot="header">
			<h3 class="text-xl font-semibold">Schedule builder</h3>
		</svelte:fragment>

		<div class="space-y-6">
			<div>
				<Label>Days of week</Label>
				<div class="grid grid-cols-4 gap-3 mt-2">
					{#each dayLabels as d}
						{#key d.key}
							<div class="inline-flex items-center gap-2">
								<Checkbox
									id={`${id}-day-${d.key}`}
									checked={selectedDays.has(d.key)}
									on:change={() => toggleDay(d.key)}
								/>
								<Label for={`${id}-day-${d.key}`}>{d.label}</Label>
							</div>
						{/key}
					{/each}
				</div>
				{#if selectedDays.size === 0}
					<p class="text-sm text-red-600 mt-1">Pick at least one day.</p>
				{/if}
			</div>

			<div class="space-y-3">
				<Label>Time</Label>
				<div class="flex flex-col gap-3">
					<div class="inline-flex items-center gap-2">
						<Radio
							id={`${id}-mode-specific`}
							name="cron-time-mode"
							value="specific"
							checked={mode === 'specific'}
							on:change={() => (mode = 'specific')}
						/>
						<Label for={`${id}-mode-specific`}>Specific time</Label>
					</div>
					{#if mode === 'specific'}
						<div class="pl-6">
							<Input type="time" bind:value={specificTime} />
						</div>
					{/if}

					<div class="inline-flex items-center gap-2">
						<Radio
							id={`${id}-mode-m`}
							name="cron-time-mode"
							value="intervalMinutes"
							checked={mode === 'intervalMinutes'}
							on:change={() => (mode = 'intervalMinutes')}
						/>
						<Label for={`${id}-mode-m`}>Every N minutes</Label>
					</div>
					{#if mode === 'intervalMinutes'}
						<div class="pl-6 flex items-center gap-2">
							<span>Every</span>
							<Select bind:value={everyMinutes} class="w-24">
								{#each [1, 2, 3, 4, 5, 10, 12, 15, 20, 30] as opt}
									<option value={opt}>{opt}</option>
								{/each}
							</Select>
							<span>minutes</span>
						</div>
					{/if}

					<div class="inline-flex items-center gap-2">
						<Radio
							id={`${id}-mode-h`}
							name="cron-time-mode"
							value="intervalHours"
							checked={mode === 'intervalHours'}
							on:change={() => (mode = 'intervalHours')}
						/>
						<Label for={`${id}-mode-h`}>Every N hours</Label>
					</div>
					{#if mode === 'intervalHours'}
						<div class="pl-6 flex items-center gap-2">
							<span>Every</span>
							<Select bind:value={everyHours} class="w-24">
								{#each Array.from({ length: 24 }, (_, i) => i + 1) as opt}
									<option value={opt}>{opt}</option>
								{/each}
							</Select>
							<span>hours</span>
							<span class="text-gray-500 text-sm">(at minute 0)</span>
						</div>
					{/if}
				</div>
			</div>

			<div class="bg-gray-50 dark:bg-gray-700 rounded p-3 text-sm">
				<div class="text-gray-500">Preview</div>
				<div class="font-mono text-base mt-1">{cronPreview}</div>
				<div class="mt-1">{descriptionPreview}</div>
			</div>
		</div>

		<svelte:fragment slot="footer">
			<div class="flex justify-end gap-2 w-full">
				<Button color="light" on:click={() => (isOpen = false)}>Cancel</Button>
				<Button color="primary" on:click={apply} disabled={selectedDays.size === 0}>Apply</Button>
			</div>
		</svelte:fragment>
	</Modal>
</div>

<style>
	/* no extra styles */
	:global(.dark) .text-gray-500 {
		color: rgba(156, 163, 175, 1);
	}
	:global(.font-mono) {
		font-family:
			ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New',
			monospace;
	}
	:global(.w-24) {
		width: 6rem;
	}
</style>
