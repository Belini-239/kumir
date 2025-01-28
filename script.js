const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const ratio = document.getElementById("ratio");
let gridSize = 20;
let textarea = document.getElementById("text");
let minratio = document.getElementById("minRat");

canvas.width = 1000;
canvas.height = 600;

function drawGrid() {
    for (let i = 0; i < canvas.width; i += gridSize) {
        for (let j = 0; j < canvas.height; j += gridSize) {
            ctx.strokeWidth = 1;
            ctx.strokeStyle = "#bababa";
            ctx.strokeRect(i, j, gridSize, gridSize);
        }
    }
    ctx.beginPath();
    ctx.moveTo(Math.floor((canvas.width / gridSize) / 2) * gridSize, 0);
    ctx.lineTo(Math.floor((canvas.width / gridSize) / 2) * gridSize, canvas.height);
    ctx.moveTo(0, Math.floor((canvas.height / gridSize) / 2) * gridSize);
    ctx.lineTo(canvas.width, Math.floor((canvas.height / gridSize) / 2) * gridSize);
    ctx.strokeStyle = "#515151";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.lineWidth = 1;
    ctx.closePath();
}

function clear() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawGrid();
}

function parseList(cmds, turtle) {
    let arr = cmds.split(" ");
    console.log(arr);
    for (let ind = 0; ind < arr.length; ind++) {
        console.log(arr[ind]);
        if (arr[ind] == "Вперёд" || arr[ind] == "Вперед") {
            ind++;
            turtle.forward(Number(arr[ind]));
            console.log(arr[ind]);
            continue;
        }
        if (arr[ind] == "Назад") {
            ind++;
            turtle.back(Number(arr[ind]));
            continue;
        }
        if (arr[ind] == "Налево" || arr[ind] == "Влево") {
            ind++;
            turtle.left(Number(arr[ind]));
            continue;
        }
        if (arr[ind] == "Направо" || arr[ind] == "Вправо") {
            ind++;
            turtle.right(Number(arr[ind]));
            continue;
        }
    }
}

function parseCommands(cmds, turtle) {
    for (let ind in cmds) {
        let cmd = cmds[ind];
        if (cmd === "")
            continue;
        if (cmd === "Поднять хвост") {
            turtle.up();
            continue;
        }
        if (cmd === "Опустить хвост") {
            turtle.down();
            continue;
        }
        if (cmd.includes("Повтори")) {
            let cnt = Number(cmd.split(" ")[1]);
            let substr = cmd.split("[")[1];
            substr = substr.substring(0, substr.length-1);
            for (let i = 0; i < cnt; i++) {
                parseList(substr, turtle);
            }
            continue;
        }
        console.log(cmd);
        parseList(cmd, turtle);
    }
}

function startDrawing() {
    clear();
    let turtle = new Turtle;
    ctx.beginPath();
    ctx.moveTo(Math.floor((canvas.width / gridSize) / 2) * gridSize, Math.floor((canvas.height / gridSize) / 2) * gridSize);

    parseCommands(textarea.value.split("\n"), turtle);

    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.lineWidth = 1;
    ctx.closePath();
}

function redraw() {
    gridSize = Number(ratio.value);
    if (minratio.checked)
        gridSize = 2;
    clear();
    startDrawing();
}

function radToDeg(rad) {
  return rad / (Math.PI / 180);
}

function degToRad(degrees) {
  return degrees * (Math.PI / 180);
}

class Turtle {
    constructor() {
        this.x = Math.floor((canvas.width / gridSize) / 2) * gridSize;
        this.y = Math.floor((canvas.height / gridSize) / 2) * gridSize;
        this.angle = 0;
        this.drawing = true;
    }

    draw(dx, dy) {
        if (this.drawing)
            ctx.lineTo(this.x + dx, this.y - dy);
        else
            ctx.moveTo(this.x + dx, this.y - dy);
    }

    forward(x) {
        x *= gridSize;
        let dy = Math.cos(degToRad(this.angle)) * x;
        let dx = Math.sin(degToRad(this.angle)) * x;
        this.draw(dx, dy);
        this.x += dx;
        this.y -= dy;
    }

    back(x) {
        x *= gridSize;
        let dy = Math.cos(degToRad(this.angle)) * x;
        let dx = Math.sin(degToRad(this.angle)) * x;
        this.draw(-dx, -dy);
        this.x -= dx;
        this.y += dy;
    }

    right(x) {
        this.angle += x;
    }

    left(x) {
        this.angle -= x;
    }

    up() {
        this.drawing = false;
    }

    down() {
        this.drawing = true;
    }
}

redraw();