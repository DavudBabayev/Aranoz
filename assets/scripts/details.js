let id= new URLSearchParams (window.location.search).get("id");
let bottom = document.querySelector(".details");
let url = "http://localhost:3000/data/";


async function getCardById(id){
    let res = await axios.get(url + id);
    let element= await res.data

    bottom.innerHTML =
    `<div class="product">
    <div class="image">
        <img src="${element.image}" alt="product">
    </div>
    <div class="desc">
       <a href="./details.html?id=${element.id}"> <h1>${element.name}</h1></a>
        <span>$${element.price}</span>
    </div>
</div> `
}
getCardById(id);