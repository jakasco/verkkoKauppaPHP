const yht = document.getElementById("yht");
const addBtn = document.getElementById("add");
const ostosKori = document.getElementById("ostoskoriUl");

//ostosten hinta yhteensä
let summa = 0;

//haeteaan tuotteen hinta ja nimi tuote taulusta
const haeHintaJaNimi = (id) => {

  let data = {tuoteId: id};
  fetch('http://localhost/my_app_name/webroot/HintaJaNimi.php', {
  method: 'POST',
  body: JSON.stringify(data),
  headers:{
    'Content-Type': 'application/json'
  }
   }).then(function(response) {
           if (response.status >= 200 && response.status < 300) {
               return response.json();
           }
           throw new Error(response.statusText)
       })
       .then(function(response) {
           console.log("Hinta ja nimi: ",response);
           lisaaUl(response);
       })
}

//yhteensä hinnasta vähennetään kun tuote poistetaan
const poisHintaJaNimi = (id) => {
  let data = {tuoteId: id};
  fetch('http://localhost/my_app_name/webroot/HintaJaNimi.php', {
  method: 'POST',
  body: JSON.stringify(data),
  headers:{
    'Content-Type': 'application/json'
  }
   }).then(function(response) {

           if (response.status >= 200 && response.status < 300) {
               return response.json();
           }
           throw new Error(response.statusText)
       })
       .then(function(response) {
           console.log("Pois Hinta ja nimi: ",response);
           summa -= +response[0].hinta;
             yht.innerHTML = "Yhteensä: "+summa+"€";
       })
}


const laitaOstosKoriin = (id) => {

  let data = {tuoteId: id};

  fetch('http://localhost/my_app_name/webroot/ostosKori.php', {
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
           if(response=="korissa"){
             alert("On jo korissa!");
           }else{
             console.log("Laitetaan koriin id "+response);
             haeHintaJaNimi(response);
           }
       })
}


//ostos korista tuote pois id:n mukaan
const otaPois = (id) => {

  let data = {tuoteId: id};

  fetch('http://localhost/my_app_name/webroot/poisKorista.php', {
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
           console.log("Pois: "+response);
           poisHintaJaNimi(response);
       })
}


//ostos koriin tuotteiden lisäys listana
const lisaaUl = (id) => {

  let mones = ostosKori.childNodes.length;
  const li = document.createElement("li");

  li.innerHTML = "id: "+id[0].id+", "+id[0].nimi+", "+id[0].hinta+"€";
  ostosKori.appendChild(li);

  summa += +id[0].hinta;
  yht.innerHTML = "Yhteensä: "+summa+"€";
  //poisto nappi tuotteeseen
    li.addEventListener('click', function() {
       $(this).remove();
      otaPois(id[0].id);
      });
}


//kun sivu avataan, niin generoidaan vanha ostoskori
const generoiOstoskori = (json) => {
    let pituus = json.length;
    for (let i=0; i<pituus; i++){
      haeHintaJaNimi(json[i].tuoteId);
    }
}
