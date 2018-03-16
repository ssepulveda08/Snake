;(function(){
    var myArray = [];
    const score = document.getElementById('tabla_puntuacion')

    var tabla   = document.getElementById("table_tupuntuacion");
  var tblBody = document.createElement("tbody");

        var stored = localStorage['KEY_MIS_RESULTADOS'];
       if (stored){
          myArray = JSON.parse(stored);

       }
        //for (int i=mensajes.length-1; i>=0;i--) {
       for (var i = myArray.length-1 ; i  >= 0; i--) {
           // Crea las hileras de la tabla
           var mm = myArray[i]
           console.log("-------------"+  mm.nombre )
          var hilera = document.createElement("tr");

         //'nombre': getRandomArbitrary(0,9999), 'puntaje':_valorTotal,'tiempo': _tiempoTotal };
       

            var celda1 = document.createElement("td");
            var textoCelda1 = document.createTextNode(mm.nombre);
            celda1.appendChild(textoCelda1);

            var celda2 = document.createElement("td");
            var textoCelda2 = document.createTextNode(mm.tiempo);
            celda2.appendChild(textoCelda2);


            var celda3 = document.createElement("td");
            var textoCelda3 = document.createTextNode(mm.puntaje);
            celda3.appendChild(textoCelda3);

            hilera.appendChild(celda1);
            hilera.appendChild(celda2);
            hilera.appendChild(celda3);
          
       
          // agrega la hilera al final de la tabla (al final del elemento tblbody)
          tblBody.appendChild(hilera);
       }  

       // posiciona el <tbody> debajo del elemento <table>
  tabla.appendChild(tblBody);
  // appends <table> into <body>
 // score.appendChild(tabla);
  // modifica el atributo "border" de la tabla y lo fija a "2";
  tabla.setAttribute("border", "2");      

       console.log("array"+ myArray.toString())




})()