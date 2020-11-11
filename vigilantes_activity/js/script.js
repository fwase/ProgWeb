(function () {

  const FPS = 1; 
  let gameDimensions = [1243, 960];
  let focoDimensions = [100, 130];
  let probFoco = 25;
  let probCaveira = 5;
  let reserva;
  let focos = [];
  let caveiras = []
  let gameLoop;
  let isPaused = false;
  let score = 0;
  let lifes = 5;

  function init() {
    drawScore();
    reserva = new Reserva();
    lifes = new Vida();
    console.log(lifes)
    gameLoop = setInterval(run, 1000/FPS);
  }

  window.addEventListener("keydown", function (e) {
    if (e.key === 'o') {
      clearInterval(gameLoop);
    }
    if (e.key === 'p') {

    }
  })

  window.addEventListener("mousedown", function(event) {
    if(event.target.className === 'foco-incendio'){
      //console.log(reserva.element)
      //console.log(focos)
      // REMOVE INCENDIO FROM MAP
      //event.target.remove()
      console.log(focos.indexOf(event.target))
      score += 10;
      drawScore();
      return
    }
    else{
      console.log('Não clicou no incendio')
    }
    console.log(reserva.element)
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
      //console.log(this.element.style.width , this.element.style.height)
      //console.log(this.element.style.left , this.element.style.top)
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
    constructor () {
      //scoreElement = document.getElementById("score");
      this.element = document.createElement("life");
      this.element.className = "vida";
      this.element.style.backgroundRepeat = "no-repeat";
      this.element.style.width = `100px`;
      this.element.style.height = `100px`;
      document.body.appendChild(this.element);
    }
  }

  function drawScore () {
    let scoreElement = document.getElementById("score");
    let context = scoreElement.getContext("2d");
    // clear draw
    scoreElement.getContext("2d").clearRect(0, 0, scoreElement.width, scoreElement.height)
    
    context.font = "25px Arial";
    context.fillStyle = "#FFFFF";
    context.fillText("Score: " + score, 1000, 20);
  }

  function run () {
    if (Math.random() * 100 < probFoco) {
      let foco = new FocoIncendio();
      focos.push(foco);
      //console.log(focos);
    }
    if (Math.random() * 100 < probCaveira) {
      let caveira = new CaveiraFogo();
      caveiras.push(caveira);
      console.log(caveira)
    }
    
  }

  init();
})();
