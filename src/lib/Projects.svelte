<script lang="ts">
	// @ts-nocheck
	import flowfield from '$lib/images/flowfield.png?w=500&format=webp';
	import bubblesort from '$lib/images/sort.png?w=500&format=webp';
	import mazeart from '$lib/images/maze-art.png?w=500&format=webp';
	import flowfield3d from '$lib/images/3d-flowfield.png?w=500&format=webp';
	import linemap from '$lib/images/lines.png?w=500&format=webp';
	import mandalawalker from '$lib/images/mandala-walker.png?w=500&format=webp';
	import mandalawalkermoving from '$lib/images/animated-mandala-walker.png?w=500&format=webp';
	import staticflowfield from '$lib/images/static-flowfield.png?w=500&format=webp';
	import strangeattractors from '$lib/images/strange-attractors.png?w=500&format=webp';
	import p2pgo from '$lib/images/p2p-go.png?w=500&format=webp';
	import simplesnake from '$lib/images/snake.png?w=500&format=webp';
	import simplepong from '$lib/images/pong.png?w=500&format=webp';

	import lightrays2d from '$lib/images/2d-light-rays.png?w=500&format=webp';
	import raytracingtorender from '$lib/images/3d-render-2d-raytracing.png?w=500&format=webp';
	import animatedseaweed from '$lib/images/animated-seaweed.png?w=500&format=webp';
	import animatedtrianglegrid from '$lib/images/animated-triangle-grid.png?w=500&format=webp';
	import chess from '$lib/images/chess.png?w=500&format=webp';
	import circleflower from '$lib/images/circle-flower.png?w=500&format=webp';
	import circlerainbow from '$lib/images/circle-rainbow.png?w=500&format=webp';
	import colorfulnoise from '$lib/images/colorful-noise.png?w=500&format=webp';
	import countryguesser from '$lib/images/country-guesser.png?w=500&format=webp';
	import flowstairs from '$lib/images/flow-stairs.png?w=500&format=webp';
	import flowfieldcolors from '$lib/images/flowfield-colors.png?w=500&format=webp';
	import flowfieldfishes from '$lib/images/flowfield-fishes.png?w=500&format=webp';
	import flowfieldmatrix from '$lib/images/flowfield-matrix.png?w=500&format=webp';
	import lsystemplants from '$lib/images/l-system-plants.png?w=500&format=webp';
	import lineboxesstyles from '$lib/images/line-boxes-styles.png?w=500&format=webp';
	import ndrendering from '$lib/images/nd-rendering.png?w=500&format=webp';
	import noisecircle from '$lib/images/noise-circle.png?w=500&format=webp';
	import noisespiral from '$lib/images/noise-spiral.png?w=500&format=webp';
	import particlefireworks from '$lib/images/particle-fireworks.png?w=500&format=webp';
	import piestimation from '$lib/images/pi-estimation.png?w=500&format=webp';
	import rectanglesemergence from '$lib/images/rectangles-emergence.png?w=500&format=webp';
	import rotatingrectangle from '$lib/images/rotating-rectangle.png?w=500&format=webp';
	import subdividenoise from '$lib/images/subdivide-noise.png?w=500&format=webp';
	import watercolordrawer from '$lib/images/watercolor-drawer.png?w=500&format=webp';

	import dithering from '$lib/images/dithering.png?w=500&format=webp';
	import circlepacking from '$lib/images/circlepacking.png?w=500&format=webp';

	import sillyjumper from '$lib/images/silly-jumper.png?w=500&format=webp';

	import Project from './Project.svelte';
	import Badge from './Badge.svelte';

	import { gsap } from 'gsap';

	import { Flip } from 'gsap/Flip';
	import { onMount, tick } from 'svelte';

	gsap.registerPlugin(Flip);

	type Project = {
		title: string;
		description: string;
		image: string;
		tags: string[];
		url: string;
		video?: string;
	};

	const projects: Project[] = [
		{
			title: 'Flowfield',
			description:
				'Using noise to move particles around the screen. Inspired by Daniel Shiffman. Press ? for available commands.',
			image: flowfield,
			tags: ['p5', 'art', 'flowfield'],
			url: '/flowfield/',
			video: '/flowfield.mp4'
		},
		{
			title: 'Bubble sort',
			description: 'A visualization of different sorting algorithms.',
			image: bubblesort,
			tags: ['p5', 'algorithm'],
			url: '/bubble-sort/',
			video: '/sort.mp4'
		},
		{
			title: 'Maze art',
			description: 'Creating art using a path finding algorithm.',
			image: mazeart,
			tags: ['p5', 'art', 'algorithm'],
			url: '/maze-art/',
			video: '/maze-art.mp4'
		},
		{
			title: '3D flowfield',
			description: 'A b/w 3D version of a flowfield.',
			image: flowfield3d,
			tags: ['three.js', '3D', 'art', 'flowfield'],
			url: '/3d-flowfield/',
			video: '/3d-flowfield.mp4'
		},
		{
			title: 'Line map',
			description: 'Creating a street map by just drawing lines until they intersect.',
			image: linemap,
			tags: ['p5', 'art'],
			url: '/line-map/',
			video: '/lines.mp4'
		},
		{
			title: 'Mandala Walker',
			description: 'A mostly random walker that draws a mandala.',
			image: mandalawalker,
			tags: ['p5', 'algorithm', 'art'],
			url: '/mandala-walk/',
			video: '/mandala-walker.mp4'
		},
		{
			title: 'Static Flowfield',
			description: 'A static version of my flowfield.',
			image: staticflowfield,
			tags: ['p5', 'art', 'flowfield'],
			url: '/static-flowfield/',
			video: '/static-flowfield.mp4'
		},
		{
			title: 'Strange Attractors',
			description: 'My version of some different strange attractors.',
			image: strangeattractors,
			tags: ['p5', 'algorithm'],
			url: '/strange-attractors/',
			video: '/strange-attractors.mp4'
		},
		{
			title: 'P2P Go',
			description: 'A simple Go game using peer.js (WebRTC) for peer-to-peer connections.',
			image: p2pgo,
			tags: ['p5', 'game', 'multiplayer', 'peer.js'],
			url: '/p2p-go/'
		},
		{
			title: 'Animated Mandala Walker',
			description: 'An animated version of my mandala walker.',
			image: mandalawalkermoving,
			tags: ['p5', 'art'],
			url: '/mandala-walk-animated/',
			video: '/animated-mandala-walker.mp4'
		},
		{
			title: 'Simple Snake',
			description: 'A simple snake version. Control using WASD or swipe on mobile.',
			image: simplesnake,
			tags: ['p5', 'game'],
			url: '/simple-snake/',
			video: '/snake.mp4'
		},
		{
			title: 'Simple Pong',
			description: 'A simple pong version. Control with your mouse (not mobile friendly).',
			image: simplepong,
			tags: ['p5', 'game'],
			url: '/simple-pong/'
		},
		{
			title: '2D Light Rays',
			description:
				'A simple 2D light ray simulation. Supposed to be used for a zombie or escape game. Click to add light source. Move using WASD, move mouse to look around.',
			image: lightrays2d,
			tags: ['p5', 'algorithm'],
			url: '/2d-light-rays/'
		},
		{
			title: '2D Raytracing to 3D render',
			description:
				'How old games like Doom rendered 3D scenes. Move mouse to look around. Click to move forward.',
			image: raytracingtorender,
			tags: ['p5', '3D'],
			url: '/2d-raytracing-to-3d-render/'
		},
		{
			title: 'Animated Seaweed',
			description: 'A simple animation of seaweed.',
			image: animatedseaweed,
			tags: ['p5', 'art'],
			url: '/animated-seaweed/'
		},
		{
			title: 'Animated Triangle Grid',
			description: 'Triangles in grid, with colors, animated. Because why not?',
			image: animatedtrianglegrid,
			tags: ['p5', 'art'],
			url: '/animated-triangle-grid/'
		},
		{
			title: 'Chess',
			description:
				'A simple and clean local multiplayer chess game. Best played on a tablet that you put between you and your opponent.',
			image: chess,
			tags: ['p5', 'game', 'multiplayer'],
			url: '/simple-chess/'
		},
		{
			title: 'Circle Flower',
			description: 'Rotate some half transparent circles and you get a flower.',
			image: circleflower,
			tags: ['p5', 'art'],
			url: '/circles-flower/'
		},
		{
			title: 'Circle Rainbow',
			description: 'A rainbow of circles.',
			image: circlerainbow,
			tags: ['p5', 'art'],
			url: '/circle-rainbow/'
		},
		{
			title: 'Colorful Noise',
			description: 'Noise with colors. Or colors with noise?',
			image: colorfulnoise,
			tags: ['p5', 'art'],
			url: '/colorful-noise/'
		},
		{
			title: 'Country Guesser',
			description: 'Guess (or do you actually know?) where each country is located.',
			image: countryguesser,
			tags: ['p5', 'game'],
			url: '/country-guesser/'
		},
		{
			title: 'Flow Stairs',
			description: 'A flowfield with stairs.',
			image: flowstairs,
			tags: ['p5', 'art', 'flowfield'],
			url: '/flow-stairs/'
		},
		{
			title: 'Flowfield Colors',
			description: 'A flowfield with colors.',
			image: flowfieldcolors,
			tags: ['p5', 'art', 'flowfield'],
			url: '/flowfield-colors/'
		},
		{
			title: 'Flowfield Fishes',
			description: 'A flowfield with fishes.',
			image: flowfieldfishes,
			tags: ['p5', 'art', 'flowfield'],
			url: '/flowfield-fishes/'
		},
		{
			title: 'Flowfield Matrix',
			description: 'A flowfield with a matrix style.',
			image: flowfieldmatrix,
			tags: ['p5', 'art', 'flowfield'],
			url: '/flowfield-matrix/'
		},
		{
			title: 'L-System Plants',
			description: 'Plants generated using L-Systems.',
			image: lsystemplants,
			tags: ['p5', 'art', 'algorithm'],
			url: '/l-system-plants/'
		},
		{
			title: 'Line Boxes Styles',
			description: 'Different styles of line boxes. Also supposed to be used for a game.',
			image: lineboxesstyles,
			tags: ['p5', 'art'],
			url: '/line-boxes-styles/'
		},
		{
			title: 'n-D Rendering',
			description: 'Rendering a n-D scene in 2D. Press + and - to change the dimension.',
			image: ndrendering,
			tags: ['p5', 'art', 'algorithm'],
			url: '/nd-rendering/'
		},
		{
			title: 'Noise Circle',
			description: 'A circle and some noise. Move your mouse over it.',
			image: noisecircle,
			tags: ['p5', 'art'],
			url: '/noise-circle/'
		},
		{
			title: 'Noise Spiral',
			description: 'A spiral.',
			image: noisespiral,
			tags: ['p5', 'art'],
			url: '/noise-spiral/'
		},
		{
			title: 'Particle Fireworks',
			description: 'Fireworks made of particles.',
			image: particlefireworks,
			tags: ['p5', 'art'],
			url: '/particle-fireworks/'
		},
		{
			title: 'Pi Estimation',
			description: 'Estimating pi by "shooting" darts at a circle in a square.',
			image: piestimation,
			tags: ['p5', 'art'],
			url: '/pi-estimation-monte-carlo/'
		},
		{
			title: 'Rectangles Emergence',
			description: 'Emergence of rectangles.',
			image: rectanglesemergence,
			tags: ['p5', 'art'],
			url: '/rectangles-emergence/'
		},
		{
			title: 'Rotating Rectangle',
			description: 'A rotating rectangle.',
			image: rotatingrectangle,
			tags: ['p5', 'art'],
			url: '/rotating-rectangle/'
		},
		{
			title: 'Subdivide Noise',
			description: 'Creating a noise texture or terrain by randomly subdividing a rectangle.',
			image: subdividenoise,
			tags: ['p5', 'art'],
			url: '/subdivide-noise/'
		},
		{
			title: 'Watercolor Drawer',
			description:
				'A watercolor drawer. Press number keys to change the color. Draw with your mouse.',
			image: watercolordrawer,
			tags: ['p5', 'art'],
			url: '/watercolor-drawer/'
		},
		{
			title: 'Dithering',
			description: 'Dithering an image.',
			image: dithering,
			tags: ['p5', 'art'],
			url: '/dithering/'
		},
		{
			title: 'Circle Packing',
			description: 'Packing circles.',
			image: circlepacking,
			tags: ['p5', 'art'],
			url: '/circlepacking/'
		},
		{
			title: 'Silly Jumper',
			description: 'A silly jumper game. Includes local multiplayer. Pretty hard.',
			image: sillyjumper,
			tags: ['p5', 'game', 'multiplayer'],
			url: '/silly-jumper/'
		}
	];

	$: tags = projects.reduce((acc, curr) => {
		curr.tags.forEach((tag) => {
			if (!acc.includes(tag)) {
				acc.push(tag);
			}
		});
		return acc;
	}, []);

	let activeTag: string | undefined;

	async function changeTag(tag) {
		const state = Flip.getState('.project', {
			props: ['opacity', 'y']
		});

		if (!activeTag || activeTag !== tag) {
			activeTag = tag;
		} else {
			activeTag = undefined;
		}

		await tick();

		Flip.from(state, {
			duration: 0.5,
			ease: 'power3.inOut',
			onEnter: (el) => {
				gsap.from(el, { opacity: 0, y: 20, duration: 0.5 });
			},
			onExit: (el) => {
				gsap.to(el, { opacity: 0, y: -20, duration: 0.5 });
			}
		});
	}

	onMount(() => {
		var lazyVideos = [].slice.call(document.querySelectorAll('video.lazy'));

		if ('IntersectionObserver' in window) {
			var lazyVideoObserver = new IntersectionObserver(function (entries, observer) {
				entries.forEach(function (video) {
					if (video.isIntersecting) {
						for (var source in video.target.children) {
							var videoSource = video.target.children[source];
							if (typeof videoSource.tagName === 'string' && videoSource.tagName === 'SOURCE') {
								videoSource.src = videoSource.dataset.src;
							}
						}

						video.target.load();
						video.target.classList.remove('lazy');
						lazyVideoObserver.unobserve(video.target);
					}
				});
			});

			lazyVideos.forEach(function (lazyVideo) {
				lazyVideoObserver.observe(lazyVideo);
			});
		}
	});
</script>

<div id="projects" class="z-20 py-16 md:py-32 section bg-black relative isolate">
	<div class="mx-auto max-w-5xl px-6 lg:px-8">
		<div class="max-w-2xl">
			<h1 class="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
				Some of my old projects
			</h1>
			<p class="mt-6 text-base text-zinc-600 dark:text-zinc-400">
				Check out some of my old coding projects. Mostly written in p5.js and focusing on
				algorithmic art, emergence or small games. Feel free to play around, steal, remix or do
				whatever you want with the code.
			</p>
			<p class="mt-6 flex flex-wrap">
				{#each tags as tag, i}
					<Badge
						class="m-1"
						color={activeTag === tag ? 'cyan' : 'gray'}
						on:click={() => {
							changeTag(tag);
						}}>{tag}</Badge
					>
				{/each}
			</p>
		</div>
	</div>

	<div class="mx-auto max-w-5xl px-6 lg:px-8">
		<ul
			role="list"
			class="mt-20 px-0 sm:px-6 lg:px-0 grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
		>
			{#each projects as project (project.title)}
				<Project {project} {activeTag} {changeTag} />
			{/each}
		</ul>
	</div>
</div>
