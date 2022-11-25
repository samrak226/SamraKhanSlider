const carousel = document.querySelector(".carousel"),
firstImage = carousel.querySelectorAll("img")[0], // using querySelectorAll so that it returns array of objects and not single object as querySelector does
arrows = document.querySelectorAll(".container i");

let isDragStart = false, 
isDragging = false, 
previousPageX, 
previousScrollLeft, 
positionDiff;

const arrowShowHide = () => {
    // showing and hiding prev/next arrow according to carousel scroll left value
    let scrollWidth = carousel.scrollWidth - carousel.clientWidth; //subtracting the clientWidth( width that client can see without scrolling) from the complete width of carousel
    
    //if carousel is on the left most
    if (carousel.scrollLeft == 0) {
        arrows[0].style.display ="none";
    } else {
        arrows[0].style.display ="block";
    }

//if carousel is on the right most
    if (Math.ceil(carousel.scrollLeft) == scrollWidth){
        arrows[1].style.display ="none";
    } else {
        arrows[1].style.display ="block";
    }
}
        
arrows.forEach(icon => {
    icon.addEventListener("click", () => {
        let firstImageWidth = firstImage.clientWidth + 30; // getting first img width & adding 30 margin value
        // if clicked icon is left, subtract width value from the carousel scroll left else add to it
        if(icon.id == "left"){
            carousel.scrollLeft -= firstImageWidth;
        } else{
            carousel.scrollLeft += firstImageWidth;
        }
        setTimeout(() => arrowShowHide(), 60); // calling arrowShowHide after 60ms
    });
});


const dragStart = (mouseEvent) => {
    // when mouse is clicked (mouse down event) dragging is set to true
    isDragStart = true;
    previousPageX = mouseEvent.pageX || mouseEvent.touches[0].pageX; //pageX returns the horizontal coordinates of mouse pointer
    previousScrollLeft = carousel.scrollLeft;
}

const drag = (mouseEvent) => {
    // scrolling carousel to left according to mouse pointer
    if(!isDragStart) return;
    mouseEvent.preventDefault(); // image will not be default dragged after preventing it's default behavior
    isDragging = true;
    carousel.classList.add("drag");
    positionDiff = (mouseEvent.pageX || mouseEvent.touches[0].pageX) - previousPageX;
    carousel.scrollLeft = previousScrollLeft - positionDiff;
    arrowShowHide();
}

const dragStop = () => {
    isDragStart = false;
    carousel.classList.remove("drag");
    if(!isDragging) return;
    isDragging = false;
}

carousel.addEventListener("mousedown", dragStart); //dragging will start when the mouse is clicked
carousel.addEventListener("touchstart", dragStart);

document.addEventListener("mousemove", drag); // carousel moves when the mouse moves
carousel.addEventListener("touchmove", drag);

document.addEventListener("mouseup", dragStop); //dragging will stop when the mouse is released
carousel.addEventListener("touchend", dragStop);