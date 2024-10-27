<script lang="ts">
	import Badge from './Badge.svelte';

	export let project: {
		title: string;
		description: string;
		image?: string;
		video?: string;
		url?: string;
		tags: string[];
	};

	export let activeTag: string | undefined;

	export let changeTag: (tag: string) => void;
</script>

<div
	class="group relative flex flex-col items-start project {!activeTag ||
	project.tags.includes(activeTag)
		? ''
		: 'hidden'}"
>
	<div class="relative w-full">
		<div
			class="aspect-[16/9] w-full rounded-2xl bg-gray-900 sm:aspect-[2/1] lg:aspect-[3/2] overflow-hidden relative"
		>
			{#if project.video}
				<video
					autoplay
					muted
					loop
					playsinline
					class="absolute inset-0 w-full h-full object-cover lazy"
					poster={project.image}
				>
					<source data-src={'/old-code/previews/' + project.video} type="video/mp4" />
				</video>
			{:else}
				<img src={project.image} alt="" class="absolute inset-0 w-full h-full object-cover" />
			{/if}
		</div>
		<div class="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-100/10" />
	</div>

	<h2
		class="{project.image ? 'mt-6' : ''} text-base font-semibold text-zinc-800 dark:text-zinc-100"
	>
		{#if project.url}
			<a href={'/old-code' + project.url + 'index.html'} target="_blank">
				<div
					class="absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/30 sm:-inset-x-6 sm:rounded-2xl"
				/>
				<span class="absolute -inset-x-4 -inset-y-6 z-20 sm:-inset-x-6 sm:rounded-2xl" />
				<span class="relative z-10">{project.title}</span>
			</a>
		{:else}
			<div
				class="absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50 sm:-inset-x-6 sm:rounded-2xl"
			/>
			<span class="absolute -inset-x-4 -inset-y-6 z-20 sm:-inset-x-6 sm:rounded-2xl" />
			<span class="relative z-10">{project.title}</span>
		{/if}
	</h2>
	<div class="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400">
		{project.description}
	</div>
	<!-- {#if project.url}
		<p
			class="relative z-10 mt-6 flex text-sm font-medium text-zinc-400 transition group-hover:text-cyan-400 dark:text-zinc-200"
		>
			<svg viewBox="0 0 24 24" aria-hidden="true" class="h-6 w-6 flex-none">
				<path
					d="M15.712 11.823a.75.75 0 1 0 1.06 1.06l-1.06-1.06Zm-4.95 1.768a.75.75 0 0 0 1.06-1.06l-1.06 1.06Zm-2.475-1.414a.75.75 0 1 0-1.06-1.06l1.06 1.06Zm4.95-1.768a.75.75 0 1 0-1.06 1.06l1.06-1.06Zm3.359.53-.884.884 1.06 1.06.885-.883-1.061-1.06Zm-4.95-2.12 1.414-1.415L12 6.344l-1.415 1.413 1.061 1.061Zm0 3.535a2.5 2.5 0 0 1 0-3.536l-1.06-1.06a4 4 0 0 0 0 5.656l1.06-1.06Zm4.95-4.95a2.5 2.5 0 0 1 0 3.535L17.656 12a4 4 0 0 0 0-5.657l-1.06 1.06Zm1.06-1.06a4 4 0 0 0-5.656 0l1.06 1.06a2.5 2.5 0 0 1 3.536 0l1.06-1.06Zm-7.07 7.07.176.177 1.06-1.06-.176-.177-1.06 1.06Zm-3.183-.353.884-.884-1.06-1.06-.884.883 1.06 1.06Zm4.95 2.121-1.414 1.414 1.06 1.06 1.415-1.413-1.06-1.061Zm0-3.536a2.5 2.5 0 0 1 0 3.536l1.06 1.06a4 4 0 0 0 0-5.656l-1.06 1.06Zm-4.95 4.95a2.5 2.5 0 0 1 0-3.535L6.344 12a4 4 0 0 0 0 5.656l1.06-1.06Zm-1.06 1.06a4 4 0 0 0 5.657 0l-1.061-1.06a2.5 2.5 0 0 1-3.535 0l-1.061 1.06Zm7.07-7.07-.176-.177-1.06 1.06.176.178 1.06-1.061Z"
					fill="currentColor"
				/>
			</svg>
			<span class="ml-2">{project.url}</span>
		</p>
	{/if} -->
	<div class="mt-6 flex items-center gap-x-4 text-xs z-30">
		<!--<time datetime={post.date} class="text-gray-500">{post.date}</time>-->
		{#each project.tags as tag}
			<Badge
				color={tag === activeTag ? 'cyan' : 'gray'}
				on:click={() => {
					changeTag(tag);
				}}>{tag}</Badge
			>
		{/each}
	</div>
</div>
