$(document).ready(function(){

  for (let j=1;j<723;j++){
    $('#poke-container').append(`<div id="pokemon${j}" class="pokeCard"></div>`)
  }

  //Uncheck region if type selected
  $('.type').on('click',function(){
    $(".region").each(function(){
      this.checked = false;
    });  
    $('#inputPokemon').val("")
  })
  //Uncheck type if region selected
  $('.region').on('click',function(){
    $(".type").each(function(){
      this.checked = false;
    });  
    $('#inputPokemon').val("")             
  })
  //Uncheck radio buttons if textbox is clicked
  $('#inputPokemon').on('click',function(){
    $(".radio-btn").each(function(){
      this.checked = false;
    })
  })

  //Find Button clicked
  $("#search-btn").click(function(){

    $('#countResults').html(`<a id='pokeCount'>0</a> pokemon found`)

    var radioValue=''
    var name = $('#inputPokemon').val()
      //If type radio is selected, send 2 arguments (search type (type) and radio value to function)
      if($("input[name='radioType']").is(':checked')){
        radioValue = $("input[name='radioType']:checked").val();
        getPokemon('type',radioValue)
      }
      //If region radio is selected, send 2 arguments (search type (region) and radio value to function)
      else if($("input[name='radioRegion']").is(':checked')){
        radioValue = $("input[name='radioRegion']:checked").val();
        getPokemon('region',radioValue)
      }
      //If textbox is input, send 2 arguments to function
      else if (name !== "")   
        var name = name.toLowerCase()
        getPokemon('name',name)
  });

  function getPokemon(searchType,parameter){
    $('.pokeCard').each(function(){
      $(this).empty()
    })
    for (let j=1;j<723;j++){
      let url = `https://pokeapi.co/api/v2/pokemon/${j}`;
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

        var count = 0

        //If type is selected, append if the pokemon type array has selected type
        if(searchType=='type'){
          for (let t of pokemon['type']){
            if (t==parameter){
              pushToDiv(j)
            };
          };
        }

            //If region is selected, append id no. according to region
        else if(searchType=='region'){

              //Switch function, depending on region selected, append only for certain ID no.
          switch (parameter){
            case 'kanto':
              if (0<pokemon['id'] && pokemon['id']<152){
                pushToDiv(j)
              }
              break;
              case "johto":
              if (151<pokemon['id'] && pokemon['id']<252){
                pushToDiv(j)
              }
              break;
              case "hoenn":
              if (251<pokemon['id'] && pokemon['id']<387){
                pushToDiv(j)
              }
              break;
              case "sinnoh":
              if (386<pokemon['id'] && pokemon['id']<494){
                pushToDiv(j)
              }
              break;
              case "unova":
              if (493<pokemon['id'] && pokemon['id']<650){
                pushToDiv(j)
              }
              break;
              case "kalos":
              if (649<pokemon['id'] && pokemon['id']<722){
                pushToDiv(j)
              }
              break;
            } 

            //If search button is pressed, means search by name
          }else if(searchType=='name'){
            if (pokemon['name']==parameter || pokemon['id']==parameter){
              pushToDiv(j)
            } 
          };
        })
      }

      //Function called 'append' to add to HTML Container
      function pushToDiv(j){
        pokemon['name'] = pokemon['name'].charAt(0).toUpperCase() + pokemon['name'].slice(1);
        $(`#pokemon${j}`).html(
          `<a href = "index2.html">
          <div class='card' id="${pokemon['name']}">
          ${pokemon['id']}. ${pokemon['name']}
          <br>
          <img src="${pokemon['image']}"/>
          </div>
          </a>`
        )
        $('#pokeCount').text(parseInt($('#pokeCount').text())+1)
      } 
  }

  //clear button
  $("#clear-btn").click(function(){
    $('.pokeCard').html("");
    $('#inputPokemon').val("");
    $('.radio-btn').prop("checked",false);
    $('#countResults').html("");
  });

//Caps first letter of pokemon name
//pokemon['name'] = pokemon['name'].charAt(0).toUpperCase() + str.slice(1);


//html1 - id pokemon html2 - id pokemondetails

  $('.pokeCard').each(function(){
    $(this).on('click', function (){
      localStorage.setItem('id',`${this.id}`)
    })
  })

})
