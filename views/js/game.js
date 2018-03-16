;(function(){


  var _valorp = 10;
  var _valorTotal = 0;
  var _tiempoTotal = 0;

  class Random{
    static get(inicio, final){
      return Math.floor(Math.random() * final ) + inicio
    }
  }

  class Puntuacion{
    /*static get(inicio, final){
      return Math.floor(Math.random() * final ) + inicio
    }*/
    constructor(){

    }

    setPuntuacion(){
      //console.log('cambiar texto')
      score.innerHTML = '<h1 class="text_puntuacion">' + _valorTotal + '</h1>';
    }
  }



  class Food{
    constructor(x,y){
      this.x = x
      this.y = y
      this.width = 10
      this.height = 10
    }
    draw(){
      ctx.fillRect(this.x, this.y, this.width,this.height)
    }

    static generate(){
      return new Food(Random.get(0,500), Random.get(0,300))
    }
  }

  class Square{
    constructor(x,y){
      this.x = x
      this.y = y
      this.width = 10
      this.height = 10
      this.back = null //cuadrado trasero 
    }
    draw(){
      ctx.fillRect(this.x, this.y,this.width,this.height)     
      if (this.hasBack()) {
        this.back.draw()
      }
    }

    add(){
      
      if ( this.hasBack() ) {   
        return this.back.add()
      }
      this.back = new Square(this.x, this.y)
    }

    hasBack(){
      return this.back !== null
    }

    copy(){
      if (this.hasBack()) {       
        this.back.copy()
        this.back.x = this.x
        this.back.y = this.y
      }
    }

    right(){
      this.copy()
      this.x += 10
    }
    left(){
      this.copy()
      this.x -= 10
    }
    up(){
      this.copy()
      this.y -= 10
    }
    down(){
      this.copy()
      this.y += 10
    }

    hit(head,segundo=false){

      if (this === head && !this.hasBack()) return false
      if (this === head) return this.back.hit(head,  true)  

      if (segundo && !this.hasBack()) return false
      if (segundo) return this.back.hit(head)
                
      if (this.hasBack()) {
        return squareHit(this, head) || this.back.hit(head)
      }
        
      return squareHit(this, head) 
    }
    hitBorder(){
      return this.x > 490 || this.x < 0 || this.y > 290 || this.y < 0
        
    }
  }

  class Snake{
    constructor(){
      this.head = new Square(100,0)
      this.draw()
      this.direction = "right"
      this.head.add()
      this.head.add()
      this.head.add()
      this.head.add()
      this.head.add()
      this.head.add()
    }

    draw(){
      this.head.draw()
    }

    right(){
      if (this.direction === "left") return;
      this.direction = "right"
    }

    left(){
      if (this.direction === "right") return;
      this.direction = "left"
    }

    up(){
      if (this.direction === "down") return;
      this.direction = "up"
    }

    down(){
      if (this.direction === "up") return;
      this.direction = "down"
    }

    move(){
      if (this.direction === "up") return this.head.up()
      if (this.direction === "down") return this.head.down()
      if (this.direction === "left") return this.head.left()
      if (this.direction === "right") return this.head.right()
    }

    eat(){
      _valorTotal = _valorTotal + _valorp
      puntuacion.setPuntuacion()
      this.head.add()
    }

    dead(){
      return this.head.hit(this.head) || this.head.hitBorder() 
      
    }
  }

  const canvas = document.getElementById('canvas')
  const score = document.getElementById('puntuacion')
  document.getElementById("btn_volver_jugar").onclick = function () { 
    console.log("onclick volver a jugar")
    location.reload(true);
   };

  const ctx= canvas.getContext('2d')
  const t1 = new Date();

  ctx.fillStyle = 'white';
  
  const snake = new Snake()
  let foods = []
  var points = 0 
  const puntuacion = new Puntuacion()
  puntuacion.setPuntuacion()



 window.addEventListener("keydown",function(ev){  
    
    if( ev.keyCode > 36 && ev.keyCode < 41) ev.preventDefault()

    if (ev.keyCode === 40) return snake.down()
    if (ev.keyCode === 39) return snake.right()
    if (ev.keyCode === 38) return snake.up()
    if (ev.keyCode === 37) return snake.left()

    return false
    
  })

  function calcularDiasAusencia(fechaIni, fechaFin) {
    var diaEnMils = 1000 * 60 * 60 * 24,
        desde = new Date(fechaIni.substr(0, 10)),
        hasta = new Date(fechaFin.substr(0, 10)),
        diff = hasta.getTime() - desde.getTime() + diaEnMils;// +1 incluir el dia de ini
    return diff / diaEnMils;
  }



  function GamerOver(){

    var t2 = new Date()
      var intervalo = t2 - t1;

          //console.log(' tiempo:')
          //console.log(' ' + secondsToTime(intervalo).substr(3,5))

          _tiempoTotal = secondsToTime(intervalo).substr(3,5)


          document.getElementById('div_puntuacion').innerHTML = '<h4>' + _valorTotal + '</h4>';
          document.getElementById('div_tiemtpo').innerHTML = '<h4>' + _tiempoTotal + '</h4>';

          guardarResul();

      $('#modalp').modal('show'); 
  }
  
  function getRandomArbitrary(min, max) {
    return Math.round( Math.random() * (max - min) + min);
  }
  function guardarResul(){
     var myArray = [];
     var myVar =  {'nombre': getRandomArbitrary(0,9999), 'puntaje':_valorTotal,'tiempo': _tiempoTotal };

      var stored = localStorage['KEY_MIS_RESULTADOS'];
       if (stored){
          myArray = JSON.parse(stored);
       }

       if (myArray.length > 4 ){
          myArray.splice(myArray.length-1, 1);
       }
       myArray.push(myVar)

       console.log(myArray.length)

      localStorage['KEY_MIS_RESULTADOS'] = JSON.stringify(myArray);
  }

  const animacion = setInterval(function(){
    snake.move()
    ctx.clearRect(0,0,canvas.width, canvas.height)
    snake.draw()
    drawFood()
    if (snake.dead()) {
      //alert("GAME OVER!");
          console.log(' GamerOver')
          GamerOver()
      window.clearInterval(animacion)
    }
  },1000/ 5)

  setInterval(function(){
    const food = Food.generate()
    foods.push(food)

    setTimeout(function(){
      removeFromFoods(food)
    },10000)

  },4000)


  function drawFood(){
    for (const index in foods) {
      const food = foods[index] 
      if (typeof food !== "undefined"){
        food.draw() 
        if (hit(food,snake.head)) {
          snake.eat()
          removeFromFoods(food)
        }
      }   
    }
  }



  function removeFromFoods(food){
    foods = foods.filter(function(f){
      return food !== f 
    })
  }

  function squareHit(cuadrado_uno, cuadrado_dos){
    return cuadrado_uno.x == cuadrado_dos.x && cuadrado_uno.y == cuadrado_dos.y
  }

  function hit(a,b){
    var hit = false
    if(b.x + b.width >= a.x && b.x < a.x + a.width){
      if(b.y + b.height >= a.y &&  b.y < a.y + a.height){
       hit=true
      }
    }
    if(b.x <= a.x && b.x + b.width >= a.x + a.width){
      if(b.y <= a.y && b.y + b.height >= a.y + a.height){
       hit=true
      }
    } 
    if(a.x <=b.x && a.x + a.width >= b.x + b.width){
      if(a.y <= b.y && a.y + a.height >= b.y + b.height){
       hit = true
      }
    }
     return hit
  }

  var secondsToTime = function (s) {

    function addZ(n) {
      return (n<10? '0':'') + n;
    }

    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var hrs = (s - mins) / 60;

    return addZ(hrs) + ':' + addZ(mins) + ':' + addZ(secs)+ '.' + addZ(ms);
  }




})()