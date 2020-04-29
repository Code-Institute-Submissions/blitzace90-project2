$(document).ready(function(){
  //Uncheck region if type selected
  $('.type').on('click',function(){
    $(".region").each(function(){
      this.checked = false;
    });                
  })
  //Uncheck type if region selected
  $('.region').on('click',function(){
    $(".type").each(function(){
      this.checked = false;
    });                
  })

  //Find Button clicked
  $("#find-btn").click(function(){
    $('#poke-container').text(``)
    var radioValue=''
      //If type radio is selected, send 3 arguments (url,search type (type) and radio value to function)
      if($("input[name='radioType']").is(':checked')){
        radioValue = $("input[name='radioType']:checked").val();
        for (let id=1;id<803;id++){
        var pokeapiUrl = `https://pokeapi.co/api/v2/pokemon/${id}`
        getPokemon(pokeapiUrl,'type',radioValue)
        }
      }
      //If region radio is selected, send 3 arguments (url,search type (region) and radio value to function)
      else if($("input[name='radioRegion']").is(':checked')){
        radioValue = $("input[name='radioRegion']:checked").val();
        for (let id=1;id<803;id++){
        var pokeapiUrl = `https://pokeapi.co/api/v2/pokemon/${id}`
        getPokemon(pokeapiUrl,'region',radioValue)
        }
      }
  });


  //Search Name Button
  $("#search").click(function(){
    $('#poke-container').text(``)
      var name = $("#inputPokemon").val()
      var name = name.toLowerCase()
      var url = "https://pokeapi.co/api/v2/pokemon/" + name
      for (let id=1;id<803;id++){
        var pokeapiUrl = `https://pokeapi.co/api/v2/pokemon/${id}`
        getPokemon(pokeapiUrl,'name',name)
      }
    });
  });


  //All in one function. url is to fetch pokemon data, search type is to run each appending function according to what needs to be compared, parameter is the variable to compare e.g. 'kanto' for region comparison, 'normal' for type comparison, 'name' for name comparison
  /*async function getPokemon(pokeapiUrl,searchType,parameter){
    let response = await fetch(pokeapiUrl);
    let data = await response.json()*/

  function getPokemon(pokeapiUrl,searchType,parameter){
  fetch(pokeapiUrl)
      .then( res => {
        return res.json();
      })
      .then( data =>{
        pokemon = {};
        pokemon['name'] = data.name;
        pokemon['id'] = data.id;
        pokemon['image'] = data.sprites['front_default'];
        pokemon['type'] = data.types.map((type) => type.type.name);

        //If type is selected, append if the pokemon type array has selected type
        if(searchType=='type'){
          for (let t of pokemon['type']){
            if (t==parameter){
              append()
            };
          };
        }

        //If region is selected, append id no. according to region
        else if(searchType=='region'){

          //Switch function, depending on region selected, append only for certain ID no.
          switch (parameter){
            case 'kanto':
              if (0<pokemon['id'] && pokemon['id']<152){
                append()
              }
              break;
              case "johto":
              if (151<pokemon['id'] && pokemon['id']<252){
                append()
              }
              break;
              case "hoenn":
              if (251<pokemon['id'] && pokemon['id']<387){
                append()
              }
              break;
              case "sinnoh":
              if (386<pokemon['id'] && pokemon['id']<494){
                append()
              }
              break;
              case "unova":
              if (493<pokemon['id'] && pokemon['id']<650){
                append()
              }
              break;
              case "kalos":
              if (649<pokemon['id'] && pokemon['id']<722){
                append()
              }
              break;
          }

        //If search button is pressed, means search by name
        }else if(searchType=='name'){
          if (pokemon['name']==parameter || pokemon['id']==parameter){
            append()
          } 
        };
      })

      //Function called 'append' to add to HTML Container
      function append(){
            //$('#poke-container').append(`<a href="index2.html" id="${pokemon['name']}" class="retPokemon">${pokemon['name']}</a>`)
            //$('#poke-container').append(`</br>Type: ${pokemon['type']}`)
            //$('#poke-container').append(`</br><img src="${pokemon['image']}" /></br>`)
            $('#poke-container').append(
              `<div class='card' id="${pokemon['name']}">
              ${pokemon['name']}
              </br>
              <img src="${pokemon['image']}" />
              </div>`
            )
      }
  }

  //clear button
  $("#clear-btn").click(function(){
    $('#poke-container').html("");
    $('.radio-btn').prop("checked",false)
  });

  



