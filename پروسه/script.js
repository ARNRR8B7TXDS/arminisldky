// منوی بالای صفحه: با اسکرول روشن می‌شود
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('s', scrollY > 60);
addEventListener('scroll', onScroll, { passive: true });
onScroll();

// منوی موبایل
document.getElementById('bg').addEventListener('click', () => nav.classList.toggle('o'));
document.querySelectorAll('.links a').forEach(a =>
  a.addEventListener('click', () => nav.classList.remove('o')));

// جابه‌جایی مبدا و مقصد
document.getElementById('sw').addEventListener('click', () => {
  const o = document.getElementById('o'), t = document.getElementById('t');
  [o.value, t.value] = [t.value, o.value];
});

// نمایش آرام بخش‌ها هنگام اسکرول
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
}), { threshold: .12 });
document.querySelectorAll('.rv').forEach((el, i) => {
  el.style.transitionDelay = (i % 3) * 90 + 'ms';
  io.observe(el);
});

// شمارنده آمار
const fa = new Intl.NumberFormat('fa-IR');
const co = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  const el = e.target, n = +el.dataset.n, t0 = performance.now();
  const step = t => {
    const p = Math.min((t - t0) / 1800, 1);
    el.textContent = '+' + fa.format(Math.round(n * (1 - Math.pow(1 - p, 3))));
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
  co.unobserve(el);
}), { threshold: .5 });
document.querySelectorAll('[data-n]').forEach(el => co.observe(el));

// نوار ایرلاین‌ها: تکرار برای حرکت بی‌وقفه
const tr = document.getElementById('tr');
tr.innerHTML += tr.innerHTML;
