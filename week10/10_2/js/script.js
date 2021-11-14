let x=0;
let g=0;


function change() {
  x += 20;
  g += 10;

  let b = document.getElementById('box');
  console.log(b);
  // document: elements of the browser (html file)
  b.innerHTML = "WOW";
  b.style.left = x + "px";
  b.style.backgroundColor = "rgb(255, "+ g +", 0)";
}

function add() {
  // create an HRML element, e.g.<p> </p>
    let newElt = document.createElement("div");
  // change properties
  newElt.style.backgroundColor = "gray";
  newElt.style.width = "50px";
  newElt.style.height = "50px";
  newElt.style.margin = "30px";
    // newElt.style.position = "absolute";
    // newElt.style.right = "100px";
    // newElt.style.top = "100px";
  // attach to the document
  document.body.appendChild(newElt);
  document.getElementById('box').appendChild(newElt)
}
