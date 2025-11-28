<script lang="ts">
	export let value: number = 0;
	export let min: number = 0;
	export let max: number = 100;
	export let size: number = 140; // overall square size
	export let thickness: number = 12; // stroke width
	export let label: string = '';
	export let units: string = '';
	export let color: string = '#1e40af'; // indigo-900
	export let bgColor: string = '#e5e7eb'; // gray-200

	$: clamped = Math.max(min, Math.min(max, value));
	$: pct = (clamped - min) / Math.max(max - min, 1);

	// Gauge geometry: semi-circle from 180deg to 0deg
	const startAngle = Math.PI; // 180°
	const endAngle = 0; // 0°
	$: angle = startAngle + (endAngle - startAngle) * pct;

	$: cx = size / 2;
	$: cy = size / 2;
	$: r = (size - thickness) / 2;

	function polarToCartesian(cx: number, cy: number, r: number, angle: number) {
		return {
			x: cx + r * Math.cos(angle),
			y: cy + r * Math.sin(angle)
		};
	}

	function arcPath(fromPct: number, toPct: number) {
		const fromAngle = startAngle + (endAngle - startAngle) * fromPct;
		const toAngle = startAngle + (endAngle - startAngle) * toPct;

		const start = polarToCartesian(cx, cy, r, fromAngle);
		const end = polarToCartesian(cx, cy, r, toAngle);

		const largeArcFlag = 0; // we never exceed 180°
		const sweepFlag = 1;

		return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} ${sweepFlag} ${end.x} ${end.y}`;
	}

	$: bgPath = arcPath(0, 1);
	$: fgPath = arcPath(0, pct);
</script>

<svg
	width={size}
	height={size}
	viewBox={`0 0 ${size} ${size}`}
	role="img"
	aria-label="gauge"
	class="block"
>
	<!-- background arc -->
	<path d={bgPath} fill="none" stroke={bgColor} stroke-width={thickness} stroke-linecap="round" />
	<!-- foreground arc -->
	<path d={fgPath} fill="none" stroke={color} stroke-width={thickness} stroke-linecap="round" />
	<!-- value text -->
	<text
		x={cx}
		y={cy}
		text-anchor="middle"
		dominant-baseline="central"
		font-size={size * 0.18}
		fill="#111827"
	>
		{Math.round(clamped)}{units ? ` ${units}` : ''}
	</text>
	{#if label}
		<text
			x={cx}
			y={cy + size * 0.18}
			text-anchor="middle"
			dominant-baseline="hanging"
			font-size={size * 0.11}
			fill="#6b7280"
		>
			{label}
		</text>
	{/if}
</svg>
