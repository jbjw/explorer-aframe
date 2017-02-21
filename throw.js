var scene = document.querySelector('a-scene');
var stack = document.createElement('a-entity');
scene.appendChild(stack);
stack.setAttribute('id', 'boxStack');
stack.setAttribute('position', {
	x: 2,
	y: 1.5,
	z: 0,
});

const qs = document.querySelector.bind(document);

const leftController = qs('#leftController');
const rightController = qs('#rightController');

const table = qs('#table')
// leftController.addEventListener('touchstart', function(what) {
// 	console.log(what);
// });
//
// leftController.addEventListener('touchend', function(what) {
// 	console.log(what);
// });

const camera = qs('a-camera');
const orbit = qs('#orbit');
const sun = qs('#sun');

leftController.addEventListener('axismove', function(event) {

	const x = event.detail.axis[0];
	const y = event.detail.axis[1];
	if (x !== 0 && y !== 0) {
		const xRotation = x*360;
		const yRotation = ((y+1)/2)*180;
		const scale = ((y+1)/2)*100;
		// console.log(sun.getAttribute('material').sunPosition)
		sun.setAttribute('material', 'sunPosition', {
			// x: xRotation,
			// y: yRotation,
			// z: -1,
		});

		orbit.setAttribute('rotation', {
			y: yRotation,
			// y: yRotation,
		});
		// console.log( scale );
		// camera.setAttribute('user-height', scale);
		// table.setAttribute('position', {
		// 	y: scale,
		// });
	}
});


leftController.addEventListener('buttonchanged', function(event) {
	console.log('test', leftController.getAttribute('teleport-controls'));
	//console.log(event.detail.id);
	// console.log(event.detail.state);
});

function randomColor() {
	let colors = ['red', 'green', 'blue', 'yellow'];
	return colors[Math.floor(Math.random()*colors.length)];
}

for ( let i = 0; i < 5; i++ ) {
	var box = document.createElement('a-box');
	box.setAttribute('material', {
		src: '#sunflower',
		color: randomColor(),
	});
	box.setAttribute('dynamic-body', '');
	box.setAttribute('class', 'throwable');
	box.setAttribute('scale', {
		x: 1.75 - (i*0.25),
		y: 0.25,
		z: 1.75 - (i*0.25),
	});
	box.setAttribute('position', {
		x: 0,
		y: 0.35 * i,
		z: 0,
	});
	stack.appendChild(box);
}

// <a-box material="color:rgb(110, 64, 170)" geometry="primitive:box;width:1;height:0.1;depth:1" quaternion="0.00015889758944550504 0.0015115066415989898 -0.000041206660046772106 0.999998844199952" velocity="" dynamic-body="" class="throwable" width="1" height="0.1" depth="1" color="rgb(110, 64, 170)" position="-0.40090947244234987 -0.000357202877238727 0.00006624150135397924" rotation="" scale="" visible=""></a-box>
