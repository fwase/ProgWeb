(function () {

  const FPS = 1; 
  let gameDimensions = [1243, 960];
  let focoDimensions = [100, 130];
  let probFoco = 25;
  let probCaveira = 2.25;
  let reserva;
  let focos = [];
  let caveiras = [];
  let gameLoop;
  let isPaused = false;
  let score = 0;
  let vidas = [];
  let qtdLifes;
  let devastacoes = [];
  let velocidade = 1000;
  let initGame = Date.now();

  function initLifes () {
    qtdLifes = 5;
    for (let i = 0 ; i < qtdLifes ; i++){
      let vida = new Vida(i);
      vidas.push(vida);
    }
  }
  
  function verifyLoserLife() {
    let millisecondsDestroy = 2000;

    let focosIncendio = document.getElementsByClassName('foco-incendio');
    for (let i = 0 ; i < focosIncendio.length ; i++) {
      if (Date.now() - focosIncendio[i].createAt >= millisecondsDestroy) {
        let width = focosIncendio[i].style.width;
        let height = focosIncendio[i].style.height;
        let left = focosIncendio[i].style.left;
        let top = focosIncendio[i].style.top;

        reserva.element.removeChild(focosIncendio[i]);
        let devastacao = new Devastacao(width, height, left, top);
        devastacoes.push(devastacao);
        loserLife();
      }
    }

    let caveiraIncendio = document.getElementsByClassName('caveira-fogo');
    for (let i = 0 ; i < caveiraIncendio.length ; i++) {
      if (Date.now() - caveiraIncendio[i].createAt >= millisecondsDestroy) {
        let left = caveiraIncendio[i].style.left;
        let top = caveiraIncendio[i].style.top;

        reserva.element.removeChild(caveiraIncendio[i]);
        let devastacao = new Devastacao("250px", "250px", left, top);
        devastacoes.push(devastacao);
        loserLife();
        loserLife();
      }
    }
  }

  function loserLife () {    
    let vidasClass = document.getElementsByClassName("vida");
    document.getElementsByClassName("vida")[vidasClass.length - 1].remove();
    qtdLifes--;

    if (qtdLifes === 0) {
      clearInterval(gameLoop);
      alert(`GAME OVER!\n\nScore: ${score}\n\Digite s para recomeçar`);
    }
  }

  function restartGame () {
    focos = [];
    caveiras = [];
    isPaused = false;
    score = 0;
    vidas = [];
    devastacoes = [];
    velocidade = 1000;

    let restartFocos = document.getElementsByClassName("foco-incendio");
    while(restartFocos.length > 0) {
      reserva.element.removeChild(restartFocos[0]);
    }

    let restartDestruicoes = document.getElementsByClassName("caveira-fogo");
    while(restartDestruicoes.length > 0) {
      reserva.element.removeChild(restartDestruicoes[0]);
    }

    init();
    gameLoop = setInterval(run, velocidade/FPS);
  }

  function init() {
    drawScore();
    reserva = new Reserva();

    initLifes();
  }

  window.addEventListener("keydown", function (e) {
    if (e.key === 's') {
      if (qtdLifes === 0) {
        restartGame();
        return
      }

      gameLoop = setInterval(run, velocidade/FPS);
    }
    else if (e.key === 'o') {
      clearInterval(gameLoop);
    }
    else if (e.key === 'p') {
      isPaused = !isPaused;
    }
  })

  window.addEventListener("mousedown", function(event) {
    if(event.target.className === 'foco-incendio' ||
    event.target.className === 'caveira-fogo'){
      event.target.remove();
      score += 10;
      drawScore();
      return
    }
  })

  class Reserva {
    constructor () {
      this.element = document.createElement("div");
      this.element.className = "reserva";
      this.element.style.width = `${gameDimensions[0]}px`;
      this.element.style.height = `${gameDimensions[1]}px`;
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
      this.element.createAt = Date.now();
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
      this.element.createAt = Date.now();
      reserva.element.appendChild(this.element);
    }
  }

  class Vida {
    constructor (index) {
      this.element = document.createElement("div");
      this.element.className = "vida";
      this.element.style.width = "100px";
      this.element.style.height = "54px";
      this.element.style.left = `${(index*54)+(index*25)}px`;
      this.element.style.display = "inline-block";
      this.element.style.position = "absolute";
      document.body.appendChild(this.element);
    }
  }

  class Devastacao {
    constructor (width, height, left, top) {
      this.element = document.createElement("div");
      this.element.className = "devastacao";
      this.element.style.width = width;
      this.element.style.height = height;
      this.element.style.left = left;
      this.element.style.top = top;
      this.element.style.backgroundPosition = "center";
      this.element.style.backgroundRepeat = "no-repeat";
      reserva.element.appendChild(this.element);
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
      }
      verifyLoserLife();
      
      if (Date.now() - initGame >= 60000) {
        initGame = Date.now();
        velocidade -= 100;
      }
    } 
  }

  init();
})();
