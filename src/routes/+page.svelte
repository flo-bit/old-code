<script lang="ts">
	// @ts-nocheck
	import flowfield from '$lib/images/flowfield.jpg?w=1000&format=webp';
	import bubblesort from '$lib/images/bubble-sort.png?w=1000&format=webp';
	import mazeart from '$lib/images/maze-art.png?w=1000&format=webp';
	import flowfield3d from '$lib/images/3d-flowfield.png?w=1000&format=webp';
	import linemap from '$lib/images/line-map.png?w=1000&format=webp';
	import mandalawalker from '$lib/images/mandala-walk.png?w=1000&format=webp';
	import mandalawalkermoving from '$lib/images/mandala-walk-moving.png?w=1000&format=webp';
	import staticflowfield from '$lib/images/static-flowfield.png?w=1000&format=webp';
	import strangeattractors from '$lib/images/strange_attractors.png?w=1000&format=webp';
	import p2pgo from '$lib/images/p2p-go.png?w=1000&format=webp';
	import simplesnake from '$lib/images/snake.png?w=1000&format=webp';
	import simplepong from '$lib/images/pong.png?w=1000&format=webp';

	import lightrays2d from '$lib/images/2d-light-rays.png?w=1000&format=webp';
	import raytracingtorender from '$lib/images/3d-render-2d-raytracing.png?w=1000&format=webp';
	import animatedseaweed from '$lib/images/animated-seaweed.png?w=1000&format=webp';
	import animatedtrianglegrid from '$lib/images/animated-triangle-grid.png?w=1000&format=webp';
	import chess from '$lib/images/chess.png?w=1000&format=webp';
	import circleflower from '$lib/images/circle-flower.png?w=1000&format=webp';
	import circlerainbow from '$lib/images/circle-rainbow.png?w=1000&format=webp';
	import colorfulnoise from '$lib/images/colorful-noise.png?w=1000&format=webp';
	import countryguesser from '$lib/images/country-guesser.png?w=1000&format=webp';
	import flowstairs from '$lib/images/flow-stairs.png?w=1000&format=webp';
	import flowfieldcolors from '$lib/images/flowfield-colors.png?w=1000&format=webp';
	import flowfieldfishes from '$lib/images/flowfield-fishes.png?w=1000&format=webp';
	import flowfieldmatrix from '$lib/images/flowfield-matrix.png?w=1000&format=webp';
	import lsystemplants from '$lib/images/l-system-plants.png?w=1000&format=webp';
	import lineboxesstyles from '$lib/images/line-boxes-styles.png?w=1000&format=webp';
	import ndrendering from '$lib/images/nd-rendering.png?w=1000&format=webp';
	import noisecircle from '$lib/images/noise-circle.png?w=1000&format=webp';
	import noisespiral from '$lib/images/noise-spiral.png?w=1000&format=webp';
	import particlefireworks from '$lib/images/particle-fireworks.png?w=1000&format=webp';
	import piestimation from '$lib/images/pi-estimation.png?w=1000&format=webp';
	import rectanglesemergence from '$lib/images/rectangles-emergence.png?w=1000&format=webp';
	import rotatingrectangle from '$lib/images/rotating-rectangle.png?w=1000&format=webp';
	import subdividenoise from '$lib/images/subdivide-noise.png?w=1000&format=webp';
	import watercolordrawer from '$lib/images/watercolor-drawer.png?w=1000&format=webp';

	import dithering from '$lib/images/dithering.png?w=1000&format=webp';
	import circlepacking from '$lib/images/circlepacking.png?w=1000&format=webp';

	const content: {
		title: string;
		description: string;
		image: string;
		tags: string[];
		url: string;
	}[] = [
		{
			title: 'Flowfield',
			description:
				'Using noise to move particles around the screen. Inspired by Daniel Shiffman. Press ? for available commands.',
			image: flowfield,
			tags: ['p5', 'art'],
			url: '/flowfield/'
		},
		{
			title: 'Bubble sort',
			description: 'A visualization of different sorting algorithms.',
			image: bubblesort,
			tags: ['p5', 'algorithm'],
			url: '/bubble-sort/'
		},
		{
			title: 'Maze art',
			description: 'Creating art using a path finding algorithm.',
			image: mazeart,
			tags: ['p5', 'art', 'algorithm'],
			url: '/maze-art/'
		},
		{
			title: '3D flowfield',
			description: 'A b/w 3D version of a flowfield.',
			image: flowfield3d,
			tags: ['p5', '3D', 'art'],
			url: '/3d-flowfield/'
		},
		{
			title: 'Line map',
			description: 'Creating a street map by just drawing lines until they intersect.',
			image: linemap,
			tags: ['p5', 'art'],
			url: '/line-map/'
		},
		{
			title: 'Mandala Walker',
			description: 'A mostly random walker that draws a mandala.',
			image: mandalawalker,
			tags: ['p5', 'algorithm', 'art'],
			url: '/mandala-walk/'
		},
		{
			title: 'Static Flowfield',
			description: 'A static version of my flowfield.',
			image: staticflowfield,
			tags: ['p5', 'art'],
			url: '/static-flowfield/'
		},
		{
			title: 'Strange Attractors',
			description: 'My version of some different strange attractors.',
			image: strangeattractors,
			tags: ['p5', 'algorithm'],
			url: '/strange-attractors/'
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
			url: '/mandala-walk-animated/'
		},
		{
			title: 'Simple Snake',
			description: 'A simple snake version. Control using WASD or swipe on mobile.',
			image: simplesnake,
			tags: ['p5', 'game'],
			url: '/simple-snake/'
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
			tags: ['p5', 'game'],
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
			tags: ['p5', 'game'],
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
			tags: ['p5', 'art'],
			url: '/flow-stairs/'
		},
		{
			title: 'Flowfield Colors',
			description: 'A flowfield with colors.',
			image: flowfieldcolors,
			tags: ['p5', 'art'],
			url: '/flowfield-colors/'
		},
		{
			title: 'Flowfield Fishes',
			description: 'A flowfield with fishes.',
			image: flowfieldfishes,
			tags: ['p5', 'art'],
			url: '/flowfield-fishes/'
		},
		{
			title: 'Flowfield Matrix',
			description: 'A flowfield with a matrix style.',
			image: flowfieldmatrix,
			tags: ['p5', 'art'],
			url: '/flowfield-matrix/'
		},
		{
			title: 'L-System Plants',
			description: 'Plants generated using L-Systems.',
			image: lsystemplants,
			tags: ['p5', 'art'],
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
			tags: ['p5', 'art'],
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
		}
	];
