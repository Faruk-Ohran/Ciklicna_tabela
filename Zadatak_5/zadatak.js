var kreiraj = document.querySelector('#kreiraj');

kreiraj.onclick = function napraviTabelu(){
  let br_redaka = parseInt(document.querySelector("#br_redakaID").value);
  let br_stupaca = parseInt(document.querySelector("#br_stupacaID").value);

  ocistiTabelu();
  ispisiTabelu(napraviSpiralu(br_redaka,br_stupaca));
  normalnaPozicija();
  
}

function ispisiTabelu(grid){
  let br_s = parseInt(document.querySelector("#br_stupacaID").value);
  let id = 1;
  for (let i=0;i<grid.length;i++){
    //console.log(grid[i].join(' '));
    for (let j=0;j<br_s;j++){
      let elemnet = document.querySelector('#Novibroj'+id);
      elemnet.innerHTML = grid[i][j];
      if (elemnet.innerHTML==1){
      elemnet.style.backgroundColor = 'black';
      elemnet.style.color = 'white';
      }
      id++;
     }
  } 
}

function napraviKockice(br_r,br_s){
  const grid = [];
  let ID = 1;
  let id = 1;
  for (let i=0;i<br_r;i++){
    grid[i] = [];
    let red = document.createElement('div');
    red.setAttribute('class','noviRed');
    red.id = 'noviRed'+ID;
    document.querySelector('#tablica').append(red);
    for (let j=0;j<br_s;j++){
      let kolona = document.createElement('div');
      kolona.setAttribute('class','novibroj');
      kolona.id = 'Novibroj'+id;
      document.querySelector('#noviRed'+ID).append(kolona);
      id++;
    }
    ID++;
  }
  return grid;
}

function napraviSpiralu(br_r,br_s){
  const spirala = napraviKockice(br_r,br_s);
  let currentNumber = 1;
  let i = 0;
  let j = 0;
  let di = 0;
  let dj = 1;

  while (currentNumber <= br_r*br_s){
    spirala[i][j] = currentNumber++;
    
     
    if (j+dj===br_s || i+di===br_r || j+dj===-1 || spirala[i+di][j+dj]){
      const tempDi = di;
      di = dj;
      dj = -tempDi;
    }
    i+=di;
    j+=dj;
  }
  return spirala;
}

function okreniTabelu(){
  let element = document.querySelector('#tablica');
  let br_redaka = parseInt(document.getElementById("br_redakaID").value);
  let br_stupaca = parseInt(document.getElementById("br_stupacaID").value);
  let kockica = br_redaka*br_stupaca;

  if (element.className === "normal") {
    element.className = "rotate1";
    for (let i=1;i<=kockica;i++){
    document.querySelector('#Novibroj'+i).style.transform = 'rotate(270deg)';
    }
  }
  else if ( element.className === "rotate1") {
    element.className = 'rotate2';
    for (let i=1;i<=kockica;i++){
      document.querySelector('#Novibroj'+i).style.transform = 'rotate(180deg)';
      }
  }
  else if ( element.className === "rotate2") {
    element.className = 'rotate3';
    for (let i=1;i<=kockica;i++){
      document.querySelector('#Novibroj'+i).style.transform = 'rotate(90deg)';
      }
  }
  else if ( element.className === "rotate3") {
    element.className = 'normal';
    for (let i=1;i<=kockica;i++){
      document.querySelector('#Novibroj'+i).style.transform = 'rotate(0deg)';
        }
      }
  }

  function okreni(){
  let br_redaka = parseInt(document.getElementById("br_redakaID").value);
  let br_stupaca = parseInt(document.getElementById("br_stupacaID").value);
   
  if (br_redaka == br_stupaca){
  okreniTabelu();
  }
  else {
    if (confirm(
    `Ako rotirate tabelu zamijenit ćete broj redova i stupaca, 
    želite li nastaviti?`)) {
      okreniTabelu();
    } 
  }
}

function normalnaPozicija(){
  let element = document.querySelector('#tablica');
  let br_redaka = parseInt(document.getElementById("br_redakaID").value);
  let br_stupaca = parseInt(document.getElementById("br_stupacaID").value);
  let kockica = br_redaka*br_stupaca;

  element.className = "normal";
    for (let i=1;i<=kockica;i++){
    document.querySelector('#Novibroj'+i).style.transform = 'rotate(0deg)';
    }
}

function ocistiTabelu(){
  $('#tablica').empty();
}
//validacija
$.validator.addMethod(
    "regex",
    function(value,element,regexp){
        return this.optional(element)||regexp.test(value);
    },
    "Unos nije validan!"
);

$("#forma").validate({
  rules:{
      br_redaka:{
        required: true,
        regex: /^[0-9]$/
      },
      br_stupaca:{
        required: true,
        regex: /^[0-9]$/
    }
  },

  messages:
  {
      br_redaka:{
          required: "Obavezno polje!",
          regex: "Unesite jednocifren broj!"
      },
      br_stupaca:{
        required: "Obavezno polje!!",
        regex: "Unesite jednocifren broj!"
    }
  }
});