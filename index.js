/* Sarah Santos — portfolio interactions
   Vanilla JS, no build step. Bootstrap 5 bundle is loaded separately. */
(function () {
	'use strict';

	document.addEventListener('DOMContentLoaded', function () {
		setFooterYear();
		initMobileNavAutoClose();
		initScrollSpy();
		initRevealOnScroll();
		initBackToTop();
		initContactForm();
	});

	/* Footer year */
	function setFooterYear() {
		var el = document.getElementById('year');
		if (el) el.textContent = String(new Date().getFullYear());
	}

	/* Collapse the mobile navbar after a link is tapped */
	function initMobileNavAutoClose() {
		var collapseEl = document.getElementById('navbarNavAltMarkup');
		if (!collapseEl || !window.bootstrap) return;

		collapseEl.querySelectorAll('.nav-link').forEach(function (link) {
			link.addEventListener('click', function () {
				if (collapseEl.classList.contains('show')) {
					bootstrap.Collapse.getOrCreateInstance(collapseEl).hide();
				}
			});
		});
	}

	/* Highlight the nav link for the section currently in view */
	function initScrollSpy() {
		var links = Array.prototype.slice.call(document.querySelectorAll('.navbar-nav .nav-link'));
		var sections = links
			.map(function (link) {
				var id = (link.getAttribute('href') || '').replace('#', '');
				return id ? document.getElementById(id) : null;
			})
			.filter(Boolean);

		if (!sections.length || !('IntersectionObserver' in window)) return;

		var observer = new IntersectionObserver(
			function (entries) {
				entries.forEach(function (entry) {
					if (!entry.isIntersecting) return;
					links.forEach(function (link) {
						var match = link.getAttribute('href') === '#' + entry.target.id;
						link.classList.toggle('active', match);
						if (match) {
							link.setAttribute('aria-current', 'page');
						} else {
							link.removeAttribute('aria-current');
						}
					});
				});
			},
			{ rootMargin: '-45% 0px -50% 0px', threshold: 0 }
		);

		sections.forEach(function (section) {
			observer.observe(section);
		});
	}

	/* Fade/slide elements in as they enter the viewport */
	function initRevealOnScroll() {
		var items = document.querySelectorAll('.reveal');
		if (!items.length) return;

		if (!('IntersectionObserver' in window)) {
			items.forEach(function (item) {
				item.classList.add('is-visible');
			});
			return;
		}

		var observer = new IntersectionObserver(
			function (entries, obs) {
				entries.forEach(function (entry) {
					if (entry.isIntersecting) {
						entry.target.classList.add('is-visible');
						obs.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.15 }
		);

		items.forEach(function (item) {
			observer.observe(item);
		});
	}

	/* Floating "back to top" button */
	function initBackToTop() {
		var btn = document.getElementById('back-to-top');
		if (!btn) return;

		btn.hidden = false;

		var onScroll = function () {
			btn.classList.toggle('is-visible', window.scrollY > 400);
		};
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });

		btn.addEventListener('click', function () {
			var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
			window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
		});
	}

	/* Client-side validation + mailto handoff for the contact form */
	function initContactForm() {
		var form = document.getElementById('contact-form');
		if (!form) return;

		var status = document.getElementById('form-status');
		var RECIPIENT = 'santosarahsantiago@gmail.com';

		form.addEventListener('submit', function (event) {
			event.preventDefault();
			setStatus('', '');

			// Honeypot — silently drop bot submissions
			var honeypot = form.querySelector('#website');
			if (honeypot && honeypot.value.trim() !== '') return;

			var fields = ['name', 'email', 'message'].map(function (id) {
				return form.querySelector('#' + id);
			});

			var valid = true;
			fields.forEach(function (field) {
				var ok = field.checkValidity() && field.value.trim() !== '';
				field.classList.toggle('is-invalid', !ok);
				if (!ok) valid = false;
			});

			if (!valid) {
				setStatus('Please fill in all fields with valid information.', 'is-error');
				var firstInvalid = form.querySelector('.is-invalid');
				if (firstInvalid) firstInvalid.focus();
				return;
			}

			var name = form.querySelector('#name').value.trim();
			var email = form.querySelector('#email').value.trim();
			var message = form.querySelector('#message').value.trim();

			var subject = encodeURIComponent('Portfolio enquiry from ' + name);
			var body = encodeURIComponent(message + '\n\n— ' + name + ' (' + email + ')');
			window.location.href = 'mailto:' + RECIPIENT + '?subject=' + subject + '&body=' + body;

			setStatus('Thanks, ' + name + '! Your email app should now open with the message ready to send.', 'is-success');
			form.reset();
		});

		// Clear the error state as the user corrects a field
		form.querySelectorAll('.form-control').forEach(function (field) {
			field.addEventListener('input', function () {
				field.classList.remove('is-invalid');
			});
		});

		function setStatus(text, cls) {
			if (!status) return;
			status.textContent = text;
			status.classList.remove('is-success', 'is-error');
			if (cls) status.classList.add(cls);
		}
	}
})();
