(function () {

  const FPS = 1; 
  let gameDimensions = [1243, 960];
  let focoDimensions = [100, 130];
  let probFoco = 25;
  let probCaveira = 5;
  let reserva;
  let focos = [];
  let caveiras = [];
  let gameLoop;
  let isPaused = false;
  let score = 0;
  let vidas = [];
  let qtd_lifes;

  function initLifes () {
    qtd_lifes = 5;
    for (let i = 0 ; i < qtd_lifes ; i++){
      let vida = new Vida(i);
      vidas.push(vida);
    }
  }

  function loserLife () {
    if (qtd_lifes === 0) {
      console.log('Perdeu tudo!');
      clearInterval(gameLoop);
    }
    
    let vidasClass = document.getElementsByClassName("vida");
    document.getElementsByClassName("vida")[vidasClass.length - 1].remove();
    qtd_lifes--;
  }

  function restartGame () {
    focos = [];
    caveiras = [];
    isPaused = false;
    score = 0;
    vidas = [];

    init();
    gameLoop = setInterval(run, 1000/FPS);
  }

  function init() {
    drawScore();
    reserva = new Reserva();
    initLifes();
  }

  window.addEventListener("keydown", function (e) {
    if (e.key === 's') {
      if (qtd_lifes === 0) {
        restartGame();
        return
      }

      gameLoop = setInterval(run, 1000/FPS);
    }
    if (e.key === 'o') {
      clearInterval(gameLoop);
    }
    if (e.key === 'p') {
      isPaused = !isPaused;
    }
  })

  window.addEventListener("mousedown", function(event) {
    if(event.target.className === 'foco-incendio'){
      //console.log(reserva.element)
      //console.log(focos)
      // REMOVE INCENDIO FROM MAP
      event.target.remove();
      score += 10;
      drawScore();
      loserLife();
      return
    }
  })

  class Reserva {
    constructor () {
      this.element = document.createElement("div");
      this.element.className = "reserva";
      this.element.style.width = `${gameDimensions[0]}px`;
      this.element.style.height = `${gameDimensions[1]}px`;
      this.element.click(function(){

      })
      document.body.appendChild(this.element);
    }
  }

  class FocoIncendio {
    constructor () {
      this.element = document.createElement("div");
      this.element.className = "foco-incendio";
      this.element.style.width = `${focoDimensions[0]}px`;
      this.element.style.height = `${focoDimensions[1]}px`;
      this.element.style.left = `${Math.floor((Math.random() * (gameDimensions[0]-focoDimensions[0])))}px`;
      this.element.style.top = `${Math.floor((Math.random() * (gameDimensions[1]-focoDimensions[1])))}px`;
      //console.log(this.element.style.width , this.element.style.height)
      //console.log(this.element.style.left , this.element.style.top)
      setTimeout(function() {
        //this.element.remove();
        loserLife();
      },2000);
      reserva.element.appendChild(this.element);
    }
  }

  class CaveiraFogo {
    constructor () {
      this.element = document.createElement("div");
      this.element.className = "caveira-fogo";
      this.element.style.width = `${focoDimensions[0]}px`;
      this.element.style.height = `${focoDimensions[1]}px`;
      this.element.style.left = `${Math.floor((Math.random() * (gameDimensions[0]-focoDimensions[0])))}px`;
      this.element.style.top = `${Math.floor((Math.random() * (gameDimensions[1]-focoDimensions[1])))}px`;
      reserva.element.appendChild(this.element);
    }
  }

  class Vida {
    constructor (index) {
      //scoreElement = document.getElementById("score");
      this.element = document.createElement("div");
      this.element.className = "vida";
      this.element.style.width = "100px";
      this.element.style.height = "54px";
      this.element.style.left = `${(index*54)+(index*25)}px`
      this.element.style.display = "inline-block";
      this.element.style.position = "absolute";
      document.body.appendChild(this.element);
    }
  }

  function drawScore () {
    let scoreElement = document.getElementById("score");
    let context = scoreElement.getContext("2d");
    // clear draw
    scoreElement.getContext("2d").clearRect(0, 0, scoreElement.width, scoreElement.height)
    
    context.font = "45px Arial";
    context.fillStyle = "#FFFFF";
    let score_string = score.toString();

    for (let i = score_string.length ; i < 5 ; i++){
      score_string = ['0'] + score_string
    }

    context.fillText(score_string, 1000, 35);
  }

  function run () {
    if (!isPaused) {
      if (Math.random() * 100 < probFoco) {
        let foco = new FocoIncendio();
        focos.push(foco);
      }
      if (Math.random() * 100 < probCaveira) {
        let caveira = new CaveiraFogo();
        caveiras.push(caveira);
        console.log(caveira)
      }
    } 
  }

  init();
})();
