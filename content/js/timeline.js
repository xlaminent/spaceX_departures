window.addEventListener("scroll", scrollDownTimeline);

function scrollDownTimeline() {

    if(document.getElementById("timeline-line")){
        const timeline = document.getElementById("timeline-line");
        let lineLength = timeline.getTotalLength();
    
        timeline.style.strokeDashoffset = lineLength;
        timeline.style.strokeDasharray = lineLength;
        
        const findScroll = (document.body.scrollTop + document.documentElement.scrollTop)/(document.documentElement.scrollHeight - document.documentElement.clientHeight);
        let scrollDraw = lineLength * findScroll;
    
        timeline.style.strokeDashoffset = lineLength - scrollDraw;
    } 
}