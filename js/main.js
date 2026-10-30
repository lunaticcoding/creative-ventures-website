/**
 * Creative Ventures — living A/B test
 */
(function () {
  'use strict';

  var root = document.documentElement;

  /* ---- year ---- */
  var yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();

  /* ---- A/B variant switch ---- */
  function setVariant(v) {
    if (v !== 'a' && v !== 'b') return;
    root.setAttribute('data-variant', v);
    var btns = document.querySelectorAll('[data-variant-btn]');
    for (var i = 0; i < btns.length; i++) {
      var on = btns[i].getAttribute('data-variant-btn') === v;
      btns[i].classList.toggle('is-active', on);
      btns[i].setAttribute('aria-pressed', on ? 'true' : 'false');
    }
  }
  function otherVariant() {
    return root.getAttribute('data-variant') === 'a' ? 'b' : 'a';
  }

  var toggleBtns = document.querySelectorAll('[data-variant-btn]');
  for (var i = 0; i < toggleBtns.length; i++) {
    (function (btn) {
      btn.addEventListener('click', function () { setVariant(btn.getAttribute('data-variant-btn')); });
    })(toggleBtns[i]);
  }

  var flag = document.querySelector('.var-flag');
  if (flag) flag.addEventListener('click', function () { setVariant(otherVariant()); });

  // Clicking the demo paywall CTA also flips the experiment (it doesn't submit anything)
  var payCta = document.querySelector('.paywall-cta');
  if (payCta) payCta.addEventListener('click', function () { setVariant(otherVariant()); });

  /* ---- mobile nav ---- */
  var nav = document.querySelector('.nav');
  var burger = document.querySelector('.nav-burger');
  if (nav && burger) {
    burger.addEventListener('click', function () { nav.classList.toggle('open'); });
    var links = nav.querySelectorAll('.nav-links a');
    for (var j = 0; j < links.length; j++) {
      links[j].addEventListener('click', function () { nav.classList.remove('open'); });
    }
  }

  /* ---- contact form → mailto fallback (no backend yet) ---- */
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      function val(n) { var el = form.querySelector('[name="' + n + '"]'); return el ? el.value.trim() : ''; }
      var name = val('name'), email = val('email'), msg = val('message');
      var subject = encodeURIComponent('Project enquiry — ' + (name || 'website'));
      var body = encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\n' + msg);
      window.location.href = 'mailto:hello@creative-ventures.app?subject=' + subject + '&body=' + body;
    });
  }

  /* ---- scroll reveal ---- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    for (var k = 0; k < revealEls.length; k++) io.observe(revealEls[k]);
  } else {
    for (var m = 0; m < revealEls.length; m++) revealEls[m].classList.add('in');
  }
})();