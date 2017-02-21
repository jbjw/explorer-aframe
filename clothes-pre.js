const scene = document.querySelector('a-scene');

AFRAME.registerComponent('card', {
	schema: {
		name: {
			default: 'clothing',
		},
		location: {
			default: 'butt',
		},
		image: {
			default: '',
		},
		size: {
			default: '1 1 0',
		},
	},
	init: function () {
		// console.log('test')

		const animation = document.createElement('a-animation');
		animation.setAttribute('attribute', 'scale');
		animation.setAttribute('from', '1 1 1');
		animation.setAttribute('to', '1.1 1.1 1');
		animation.setAttribute('dur', '400');
		animation.setAttribute('begin', 'selected');
		animation.setAttribute('end', 'unselected')
		animation.setAttribute('repeat', 'indefinite');
		animation.setAttribute('direction', 'alternate');
		animation.setAttribute('fill', 'forwards');

		this.el.setAttribute('selectable', '');
		// console.log(this.data.size)

		const size = this.data.size.split(' ');
		this.el.setAttribute('geometry', {
			primitive: 'box',
			width: size[0],
			height: size[1],
			depth: size[2],
		});

		this.el.setAttribute('material', 'src', this.data.image);

		this.el.addEventListener('unselected', function () {
			// console.log('unselected event');
		});

		// const label = document.createElement('a-entity');
		// label.setAttribute('bmfont-text', {
		// 	text: this.el.getAttribute('name'),
		// 	align: 'center',
		// 	width: '400',
		// });
		// label.setAttribute('position', '-2 1 0');
		// this.el.appendChild(label);
		// label.setAttribute('visible', false);

		const label = document.createElement('a-entity');
		label.setAttribute('text', {
			text: this.el.getAttribute('name'),
			font: '#gentilisRegularFont',
		});
		label.setAttribute('position', '1 0.25 -2');
		label.setAttribute('rotation', '0 -90 0');
		document.querySelector('a-scene').appendChild(label);
		label.setAttribute('visible', false);
		// optimerRegularFont
		// gentilisRegularFont

		this.el.appendChild(animation);

		window.selected = false;
		// this.el.setAttribute('look-at', '#anchor');

		this.el.addEventListener('selected', function() {
			console.log('selected event');
		});
		const display = document.querySelector('#display');
		const rightController = document.querySelector('#rightController');

		this.el.addEventListener('raycaster-intersected', function(event) {
			if (!selected) {
				selected = true;
				this.setAttribute('material', {
					color: 'red',
				});
				this.emit('selected');
				label.setAttribute('visible', true);
				// display.setAttribute('image', )
			}
		});
		this.el.addEventListener('raycaster-intersected-cleared', function(event) {
			label.setAttribute('visible', false);
			this.setAttribute('material', {
				color: 'white',
			});
			selected = false;
			this.emit('unselected');
		});
	},
});

let lastColor;
function randomColor() {
	const colors = ['red', 'green', 'blue', 'yellow'];
	let color = colors[Math.floor(Math.random()*colors.length)];
	if ( color === lastColor ) {
		color = randomColor();
	}
	lastColor = color;
	return color;
}
