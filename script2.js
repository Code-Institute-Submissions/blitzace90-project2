google.charts.load('current', { 'packages': ['bar'] });

$(document).ready(function () {
  let id = localStorage.getItem('id').slice(7)
  //console.log(id)

  let url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  fetch(url)
    .then(res => {
      return res.json();
    })
    .then(data => {
      pokemon = {};
      pokemon['name'] = data.name;
      pokemon['id'] = data.id;
      pokemon['image'] = data.sprites['front_default'];
      pokemon['image2'] = data.sprites['back_default'];
      pokemon['image3'] = data.sprites['front_shiny'];
      pokemon['image4'] = data.sprites['back_shiny'];
      pokemon['type'] = data.types.map((type) => type.type.name);
      pokemon['attack'] = data.stats[4].base_stat;
      pokemon['defense'] = data.stats[3].base_stat;
      pokemon['spattack'] = data.stats[2].base_stat;
      pokemon['spdefense'] = data.stats[1].base_stat;
      pokemon['speed'] = data.stats[0].base_stat;
      pokemon['hp'] = data.stats[5].base_stat;
      pokemon['abilities'] = data.abilities.map((ability) => ability.ability.name);

      pokemon['name'] = pokemon['name'].charAt(0).toUpperCase() + pokemon['name'].slice(1);

      $(`#poke-container-2`).html(
        `<div class='container-fluid'>
        <div class='container-fluid text-center' id='indivpoke'><h1>${pokemon['name']}</h1></div>

        <div class='container-fluid text-center row'>
          
          <div class='col-lg-5'><img class='pokeimage2' src="${pokemon['image']}" alt='default front image'/><img class='pokeimage2' src="${pokemon['image2']}" alt='default back image'/>
          <br>Default
          </div>
          
          <div class='col-lg-2'></div>

          <div class='col-lg-5'><img class='pokeimage2' src="${pokemon['image3']}" alt='shiny front image'/><img class='pokeimage2' src="${pokemon['image4']}" alt='shiny back image'/>
          <br>Shiny
          </div>
          
        </div>

        <div class='pokedetails container-fluid'>

          <div class='text-center'>
            <h5>Type: </h5>
            ${pokemon['type']} 
          </div>

          <br>

          <div class='abilities text-center'>
            <h5>Abilities: </h5>
            ${pokemon['abilities']} 
          </div>
      
          <br>

          <div class='stats text-center'>
            <h5>Base stats: </h5>
            Attack: ${pokemon['attack']} <br>
            Defense: ${pokemon['defense']} <br>
            Special Att: ${pokemon['spattack']} <br>
            Special Def: ${pokemon['spdefense']} <br>
            Speed: ${pokemon['speed']} <br>
            HP: ${pokemon['hp']} 
          </div>

          <br>

          <div class='container-fluid row'>
            <div class='mx-auto' id='pokechart'>
            </div>
          </div>

          <br>

        </div>

      </div>`
      );
    }).then(data => {

      let dataArray = [
        ['Base Stats', 'Value'],
        ['Attack', parseFloat(`${pokemon['attack']}`)],
        ['Defense', parseFloat(`${pokemon['defense']}`)],
        ['Sp Att', parseFloat(`${pokemon['spattack']}`)],
        ['Sp Def', parseFloat(`${pokemon['spdefense']}`)],
        ['Speed', parseFloat(`${pokemon['speed']}`)],
        ['HP', parseFloat(`${pokemon['hp']}`)]
      ]

      google.charts.setOnLoadCallback(function () { drawChart(dataArray) });

    });

  function drawChart(dataArray) {
    var chartData = new google.visualization.arrayToDataTable(dataArray);
    console.log(dataArray);

    var options = {
      title: 'Pokemon Stats',
      backgroundColor: { fill: 'none' },
      chartArea: { left: 50, top: 50, width: '100%', height: '100%' },
      bars: 'horizontal',
      colors: 'orange',
    };
    var pokestats = new google.charts.Bar(document.getElementById('pokechart'));
    pokestats.draw(chartData, options);
  }

});
