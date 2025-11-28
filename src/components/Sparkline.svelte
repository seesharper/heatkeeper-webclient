<script lang="ts">
	export let values: number[] = [];
	export let width = 240;
	export let height = 60;
	export let stroke = '#3b82f6'; // tailwind blue-500
	export let strokeWidth = 2;
	export let fill: string | null = null; // e.g. 'rgba(59,130,246,0.15)'
	export let min: number | null = null;
	export let max: number | null = null;

	$: computedMin = min ?? (values.length ? Math.min(...values) : 0);
	$: computedMax = max ?? (values.length ? Math.max(...values) : 1);
	$: range = computedMax - computedMin || 1;

	function toPoints() {
		if (!values.length) return '';
		const stepX = width / Math.max(values.length - 1, 1);
		return values
			.map((v, i) => {
				const x = i * stepX;
				const y = height - ((v - computedMin) / range) * height;
				return `${x},${y}`;
			})
			.join(' ');
	}

	$: points = toPoints();
</script>

<svg {width} {height} viewBox={`0 0 ${width} ${height}`} role="img" aria-label="sparkline">
	{#if fill && values.length > 1}
		<polyline points={`${points} ${width},${height} 0,${height}`} {fill} stroke="none" />
	{/if}
	<polyline
		{points}
		fill="none"
		{stroke}
		stroke-width={strokeWidth}
		stroke-linecap="round"
		stroke-linejoin="round"
	/>
</svg>
