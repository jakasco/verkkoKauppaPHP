const grid = document.getElementById("tuoteLista");
const grid2 = document.getElementById("tuoteLista2");
const grid3= document.getElementById("tuoteLista3");


let amount;
const generate = (json) => {
  amount = json.length;
  for(let i=0; i<amount; i++){
      const item = document.createElement("div");
      item.id = "gridItem";
      item.innerHTML = json[i].nimi;
      grid.appendChild(item);
      item.addEventListener("click", function(){
          laitaOstosKoriin(i);
      });
  }

}
