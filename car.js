let canvas = document.querySelector("canvas");
let c = canvas.getContext("2d");

let score = document.querySelector("#score");
let uiScore = document.querySelector("#showscore");
let startbtn = document.querySelector("#strtbtn");
let containerUI = document.querySelector(".container");
let UI = document.querySelector("#presentationUI");
let upBTN = document.querySelector("#upBTN");
let downBTN = document.querySelector("#downBTN");
let leftBTN = document.querySelector("#leftBTN");
let rightBTN = document.querySelector("#rightBTN");
let updownbtn = document.querySelector("#up-downBtn");
let leftrightbtn = document.querySelector("#left-rightBtn");

let scorebrd = 0;
let scoreinterval;

updownbtn.style.display = "none";
leftrightbtn.style.display = "none";

canvas.width = innerWidth;
canvas.height = innerHeight;

UI.addEventListener("click", () => {
  UI.style.display = "none";
});

// creating player
class Car {
  constructor() {
    let carimg = new Image();
    carimg.src = "car img2.png";

    // for mobile
    if (window.innerWidth <= 500 && window.innerWidth >= 315) {
      carimg.onload = () => {
        this.Image = carimg;
        let imagescale = 0.2;
        this.width = carimg.width * imagescale + 4;
        this.height = carimg.height * imagescale + 20;

        (this.oiginalY = canvas.height - this.height),
          (this.position = {
            x: canvas.width / 2 - this.width / 2,
            y: this.oiginalY,
          });
      };
    } else {
      // for laptop
      carimg.onload = () => {
        this.Image = carimg;
        let imagescale = 0.2;
        this.width = carimg.width * imagescale + 25;
        this.height = carimg.height * imagescale;

        (this.oiginalY = canvas.height - this.height),
          (this.position = {
            x: canvas.width / 2 - this.width / 2,
            y: this.oiginalY,
          });
      };
    }

    this.velocity = {
      x: 0,
      y: 0,
    };

    this.rotation = 0;
  }

  draw() {
    c.save();

    c.translate(
      player.position.x + player.width / 2,
      player.position.y + player.height / 2
    );
    c.rotate(this.rotation);
    c.translate(
      -player.position.x - player.width / 2,
      -player.position.y - player.height / 2
    );

    if (this.Image) {
      c.fillStyle = "red";
      c.drawImage(
        this.Image,
        this.position.x,
        this.position.y,
        this.width,
        this.height
      );
    }
    c.restore();
  }

  update() {
    if (this.Image) {
      this.draw();
      this.position.x += this.velocity.x;
    }
  }
}

// creating obstables
class Obstatcle {
  constructor() {
    let random_enemy_pic = [];

    // for moblie
    if (window.innerWidth <= 500 && window.innerWidth >= 315) {
      random_enemy_pic = [
        { src: "enemyimage1.png", scaleX: 0.07, scaleY: 0.19 }, //red car
        { src: "enemycar2.png", scaleX: 0.035, scaleY: 0.07 },
        { src: "enemycar3.png", scaleX: 0.1, scaleY: 0.3 },
      ];
    } else {
      // for PCs
      random_enemy_pic = [
        { src: "enemyimage1.png", scaleX: 0.2, scaleY: 0.2 },
        { src: "enemycar2.png", scaleX: 0.08, scaleY: 0.07 },
        { src: "enemycar3.png", scaleX: 0.3, scaleY: 0.3 },
      ];
    }

    let randon_select = Math.floor(Math.random() * random_enemy_pic.length);
    let selectedImage = random_enemy_pic[randon_select];

    let img = new Image();
    img.src = selectedImage.src;

    img.onload = () => {
      this.image = img;
      //   let imagescale = 0.2;

      let scaleX = selectedImage.scaleX;
      let scaleY = selectedImage.scaleY;

      this.width = img.width * scaleX + 25;
      this.height = img.height * scaleY;

      this.position = {
        x: Math.random() * (canvas.width - this.width),
        y: -this.height,
      };
    };

    this.velocity = {
      y: 8,
    };
  }

  draw() {
    if (this.image) {
      c.drawImage(
        this.image,
        this.position.x,
        this.position.y,
        this.width,
        this.height
      );
      c.fillStyle = "green";
    }
  }

  update() {
    if (this.image) {
      this.draw();

      this.position.y += this.velocity.y;
    }
  }
}

// calling player
let player = new Car();

// about obstacle
let obstables = [];
let obstablesspawnrate = 8;
let frame = 0;

// keys constant
let keys = {
  left: {
    pressed: false,
  },
  right: {
    pressed: false,
  },
  up: {
    pressed: false,
  },
  down: {
    pressed: false,
  },
  shift: {
    pressed: false,
  },
};

// road image
let roadpic = new Image();
roadpic.src = "raodpic.jpg";

// car skid sound
let carSkid = document.createElement("audio");
carSkid.src = "carskid.wav";

