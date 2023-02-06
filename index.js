//                                                                                                    Birger Run Official Source Code:








//variables starting as false
var player;
var pills = false;
var pillact = false;
var coinsz = false;
var newskins = false;
var burger = false;

// so restartbutton thing dont show up during game
document.getElementById("myrestartbutton").style.display = "none";

//database import
fetch("https://api.birgerrun.ikomm.ollebolle.xyz/highscore").then(function (
  res
) {
  res.json().then(function (data) {
    let count = 1;
    data.forEach((obj) => {
      console.log(obj);
      let element = document.createElement("p");
      element.className = "fetched-highscore";
      element.innerHTML =
        count + ". " + "<b>" + obj.name + "</b>" + " - " + obj.score;
      document.getElementById("ordered-high").appendChild(element);
      count++;
    });
  });
});

//restarting the game
function restartGame() {
  document.getElementById("myrestartbutton").style.display = "none";
  myGameArea.clear();
  score = 0;
  startGame();
}

//creating the objects and obsticles in the game
function startGame() {
  player = new component(35, 50, "mid.png", 400, 900, "image");
  pil = new component(20, 37, "bgpoison.jpg", 400, 100, "image");
  pil1 = new component(20, 37, "bgpoison.jpg", 400, 100, "image");
  pil2 = new component(20, 37, "bgpoison.jpg", 400, 100, "image");
  pil3 = new component(20, 37, "bgpoison.jpg", 400, 100, "image");
  pil4 = new component(20, 37, "bgpoison.jpg", 400, 100, "image");
  pil5 = new component(20, 37, "bgpoison.jpg", 400, 100, "image");
  pil6 = new component(20, 37, "bgpoison.jpg", 400, 100, "image");
  pil7 = new component(20, 37, "bgpoison.jpg", 400, 100, "image");
  pil8 = new component(20, 37, "bgpoison.jpg", 400, 100, "image");
  pil9 = new component(20, 37, "bgpoison.jpg", 400, 100, "image");
  pil10 = new component(20, 37, "bgpoison.jpg", 400, 100, "image");
  pil11 = new component(20, 37, "bgpoison.jpg", 400, 100, "image");
  pil12 = new component(20, 37, "bgpoison.jpg", 400, 100, "image");
  pil13 = new component(25, 45, "sjoko.jpg", 400, 100, "image");
  pil14 = new component(25, 45, "sjoko.jpg", 400, 100, "image");
  pil15 = new component(25, 45, "sjoko.jpg", 400, 100, "image");
  coin = new component(30,30,"coins.png",Math.floor(Math.random() * 775),100,"image");
  coin1 = new component(30,30,"coins.png",Math.floor(Math.random() * 775),100,"image");
  coin2 = new component(30,30,"coins.png",Math.floor(Math.random() * 775),100,"image");
  coin3 = new component(30,30,"coins.png",Math.floor(Math.random() * 775),100,"image");
  coin4 = new component(30,30,"coins.png",Math.floor(Math.random() * 775),100,"image");
  pille = new component(30,30,"pille.png",Math.floor(Math.random() * 775),100,"image");
  pille1 = new component(30,30,"pille.png",Math.floor(Math.random() * 775),100,"image");
  pille2 = new component(30,30,"pille.png",Math.floor(Math.random() * 775),100,"image");

  myObstacle = new component(800, 50, "#1e971a", 0, 950);
  vegg = new component(800, 25, "#3f6fb8", 0, 0);
  vegg1 = new component(25, 950, "#3f6fb8", 0, 0);
  vegg2 = new component(25, 950, "#3f6fb8", 775, 0);

  // skins yes verinice
  if (newskins == true && burger == false) {
    player = new component(35, 50, "mid1.png", 400, 900, "image");

    if (newskins == false && burger == true) {
      player = new component(35, 50, "mid2.png", 400, 900, "image");
    }
    if (newskins == false && burger == false)
      player = new component(35, 50, "mid.png", 400, 900, "image");
  }

  myGameArea.start();
}

