(function(){
  var header = document.getElementById('siteHeader');
  var sections = document.querySelectorAll('main section, main div#top');
  var navLinks = document.querySelectorAll('#navLinks a');

  function onScroll(){
    if(window.scrollY > 40){ header.classList.add('scrolled'); }
    else{ header.classList.remove('scrolled'); }

    var scrollPos = window.scrollY + 140;
    var current = 'top';
    document.querySelectorAll('main section[id], #top').forEach(function(sec){
      if(sec.offsetTop <= scrollPos){ current = sec.id; }
    });
    navLinks.forEach(function(a){
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  }
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  // mobile menu
  var trigger = document.getElementById('menuTrigger');
var panel = document.getElementById('mobilePanel');
function setMenu(open){
  trigger.classList.toggle('open', open);
  panel.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
}
trigger.addEventListener('click', function(){
  setMenu(!panel.classList.contains('open'));
});
panel.querySelectorAll('a').forEach(function(a){
  a.addEventListener('click', function(){ setMenu(false); });
});

  // theme toggle (both nav button and playground switch stay in sync)
  var themeToggle = document.getElementById('themeToggle');
  var switchDemo = document.getElementById('switchDemo');
  var iconMoon = document.getElementById('themeIconMoon');
  var iconSun = document.getElementById('themeIconSun');
  function setTheme(light){
    document.documentElement.setAttribute('data-theme', light ? 'light' : 'dark');
    switchDemo.classList.toggle('on', light);
    iconMoon.style.display = light ? 'none' : 'block';
    iconSun.style.display = light ? 'block' : 'none';
  }
  var isLight = false;
  themeToggle.addEventListener('click', function(){ isLight = !isLight; setTheme(isLight); });
  switchDemo.addEventListener('click', function(){ isLight = !isLight; setTheme(isLight); });

  // reveal on scroll
  var revealEls = document.querySelectorAll('.reveal, .tl-item');
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  }, {threshold:0.15});
  revealEls.forEach(function(el){ io.observe(el); });

  // card tilt
  var tiltCard = document.getElementById('tiltCard');
  tiltCard.addEventListener('mousemove', function(e){
    var r = tiltCard.getBoundingClientRect();
    var x = (e.clientX - r.left) / r.width - 0.5;
    var y = (e.clientY - r.top) / r.height - 0.5;
    tiltCard.style.transform = 'perspective(400px) rotateX(' + (-y*14) + 'deg) rotateY(' + (x*14) + 'deg)';
  });
  tiltCard.addEventListener('mouseleave', function(){
    tiltCard.style.transform = 'perspective(400px) rotateX(0) rotateY(0)';
  });

  // color roller
  var rollBtn = document.getElementById('rollBtn');
  var rollDisplay = document.getElementById('rollDisplay');
  rollBtn.addEventListener('click', function(){
    var hex = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6,'0').toUpperCase();
    rollDisplay.textContent = hex;
    rollDisplay.style.color = hex;
  });

  // magnetic button
  var magBtn = document.getElementById('magneticBtn');
  var magWrap = magBtn.parentElement;
  magWrap.addEventListener('mousemove', function(e){
    var r = magBtn.getBoundingClientRect();
    var x = e.clientX - (r.left + r.width/2);
    var y = e.clientY - (r.top + r.height/2);
    magBtn.style.transform = 'translate(' + (x*0.18) + 'px,' + (y*0.35) + 'px)';
  });
  magWrap.addEventListener('mouseleave', function(){
    magBtn.style.transform = 'translate(0,0)';
  });
  magBtn.style.transition = 'transform .2s var(--ease), background .3s, color .3s, border-color .3s';
})();
