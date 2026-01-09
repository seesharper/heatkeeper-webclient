<script lang="ts">
	export let size: number = 24;
</script>

<svg
	width={size}
	height={size}
	viewBox="0 0 24 24"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
	class="inline-block"
>
	<!-- Sun circle (above horizon, warmer color) -->
	<circle cx="12" cy="10" r="4" fill="#FB923C" />

	<!-- Sun rays (longer, full) -->
	<path d="M12 2V4" stroke="#FB923C" stroke-width="2" stroke-linecap="round" />
	<path d="M5 10H7" stroke="#FB923C" stroke-width="2" stroke-linecap="round" />
	<path d="M17 10H19" stroke="#FB923C" stroke-width="2" stroke-linecap="round" />
	<path d="M6.5 4.5L8 6" stroke="#FB923C" stroke-width="2" stroke-linecap="round" />
	<path d="M16 6L17.5 4.5" stroke="#FB923C" stroke-width="2" stroke-linecap="round" />
	<path d="M6.5 15.5L8 14" stroke="#FB923C" stroke-width="2" stroke-linecap="round" />
	<path d="M16 14L17.5 15.5" stroke="#FB923C" stroke-width="2" stroke-linecap="round" />

	<!-- Horizon line -->
	<path d="M3 16H21" stroke="#F97316" stroke-width="2.5" stroke-linecap="round" />

	<!-- Downward arrow -->
	<path d="M12 10L12 16" stroke="#F97316" stroke-width="2" stroke-linecap="round" />
	<path
		d="M10 14L12 16L14 14"
		stroke="#F97316"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
		fill="none"
	/>
</svg>
