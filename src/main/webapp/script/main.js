const dot = document.getElementById('knob-dot');
const submitButton = document.getElementById('submit-button');
const form = document.getElementById('coords-form');
const r_val = document.getElementById('r_val');
const x_val = document.getElementById('x_val');
const y_val = document.getElementById('y_val');
const is_auto = document.getElementById('is_auto');
const y_val_input = document.getElementById('y_val_input');
const resultsTableBody = document.querySelector('#results-table tbody');
const localStorageKey = 'table';
const maxRows = 5;
const circle_sector_num = 16;
const circle_sector_num_real = 9;
const circle_sector_num_offset = 4;
const circle_sector_angl = 360 / circle_sector_num;
const circle_start = circle_sector_angl * 0.75;
const circle = document.getElementById('circle-knob');

const hiddenx = document.getElementById('hidden-form:hiddenx');
const hiddeny = document.getElementById('hidden-form:hiddeny');

const staticCanvas = document.getElementById("static-canvas");
const staticCtx = staticCanvas.getContext("2d");
const dynamicCanvas = document.getElementById("dynamic-canvas");
const dynamicCtx = dynamicCanvas.getContext("2d");


const rButtons = document.querySelectorAll('.r-button');
const SCALE_FACTOR = 40;

let isDragging = false;
let startAngle = 0;
let currentAngle = 0;
let last_angl = 1;
let current_x = null;
let current_r = null;

window.onload = function () {
    dynamicCtx.translate(dynamicCanvas.width / 2, dynamicCanvas.height / 2);
    dynamicCtx.scale(1, -1);
    redrawDots();
    initCanvas();
};

function addPoint(x,y,r,success){
    if(success){
        dynamicCtx.fillStyle = "#4CBB17";
    }
    else{
        dynamicCtx.fillStyle = "red";
    }
    
    dynamicCtx.beginPath();
    dynamicCtx.arc(x * SCALE_FACTOR, y * SCALE_FACTOR, 5, 0, Math.PI * 2);
    dynamicCtx.fill();
}
function drawStaticCanvas(R) {
    R = R * SCALE_FACTOR;
    staticCtx.clearRect(0, 0, staticCanvas.width, staticCanvas.height);

    staticCtx.translate(staticCanvas.width / 2, staticCanvas.height / 2);
    staticCtx.scale(1, -1);

    staticCtx.fillStyle = "#636363";

    staticCtx.beginPath();
    
    //rect
    staticCtx.rect(-R, 0, R, -R/2);

    //circle
    staticCtx.arc(0, 0, R / 2, 0 , -0.5 * Math.PI, true);

    //triangle
    staticCtx.moveTo(R/2, 0);
    staticCtx.lineTo(0, R);
    staticCtx.lineTo(0, 0);

    staticCtx.fill();

    staticCtx.strokeStyle = "white";
    staticCtx.beginPath();
    staticCtx.moveTo(-staticCanvas.width / 2, 0);
    staticCtx.lineTo(staticCanvas.width / 2, 0);
    staticCtx.moveTo(0, -staticCanvas.height / 2);
    staticCtx.lineTo(0, staticCanvas.height / 2);
    staticCtx.stroke();

    staticCtx.scale(1, -1);
    staticCtx.fillStyle = "white";
    staticCtx.font = "12px monospace";
    staticCtx.fillText("R", R - 10, -6);
    staticCtx.fillText("R/2", (R / 2) - 10, -6);
    staticCtx.fillText("-R/2", -R / 2, -6);
    staticCtx.fillText("-R", -R, -6);

    staticCtx.fillText("R", 6, -R + 10);
    staticCtx.fillText("R/2", 6, (-R / 2) + 10);
    staticCtx.fillText("-R/2", 6, R / 2);
    staticCtx.fillText("-R", 6, R);

    staticCtx.translate(-staticCanvas.width / 2, -staticCanvas.height / 2);
}


function initCanvas() {
    dynamicCanvas.addEventListener("click", function (event) {
        const rect = dynamicCanvas.getBoundingClientRect();
        const x_canvas = event.clientX - rect.left - dynamicCanvas.width / 2;
        const y_canvas = dynamicCanvas.height / 2 - (event.clientY - rect.top);
        hiddenx.value = x_canvas / SCALE_FACTOR;
        hiddeny.value = y_canvas / SCALE_FACTOR;
        document.getElementById("hidden-form:hiddensubmit").click();
    });
}