//canvas stuff
var myGameArea = {
  canvas: document.getElementById("canvas"),
  start: function () {
    this.canvas.width = 800;
    this.canvas.height = 1000;
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[10]);
    this.interval = setInterval(updateGameArea, 20);
  },
  clear: function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  stop: function () {
    clearInterval(this.interval);
  },
};
function component(width, height, color, x, y, type) {
  this.type = type;
  if (type == "image") {
    this.image = new Image();
    this.image.src = color;
  }
  this.width = width;
  this.height = height;
  this.speedX = 0;
  this.speedY = 0;
  this.x = x;
  this.y = y;
  this.update = function () {
    ctx = myGameArea.context;
    if (type == "image") {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    } else {
      ctx.fillStyle = color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  };
  this.newPos = function () {
    this.x += this.speedX;
    this.y += this.speedY;
  };
  

  // creating crashwith fuction, this function checks if objects crash with each other
  this.crashWith = function (otherobj) {
    var myleft = this.x;
    var myright = this.x + this.width;
    var mytop = this.y;
    var mybottom = this.y + this.height;
    var otherleft = otherobj.x;
    var otherright = otherobj.x + otherobj.width;
    var othertop = otherobj.y;
    var otherbottom = otherobj.y + otherobj.height;
    var crash = true;
    if (
      mybottom < othertop ||
      mytop > otherbottom ||
      myright < otherleft ||
      myleft > otherright
    ) {
      crash = false;
    }
    return crash;
  };
}

//what will be shown on the screen
function updateGameArea() {
  if (
    player.crashWith(pil) ||
    player.crashWith(pil1) ||
    player.crashWith(pil2) ||
    player.crashWith(pil3) ||
    player.crashWith(pil4) ||
    player.crashWith(pil5) ||
    player.crashWith(pil6) ||
    player.crashWith(pil7) ||
    player.crashWith(pil8) ||
    player.crashWith(pil9) ||
    player.crashWith(pil10) ||
    player.crashWith(pil11) ||
    player.crashWith(pil12) ||
    player.crashWith(pil13) ||
    player.crashWith(pil14) ||
    player.crashWith(pil15)
  ) {
    ctx.font = "25px Sans-serif";
    ctx.fillStyle = "black";
    ctx.fillText("Game Over", 350, 350);

    myGameArea.stop();
    document.getElementById("myrestartbutton").style.display = "block";
  } else {
    myGameArea.clear();
    vegg.update();
    vegg1.update();
    vegg2.update();
    player.x += player.speedX;
    player.y += player.speedY;
    player.newPos();
    player.update();
    walls();
    pill();
    pil.y += 8;
    pil.update();
    drawScore();
    coinz();
    invincible();
    myObstacle.update();

    if (coinsz == true) {
      coinvalue();
    }
    if (pills == true) {
      inv();
    }
    if (pillact == true) {
      pillactive();
    }
  }
  if (newskins == true && burger == false && score == 0) {
    ctx.font = "15px Sans-serif";
    ctx.fillStyle = "black";
    ctx.fillText("Playing as: Birgit", 100, 100);
  }
  if (newskins == false && burger == false && score == 0) {
    ctx.font = "15px Sans-serif";
    ctx.fillStyle = "black";
    ctx.fillText("Playing as: OG Birger", 100, 100);
  }
  if (newskins == false && burger == true && score == 0) {
    ctx.font = "15px Sans-serif";
    ctx.fillStyle = "black";
    ctx.fillText("Playing as: Burger", 100, 100);
  }
}


// skin change
function newskin() {
  newskins = true;
  burger = false;
  player = new component(35, 50, "mid1.png", 400, 900, "image");
}
function newskinfalse() {
  newskins = false;
  burger = false;
}
function burgerskin() {
  burger = true;
  newskins = false;
  player = new component(35, 50, "mid2.png", 400, 900, "image");
}


// moving and more skins
document.onkeydown = function (evt) {
  var tallkode = evt.keyCode;
  if (tallkode === 37) {
    player.speedX = -3;
    if (newskins == false && burger == true) {
      player.image.src = "left2.png";
    }
    if (newskins == true && burger == false) {
      player.image.src = "left1.png";
    }
    if (newskins == false && burger == false) {
      player.image.src = "left.png";
    }
  }

  if (tallkode === 39) {
    player.speedX = 3;
    if (newskins == false && burger == true) {
      player.image.src = "right2.png";
    }
    if (newskins == true && burger == false) {
      player.image.src = "right1.png";
    }
    if (newskins == false && burger == false) {
      player.image.src = "right.png";
    }
  }
  if (tallkode === 65) {
    player.speedX = -3;
    if (newskins == false && burger == true) {
      player.image.src = "left2.png";
    }
    if (newskins == true && burger == false) {
      player.image.src = "left1.png";
    }
    if (newskins == false && burger == false) {
      player.image.src = "left.png";
    }
  }
  if (tallkode === 68) {
    player.speedX = 3;
    if (newskins == false && burger == true) {
      player.image.src = "right2.png";
    }
    if (newskins == true && burger == false) {
      player.image.src = "right1.png";
    }
    if (newskins == false && burger == false) {
      player.image.src = "right.png";
    }
  }
  // if(tallkode === 38){
  //     player.speedY =-3;
  // }
  // if(tallkode === 40){
  //     player.speedY = 3;
  // }
};


document.onkeyup = function (evt) {
  if (newskins == false && burger == true) {
    player.image.src = "mid2.png";
  }
  if (newskins == true && burger == false) {
    player.image.src = "mid1.png";
  }
  if (newskins == false && burger == false) {
    player.image.src = "mid.png";
  }

  var tallkode = evt.keyCode;
  if (tallkode === 37 && player.speedX === -3) {
    player.speedX = 0;
  }
  if (tallkode === 39 && player.speedX === 3) {
    player.speedX = 0;
  }
  if (tallkode === 65 && player.speedX === -3) {
    player.speedX = 0;
  }
  if (tallkode === 68 && player.speedX === 3) {
    player.speedX = 0;
  }
  // if(tallkode === 38 &&  player.speedY === -3) {
  //     player.speedY = 0;}
  // if(tallkode === 40 && player.speedY === 3) {
  //     player.speedY = 0;}
};



// stopping player from exiting canvas
function walls() {
  //    if (player.y <= 50) {
  //        player.y = 50;
  // }
  if (player.x <= 30) {
    player.x = 30;
  }
  if (player.x >= 735) {
    player.x = 735;
  }
  //     if (player.y >= 900) {
  //         player.y = 900;
  // }
}


// objects spawn and respawn function
function pill() {
  if (pil.y >= 910) {
    pil.y = Math.floor(Math.random() * 200);
    pil.x = Math.floor(Math.random() * 775);
    score++;
  }
  if (score >= 5) {
    pil1.y += 10;
    pil1.update();
    if (pil1.y >= 910) {
      pil1.y = Math.floor(Math.random() * 250);
      pil1.x = Math.floor(Math.random() * 775);
      score++;
    }
  }
  if (score >= 15) {
    pil2.y += 11;
    pil2.update();
    if (pil2.y >= 910) {
      pil2.y = Math.floor(Math.random() * 250);
      pil2.x = Math.floor(Math.random() * 775);
      score++;
    }
  }
  if (score >= 30) {
    pil3.y += 12;
    pil3.update();
    if (pil3.y >= 910) {
      pil3.y = Math.floor(Math.random() * 300);
      pil3.x = Math.floor(Math.random() * 775);
      score++;
    }
  }
  if (score >= 50) {
    pil4.y += 13;
    pil4.update();
    if (pil4.y >= 910) {
      pil4.y = Math.floor(Math.random() * 400);
      pil4.x = Math.floor(Math.random() * 775);
      score++;
    }
  }
  if (score >= 75) {
    pil5.y += 14;
    pil5.update();
    if (pil5.y >= 910) {
      pil5.y = Math.floor(Math.random() * 400);
      pil5.x = Math.floor(Math.random() * 775);
      score++;
    }
  }
  if (score >= 100) {
    pil6.y += 15;
    pil6.update();
    if (pil6.y >= 910) {
      pil6.y = Math.floor(Math.random() * 400);
      pil6.x = Math.floor(Math.random() * 775);
      score++;
    }
  }
  if (score >= 130) {
    pil7.y += 16;
    pil7.update();
    if (pil7.y >= 910) {
      pil7.y = Math.floor(Math.random() * 400);
      pil7.x = Math.floor(Math.random() * 775);
      score++;
    }
  }
  if (score >= 170) {
    pil8.y += 17;
    pil8.update();
    if (pil8.y >= 910) {
      pil8.y = Math.floor(Math.random() * 400);
      pil8.x = Math.floor(Math.random() * 775);
      score++;
    }
  }
  if (score >= 200) {
    pil9.y += 18;
    pil9.update();
    if (pil9.y >= 910) {
      pil9.y = Math.floor(Math.random() * 500);
      pil9.x = Math.floor(Math.random() * 775);
      score++;
    }
  }
  if (score >= 250) {
    pil10.y += 19;
    pil10.update();
    if (pil10.y >= 910) {
      pil10.y = Math.floor(Math.random() * 500);
      pil10.x = Math.floor(Math.random() * 775);
      score++;
    }
  }
  if (score >= 275) {
    pil11.y += 20;
    pil11.update();
    if (pil11.y >= 910) {
      pil11.y = Math.floor(Math.random() * 500);
      pil11.x = Math.floor(Math.random() * 775);
      score++;
    }
  }
  if (score >= 300) {
    pil12.y += 21;
    pil12.update();
    if (pil12.y >= 910) {
      pil12.y = Math.floor(Math.random() * 600);
      pil12.x = Math.floor(Math.random() * 775);
      score++;
    }
  }
  if (score >= 350) {
    pil13.y += 22;
    pil13.update();
    pil14.y += 23;
    pil14.update();
    pil15.y += 24;
    pil15.update();

    if (pil13.y >= 910) {
      pil13.y = Math.floor(Math.random() * 300);
      pil13.x = Math.floor(Math.random() * 775);
      score++;
    }
  }
  if (pil14.y >= 910) {
    pil14.y = Math.floor(Math.random() * 300);
    pil14.x = Math.floor(Math.random() * 775);
    score++;
  }
  if (pil15.y >= 910) {
    pil15.y = Math.floor(Math.random() * 300);
    pil15.x = Math.floor(Math.random() * 775);
    score++;
  }
}

// coin spawn function
function coinz() {
  if (score > 3) {
    coin.y += 9;
    coin.update();
  }
  if (player.crashWith(coin)) {
    coin.y += 10000;
    coinsz = true;
  }
  if (score > 13) {
    coinsz = false;
  }

  if (score > 87) {
    coin1.y += 7;
    coin1.update();
  }
  if (player.crashWith(coin1)) {
    coin1.y += 10000;
    coinsz = true;
  }
  if (score > 97) {
    coinsz = false;
  }

  if (score > 164) {
    coin2.y += 9;
    coin2.update();
  }
  if (player.crashWith(coin2)) {
    coin2.y += 10000;
    coinsz = true;
  }
  if (score > 174) {
    coinsz = false;
  }

  if (score > 256) {
    coin3.y += 9;
    coin3.update();
  }
  if (player.crashWith(coin3)) {
    coin3.y += 10000;
    coinsz = true;
  }
  if (score > 266) {
    coinsz = false;
  }

  if (score > 340) {
    coin4.y += 9;
    coin4.update();
  }
  if (player.crashWith(coin4)) {
    coin4.y += 10000;
    coinsz = true;
  }
  if (score > 350) {
    coinsz = false;
  }
}

function coinvalue() {
  score += 10;
}


// spawning invincible pill
function invincible() {
  if (score > 16) {
    pille.y += 9;
    pille.update();
  }
  if (player.crashWith(pille)) {
    pille.y += 10000;
    pills = true;
    pillact = true;
  }

  if (score == 35) {
    pills = false;
    pillact = false;
  }
  if (score > 127) {
    pille1.y += 7;
    pille1.update();
  }
  if (player.crashWith(pille1)) {
    pille1.y += 10000;
    pills = true;
    pillact = true;
  }
  if (score == 179) {
    pills = false;
    pillact = false;
  }
  if (score > 302) {
    pille2.y += 7;
    pille2.update();
  }
  if (player.crashWith(pille2)) {
    pille2.y += 10000;
    pills = true;
    pillact = true;
  }
  if (score > 357) {
    pills = false;
    pillact = false;
  }
}


//making player invincible (milk respawn when they hit 1px over playerhead)
function inv() {
  if (pil.y >= 849) {
    pil.y = Math.floor(Math.random() * 200);
    pil.x = Math.floor(Math.random() * 775);
    score++;
  }
  if (pil1.y >= 849) {
    pil1.y = Math.floor(Math.random() * 200);
    pil1.x = Math.floor(Math.random() * 775);
    score++;
  }
  if (pil2.y >= 849) {
    pil2.y = Math.floor(Math.random() * 200);
    pil2.x = Math.floor(Math.random() * 775);
    score++;
  }
  if (pil3.y >= 849) {
    pil3.y = Math.floor(Math.random() * 200);
    pil3.x = Math.floor(Math.random() * 775);
    score++;
  }
  if (pil4.y >= 849) {
    pil4.y = Math.floor(Math.random() * 200);
    pil4.x = Math.floor(Math.random() * 775);
    score++;
  }
  if (pil5.y >= 849) {
    pil5.y = Math.floor(Math.random() * 200);
    pil5.x = Math.floor(Math.random() * 775);
    score++;
  }
  if (pil6.y >= 849) {
    pil6.y = Math.floor(Math.random() * 200);
    pil6.x = Math.floor(Math.random() * 775);
    score++;
  }
  if (pil7.y >= 849) {
    pil7.y = Math.floor(Math.random() * 200);
    pil7.x = Math.floor(Math.random() * 775);
    score++;
  }
  if (pil8.y >= 849) {
    pil8.y = Math.floor(Math.random() * 200);
    pil8.x = Math.floor(Math.random() * 775);
    score++;
  }
  if (pil9.y >= 849) {
    pil9.y = Math.floor(Math.random() * 200);
    pil9.x = Math.floor(Math.random() * 775);
    score++;
  }
  if (pil10.y >= 849) {
    pil10.y = Math.floor(Math.random() * 200);
    pil10.x = Math.floor(Math.random() * 775);
    score++;
  }
  if (pil11.y >= 849) {
    pil11.y = Math.floor(Math.random() * 200);
    pil11.x = Math.floor(Math.random() * 775);
    score++;
  }
  if (pil12.y >= 849) {
    pil12.y = Math.floor(Math.random() * 200);
    pil12.x = Math.floor(Math.random() * 775);
    score++;
  }
  if (pil13.y >= 849) {
    pil13.y = Math.floor(Math.random() * 200);
    pil13.x = Math.floor(Math.random() * 775);
    score++;
  }
  if (pil14.y >= 849) {
    pil14.y = Math.floor(Math.random() * 200);
    pil14.x = Math.floor(Math.random() * 775);
    score++;
  }
  if (pil15.y >= 849) {
    pil15.y = Math.floor(Math.random() * 200);
    pil15.x = Math.floor(Math.random() * 775);
    score++;
  }
}


// score
let score = 0;

function drawScore() {
  ctx.font = "20px Arial";
  ctx.fillStyle = "black";
  ctx.fillText(`Score: ${score}`, 650, 100);
}

// showing that pill is active
function pillactive() {
  ctx.font = "20px Arial";
  ctx.fillStyle = "black";
  ctx.fillText("Pill Active", 100, 100);
}


//more databse stuff
function submitScore() {
  const name = document.getElementById("ja").value;
  if (!name) return alert("No name");
  fetch("https://api.birgerrun.ikomm.ollebolle.xyz/highscore", {
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: name, score: score }),
    method: "POST",
  }).then(function () {
    window.location.reload();
  });
}