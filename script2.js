$(document).ready(function(){
    let id=localStorage.getItem('id').slice(7)
    //console.log(id)
  
    let url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    fetch(url)
    .then( res => {
      return res.json();
    })
    .then( data =>{
      pokemon = {};
      pokemon['name'] = data.name;
      pokemon['id'] = data.id;
      pokemon['image'] = data.sprites['front_default'];
      pokemon['type'] = data.types.map((type) => type.type.name);
  
      $(`#poke-container-2`).html(
      `<a href = "index2.html">
      <div class='card' id="${pokemon['name']}">
      ${pokemon['name']}
      </br>
      <img src="${pokemon['image']}" />
      </div>
      </a>`
      )
    })
  })