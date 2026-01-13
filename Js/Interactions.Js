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

// Navbar Dropdown Menu
(function() {
	document.addEventListener('DOMContentLoaded', () => {
		const dropdownToggles = document.querySelectorAll('.nav-dropdown-toggle');
		const dropdowns = document.querySelectorAll('.nav-dropdown');
		
		// Toggle dropdown on click
		dropdownToggles.forEach(toggle => {
			toggle.addEventListener('click', (e) => {
				e.preventDefault();
				const dropdown = toggle.closest('.nav-dropdown');
				const isActive = dropdown.classList.contains('active');
				
				// Close all dropdowns first
				dropdowns.forEach(d => d.classList.remove('active'));
				
				// Toggle current dropdown if it wasn't active
				if (!isActive) {
					dropdown.classList.add('active');
				}
			});
		});
		
		// Close dropdown when clicking outside
		document.addEventListener('click', (e) => {
			if (!e.target.closest('.nav-dropdown')) {
				dropdowns.forEach(d => d.classList.remove('active'));
			}
		});
		
		// Close dropdown on Escape key
		document.addEventListener('keydown', (e) => {
			if (e.key === 'Escape') {
				dropdowns.forEach(d => d.classList.remove('active'));
			}
		});
	});
})();

// Image Carousel for Project Pages
(function() {
    document.addEventListener('DOMContentLoaded', () => {
        const carousels = document.querySelectorAll('.project-image-container');
        
        carousels.forEach(carousel => {
            const prevBtn = carousel.querySelector('.nav-arrow.prev');
            const nextBtn = carousel.querySelector('.nav-arrow.next');
            const mainImg = carousel.querySelector('.project-image');
            
            if (!prevBtn || !nextBtn || !mainImg) return;

            // 1. Get images from the data-images attribute
            // We split the string by commas to create an array
            const dataImages = carousel.getAttribute('data-images');
            const extraImages = dataImages ? dataImages.split(',') : [];
            
            // 2. Combine the initial src with the extra images
            const images = [mainImg.src, ...extraImages.map(img => img.trim())];
            
            let imageIndex = 0;
            
            nextBtn.addEventListener('click', () => {
                imageIndex = (imageIndex + 1) % images.length;
                mainImg.src = images[imageIndex];
            });
            
            prevBtn.addEventListener('click', () => {
                imageIndex = (imageIndex - 1 + images.length) % images.length;
                mainImg.src = images[imageIndex];
            });
        });
    });
})();

