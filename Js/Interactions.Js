// Custom round cursor
(function(){
	const cursor = document.createElement('div');
	cursor.className = 'custom-cursor hidden';
	document.addEventListener('DOMContentLoaded', () => {
		document.body.appendChild(cursor);
		cursor.classList.remove('hidden');
	});

	let mouseX = 0, mouseY = 0;

	document.addEventListener('mousemove', (e) => {
		mouseX = e.clientX;
		mouseY = e.clientY;
		cursor.style.left = mouseX + 'px';
		cursor.style.top = mouseY + 'px';
	});

	// Hover over interactive elements
	const addHoverListeners = () => {
		const interactives = document.querySelectorAll('a, button, input[type="button"], input[type="submit"], [data-cursor-hover]');
		interactives.forEach(el => {
			el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
			el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
		});
	};

	addHoverListeners();
	// In case dynamic content is added later
	new MutationObserver(addHoverListeners).observe(document.body, { childList: true, subtree: true });

	// Click feedback
	document.addEventListener('mousedown', () => cursor.classList.add('cursor-click'));
	document.addEventListener('mouseup', () => cursor.classList.remove('cursor-click'));

	// Hide when leaving window
	document.addEventListener('mouseleave', () => cursor.classList.add('hidden'));
	document.addEventListener('mouseenter', () => cursor.classList.remove('hidden'));

})();

