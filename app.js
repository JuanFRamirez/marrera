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

function animateMain(){
    const initialHeader =  document.querySelector('.initial-header');
    const initialText =  document.querySelector('.initial-text'); 
    const coverScroll =  document.querySelector('.cover-scroll');
    const mainButton = document.querySelector('.main-button');
    const cube1 =  document.querySelector('.cube1');
    const cube2 =  document.querySelector('.cube2');
    const triangle =  document.querySelector('.triangle');
    
    const mainTl = gsap.timeline({
        defaults:{duration:1,ease:"power2.inOut"}
    });
    mainTl.fromTo(initialHeader,{opacity:0},{opacity:1},"1.8");
    mainTl.fromTo(initialText,{rotateX:'90deg'},{rotateX:'0deg'},"2");
    mainTl.fromTo(coverScroll,{opacity:1},{opacity:0},"2.5");
    mainTl.fromTo(mainButton,{opacity:0,scale:2},{opacity:1,scale:1},"2.5");
    mainTl.fromTo(cube1,{rotate:'223',translateX:'200px',opacity:0},{rotate:'0',translateX:'0px',opacity:0.2},"3");
    mainTl.fromTo(cube2,{translateX:'-100px',opacity:0},{translateX:'0px',opacity:0.2},"3.2");
    mainTl.fromTo(triangle,{scale:0,opacity:0},{opacity:0.2,scale:1},"3.5");
}
window.addEventListener('DOMContnetLoaded',animateMain());

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
    
    mouse.style.top = e.pageY + 'px';
    mouse.style.left = e.pageX + 'px';
}

function activeCursor(e){
    const item = e.target;
    if(item.id === 'logo' || item.classList.contains('hamburger')){
        mouse.classList.add('nav-active');
    }else{
        mouse.classList.remove('nav-active');
    }
    if(item.classList.contains('explore')){
        mouse.classList.add('explore-active');
        gsap.to('.title-swipe',1,{y:"0%"});
        mouseTxt.innerText = 'Click';
    }else{
        mouse.classList.remove('explore-active');
        gsap.to('.title-swipe',1,{y:"100%"})
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
clientSection.addEventListener('mouseenter',function(e){
    cube4.classList.add('shrink');
});

clientSection.addEventListener('mouseleave',function(e){
    cube4.classList.remove('shrink');
});

//observer video

const options={
    root:null,
    rootMargin:'5px',
    threshold: 0.8
};
const observer =  new IntersectionObserver((entries,observer)=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            about.style.translateX = 0;
            entry.target.classList.add('visible-video');
            entry.target.play();
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

observer.observe(video);
observer2.observe(clientSection);
