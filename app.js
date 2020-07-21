let controller;
let slideScene;
let pageScene;
let detailScene;
const burger = document.querySelector('.hamburger');
const  video = document.querySelector('.m-video');
const about =  document.querySelector('.about');
const abHeading = document.querySelector('.about-heading');
const clientSection = document.querySelector('.clients');
const cube4 =  document.querySelector('.cube4');
const portrait =  document.querySelector('.portrait');
const step2 =  document.querySelector('.step2');
const step3 =  document.querySelector('.step3');
const step4 =  document.querySelector('.step4');
const portraitContainer = document.querySelector('.portrait-container');
const aboutText = document.querySelector('.about-text');
const explore =  document.querySelectorAll('.explore');
const parallax =  document.querySelector('.parallax');
const parallaxText =  document.querySelector('.parallax-text');
const featureBox =  document.querySelector('.feature-box');
const social =  document.querySelector('.social');
const wwd =  document.querySelector('.wwd');
const checkCube = document.querySelector('.check');
const checkCube2 = document.querySelector('.check2');
const preloader = document.querySelector('.preloader');
const illustImage = document.querySelector('.illust img'); 

function animateSteps(){
   
        setTimeout(function(){
            step2.classList.add('showme');
        },2000);
    setTimeout(function(){
        if(step2.classList.contains('showme')){
            step3.classList.add('showme');
        }
    },2500);

    setTimeout(function(){
        if(step3.classList.contains('showme')){
            step4.classList.add('showme');
        }
    },3000);

    
}

function animateMain(){
    const initialHeader =  document.querySelector('.initial-header');
    const initialText =  document.querySelector('.initial-text'); 
    const mainButton = document.querySelector('.main-button');
    const cube2 =  document.querySelector('.cube2');
    const triangle =  document.querySelector('.triangle');
    
    const mainTl = gsap.timeline({
        defaults:{duration:1,ease:"power2.inOut"}
    });
    mainTl.fromTo(initialHeader,{opacity:0},{opacity:1},"2.5");
    mainTl.fromTo(initialText,{rotateX:'90deg'},{rotateX:'0deg'},"=-1");
    mainTl.fromTo(mainButton,{opacity:0,scale:2},{opacity:1,scale:1},"=-1");
    mainTl.fromTo(cube2,{scale:0,opacity:0},{scale:1,opacity:0.4},"3.5");
    //mainTl.fromTo(triangle,{scale:0,opacity:0},{opacity:0.4,scale:1},"3.8");
    mainTl.fromTo(illustImage,{opacity:0},{opacity:1},"0.3");
}
window.addEventListener('DOMContnetLoaded',animateMain(),animateSteps());

function animateSlides(){
    controller = new ScrollMagic.Controller();

    const sliders =  document.querySelectorAll('.slide');
    const nav =  document.querySelector('.nav-header');


    sliders.forEach((slide,index,slides)=>{

        const slideTl = gsap.timeline({
            defaults:{duration:1,ease:"power2.inOut"}
        });
        const revealImage = slide.querySelector('.reveal-image');
        const img = slide.querySelector('img');
        const revealText = slide.querySelector('.reveal-text');
        
        slideTl.fromTo(revealImage,{opacity:1},{opacity:0});
        slideTl.fromTo(img,{scale:2},{scale:1},"-=1");
        slideTl.fromTo(revealText,{x:"0%"},{x:"100%"},"-=0.75");
        
        //create escene

        slideScene = new ScrollMagic.Scene({
            triggerElement:slide,
            triggerHook:0.35,
            reverse:false
        })
        .setTween(slideTl)

        .addTo(controller);

        //add new animation

        const pageTl = gsap.timeline();
        let nextSlide = slides.length-1 === index ? 'end' : slides[index+1];
        pageTl.fromTo(nextSlide,{opacity:0},{opacity:1});
        pageTl.fromTo(slide,{opacity:1,scale:1},{opacity:0,scale:0.5});
        pageTl.fromTo(nextSlide,{opacity :0},{opacity:1},'-=1');
        //create new scene
        pageScene =  new ScrollMagic.Scene({
            triggerElement:slide,
            duration:'100%',
            triggerHook:0
        })
        .setPin(slide,{pushFollowers:false})
        .setTween(pageTl)
        .addTo(controller)
    });
}

