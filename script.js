// https://pokeapi.co/api/v2/pokemon?limit=964


$(document).ready(function(){
  $("#search-btn").click(function(){
    $('#poke-container').text(``)
      var radioValue = $("input[name='radio']:checked").val(); 
      //console.log(radioValue)
      for (let id=1;id<151;id++){
        var pokeapiUrl = `https://pokeapi.co/api/v2/pokemon/${id}`
        getPokemon(pokeapiUrl,radioValue)
      };
  });
});

function getPokemon(pokeapiUrl,type){
fetch(pokeapiUrl)
    .then( res => {
      return res.json();
    })
    .then( data =>{
      // console.log(data);
      pokemon = {};
      pokemon['name'] = data.name;
      // console.log(pokemon['name'])
      pokemon['id'] = data.id;
      pokemon['image'] = data.sprites['front_default'];
      pokemon['type'] = data.types.map((type) => type.type.name);
      // console.log(pokemon['type'])
      for (let t of pokemon['type']){
        if (t==type){
          $('#poke-container').append(`${pokemon['id']}. <a href="">${pokemon['name']}</a>`)
          $('#poke-container').append(`</br>Type: ${pokemon['type']}`)
          $('#poke-container').append(`</br><img src="${pokemon['image']}" /></br>`)

          //console.log(pokemon)
          // return pokemon
        };
      };
    });
};

for (let id=1;id<151;id++){
  var pokeapiUrl = `https://pokeapi.co/api/v2/pokemon/${id}`
  getPokemon(pokeapiUrl)

getPokemon(pokeapiUrl,type) = []
getPokemon(pokeapiUrl,type).sort();
}

//does not work
getPokemon(pokeapiUrl,type) = []
getPokemon(pokeapiUrl,type).sort();

  



