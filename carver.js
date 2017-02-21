AFRAME.registerComponent('draw-canvas', {
	schema: {default: ''},
	init: function () {
		this.canvas = document.querySelector(this.data);
		this.ctx = this.canvas.getContext('2d');
	},
});

AFRAME.registerComponent('drawable', {
	schema: {default: ''},
	init: function () {
		this.el.addEventListener('raycaster-intersected', function(event) {
			console.log(event);
		});
		this.el.addEventListener('raycaster-intersected-cleared', function(event) {
			console.log(event);
		});
	},
});

const qs = document.querySelector.bind(document);
const textureCanvas = qs('#texture-canvas');
const ctx = textureCanvas.getContext('2d');

const crate = new Image();
crate.src = 'images/crate.jpg';
crate.onload = function () {
	ctx.drawImage(crate, 0, 0, 256, 256);
}

const radius = 5;
let drawing = false;
textureCanvas.addEventListener('mousedown', function (event) {
	drawing = true;

	const rect = this.getBoundingClientRect();
	const x = event.clientX - rect.left;
	const y = event.clientY - rect.top;

	ctx.beginPath();
});

const spokes = 7;
const div = (Math.PI*2)/spokes;

let path = [];

// for (let i = 0; i < spokes; i++) {
// 	paths[i] = [];
// }

textureCanvas.addEventListener('mousemove', function (event) {
	if (drawing) {
		const rect = this.getBoundingClientRect();
		const x = event.clientX - rect.left;
		const y = event.clientY - rect.top;

		path.push([x, y]);
		// for (let i = 0; i < paths.length; i++) {
		// 	const [dx, dy] = rotate([x, y], i*div);
		// 	paths[i].push([dx, dy]);
		// }

		ctx.clearRect(0, 0, textureCanvas.width, textureCanvas.height);
		ctx.drawImage(crate, 0, 0, 256, 256);
		ctx.lineWidth = 3;
		for (let i = 0; i < spokes; i++) {
			for (let p = 0; p < path.length-1; p++) {
				const p1 = path[p];
				const x1 = p1[0], y1 = p1[1];
				const p2 = path[p+1];
				const x2 = p2[0], y2 = p2[1];

				const angle = i*div;

				const [dx1, dy1] = rotate([x1, y1], angle);
				const [dx2, dy2] = rotate([x2, y2], angle);

				// const dAngle = (-angle)-90;
				const dAngle = -(angle + 180);
				const [rx1, ry1] = reflect([x1, y1], dAngle);
				const [rx2, ry2] = reflect([x2, y2], dAngle);

				function dotProduct(v1, v2) {
					const [x1, y1] = v1;
					const [x2, y2] = v2;
					return x1*x2 + y1*y2;
				}

				function reflect(p, angle) {
					const x = p[0] - 128, y = p[1] - 128;
					const m = Math.tan(angle);
					console.log(x, y);
					const line = [1, m];
					const intersection = multiply(line, (dotProduct(line, [x, y]) / magnitude(line)^2));
					const diff = subtract(intersection, [x, y]);
					const reflected = add([x, y], multiply(diff, 2));
					return reflected;
				}
				function magnitude(v) {
					return Math.sqrt(v[0]^2 + v[1]^2);
				}
				function multiply(v, c) {
					return [v[0]*c, v[1]*c];
				};
				function add(v1, v2) {
					return [v1[0]+v2[0], v1[1]+v2[1]];
				};
				function subtract(v1, v2) {
					return [v1[0]-v2[0], v1[1]-v2[1]];
				};

				ctx.beginPath();
				ctx.moveTo(dx1, dy1);
				ctx.lineTo(dx2, dy2);
				ctx.strokeStyle="black";
				ctx.stroke();

				// ctx.beginPath();
				// ctx.moveTo(rx1, ry1);
				// ctx.lineTo(rx2, ry2);
				// ctx.strokeStyle="red";
				// ctx.stroke();
			}
		}

		function rotate(xy, r) {
			const x = xy[0] - 128, y = xy[1] - 128;
			// const x = xy[0], y = xy[1];
			const dx = x*Math.cos(r) - y*Math.sin(r);
			const dy = x*Math.sin(r) + y*Math.cos(r);
			return [dx+128, dy+128];
		}

		function rotate3d(xy, r) {
			const x = xy[0] - 128, y = xy[1] - 128;
			// const x = xy[0], y = xy[1];
			const dx = x*Math.cos(r) - y*Math.sin(r);
			const dy = x*Math.sin(r) + y*Math.cos(r);
			return [dx+128, dy+128];
		}
	}
});

textureCanvas.addEventListener('mouseup', function (event) {
	drawing = false;
});

function randint(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

(function render() {
	requestAnimationFrame(render);
}());