const mouse = document.querySelector('.cursor');
const mouseTxt = mouse.querySelector('span');

function cursor(e){
    
    mouse.style.top = e.clientY + 'px';
    mouse.style.left = e.clientX + 'px';
}

function activeCursor(e){
    const item = e.target;
    if(item.id === 'logo' || item.classList.contains('hamburger')){
        mouse.classList.add('nav-active');
    }else{
        mouse.classList.remove('nav-active');
    }
    if(item.classList.contains('explore') && !mouse.classList.contains('explore-active')){
        mouse.classList.add('explore-active');
        mouseTxt.innerText = 'Click';
    }else{
        mouse.classList.remove('explore-active');
        mouseTxt.innerText = '';
    }
    
}


function navToggle(e){
    if(!e.target.classList.contains('active')){
        e.target.classList.add('active');
        gsap.to('.line1',0.5,{rotate:'45',y:5,background:'black'});
        gsap.to('.line2',0.5,{rotate:'-45',y:-5,background:'black'});
        gsap.to('#logo',1,{color:'black'});
        gsap.to('.nav-bar',1,{clipPath:'circle(2500px at 100% -10%)'});
        document.body.classList.add('hide');
    }else{
        e.target.classList.remove('active');
        gsap.to('.line1',0.5,{rotate:'0',y:0});
        gsap.to('.line2',0.5,{rotate:'0',y:0});
        gsap.to('.nav-bar',1,{clipPath:'circle(50px at 100% -10%)'});
        document.body.classList.remove('hide');
    }
    
}
//Barba page transitions
const logo = document.querySelector('#logo');
barba.init({
    views:[
    {
        namespace:'home',
        beforeEnter(){
            animateSlides();
            logo.href = './index.html';
        },
        beforeLeave(){
            slideScene.destroy();
            pageScene.destroy();
            controller.destroy();
        }
    },
    {
        namespace:'fashion',
            beforeEnter(){
            logo.href='../index.html';
            detailAnimation();
        },beforeLeave(){
            controller.destroy();
            detailScene.destroy();
        }
    }
    ],
    transitions:[
        {
            leave({current,next}){

                let done = this.async();
                //animation
                const tl = gsap.timeline({defaults:{ease:'power2.inOut'}});
                tl.fromTo(current.container,1,{opacity:1},{opacity:0});
                tl.fromTo('.swipe',0.75,{x:'100%'},{x:'0%',onComplete:done},'-=0.5');
            },
            enter({current,next}){
                let done = this.async();
                window.scrollTo(0,0);
                const tl = gsap.timeline({defaults:{ease:'power2.inOut'}});
                tl.fromTo('.swipe',0.75,{x:'0%'},{x:'100%',stagger:0.25,onComplete:done});
                tl.fromTo(next.container,1,{opacity:0},{opacity:1});
                tl.fromTo(
                    ".nav-header",1,
                    {y:'-100%'},
                    {y:'0%',ease:"power2.inOut"},
                    "-=1.5"   
    
                    );
            }
        }
    ]
});

function detailAnimation(){
    controller =  new ScrollMagic.Controller();
    const slides =  document.querySelectorAll('.detail-slide');
    slides.forEach((slide,index,slides)=>{
        const slideTl = gsap.timeline({defaults:{duration:1}});
        let nextSlide = slides.length-1 === index ? 'end' : slides[index+1];
        const nextImg = nextSlide.querySelector('img');
        slideTl.fromTo(slide,{opacity:1},{opacity:0});
        slideTl.fromTo(nextSlide,{opacity:0},{opacity:1},"=-1");
        slideTl.fromTo(nextImg,{x:'50%'},{x:'0%'});

        //scene
        detailScene = new ScrollMagic.Scene({
            triggerElement:slide,
            duration:'100%',
            triggerHook:0
        }).setPin(slide,{pushFollowers:false})
        .setTween(slideTl)
        .addIndicators({
            colorStart:'white',
            colorTrigger:'white',
            name:'detailScene'
        })
        .addTo(controller);

    });
}


