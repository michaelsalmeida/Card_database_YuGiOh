
function getDados(name = '') {
    const url = 'https://db.ygoprodeck.com/api/v7/cardinfo.php?';
    const extra = `&fname=${name}`;
  
    return fetch(url + extra)
      .then(response => response.json())
      .then(data => {
        // console.log(data);  
        // Percorre a matriz de cards e exibe os nomes
        // Extrai os nomes dos cards do objeto de resposta
        const cardProperties = Object.values(data);
        const nomes = cardProperties.flatMap(cardProperty => cardProperty.map(card => card.name));
        const efeitos = cardProperties.flatMap(cardProperty => cardProperty.map(card => card.desc));
        const atk = cardProperties.flatMap(cardProperty => cardProperty.map(card => card.atk));
        const def = cardProperties.flatMap(cardProperty => cardProperty.map(card => card.def));
        const level = cardProperties.flatMap(cardProperty => cardProperty.map(card => card.level));
        const image_card = cardProperties.flatMap(cardProperty => cardProperty.map(card => card.card_images)[0][0]['image_url']);
        const race = cardProperties.flatMap(cardProperty => cardProperty.map(card => card.race));
        const type = cardProperties.flatMap(cardProperty => cardProperty.map(card => card.type));
        const atr = cardProperties.flatMap(cardProperty => cardProperty.map(card => card.attribute));
        const linkval = cardProperties.flatMap(cardProperty => cardProperty.map(card => card.linkval));
        const sets = cardProperties.flatMap(cardProperty => cardProperty.map(card => card.card_sets));
  
        // Imagem da carta
  
        return {
          nomes: nomes,
          image_card: image_card,
          name_card: nomes,
          eff_card: efeitos,
          atk_card: atk,
          def_card: def,
          level_card: level,
          race: race,
          type: type,
          atr: atr,
          linkval: linkval,
          sets: sets
        };
  
      })
  
      .catch(error => {
        // Trata o erro caso ocorra
        console.error('Ocorreu um erro:', error);
      });
  }
    
  
  
  
  function getName(){
      var nome = document.getElementById('nome').value;
  
      getDados(nome)
        .then((resultado) => {
          var nomes = resultado['nomes'];
          string = ''
  
          for (let i = 0; i < nomes.length; i++) {
            const nome = nomes[i];
            
            string += `<option value='${nome}'>${nome}</option>`
            
          }
  
          document.getElementById('cartas').innerHTML = string;
  
        })
        .catch((erro) => {
          console.log(erro);
        }); 
      
  
  }