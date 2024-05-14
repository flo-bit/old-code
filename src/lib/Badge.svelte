<script lang="ts">
	type Color = 'gray' | 'red' | 'yellow' | 'green' | 'blue' | 'indigo' | 'purple' | 'pink' | 'cyan';

	export let color: Color = 'gray';

	let colorClasses: Record<Color, string> = {
		gray: 'bg-gray-400/10 text-gray-400 ring-gray-400/20',
		red: 'bg-red-400/10 text-red-400 ring-red-400/20',
		yellow: 'bg-yellow-400/10 text-yellow-500 ring-yellow-400/20',
		green: 'bg-green-500/10 text-green-400 ring-green-500/20',
		blue: 'bg-blue-400/10 text-blue-400 ring-blue-400/30',
		indigo: 'bg-indigo-400/10 text-indigo-400 ring-indigo-400/30',
		purple: 'bg-purple-400/10 text-purple-400 ring-purple-400/30',
		pink: 'bg-pink-400/10 text-pink-400 ring-pink-400/20',
		cyan: 'bg-cyan-400/10 text-cyan-400 ring-cyan-400/20',
	};

	let classes = "";

	export { classes as class };
</script>

<button
	class="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset {colorClasses[
		color
	]} {classes}"
	on:click
>
	<slot />
</button>
