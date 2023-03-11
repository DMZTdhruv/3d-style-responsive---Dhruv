const toggle = document.querySelector(".toggle");
const nav = document.getElementById("primary-navigation");

toggle.addEventListener("click",()=>{
    const visbilty = nav.getAttribute('data-visible');
    if(visbilty === "false"){
        nav.setAttribute('data-visible',true)
    } else {
        nav.setAttribute('data-visible',false)
    }
})

const blob = document.getElementById("blob");

window.onpointermove = event =>{
    const {clientX, clientY} = event;
    blob.animate({
        left: `${clientX}px`,
        top: `${clientY}px`
    } ,{fill: "forwards" , duration: 3000});
}


const card = document.getElementById("card");
const footerCard = document.getElementById("footer-card")
const cardImg = document.getElementById("card-img")

document.body.addEventListener("mousemove",(event)=>{
    const x = event.clientX;
    const y = event.clientY;
    const middleY = innerHeight/2;
    const middleX = innerWidth/2;
    const offsetX = ((x-middleX)/middleX *45);    
    const offsetY = ((y-middleY)/middleY * 45); 
    card.style.setProperty("--rotateX" ,offsetY *-1 + "deg");
    card.style.setProperty("--rotateY" ,offsetX + "deg");
    
    footerCard.style.setProperty("--rotateX" ,offsetY *-1 + "deg");
    footerCard.style.setProperty("--rotateY" ,offsetX + "deg");

    cardImg.animate({
        objectPosition: `${offsetX + 45}% 50%`
    },{fill: "forwards" , duration: 1000})

})

document.body.addEventListener("mouseenter" ,(event) =>{
    card.style.transition = ("1s all linear");
})

document.body.addEventListener('mouseleave',(event)=>{
    card.style.transition = ("1s all linear");
    footerCard.style.transition = ("0.2s all linear");
    card.style.setProperty("--rotateX" ,0+ "deg");
    card.style.setProperty("--rotateY" ,0+ "deg");

    footerCard.style.setProperty("--rotateX" ,0+ "deg");
    footerCard.style.setProperty("--rotateY" ,0+ "deg");
})

const track = document.querySelector(".image-track");

window.onmousedown = e =>{

    e.clientX;
    track.dataset.mouseDownAt = e.clientX;
    
}

window.onmouseup = e => {
    
    e.clientX;
    track.dataset.mouseDownAt = "0";
    track.dataset.prevPercentage = track.dataset.percentage; 

}

window.onmousemove = e => {
    
    if(track.dataset.mouseDownAt === "0") return;


    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
    maxDelta = window.innerWidth/2;

    const percentage = (mouseDelta/maxDelta) * 100;
    const nextPercentage = parseFloat(track.dataset.prevPercentage) + percentage;
    const current = Math.min(nextPercentage,100);
    nextCurrent = Math.max(current,0);
    track.dataset.percentage = nextPercentage;


    track.animate({
        translate: `${-nextCurrent}% -50%`
    },{fill:"forwards" , duration : 1000})

    for(const img of track.getElementsByTagName("img")){
        img.animate({
            objectPosition: `${nextCurrent/1.20}% 50%`
        } , {fill: "forwards" , duration: 1000})
    }


}