AFRAME.registerComponent('controller-loaded', {
	init: function() {
		this.el.addEventListener('model-loaded', function() {
			this.addState('loaded');
		});
	},
});

AFRAME.registerComponent('decal', {
	init: function () {
		const parent = this.el.parentNode.getObject3D('mesh');

		var decalGeometry = new THREE.DecalGeometry(
			parent, // it has to be a THREE.Mesh
			position, // THREE.Vector3 in world coordinates
			direction, // THREE.Vector3 specifying the orientation of the decal
			new THREE.Vector3, // THREE.Vector3 specifying the size of the decal box
			check // THREE.Vector3 specifying what sides to clip (1-clip, 0-noclip)
		);

		var decalMaterial = new THREE.MeshPhongMaterial( {
			specular: 0xffffff,
			shininess: 10,
			map: THREE.ImageUtils.loadTexture( 'assets/splatter.png' ),
			normalMap: THREE.ImageUtils.loadTexture( 'assets/wrinkle-normal.jpg' ),
			normalScale: new THREE.Vector2( .15, .15 ),
			transparent: true,
			depthTest: true,
			depthWrite: false,
			polygonOffset: true,
			polygonOffsetFactor: -4,
			wireframe: false
		});

		// const decalMaterial = new THREE.MeshNormalMaterial({
		// 	transparent: true,
		// 	depthTest: true,
		// 	depthWrite: false,
		// 	polygonOffset: true,
		// 	polygonOffsetFactor: -4,
		// });
		const mesh = new THREE.Mesh(decalGeometry, decalMaterial);

		this.el.setObject3D('decal', mesh)
	}
});

AFRAME.registerComponent('sun-position-setter', {
        init: function () {
          var skyEl = this.el;
          var orbitEl = this.el.sceneEl.querySelector('#orbit');
          orbitEl.addEventListener('componentchanged', function changeSun (evt) {
            var sunPosition;
            var phi;
            var theta;
            if (evt.detail.name !== 'rotation') { return; }
            sunPosition = orbitEl.getComputedAttribute('rotation');
            if(sunPosition === null) { return; }
            theta = Math.PI * (-0.25); // was-0.5

						// theta = Math.PI * ((sunPosition.x / 360) - 0.5);
            phi = 2 * Math.PI * (sunPosition.y / 360 - 0.5);
            skyEl.setAttribute('material', 'sunPosition', {
              x: Math.cos(phi),
              y: Math.sin(phi) * Math.sin(theta),
              z: -1
            });
          });
        }
      });
