/*
Snow Effect source: https://codepen.io/longzero/pen/Kwdbyj
*/

window.onload = function () {
  //canvas init
  var canvas = document.getElementById("canvas");
  var why1 = document.getElementById("why1");
  var textt ="Bởi vì anh là chồng yêu của em, anh đáng yêu không chịu được"
  why1.value =" "
  var ctx = canvas.getContext("2d");

  //canvas dimensions
  var W = window.innerWidth;
  var H = window.innerHeight;
  canvas.width = W;
  canvas.height = H;

  //snowflake particles
  var mp = 25; //max particles
  var particles = [];
  for (var i = 0; i < mp; i++) {
    particles.push({
      x: Math.random() * W, //x-coordinate
      y: Math.random() * H, //y-coordinate
      r: Math.random() * 4 + 1, //radius
      d: Math.random() * mp, //density
    });
  }

  //Lets draw the flakes
  function draw() {
    ctx.clearRect(0, 0, W, H);

    ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
    ctx.beginPath();
    for (var i = 0; i < mp; i++) {
      var p = particles[i];
      ctx.moveTo(p.x, p.y);
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, true);
    }
    ctx.fill();
    update();
  }

  //Function to move the snowflakes
  //angle will be an ongoing incremental flag. Sin and Cos functions will be applied to it to create vertical and horizontal movements of the flakes
  var angle = 0;
  function update() {
    angle += 0.01;
    for (var i = 0; i < mp; i++) {
      var p = particles[i];
      //Updating X and Y coordinates
      //We will add 1 to the cos function to prevent negative values which will lead flakes to move upwards
      //Every particle has its own density which can be used to make the downward movement different for each flake
      //Lets make it more random by adding in the radius
      p.y += Math.cos(angle + p.d) + 1 + p.r / 2;
      p.x += Math.sin(angle) * 2;

      //Sending flakes back from the top when it exits
      //Lets make it a bit more organic and let flakes enter from the left and right also.
      if (p.x > W + 5 || p.x < -5 || p.y > H) {
        if (i % 3 > 0) {
          //66.67% of the flakes
          particles[i] = { x: Math.random() * W, y: -10, r: p.r, d: p.d };
        } else {
          //If the flake is exitting from the right
          if (Math.sin(angle) > 0) {
            //Enter from the left
            particles[i] = { x: -5, y: Math.random() * H, r: p.r, d: p.d };
          } else {
            //Enter from the right
            particles[i] = { x: W + 5, y: Math.random() * H, r: p.r, d: p.d };
          }
        }
      }
    }
  }

  //animation loop
  setInterval(draw, 33);
  var len = textt.length;
  var vt = 0;
  var binn = 0;
  why1.addEventListener('keypress', function name() {
    var val1 = why1.value
    var len1 = val1.length
      if (vt <len){  
        var val2= val1.slice(0,len1)
        val2 = val2 + textt[vt]
        why1.value = val2
        vt++
      }
      else {
        var val2= val1.slice(0,len1)
        if (binn==0)
        {
            val2 = val2 + " "
            binn = 1
        }
        else if (binn==1){
            val2 = val2 + "<"
            binn =2
        }
        else{
            val2 = val2 + "3"
            binn =0
        }
        why1.value = val2
      }
})
};

function yesClick() {
    document.getElementById("body2").style.display = "block"
    document.getElementById("box").style.display = "block"
}

function noHover() {
  var x = Math.floor(Math.random() * window.innerWidth);
  var y = Math.floor(Math.random() * window.innerHeight);
  document.getElementById("btnNo").style.left = x + "px";
  document.getElementById("btnNo").style.top = y + "px";
}

function gui() {
    document.getElementById("box").style.display = "none"
    document.getElementById("box2").style.display = "block"
  }

  function okay() {
    document.getElementById("body2").style.display = "none"
    document.getElementById("box2").style.display = "none"
  }