// function animation
let animationId;
function animation() {
  animationId = requestAnimationFrame(animation);

  c.save();
  c.globalAlpha = 0.1;
  c.clearRect(0, 0, canvas.width, canvas.height);
  c.drawImage(roadpic, 0, 0, canvas.width, canvas.height);
  c.restore();
  player.update();

  if (window.innerWidth <= 500 && window.innerWidth >= 315) {
    //   controls for mobiles
    if (moveleft && player.position.x >= 0) {
      player.velocity.x = -9.5;
      player.rotation = -0.5;
      carSkid.play();
    } else if (
      moveright &&
      player.position.x + player.width <= canvas.width + 0
    ) {
      player.velocity.x = 9.5;
      player.rotation = 0.5;
      carSkid.play();
    } else {
      player.velocity.x = 0;
      player.rotation = 0;
      carSkid.pause();
    }
  } else {
    //   controls for laptop
    if (keys.left.pressed && player.position.x >= 0) {
      player.velocity.x = -10.5;
      player.rotation = -0.5;
      carSkid.play();
    } else if (
      keys.right.pressed &&
      player.position.x + player.width <= canvas.width + 0
    ) {
      player.velocity.x = +10.5;
      player.rotation = 0.5;
      carSkid.play();
    } else {
      player.velocity.x = 0;
      player.rotation = -0;
      carSkid.pause();
    }
  }

  frame++;
  let obstablesspawnrateMOBILE = 12;
  if (window.innerWidth <= 500 && window.innerWidth >= 315) {
    if (frame % obstablesspawnrateMOBILE === 0) {
      obstables.push(new Obstatcle());
    }
  } else {
    if (frame % obstablesspawnrate === 0) {
      obstables.push(new Obstatcle());
    }
  }

  //   rendering each obstacels
  obstables.forEach((obstable, i) => {
    obstable.update();

    if (window.innerWidth <= 500 && window.innerWidth >= 315) {
      // speeding control for mobile
      if (moveup && player.position.y > player.oiginalY - 60) {
        obstable.velocity.y = 15;
        obstablesspawnrateMOBILE = 4;
      } else if (movedown) {
        obstable.velocity.y = 5;
        obstablesspawnrateMOBILE = -9;
      } else {
        obstable.velocity.y = 8;
        obstablesspawnrateMOBILE = 12;
      }
    } else {
      // speeding control for laptop
      if (keys.up.pressed && player.position.y > player.oiginalY - 60) {
        obstable.velocity.y = 15;
        obstablesspawnrate = 4;
      } else if (keys.down.pressed) {
        obstable.velocity.y = 5;
      } else {
        obstable.velocity.y = 8;
        obstablesspawnrate = 8;
      }
    }

    // collision detection bw car and obstacle
    if (
      player.position.x + 15< obstable.position.x + obstable.width && // Left side of player < Right side of obstacle
      player.position.x + player.width - 15 > obstable.position.x &&  // Right side of player > Left side of obstacle
      player.position.y + 17 < obstable.position.y + obstable.height &&  //Top side of player < Bottom side of obstacle
      player.position.y + player.height - 17 > obstable.position.y
    ) {
      cancelAnimationFrame(animationId);
      clearInterval(scoreinterval);

      // explosion sound
      let explosionsound = document.createElement("audio");
      explosionsound.src = "explosionsound.wav";
      explosionsound.play();

      //explosion image
      let explosionImg = new Image();
      explosionImg.src = "explosion1.png";

      explosionImg.onload = () => {
        c.drawImage(
          explosionImg,
          player.position.x - 40,
          player.position.y - 70,
          player.width + 100,
          player.height + 100
        );
      };

      setTimeout(() => {
        containerUI.style.display = "flex";

        updownbtn.style.display = "none";
        leftrightbtn.style.display = "none";
      }, 1500 / 2);
    }

    if (obstable.position.y > canvas.height) obstables.splice(i, 1);
  });
}

// eventlisteners for laptop
addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowLeft":
      keys.left.pressed = true;
      break;

    case "ArrowRight":
      keys.right.pressed = true;
      break;

    case "ArrowUp":
      keys.up.pressed = true;
      break;

    case "ArrowDown":
      keys.down.pressed = true;
      break;

    case "Shift":
      keys.shift.pressed = true;
      break;
  }
});
addEventListener("keyup", (e) => {
  switch (e.key) {
    case "ArrowLeft":
      keys.left.pressed = false;
      break;

    case "ArrowRight":
      keys.right.pressed = false;
      break;

    case "ArrowUp":
      keys.up.pressed = false;
      break;

    case "ArrowDown":
      keys.down.pressed = false;
      break;

    case "Shift":
      keys.shift.pressed = false;
      break;
  }
});

// start game
startbtn.addEventListener("click", () => {
  scorebrd = 0;
  obstables = [];

  player = new Car();

  scoreinterval = setInterval(() => {
    scorebrd++;
    score.innerHTML = scorebrd;
    uiScore.innerHTML = scorebrd;
  }, 1000);

  containerUI.style.display = "none";
  updownbtn.style.display = "flex";
  leftrightbtn.style.display = "flex";

  animation();
});

// for mobile
let moveleft = false;
let moveright = false;
let moveup = false;
let movedown = false;

leftBTN.addEventListener("touchstart", () => {
  moveleft = true;
});

leftBTN.addEventListener("touchend", () => {
  moveleft = false;
});

rightBTN.addEventListener("touchstart", () => {
  moveright = true;
});

rightBTN.addEventListener("touchend", () => {
  moveright = false;
});

upBTN.addEventListener("touchstart", () => {
  moveup = true;
});
upBTN.addEventListener("touchend", () => {
  moveup = false;
});

downBTN.addEventListener("touchstart", () => {
  movedown = true;
});
downBTN.addEventListener("touchend", () => {
  movedown = false;
});
