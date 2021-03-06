const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 650;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "White";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE); // 캔버스 배경 색부터 색칠
ctx.strokeStyle = INITIAL_COLOR;    // 색상
ctx.fillStyle = INITIAL_COLOR;
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
        if(!filling){
            ctx.lineTo(x,y);    // 선의 끝점
            //ctx.closePath();  
            ctx.stroke();       // 흭 긋기
            // 마우스가 움직이는 동안 계속 path를 생성하고있다
        }
    }
}

function onMouseDown(event){
    painting = true;
}

function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
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

function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}

function handleCM(){
    event.preventDefault(); // 우클릭 방지
}

function handleSaveClick(){
    const image = canvas.toDataURL("image/jpeg");
    //const image = canvas.toDataURL(); // 디폴크가 png로 되어있다.
    
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS";
    link.click();
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick );
    canvas.addEventListener("contextmenu", handleCM);
}

// 마우스 위치 값 관련 정보
// offSetx, offSety 는 지정영역안에서의 위치
// clientx, clienty 는 윈도우 전체 화면에서의 위치

Array.from(colors).forEach(color=>color.addEventListener("click", handleColorClick));

if(range)
{
    range.addEventListener("input", handleRangeChange);
}

if(mode){
    mode.addEventListener("click", handleModeClick);
}

if(saveBtn){
    saveBtn.addEventListener("click", handleSaveClick)
}