burger.addEventListener('click',navToggle);
window.addEventListener('mousemove',cursor);
window.addEventListener('mouseover',activeCursor);

if(!preloader.classList.contains('yeet') && window.pageYOffset > 5){
    window.scrollTo(0,0)
}
    setTimeout(function(){
        preloader.classList.add('yeet');
    },2100);


video.addEventListener('mouseover',function(e){

    mouse.classList.add('videoplay');

});

video.addEventListener('mouseleave',function(e){

    mouse.classList.remove('videoplay');

});
video.addEventListener('click',function(e){

  this.setAttribute('controls','true');
  this.setAttribute('paused','false');
    if (this.requestFullscreen && this.paused!=false) {
      this.requestFullscreen();
      console.log(0);
    } else if (this.mozRequestFullScreen && this.paused!=false) { /* Firefox */
      this.mozRequestFullScreen();
    } else if (this.webkitRequestFullscreen && this.paused!=false) { /* Chrome, Safari and Opera */
      this.webkitRequestFullscreen();
    } else if (this.msRequestFullscreen && this.paused!=false) { /* IE/Edge */
      this.msRequestFullscreen();
    }

});



clientSection.addEventListener('mouseenter',function(e){
    cube4.classList.add('shrink');
});

clientSection.addEventListener('mouseleave',function(e){
    cube4.classList.remove('shrink');
});

portrait.addEventListener('mouseover',function(e){
    this.src="./img/portraitwb2.png";
    this.classList.add('skew');
});

portrait.addEventListener('mouseleave',function(e){
    if(this.classList.contains('skew')){
        this.src="./img/portraitwb.png";
        this.classList.remove('skew');
    }
});

parallax.addEventListener('mouseover',function(e){
    mouse.classList.add('white-border');
});

parallax.addEventListener('mouseleave',function(e){
    mouse.classList.remove('white-border');
});

about.addEventListener('mouseover',function(e){
    let All = document.querySelector('html');
    All.style.cursor = 'none';
});
about.addEventListener('mouseleave',function(e){
    let All = document.querySelector('html');
    All.style.cursor = 'inherit';
});

//observer video

const options={
    root:null,
    rootMargin:'150px',
    threshold: 0.7
};
const observer =  new IntersectionObserver((entries,observer)=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            about.style.translateX = 0;
            entry.target.classList.add('visible-video');
        }else{
            return;
        }
       
    });
},options);

const observer2 =  new IntersectionObserver((entries,observer)=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            entry.target.classList.add('other-bg');
            cube4.classList.add('cube-visible');
        }else{
            return;
        }
       
    });
});

const observer3 =  new IntersectionObserver((entries,observer)=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            const portraitTl = gsap.timeline({
                defaults:{duration:1.5,ease:"ease-in"}
            });
            portraitTl.fromTo(portrait,0.5,{x:'200%'},{x:'0'});
            portraitTl.fromTo(aboutText,1,{x:'-200%'},{x:'0'},"=-1");
            observer3.unobserve(entry.target);
        }else{
            return;
        }
       
    });
});


let options2 = {
    root:null,
    rootMargin:'0px',
    threshold: 0.6
}
const observerParallax = new IntersectionObserver((entries,observer)=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            const parallaxTl = gsap.timeline({
                defaults:{duration:1,ease:"ease-in"}
            });
            parallaxTl.fromTo(parallaxText,0.8,{y:'10px',opacity:0},{y:'0px',opacity:1});
            parallaxTl.fromTo(social,0.8,{y:'10px',opacity:0},{y:'0px',opacity:1},'=-0.8');
            parallaxTl.fromTo(wwd,0.8,{x:'-100%',opacity:0},{x:'0px',opacity:1},'=-0.8');
            parallaxTl.fromTo(featureBox,1,{x:'100%',opacity:0},{x:'0%',opacity:1},'=-0.8');
            observerParallax.unobserve(entry.target);
        }
    })
},options2)

observer.observe(video);
observer2.observe(clientSection);
observer3.observe(portraitContainer);
observerParallax.observe(parallax);
