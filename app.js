const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");


canvas.width = 650;
canvas.height = 650;

ctx.strokeStyle = "#2c2c2c";    // 색상
ctx.lineWidth = 2.5;            // 라인 굵기

let painting = false;
let filling = false;

function stopPainting(){
    painting = false;
}

function startPainting(){
    painting = true
}

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath();    // 선의 시작
        ctx.moveTo(x,y);    // 움직이기 시작점
    } else {
        ctx.lineTo(x,y);    // 선의 끝점
        //ctx.closePath();  
        ctx.stroke();       // 흭 긋기
        // 마우스가 움직이는 동안 계속 path를 생성하고있다
    }
}

function onMouseDown(event){
    painting = true;
}

function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
}

function handleRangeChange(event){
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick(event){
    if(filling === true){
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "Paint";
    }
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
}

// 마우스 위치 값 관련 정보
// offSetx, offSety 는 지정영역안에서의 위치
// clientx, clienty 는 윈도우 전체 화면에서의 위치

Array.from(colors).forEach(color=>color.addEventListener("click", handleColorClick));

if(range)
{
    range.addEventListener("input", handleRangeChange)
}

if(mode){
    mode.addEventListener("click", handleModeClick)
}