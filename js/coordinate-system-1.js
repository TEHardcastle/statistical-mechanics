"use strict"

function makeDraggable(evt) {
    let selectedElement = false;
    let initialCircleXPosition;
    let initialCircleYPosition;
    let initialClickXPosition;
    let initialClickYPosition;
    let xChange;
    let yChange;
    let newCircleXPosition;
    let newCircleYPosition;
    let svg = evt.target;
    svg.addEventListener('mousedown', startDrag);
    svg.addEventListener('mousemove', drag);
    svg.addEventListener('mouseup', endDrag);
    svg.addEventListener('mouseleave', endDrag);

    function startDrag(evt) {
        selectedElement = evt.target;
        if (selectedElement && selectedElement.tagName == "circle") {
            initialCircleXPosition = parseFloat(selectedElement.getAttributeNS(null, "cx"));
            initialCircleYPosition = parseFloat(selectedElement.getAttributeNS(null, "cy"));
            initialClickXPosition = evt.clientX;
            initialClickYPosition = evt.clientY;
        }
    }

    function drag(evt) {
        xChange = evt.clientX - initialClickXPosition;
        yChange = evt.clientY - initialClickYPosition;
        if (selectedElement && selectedElement.tagName == "circle") {
            newCircleXPosition = initialCircleXPosition + xChange;
            newCircleYPosition = initialCircleYPosition + yChange
            evt.preventDefault();
            selectedElement.setAttributeNS(null, "cx", newCircleXPosition);
            selectedElement.setAttributeNS(null, "cy", newCircleYPosition);
            if (selectedElement.id == "pointA"){
                document.getElementById("lineSection").setAttribute("x1", newCircleXPosition);
                document.getElementById("lineSection").setAttribute("y1", newCircleYPosition);

                document.getElementById("pointALabel").setAttribute("x", newCircleXPosition);
                document.getElementById("pointALabel").setAttribute("y", newCircleYPosition - 16);

                document.getElementById("pointAXValue").innerHTML = convertX(newCircleXPosition).toPrecision(4);
                document.getElementById("pointAYValue").innerHTML = convertY(newCircleYPosition).toPrecision(4);
            }
            else {
                document.getElementById("lineSection").setAttribute("x2", newCircleXPosition);
                document.getElementById("lineSection").setAttribute("y2", newCircleYPosition);

                document.getElementById("pointBLabel").setAttribute("x", newCircleXPosition);
                document.getElementById("pointBLabel").setAttribute("y", newCircleYPosition - 16);

                document.getElementById("pointBXValue").innerHTML = convertX(newCircleXPosition).toPrecision(4);
                document.getElementById("pointBYValue").innerHTML = convertY(newCircleYPosition).toPrecision(4);
            }
            updateCentroid(
                document.getElementById("pointA").getAttributeNS(null, "cx"),
                document.getElementById("pointB").getAttributeNS(null, "cx"),
                document.getElementById("pointA").getAttributeNS(null, "cy"),
                document.getElementById("pointB").getAttributeNS(null, "cy"));
        }
    }

    function endDrag(evt) {
      selectedElement = null;
    }
}

function updateCentroid(pointAXValue, pointBXValue, pointAYValue, pointBYValue){
    let centroidX = (parseFloat(pointBXValue) + parseFloat(pointAXValue)) / 2;
    let centroidY = (parseFloat(pointBYValue) + parseFloat(pointAYValue)) / 2;
    let distanceX = convertX(pointBXValue) - convertX(pointAXValue);
    let distanceY = convertY(pointBYValue) - convertY(pointAYValue);
    let vectorMagnitude = Math.sqrt(Math.pow(distanceX, 2)+Math.pow(distanceY,2));

    document.getElementById("centroid").setAttribute("cx", centroidX);
    document.getElementById("centroid").setAttribute("cy", centroidY);
    document.getElementById("centroidXValue").innerHTML = convertX(centroidX).toPrecision(4);
    document.getElementById("centroidYValue").innerHTML = convertY(centroidY).toPrecision(4);
    document.getElementById("separationAB").innerHTML = vectorMagnitude.toPrecision(4);

    let opposite = distanceY;
    let hypotenuse = vectorMagnitude;
    let vectorDirection = radians_to_degrees(Math.asin(distanceY / vectorMagnitude));
    if (distanceX < 0 && distanceY > 0){
        vectorDirection = 180 - parseFloat(vectorDirection);
    }
    else if (distanceX < 0 && distanceY < 0){
        vectorDirection = 180 - parseFloat(vectorDirection);
    }
    else if (distanceX > 0 && distanceY < 0){
        vectorDirection = 360 + parseFloat(vectorDirection);
    }
    document.getElementById("angleAB").innerHTML =  vectorDirection.toPrecision(4);
}

function resetPoints(){
    document.getElementById("pointA").setAttribute("cx", 54);
    document.getElementById("pointA").setAttribute("cy", 446);
    document.getElementById("pointALabel").setAttribute("x", 48);
    document.getElementById("pointALabel").setAttribute("y", 430);
    document.getElementById("pointAXValue").innerHTML = "10.00";
    document.getElementById("pointAYValue").innerHTML = "10.00";

    document.getElementById("pointB").setAttribute("cx", 250);
    document.getElementById("pointB").setAttribute("cy", 250);
    document.getElementById("pointBLabel").setAttribute("x", 244);
    document.getElementById("pointBLabel").setAttribute("y", 234);
    document.getElementById("pointBXValue").innerHTML = "50.00";
    document.getElementById("pointBYValue").innerHTML = "50.00";

    document.getElementById("lineSection").setAttribute("x1", 54);
    document.getElementById("lineSection").setAttribute("y1", 446);
    document.getElementById("lineSection").setAttribute("x2", 250);
    document.getElementById("lineSection").setAttribute("y2", 250);

    document.getElementById("centroid").setAttribute("cx", 152);
    document.getElementById("centroid").setAttribute("cy", 348);
    document.getElementById("centroidXValue").innerHTML = "30.00";
    document.getElementById("centroidYValue").innerHTML = "30.00";
    document.getElementById("separationAB").innerHTML = "56.57";
    document.getElementById("angleAB").innerHTML = "45.00";
}

function radians_to_degrees(radians)
{
  var pi = Math.PI;
  return radians * (180/pi);
}

function convertX(x_in){
    // This converts positions in the SVG to coordinates on the 100 * 100 graph
    return (x_in - 5) / 4.9;
}

function convertY(y_in){
    return (495 - y_in) / 4.9;
}

function oldConvertY(y_in){
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

function oldConvertX(x_in){
    // This converts coordinates on the 100 * 100 graph to SVG positions
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
