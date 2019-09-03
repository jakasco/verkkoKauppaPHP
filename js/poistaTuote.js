const tuotteet = document.getElementById("tuoteLista");
const bt = document.getElementById("del");

//ADMIN PANEELIN TIETOKANTA KYSELYT

//haetaan kaikki tuotteet tieotkannasta
const kaikkiTuotteet = () => {
    fetch('http://localhost/my_app_name/webroot/kaikkiTuotteet.php', {
    method: 'POST',
     }).then(function(response) {
             if (response.status >= 200 && response.status < 300) {
                 return response.json();
             }
             throw new Error(response.statusText)
         })
         .then(function(response) {
            console.log("Response: ",response);
            generoiTuoteLista(response);
         })
}

//selection lista kaikista tuotteista
const generoiTuoteLista = (json) => {
    //resetetaan vanha
    while (tuotteet.firstChild) {
      tuotteet.removeChild(tuotteet.firstChild);
    }
      for(let i=0; i<json.length; i++){

          const op = document.createElement("option");
          op.innerHTML = json[i].nimi;
          op.id = i;
          tuotteet.appendChild(op);
      }
}

//poista tuote tietokannasta
const poista = () => {

  let data = {nimi: tuotteet.value};

  fetch('http://localhost/my_app_name/webroot/poistaTuote.php', {
    method: 'POST',
    body: JSON.stringify(data),
    headers:{
      'Content-Type': 'application/json'
    }
   }).then(function(response) {
           if (response.status >= 200 && response.status < 300) {
               return response.text();
           }
           throw new Error(response.statusText)
       })
       .then(function(response) {
          console.log(response + " poistettu tietokannasta");
          kaikkiTuotteet();
       })
}

kaikkiTuotteet(); //Kun sivu avataan niin päivitetään lista

bt.addEventListener("click",poista);
