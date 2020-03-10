const canvas = document.getElementById("jsCanvas");

let painting = false;

function stopPainting(){
    painting = false;
}
function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    console.log(x, y);
}

function onMouseDown(event){
    painting = ture;
}

function onMouseUp(event){
    stopPainting();
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", onMouseDown);
    canvas.addEventListener("mouseup", onMouseUp);
    canvas.addEventListener("mouseleave", stopPainting);
}

// 마우스 위치 값 관련 정보
// offSetx, offSety 는 지정영역안에서의 위치
// clientx, clienty 는 윈도우 전체 화면에서의 위치