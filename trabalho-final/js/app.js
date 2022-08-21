async function getGuest () {
    return await (await fetch('https://cors-anywhere.herokuapp.com/https://hostel-app-back-end-api.herokuapp.com/customers')).json();
}

let guests = [];
const tBody = document.querySelector(".conteudo");
let currentPage = 1;
let totalRecords = 10;

(async () => {
    console.log("teste");
    const data = await getGuest()
     for (let index = 0; index < data.length; index++) {
         const element = data[index];
         let tr = document.createElement("tr")
         tr.innerHTML = `<td>${element.id}</td><td>${element.firstName}</td><td>${element.lastName}</td><td>${element.emailAddress}</td><td>${element.address}</td><td>${element.country}</td><td>${element.state}</td><td>${element.phoneNumber}</td>`
         guests.push(tr)
     }
    changePage(currentPage);
})();

function previousPage () {
    if (currentPage > 1) {
        currentPage--;
        changePage(currentPage);
    }
}

function nextPage () {
    if (currentPage < totalRecords) {
        currentPage++;
        changePage(currentPage);
    }
}

function changePage (page) {
    let btnNext = document.querySelector(".next");
    let btnPrevious = document.querySelector(".prev");
    let btnPageNumber = document.querySelector(".page-number");

    // validate
    if (page < 1) {
        page = 1;
    }

    if (page > numPages()) {
        page = numPages();
    }

    //removendo todos os elementos da tabela
    while (tBody.firstChild) {
        tBody.removeChild(tBody.firstChild);
    }
    //adicionando os elementos na tabela
    for (let index = (page - 1) * totalRecords; index < (page * totalRecords); index++) {
        if (guests[index]) {
            tBody.appendChild(guests[index]);
        }
    }

    //mostrar o número da página atual
    btnPageNumber.innerHTML = page;


    //atualizando o botão de próxima paginação
    if (page === 1) {
        btnPrevious.style.visibility = "hidden";
    } else {
        btnPrevious.style.visibility = "visible";
    }
    console.log("teste"+numPages()+"page"+page)
    if (page === numPages()) {
        btnNext.style.visibility = "hidden";
    } else {
        btnNext.style.visibility = "visible";
    }

}

function numPages () {
    console.log(guests.length);
    return Math.ceil(guests.length / totalRecords);
}

const btnPesquisar = document.querySelector(".btn-search");
btnPesquisar.addEventListener("click", searchGuest);

async function searchGuest() {
    const filterInput = document.querySelector(".search").value;
    while (tBody.firstChild) {
        tBody.removeChild(tBody.firstChild);
    }

  if (filterInput.length === 0) {
    changePage(1)
    return;
  }
  
  const guest = await getGuest();
  const filteredGuest = guest.filter((guest) => {
    return guest.firstName.toLowerCase().includes(filterInput.toLowerCase());
  });

  console.log(filteredGuest);
  let btnNext = document.querySelector(".next");
  let btnPageNumber = document.querySelector(".page-number");
  let btnPrevious = document.querySelector(".prev");
  for (let index = 0; index < filteredGuest.length; index++) {
      const show = filteredGuest[index];
      let tr = document.createElement("tr");
      // remove os elementos da tabela e adiciona os elementos filtrados
      tr.innerHTML = `<td>${show.id}</td><td>${show.firstName}</td><td>${show.lastName}</td><td>${show.emailAddress}</td><td>${show.address}</td><td>${show.country}</td><td>${show.state}</td><td>${show.phoneNumber}</td>`;
      tBody.appendChild(tr);
    }
    //substitui o número da página atual por 1
    btnPageNumber.innerHTML = 'Back';
    // trocar link
    btnPageNumber.href = 'hospedes.html';
    btnNext.style.visibility = "hidden";
    btnPrevious.style.visibility = "hidden";
}


    

    // return guests.filter(item => item.firstName.toUpperCase == filter)

    // for (let i = 0; i < guests.length; i++) {
    //     let td = guests[i].getElementsByTagName("td")[0];
    //     if (td) {
    //         if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
    //             guests[i].style.display = "";
    //         } else {
    //             guests[i].style.display = "none";
    //         }
    //     }
    // }



