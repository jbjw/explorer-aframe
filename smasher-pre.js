AFRAME.registerComponent('terrain', {
	schema: {
		test: {type: 'string', default: ''},
	},
	init: function() {
		// var options = {
		// 	color: new THREE.Color('rgb(255, 0, 0)'),
		// 	wireframe: true,
		// };

		var options = {
			color: new THREE.Color('rgb(255, 255, 255)'),
		};
		options.map = new THREE.TextureLoader().load( "images/dirt.jpg" );
		options.map.wrapS = THREE.RepeatWrapping;
		options.map.wrapT = THREE.RepeatWrapping;
		options.map.repeat.set( 100, 100 );

		var material = new THREE.MeshLambertMaterial(options);

		var t1 = new THREE.TextureLoader().load('images/sand.jpg'); // was sky for some reason
		// t1.minFilter = THREE.LinearFilter;
		var t2 = new THREE.TextureLoader().load( "images/grass.jpg" );
		t2.wrapS = t2.wrapT = THREE.RepeatWrapping;
		var t3 = new THREE.TextureLoader().load( "images/stone.jpg" );
		t3.wrapS = t3.wrapT = THREE.RepeatWrapping;
		var t4 = new THREE.TextureLoader().load( "images/snow.jpg" );
		t4.wrapS = t4.wrapT = THREE.RepeatWrapping;

		var blend = THREE.Terrain.generateBlendedMaterial([
			{texture: t1},
			{texture: t2, levels: [-80, -35, 20, 50]},
			{texture: t3, levels: [20, 50, 60, 85]},
			{texture: t4, glsl: '1.0 - smoothstep(65.0 + smoothstep(-256.0, 256.0, vPosition.x) * 10.0, 80.0, vPosition.z)'},
			{texture: t3, glsl: 'slope > 0.7853981633974483 ? 0.2 : 1.0 - smoothstep(0.47123889803846897, 0.7853981633974483, slope) + 0.2'}, // between 27 and 45 degrees
		]);

		material = blend;

		var terrainScene = THREE.Terrain({
			easing: THREE.Terrain.Linear,
			frequency: 2.5,
			heightmap: THREE.Terrain.DiamondSquare,
			material: material,
			maxHeight: 0,
			minHeight: -100,
			steps: 5,
			useBufferGeometry: false,
			xSegments: 63,
			xSize: 1024,
			ySegments: 63,
			ySize: 1024,
			// turbulent: true,
		});
		// scene.add(terrainScene);

		// Add randomly distributed foliage
		// decoScene = THREE.Terrain.ScatterMeshes(geo, {
		// 	mesh: new THREE.Mesh(new THREE.CylinderGeometry(2, 2, 12, 6)),
		// 	w: xS,
		// 	h: yS,
		// 	spread: 0.02,
		// 	randomness: Math.random,
		// });
		// terrainScene.add(decoScene);
		this.el.setObject3D('mesh', terrainScene);

		// this.el.setAttribute('geometry', 'primitive: plane; buffer: false; width: 10; height: 10;');
		//
		// var geometry = new THREE.PlaneGeometry( 10, 10, 20, 20);
		// geometry.rotateX( - Math.PI / 2 );
		// geometry.dynamic = true;
		// for (let i = 0; i < geometry.vertices.length; i++) {
		// 	// geometry.vertices[i].y = 1 * Math.sin( i / 2 );
		// 	geometry.vertices[i].y = Math.random()*0.2;
		// }
		// geometry.vertices;
		// geometry.verticesNeedUpdate = true;
		//
		// var mesh = this.el.getObject3D('mesh');
		// mesh.geometry = geometry;
		//
		// // this.el.setAttribute('material', 'src: #dirt');
		// // var options = {
		// // 	color: new THREE.Color('rgb(255, 0, 0)'),
		// // 	wireframe: true,
		// // };
		//
		// var options = {
		// 	color: new THREE.Color('rgb(255, 255, 255)'),
		// };
		// options.map = new THREE.TextureLoader().load( "images/dirt.jpg" );
		// options.map.wrapS = THREE.RepeatWrapping;
		// options.map.wrapT = THREE.RepeatWrapping;
		// options.map.repeat.set( 4, 4 );
		//
		// var material = new THREE.MeshLambertMaterial(options);
		//
		// mesh.material = material;
	},
});

// var geometry = new THREE.Geometry();
//     geometry.vertices.push.call(
//       geometry.vertices,
//       data.vertices.map(function (vertex) {
//         var points = vertex.split(' ').map(parseInt);
//         return new THREE.Vector3(points[0], points[1], points[2]);
//       });
//     );
//     geometry.faces.push(new THREE.Face3(0, 1, 2));
//     this.geometry = geometry;

AFRAME.registerComponent('canvas-texture', {
	schema: {
		src: {type: 'selector'},
	},
	init: function () {
		// this.canvas = document.querySelector(this.data.canvas);
		// this.canvas = this.data.canvas;
		// this.ctx = this.canvas.getContext('2d');
		this.el.setAttribute('material', 'src: #texture-canvas');
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
