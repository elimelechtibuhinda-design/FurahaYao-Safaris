// Typewriter animation for split phrases in navbar
document.addEventListener('DOMContentLoaded', function() {
	var el = document.getElementById('typewriter-hero');
	if (!el) return;
	var phrases = ['Visit Tanzania', 'See the Best of the world'];
	var phraseIndex = 0;
	var i = 0;
	var typing = true;
	function typeWriter() {
		var text = phrases[phraseIndex];
		if (typing) {
			if (i <= text.length) {
				el.innerHTML = '<span class="typewriter-text">' + text.substring(0, i) + '</span>';
				i++;
				setTimeout(typeWriter, 60);
			} else {
				typing = false;
				setTimeout(typeWriter, 1200); // Pause after typing
			}
		} else {
			if (i > 0) {
				el.innerHTML = '<span class="typewriter-text">' + text.substring(0, i-1) + '</span>';
				i--;
				setTimeout(typeWriter, 30);
			} else {
				typing = true;
				phraseIndex = (phraseIndex + 1) % phrases.length;
				setTimeout(typeWriter, 400); // Pause before next phrase
			}
		}
	}
	typeWriter();
});
// Navbar scroll style
window.addEventListener('scroll', function() {
	const navbar = document.querySelector('.navbar');
	if (!navbar) return;
	if (window.scrollY > 60) {
		navbar.classList.add('solid');
	} else {
		navbar.classList.remove('solid');
	}
});


// Mobile nav toggle: toggles open/close on every click, does NOT auto-close on link click
document.addEventListener('DOMContentLoaded', function() {
	const hamburger = document.querySelector('.navbar-hamburger');
	const mobileMenu = document.getElementById('mobileMenuOverlay');
	let menuOpen = false;
	if (hamburger && mobileMenu) {
		hamburger.addEventListener('click', function() {
			menuOpen = !menuOpen;
			if (menuOpen) {
				mobileMenu.classList.add('active');
				document.body.style.overflow = 'hidden';
			} else {
				mobileMenu.classList.remove('active');
				document.body.style.overflow = '';
			}
		});
	}
	// Smooth scroll for nav links (navbar, mobile, and footer)
	document.querySelectorAll('.navbar-links a, .footer-middle a, .mobile-menu-links a').forEach(function(link) {
		link.addEventListener('click', function(e) {
			const href = link.getAttribute('href');
			if (href && href.startsWith('#')) {
				e.preventDefault();
				const target = document.querySelector(href);
				if (target) {
					target.scrollIntoView({behavior:'smooth'});
				}
			}
		});
	});
});
// Contact form success message
document.addEventListener('DOMContentLoaded', function() {
	// Video control: play from 0s to 3s, slower, loop
	const heroVideo = document.querySelector('.hero-video-bg');
	if (heroVideo) {
		heroVideo.playbackRate = 0.7; // slower speed
		heroVideo.currentTime = 0;
		heroVideo.addEventListener('timeupdate', function() {
			if (heroVideo.currentTime >= 3) {
				heroVideo.currentTime = 3;
				heroVideo.pause();
			}
		});
		// Ensure it starts at 0 on load
		heroVideo.addEventListener('loadedmetadata', function() {
			heroVideo.currentTime = 0;
		});
	}

	const form = document.getElementById('contactForm');
	const success = document.getElementById('formSuccess');
	if (form) {
		form.addEventListener('submit', function(e) {
			e.preventDefault();
			form.style.display = 'none';
			success.style.display = 'block';
		});
	}
});
