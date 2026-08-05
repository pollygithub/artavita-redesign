// Mobile nav toggle
var hamburgerBtn = document.querySelector('.hamburger');
if (hamburgerBtn) {
  hamburgerBtn.addEventListener('click', function(){
    var nav = document.querySelector('.primary-nav');
    var isOpen = nav.style.display === 'flex';
    nav.style.display = isOpen ? 'none' : 'flex';
    nav.style.cssText += isOpen ? '' : 'position:absolute;top:100%;left:0;right:0;background:#fff;flex-direction:column;padding:20px 32px;border-bottom:1px solid #E6E6E6;gap:16px;';
  });
}

// Header shrink on scroll
var header = document.getElementById('site-header');
if (header) {
  window.addEventListener('scroll', function(){
    header.classList.toggle('scrolled', window.scrollY > 30);
  }, {passive:true});
}

// Scroll reveal
var revealEls = document.querySelectorAll('.reveal');
if('IntersectionObserver' in window){
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, {threshold:0.15, rootMargin:'0px 0px -40px 0px'});
  revealEls.forEach(function(el){ io.observe(el); });
} else {
  revealEls.forEach(function(el){ el.classList.add('in-view'); });
}

// Count-up stats
var countEls = document.querySelectorAll('[data-count]');
function animateCount(el){
  var target = parseInt(el.getAttribute('data-count'), 10);
  var display = target >= 1000 ? (target/1000).toFixed(target % 1000 === 0 ? 0 : 1) + 'K' : target;
  var start = null;
  var duration = 1400;
  function step(ts){
    if(!start) start = ts;
    var progress = Math.min((ts - start) / duration, 1);
    var eased = 1 - Math.pow(1 - progress, 3);
    var current = Math.floor(eased * target);
    var shown = target >= 1000 ? (current/1000).toFixed(1) + 'K' : current;
    el.textContent = shown + (el.getAttribute('data-suffix') || (target >= 1000 ? '+' : ''));
    if(progress < 1){ requestAnimationFrame(step); }
    else { el.textContent = display + (el.getAttribute('data-suffix') || (target >= 1000 ? '+' : '')); }
  }
  requestAnimationFrame(step);
}
if('IntersectionObserver' in window){
  var statIo = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        animateCount(entry.target);
        statIo.unobserve(entry.target);
      }
    });
  }, {threshold:0.5});
  countEls.forEach(function(el){ statIo.observe(el); });
}

// Video play (homepage only)
var video = document.getElementById('artavita-video');
var cover = document.getElementById('video-cover');
if (video && cover) {
  cover.addEventListener('click', function(){
    cover.classList.add('hide');
    video.play();
  });
  video.addEventListener('pause', function(){ cover.classList.remove('hide'); });
  video.addEventListener('ended', function(){ cover.classList.remove('hide'); });
}

// Filter chips (Browse/Grid template)
document.querySelectorAll('.filter-bar').forEach(function(bar){
  var chips = bar.querySelectorAll('.filter-chip');
  chips.forEach(function(chip){
    chip.addEventListener('click', function(){
      chips.forEach(function(c){ c.classList.remove('active'); });
      chip.classList.add('active');
    });
  });
});

// Pagination (demo only — no real paging, just visual state)
document.querySelectorAll('.pagination').forEach(function(pg){
  var btns = pg.querySelectorAll('.page-btn:not(.next)');
  btns.forEach(function(btn){
    btn.addEventListener('click', function(){
      btns.forEach(function(b){ b.classList.remove('active'); });
      btn.classList.add('active');
    });
  });
});

// Auth tabs (Sign in / Sign up)
document.querySelectorAll('.auth-tabs').forEach(function(tabs){
  var tabEls = tabs.querySelectorAll('.auth-tab');
  tabEls.forEach(function(tab){
    tab.addEventListener('click', function(){
      tabEls.forEach(function(t){ t.classList.remove('active'); });
      tab.classList.add('active');
      var target = tab.getAttribute('data-target');
      document.querySelectorAll('.auth-panel').forEach(function(p){
        p.classList.toggle('active', p.id === target);
      });
    });
  });
});

// User type toggle (artist / gallery)
document.querySelectorAll('.user-type-toggle').forEach(function(group){
  var opts = group.querySelectorAll('.user-type-option');
  opts.forEach(function(opt){
    opt.addEventListener('click', function(){
      opts.forEach(function(o){ o.classList.remove('selected'); });
      opt.classList.add('selected');
    });
  });
});

// FAQ accordion
document.querySelectorAll('.accordion-item').forEach(function(item){
  var q = item.querySelector('.accordion-q');
  var a = item.querySelector('.accordion-a');
  q.addEventListener('click', function(){
    var isOpen = item.classList.contains('open');
    item.parentElement.querySelectorAll('.accordion-item').forEach(function(other){
      other.classList.remove('open');
      other.querySelector('.accordion-a').style.maxHeight = null;
    });
    if(!isOpen){
      item.classList.add('open');
      a.style.maxHeight = a.scrollHeight + 'px';
    }
  });
});

// Pricing toggle (monthly / yearly)
document.querySelectorAll('.toggle-pill').forEach(function(pill){
  var btns = pill.querySelectorAll('button');
  btns.forEach(function(btn){
    btn.addEventListener('click', function(){
      btns.forEach(function(b){ b.classList.remove('active'); });
      btn.classList.add('active');
      var period = btn.getAttribute('data-period');
      document.querySelectorAll('[data-price-monthly]').forEach(function(el){
        el.textContent = period === 'yearly' ? el.getAttribute('data-price-yearly') : el.getAttribute('data-price-monthly');
      });
      document.querySelectorAll('[data-period-label]').forEach(function(el){
        el.textContent = period === 'yearly' ? '/year' : '/month';
      });
    });
  });
});

// Multi-step wizard navigation (demo — no real submission)
(function(){
  var wizard = document.querySelector('.wizard-shell');
  if(!wizard) return;
  var panels = wizard.querySelectorAll('.wizard-panel');
  var steps = wizard.querySelectorAll('.wizard-step');
  var current = 0;
  function render(){
    panels.forEach(function(p, i){ p.style.display = i === current ? 'block' : 'none'; });
    steps.forEach(function(s, i){
      s.classList.toggle('done', i < current);
      s.classList.toggle('current', i === current);
    });
  }
  wizard.querySelectorAll('.wizard-next').forEach(function(btn){
    btn.addEventListener('click', function(){
      if(current < panels.length - 1){ current++; render(); window.scrollTo({top: wizard.offsetTop - 20, behavior:'smooth'}); }
    });
  });
  wizard.querySelectorAll('.wizard-back').forEach(function(btn){
    btn.addEventListener('click', function(){
      if(current > 0){ current--; render(); window.scrollTo({top: wizard.offsetTop - 20, behavior:'smooth'}); }
    });
  });
  render();
})();
