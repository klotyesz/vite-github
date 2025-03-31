class Busz {
  constructor(tipus, menetido, allomas, uzemelteto, ar, id = null) {
    this.tipus = tipus;
    this.menetido = menetido;
    this.allomas = allomas;
    this.uzemelteto = uzemelteto;
    this.ar = ar;
    this.id = id;
  }


  static fromJSON(data) {
    return new Busz(
      data.tipus,
      data.menetido,
      data.allomas,
      data.uzemelteto,
      data.ar,
      data.id
    );
  }
}


class BuszTomb {
  constructor() {
    this.buszok = [];
  }


  addBusz(busz) {
    this.buszok.push(busz);
  }


  getAll() {
    return this.buszok;
  }


  deleteBusz(id) {
    this.buszok = this.buszok.filter(busz => busz.id !== id);
  }
}


const buszTomb = new BuszTomb();


buszTomb.addBusz(new Busz('Ikarus 280', 30, 12, 'BKV', 350, 1));
buszTomb.addBusz(new Busz('MAN Lion\'s City', 25, 10, 'Volánbusz', 400, 2));
buszTomb.addBusz(new Busz('Mercedes Benz Citaro', 20, 15, 'BKK', 450, 3));
buszTomb.addBusz(new Busz('Solaris Urbino', 35, 13, 'Zöldbusz', 380, 4));
buszTomb.addBusz(new Busz('Volvo 7900', 40, 11, 'Volánbusz', 420, 5));


const lista = (datas) => {
  document.getElementById("adatmegjelenites").innerText = "";
  const tablazat = document.createElement("table");
  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  const headerNames = ["Busz típusa", "Menetidő (perc)", "Állomások száma", "Üzemeltető", "Jegy ára (Ft)", "Törlés"];

  headerNames.forEach(name => {
    const th = document.createElement("th");
    th.textContent = name;
    headerRow.appendChild(th);
  });

  thead.appendChild(headerRow);
  tablazat.appendChild(thead);

  const tbody = document.createElement("tbody");
  datas.forEach(data => {
    const tr = document.createElement("tr");
    
    const tdTipus = document.createElement("td");
    tdTipus.textContent = data.tipus;
    tr.appendChild(tdTipus);
    
    const tdMenetido = document.createElement("td");
    tdMenetido.textContent = data.menetido;
    tr.appendChild(tdMenetido);
    
    const tdAllomas = document.createElement("td");
    tdAllomas.textContent = data.allomas;
    tr.appendChild(tdAllomas);
    
    const tdUzemelteto = document.createElement("td");
    tdUzemelteto.textContent = data.uzemelteto;
    tr.appendChild(tdUzemelteto);
    
    const tdAr = document.createElement("td");
    tdAr.textContent = data.ar;
    tr.appendChild(tdAr);
    
    const tdDelete = document.createElement("td");

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Törlés";
  
    deleteButton.addEventListener("click", async () => {
      buszTomb.deleteBusz(data.id);
      lista(buszTomb.getAll());
    });
  
    tdDelete.appendChild(deleteButton);
    tr.appendChild(tdDelete);
    
    tbody.appendChild(tr);
  });

  tablazat.appendChild(tbody);
  document.getElementById("adatmegjelenites").append(tablazat);
}


const adatfelvetel = async (e) => {
  e.preventDefault();
  
  const tipus = document.getElementById("tipus").value;
  const menetido = document.getElementById("menetido").value;
  const allomas = document.getElementById("allomas").value;
  const uzemelteto = document.getElementById("uzemelteto").value;
  const ar = document.getElementById("ar").value;

  const newBusz = new Busz(tipus, menetido, allomas, uzemelteto, ar, buszTomb.getAll().length + 1);

  buszTomb.addBusz(newBusz);
  lista(buszTomb.getAll());
}


const init = async () => {
  document.getElementById("felvetel").addEventListener("click", adatfelvetel);
  lista(buszTomb.getAll());
}

document.addEventListener("DOMContentLoaded", init);
