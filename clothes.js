function randint(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

// const clothesdb = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const qs = document.querySelector.bind(document);
const collection = qs('#collection');

const display = qs('#display');

const leftController = qs('#leftController');
const rightController = qs('#rightController');

leftController.addEventListener('axismove', function(event) {
	const [x, y] = event.detail.axis;
	collection.setAttribute('rotation', {
		y: x*180,
	});
});

const rAccum = 0;
rightController.addEventListener('axismove', function(event) {
	const [x, y] = event.detail.axis;
	if (x !== 0 && y !== 0) {
		const r = (((y+1)/2)*5)+2;

		collection.setAttribute('layout', {
			radius: r,
		});
	}
});

rightController.addEventListener('touchstart', function(event) {
	if (event.detail.id === 0) {
		console.log(event.detail.state);
	}
});

// let intersecting = false;
// let intersectingEl;
// rightController.addEventListener('raycaster-intersection', function (event) {
// 	if (!intersecting) {
// 		intersecting = true;
// 		intersectingEl = event.intersectedEls[0];
// 	}
// });
//
// rightController.addEventListener('raycaster-intersection-cleared', function (event) {
// 	if (intersecting) {
// 		// intersectingEl.
// 		intersecting = false;
// 	}
// });

rightController.addEventListener('triggerdown', function (event) {
	// if (intersecting) {
	//
	// }
	this.setAttribute('material', {
		color: randomColor(),
	});
});

for (let item of window.clothesdb) {
	let card = document.createElement('a-entity');
	card.setAttribute('look-at', '#anchor');

	// console.log(item.size);
	card.setAttribute('card', {
		name: item.name,
		location: item.location,
		image: `data-url(images/clothing/${item.image})`,
		size: item.size,
	});

	collection.appendChild(card);
}

(function render() {
	requestAnimationFrame(render);
}());
