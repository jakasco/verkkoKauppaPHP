//ADMIN PANEELIN LISÄYS FUNKTIOT

const dbLisaa = document.getElementById("lisaaTietokantaan");
const nimi = document.getElementById("dbnimi");
const tiedot = document.getElementById("dbtiedot");
const varastossa = document.getElementById("dbvarastossa");
const hinta = document.getElementById("dbhinta");


//testaa onko kentässä int
const isInt = (value) => {
return !isNaN(value) &&
       parseInt(Number(value)) == value &&
       !isNaN(parseInt(value, 10));
}

const testaa = () => {
  let val = isInt(varastossa.value);
  let val2 = isInt(hinta.value);
  //palautetaan true jos ei ole virheitä kenttien täytössä
  let errorList = [true];

  if(nimi.value == ""){
    errorList.push("Nimi kenttä tyhjä!");
    errorList[0] = false;
  }
  if(tiedot.value == ""){
    errorList.push("Tuotetiedot kenttä tyhjä!");
    errorList[0] = false;
  }
  if(varastossa.value == ""){
    errorList.push("Varastossa kenttä tyhjä!");
    errorList[0] = false;
  }
  if(val == false){
    errorList.push("Varastossa kenttään pitää laittaa numero!");
    errorList[0] = false;
  }
  if(hinta.value == ""){
    errorList.push("Hinta kenttä tyhjä!");
    errorList[0] = false;
  }
  if(val2 == false){
    errorList.push("Hinnan pitää olla numero!");
    errorList[0] = false;
  }

 return errorList; //lista kaikista virheistä mitä kentissä on. Jos [0] = true, voidaan jatkaa tietokantaan
}

//lisää tuote tietokantaan
const lisaa = () => {

    const errorList = testaa();
    //jos kentissä ei ole vikaa, niin jatketaan tietokantaan
    if(errorList[0]==true){
    console.log(nimi.value+","+tiedot.value+","+varastossa.value+","+hinta.value);
    let data = {nimi: nimi.value, tiedot: tiedot.value, varastossa: varastossa.value, hinta: hinta.value};
    console.log(data);
    fetch('http://localhost/my_app_name/webroot/lisaaTuote.php', {
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
             console.log("Response: "+response);
             kaikkiTuotteet(); //pävitetään lista
         })
    }else{//jos kentissä on vikaa
      alert(errorList);
    }
}

dbLisaa.addEventListener("click",lisaa);
