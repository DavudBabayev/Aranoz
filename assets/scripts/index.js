const menu = document.querySelector(".bi-list");

const navMenu = document.querySelector(".nav-menu");

menu.addEventListener("click", () => {
  if (navMenu.style.top === "-500px") {
    navMenu.style.top = " 90px";
  } else {
    navMenu.style.top = "-500px";
  }
});
window.addEventListener("resize", () => {
  if (window.innerWidth > 991) {
    navMenu.style.top = "-500px";
  }
})

//showdata

let bottom = document.querySelector(".botom");
let searchInput = document.querySelector(".search");
let url = (`http://localhost:3000/data/`);
let favurl = ('http://localhost:3000/fav/');
let filteredArr = [];
let sorted = "descending";
let sortBtn = document.querySelector(".sort");
let coppy = [];
let page = 8;
let loadBtn = document.querySelector(".load");
async function showData() {
  let res = await axios.get(url);
  let data = await res.data;
  coppy = data;
  bottom.innerHTML = '';
  filteredArr = filteredArr.length || searchInput.value ? filteredArr : data;
  filteredArr.slice(0, page).map(element => {
    bottom.innerHTML +=
      `<div class="product">
    <div class="image">
        <img src="${element.image}" alt="product">
    </div>
    <div class="desc">
       <a href="./details.html?id=${element.id}"> <h1>${element.name}</h1></a>
        <span>$${element.priz}</span>
        <div class="action">
      <span>  <i class="bi bi-arrow-clockwise" onclick="updateCard(${element.id})"></i> </span>

            <i class="bi bi-heart" onclick="favCard(${element.id})"></i>
            <i class="bi bi-trash" onclick="deleteCard(${element.id})"></i>
        </div>
    </div>
</div> `
  })

}
showData();


searchInput.addEventListener("input", function (e) {
  filteredArr = coppy;
  filteredArr = filteredArr.filter((el) =>
    el.name.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())
  );
  showData();
});


sortBtn.addEventListener("click", function () {
  console.log(filteredArr);
  if (sorted === "ascending") {
    filteredArr.sort((a, b) => b.priz - a.priz);
    sorted = "descending";
    sortBtn.innerHTML = "Sort Ascending";
  } else if (sorted === "descending") {
    filteredArr.sort((a, b) => a.priz - b.priz);
    sorted = "def";
    sortBtn.innerHTML = "Sort Descending";
  } else {
    filteredArr=coppy;
    sorted = "ascending";
    sortBtn.innerHTML = "Sort";
  }
  showData();
});

function morless() {
  if (page >= coppy.length) {
    loadBtn.innerHTML = "Show Less"
  } else {
    loadBtn.innerHTML = "Load More"
  }
}

function show() {
  if (loadBtn.innerHTML == "Show Less") {
    page = 4
  } else {
    page += 4
  }
}

loadBtn.addEventListener("click", () => {
  show()
  morless()
  showData()
});
//delete
function deleteCard(id) {
  axios.delete(url + id);
  axios.delete(favurl + id);
  window.location.reload()
}
//fav
async function favCard(id) {
  if (event.target.classList.contains("bi-heart")) {
    event.target.classList.remove("bi-heart");
    event.target.classList.add("bi-heart-fill")

    axios.get(url + id).then(res => {
      return res.data
    }).then(res => {
      axios.get(favurl).then(response => {
        let aydi = response.data.find(find => find.id === response.id);
        if (!aydi) {
          axios.post(favurl, res)
        } else {
          axios.delete(favurl + id)
        }
      })
    })
  }
  else {
    event.preventDefault();
    event.target.classList.remove('bi-heart-fill');
    event.target.classList.add('bi-heart');
    axios.delete(favurl + id)
  }
}
//edit
let file = document.querySelector("#file");
let form = document.querySelector(".form");
let img2 = document.querySelector("#img2");
let closeB = document.querySelector(".bi-x");
let name1 = document.querySelector("#name");
let editB = document.querySelector(".editB");
let pen = document.querySelector(".bi-arrow-clockwise");
let price=document.querySelector("#price");

file.addEventListener("change", () => {
  let src = file.files[0]
  let reader = new FileReader();
  reader.readAsDataURL(src);
  reader.onload = function (e) {
    img2.src = e.target.result
  }
})


closeB.addEventListener("click", () => {
  editB.style.display = "none";
})

function updateCard(id) {
  editB.style.display = "block"
  axios.get(url + id).then(res => {
    name1.value = res.data.name;
    price.value = res.data.priz;
    img2.src = res.data.image;
  })
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    axios.get(url + id).then(res => {
      name1.value = res.data.name;
      price.value = res.data.priz;
      img2.src = res.data.image;

    })
    let src2 = file.files[0];
    let reader2 = new FileReader();
    reader2.onload = (e) => {
      let obj = {
  image:e.target.result,
  priz:price.value,
  name:name1.value

      }
      axios.patch(url + id, obj).then(res => console.log(res.data))
    }
    reader2.readAsDataURL(src2)
  });
}

let scrolBtn=document.querySelector(".topAr");
window.addEventListener("scroll",()=>{
  if (window.scrollY > 50) {
    scrolBtn.style.right = "10px";
  } else {
    scrolBtn.style.right = "-50px";
  }
})


scrolBtn.addEventListener("click",()=>{
  window.scrollTo({
    top:0,
    behavior:"smooth"
  })})