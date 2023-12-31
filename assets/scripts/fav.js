let bottom=document.querySelector(".favorit")
let url= ('http://localhost:3000/fav');
let filterArr = [];
let coppy = [];
async function showData() {
let res = await axios.get(url);
let data = await res.data;
coppy=data;
console.log(data);
bottom.innerHTML='';
data.map(element=>{
  bottom.innerHTML+=
  `<div class="product">
  <div class="image">
      <img src="${element.image}" alt="product">
  </div>
  <div class="desc">
     <a href="./details.html?id=${element.id}"> <h1>${element.name}</h1></a>
      <span>$${element.price}</span>
      <div class="action">
          <i class="bi bi-trash" onclick="deletefavCard(${element.id})"></i>
      </div>
  </div>
</div> `
})

}
showData();

function deletefavCard(id) {
    axios.delete(url + id);
    window.location.reload()
  }