<script lang="ts">
	export let direction: number | null;
	export let size: number = 24;

	function getWindDirectionIcon(degrees: number | null): string {
		if (degrees === null) return 'N';

		// Normalize to 0-360
		const normalized = ((degrees % 360) + 360) % 360;

		// Calculate which direction (8 directions, 45 degrees each)
		if (normalized >= 337.5 || normalized < 22.5) return 'N';
		if (normalized >= 22.5 && normalized < 67.5) return 'NE';
		if (normalized >= 67.5 && normalized < 112.5) return 'E';
		if (normalized >= 112.5 && normalized < 157.5) return 'SE';
		if (normalized >= 157.5 && normalized < 202.5) return 'S';
		if (normalized >= 202.5 && normalized < 247.5) return 'SW';
		if (normalized >= 247.5 && normalized < 292.5) return 'W';
		if (normalized >= 292.5 && normalized < 337.5) return 'NW';
		return 'N';
	}

	function getRotation(degrees: number | null): number {
		return degrees !== null ? degrees : 0;
	}

	$: directionLabel = getWindDirectionIcon(direction);
	$: rotation = getRotation(direction);
</script>

<div class="inline-flex items-center justify-center" title="{directionLabel} ({direction}°)">
	<svg
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		style="transform: rotate({rotation}deg)"
	>
		<!-- Arrow pointing up (North) -->
		<path
			d="M12 3L8 9H11V21H13V9H16L12 3Z"
			fill="currentColor"
			class="text-gray-700 dark:text-gray-300"
		/>
		<!-- Circle at base for better visibility -->
		<circle cx="12" cy="21" r="1" fill="currentColor" class="text-gray-700 dark:text-gray-300" />
	</svg>
</div>
