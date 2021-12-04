"use strict"

document.getElementById("buttonSetPointA").onclick = setPointA;
document.getElementById("buttonSetPointB").onclick = setPointB;

function setPointA(){
    let in_x = document.getElementById("inputPointAXValue").value;
    let in_y = document.getElementById("inputPointAYValue").value;
    let new_x = xConversion(in_x);
    let new_y = yConversion(in_y);
    document.getElementById("pointA").setAttribute("cx", new_x);
    document.getElementById("pointA").setAttribute("cy", new_y);
    redrawLine(0, new_x, new_y);
}

function setPointB(){
    let in_x = document.getElementById("inputPointBXValue").value;
    let in_y = document.getElementById("inputPointBYValue").value;
    let new_x = xConversion(in_x);
    let new_y = yConversion(in_y);
    document.getElementById("pointB").setAttribute("cx", new_x);
    document.getElementById("pointB").setAttribute("cy", new_y);
    redrawLine(1, new_x, new_y);
}

function redrawLine(point, point_x, point_y){
    if (point == 0){
        document.getElementById("lineSection").setAttribute("x1", point_x);
        document.getElementById("lineSection").setAttribute("y1", point_y);
    }
    else {
        document.getElementById("lineSection").setAttribute("x2", point_x);
        document.getElementById("lineSection").setAttribute("y2", point_y);
    }
}

function xConversion(x_in){
    let x_out;
    if (x_in < 0){
        x_out = 5;
    }
    else if (x_in > 99){
        x_out = 495;
    }
    else {
        x_out = 5 + (parseFloat(x_in)*4.9);
    }
    return x_out;
}

function yConversion(y_in){
    let y_out;
    if (y_in < 0){
        y_out = 495;
    }
    else if (y_in > 99){
        y_out = 5;
    }
    else {
        y_out = 495 - (parseFloat(y_in)*4.9);
    }
    return y_out;
}
