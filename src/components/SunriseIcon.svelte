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
	<!-- Sun circle (partially below horizon) -->
	<circle cx="12" cy="16" r="4" fill="#FCD34D" />

	<!-- Sun rays (shorter, emerging) -->
	<path d="M12 8V10" stroke="#FCD34D" stroke-width="2" stroke-linecap="round" />
	<path d="M5 16H7" stroke="#FCD34D" stroke-width="2" stroke-linecap="round" />
	<path d="M17 16H19" stroke="#FCD34D" stroke-width="2" stroke-linecap="round" />
	<path d="M7 10L8.5 11.5" stroke="#FCD34D" stroke-width="2" stroke-linecap="round" />
	<path d="M15.5 11.5L17 10" stroke="#FCD34D" stroke-width="2" stroke-linecap="round" />

	<!-- Horizon line -->
	<path d="M3 16H21" stroke="#F59E0B" stroke-width="2.5" stroke-linecap="round" />

	<!-- Upward arrow -->
	<path d="M12 20V16" stroke="#F59E0B" stroke-width="2" stroke-linecap="round" />
	<path
		d="M10 18L12 16L14 18"
		stroke="#F59E0B"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
		fill="none"
	/>
</svg>
