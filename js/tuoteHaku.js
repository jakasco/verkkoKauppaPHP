const haku = document.querySelector('input');
const log = document.getElementById('log');
const hakuVaihtoEhdot = document.querySelector('select');
const eiLoydy = document.getElementById("eiLoydy");
const nuolet = document.getElementById("nuolet");

const muokkaaJson = (json, valinta) => {
  json.sort(function(a, b){
    return a.valinta - b.valinta;
  });
}

//millä perusteella hakutulokset lajitellaan
const lajittele = (json) => {
  console.log("Tuotteet : ",json);
  if(hakuVaihtoEhdot.value=="nimi"){
      json.sort(function(a, b){
        return b.nimi - a.nimi;
      });
  }else if(hakuVaihtoEhdot.value=="varastossa"){
    json.sort(function(a, b){
      return b.varastossa - a.varastossa;
    });
  }else if(hakuVaihtoEhdot.value=="arvostelu"){
    json.sort(function(a, b){
      return b.hinta - a.hinta;
    });
  }
  return json;
}

//Tuote listan generoimiseen haun jälkeen
const generate2 = (json) => {

let maara = document.getElementById("tuoteLista").childElementCount;

  //piilotetaan muut sivut jos on alle 9 tuotetta haulla
  if(json.length < 9){
    nuolet.style.display = "none";
  }else{
    nuolet.style.display = "block";
  }
  //missä järjestykssä tuotteet näytetään
  json = lajittele(json);
  //tyhjennetään gridit
  while (grid.firstChild) {
    grid.removeChild(grid.firstChild);
  }
  while (grid2.firstChild) {
    grid2.removeChild(grid2.firstChild);
  }
  while (grid3.firstChild) {
    grid3.removeChild(grid3.firstChild);
  }

  //gridin luomiseen matriisi 3x3
  let num = 0;
  let maxNum = 9;

for(let j=0; j<3; j++){
  for(let i=num; i<maxNum; i++){
      const item = document.createElement("div");
      item.id = "gridItem";
      //täytetään tyhjät kentät
      if(i<json.length){
      item.innerHTML = "<div><h1>"+json[i].nimi+"</h1> Tuote id: "+json[i].id+"</div><div>Tuotetiedot: "+json[i].description+"</div><div>Varastossa: "+json[i].varastossa+"</div><div>Hinta: "+json[i].hinta+"€</div><div><button id='b'"+i+j+">Laita Ostoskoriin</button></div>";
      item.addEventListener("click", function(){
          laitaOstosKoriin(json[i].id);
      });
      }else{
      //tyhjät kentät kun ei ole tuotteita
      item.innerHTML = "<div id='hid' style='color: white;'><h1>No item</h1></div><div id='hid'>No item</div><div id='hid'>No item</div><div id='hid'>No item</div><div id='hid'>No item</div>";
      }
      //mihin gridiin laitetaan
      if(j==0){
        grid.appendChild(item);
      }else if(j==1){
        grid2.appendChild(item);
      }else if(j==2){
        grid3.appendChild(item);
      }
      num++;
  }
  maxNum += 9;
}

}

//kun sivu avataan, haetaan 30 random tuotetta tietokannasta
const randomTuotteet = () => {
  fetch('http://localhost/my_app_name/webroot/randomTuotteet.php', {
  method: 'POST',
   }).then(function(response) {
           if (response.status >= 200 && response.status < 300) {
              console.log(response);
               return response.json(); //MUUTA json
           }
           throw new Error(response.statusText)
       })
       .then(function(response) {
         let bool = true;
         try{ //jos ei ole tuotteita tietokannassa
           if(response.Tuotteet == 0){
           bool = false;
          }
         }catch{}
         if(bool==true){
          generate2(response);
        }
      })
}

//etsitään tuote id:n tai nimen mukaan
const etsi = () => {

  let val = haku.value;
  let data = {haku: val};

  fetch('http://localhost/my_app_name/webroot/tuoteHaku.php', {
  method: 'POST',
  body: JSON.stringify(data),
  headers:{
    'Content-Type': 'application/json'
  }
   }).then(function(response) {

           if (response.status >= 200 && response.status < 300) {
               return response.json(); //MUUTA json
           }
           throw new Error(response.statusText)
       })
       .then(function(response) {

         let bool = true;
         try{ //jos ei ole tuotteita tietokannassa
           console.log("Ei löydy haulla tätä tuotetta!");
           if(response.Tuotteet == 0){
          eiLoydy.style.display = "block";
           bool = false;
          }
         }catch{}
         if(bool==true){
           eiLoydy.style.display = "none";
          generate2(response);
        }
       })
       //jos hakukenttä on tyhjä
  if(val==""){
    console.log("Resetoi gridi");
    randomTuotteet();
  }
}

haku.addEventListener("keyup", etsi);

randomTuotteet(); //kun sivu avataan
