// http://localhost:8000/products
let API = "http://localhost:8000/products";

let section_add = document.querySelector(".section__add");
let clickAdmin = document.getElementById("open-admin");
let admin_panel_arr = document.getElementsByClassName("admin-panel");
let code = "";
// console.log(section_add, clickAdmin);

// input and btns for new data
let inpDetails = document.querySelector(".section__add_details");
let inpPrice = document.querySelector(".section__add_price");
let inpQuantity = document.querySelector(".section__add_quantity");
let inpSales = document.querySelector(".section__add_sales");
let inpCategory = document.querySelector(".section__add_category");
let inpUrl = document.querySelector(".section__add_url");
let btnAdd = document.querySelector(".section__add_btn-add");
let accordion = document.querySelector(".accordion__header");
let accordionBody = document.querySelector("#accordion__body");
// console.log(
//   inpDetails,
//   inpPrice,
//   inpQuantity,
//   inpSales,
//   inpCategory,
//   inpUrl,
//   btnAdd,
//   accordion
// );

function adminReturn() {
  if (code == "12") {
    section_add.style.display = "block";
  }
}

clickAdmin.addEventListener("click", () => {
  code = prompt("Введите кодовое слово: ");
  adminReturn();
});

// тег для отображения  данных в браузере
let sectionRead = document.getElementById("section__read");
// console.log("section__read");

//! ===== ACCORDION START =======

accordion.addEventListener("click", () => {
  accordion.classList.toggle("active");
  let accordionBody = document.getElementById("accordion__body");
  if (accordion.classList.contains("active")) {
    accordionBody.style.maxHeight = accordionBody.scrollHeight + "px";
  } else {
    accordionBody.style.maxHeight = 0;
  }
});

// ? ACCORDION END

// ! CREATE START

async function createProduct(obj) {
  await fetch(API, {
    method: "POST",
    headers: {
      "Content-type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(obj),
  }).then((res) => res.json);
}

btnAdd.addEventListener("click", () => {
  if (
    !inpDetails.value.trim() ||
    !inpQuantity.value.trim() ||
    !inpPrice.value.trim() ||
    !inpCategory.value.trim() ||
    !inpSales.value.trim() ||
    !inpUrl.value.trim()
  ) {
    alert("Write someone!");
    return;
  }
  let obj = {
    details: inpDetails.value,
    price: inpPrice.value,
    quantity: inpQuantity.value,
    category: inpCategory.value,
    sale: inpSales.value,
    urlImg: inpUrl.value,
  };
  createProduct(obj);
  inpDetails.value = "";
  inpPrice.value = "";
  inpQuantity.value = "";
  inpCategory.value = "";
  inpSales.value = "";
  inpUrl.value = "";
});

// ! ===============   READ START     ============================

async function readProducts() {
  let data = await fetch(API).then((res) => res.json());
  // console.log(data);
  sectionRead.innerHTML = "";
  data.forEach((item) => {
    // let productCard = document.createElement("div")
    sectionRead.innerHTML += `
    <div class="card">
    <div class="card2">
    <div class="front2"
    style="background-image: url(${item.urlImg})"></div>
    <div class="back2">
    <div id="card-details2">
    <p> ${item.details}</p>
    <p> ${item.price} сом</p>
    <p> скидка ${item.sale} %</p>
    <p> ${item.quantity}</p>
    </div>
    </div
    <div class="text">
    <h2>${item.category}</h2>
    <span class="card_price">Цена:${item.price} Сом</span>
    <br />
    <span class="card_sale">Скидка:${item.sale} Сом</span>
    </div>
    <div class="userIcon" id="userPanel">
    <img src="https://cdn-icons-png.flaticon.com/512/2107/2107956.png" alt="" width="20px";/>
    <button class=""btnBuy>Выбрать</button>
    </div>
    <div class="admin-panel" id="admin">
    <img src ="https://cdn-icons-png.flaticon.com/512/1799/1799391.png" width="20px" />
    <img src ="https://www.freeiconspng.com/thumbs/edit-icon-png/edit-new-icon-22.png" width="20px"/>
    </div>
    </div>
    </div>`;
  });
}
readProducts();