</script>

<div class=" py-24 sm:py-32">
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<div class="mx-auto max-w-2xl text-center">
			<h2 class="text-3xl font-bold tracking-tight text-white sm:text-4xl">Old projects</h2>
			<p class="mt-2 text-lg leading-8 text-neutral-300">
				Here are some of my old coding projects. Mostly written in p5.js and focusing on creative
				art, emergence or small games.
			</p>
		</div>
		<div
			class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3"
		>
			{#each content as post}
				<article class="flex flex-col items-start justify-between">
					<div class="relative w-full">
						<img
							src={post.image}
							alt=""
							class="aspect-[16/9] w-full rounded-2xl bg-gray-900 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
						/>
						<div class="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-100/10" />
					</div>
					<div class="max-w-xl">
						<div class="mt-8 flex items-center gap-x-4 text-xs">
							<!--<time datetime={post.date} class="text-gray-500">{post.date}</time>-->
							{#each post.tags as tag}
								<div
									class="relative z-10 rounded-full bg-neutral-800 px-3 py-1.5 font-medium text-neutral-200"
								>
									{tag}
								</div>
							{/each}
						</div>
						<div class="group relative">
							<h3
								class="mt-3 text-lg font-semibold leading-6 text-neutral-100 group-hover:text-neutral-300"
							>
								<a href='/old-code{post.url}'>
									<span class="absolute inset-0" />
									{post.title}
								</a>
							</h3>
							<p class="mt-5 line-clamp-3 text-sm leading-6 text-neutral-300">
								{post.description}
							</p>
						</div>
					</div>
				</article>
			{/each}
			<!-- More posts... -->
		</div>
	</div>
</div>
