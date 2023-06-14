import { StyleSheet, Text, View, ScrollView, TextInput, Image, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Header from './header';
import { useState } from 'react';
import {MagnifyingGlassIcon} from 'react-native-heroicons/outline';





export default function Main(){
    // const [name, setName] = useState('Odd-Eyes Pendulum Dragon');
    const [img, setImg] = useState('https://images.ygoprodeck.com/images/cards/16178681.jpg');
    const [inputValue, setInputValue] = useState('');
    const [nomeCarta, setNomeCarta] = useState('Odd-Eyes Pendulum Dragon');
    const [tipoCarta, setTipoCarta] = useState('Pendulum Effect Monster');
    const [racaCarta, setRacaCarta] = useState('Dragon');
    const [efeitoCarta, setEfeitoCarta] = useState(`[ Pendulum Effect ] You can reduce the battle damage you take from an attack involving a Pendulum Monster you control to 0. During your End Phase: You can destroy this card, and if you do, add 1 Pendulum Monster with 1500 or less ATK from your Deck to your hand. You can only use each Pendulum Effect of "Odd-Eyes Pendulum Dragon" once per turn. [ Monster Effect ] If this card battles an opponent's monster, any battle damage this card inflicts to your opponent is doubled.`)
    const [atk, setAtk] = useState('ATK/ 2500 ');
    const [def, setDef] = useState('DEF/ 2000');
    const [imgAtributo, setImgAtributo] = useState(require('../assets/DARK.png'));

    const [showSearch, toggleSearch] = useState(false);

    function search(){
      toggleSearch(!showSearch);
    }
    const handleInputChange = (text) => {
        setInputValue(text);
    };


    function getDados(name = '') {
        const url = 'https://db.ygoprodeck.com/api/v7/cardinfo.php?';
        const extra = `&fname=${name}`;
      
        return  fetch(url + extra)
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
      
      function mostrarTudo(){
        
        getDados(inputValue)
          .then((resultado) => {
            /* only monsters */
        if (resultado['atk_card'].length > 1){
            var atk = resultado['atk_card'][0]
          } else {
            var atk = resultado['atk_card'];
  
          }

          if (resultado['nomes'].length > 1){
            var nome = resultado['nomes'][0]
          } else {
            var nome = resultado['nomes'];
  
          }
  
          if (resultado['def_card'].length > 1){
            var def = resultado['def_card'][0];
          } else {
            var def = resultado['def_card'];
  
          }
  
          /* water, fire, earth, dark, divine, wind (monsters) */
          if (resultado['atr'].length > 1){
            var atributo = resultado['atr'][0];
          } else {
            var atributo = resultado['atr'];
  
          }
          if (resultado['race'].length > 1){
            var raca = resultado['race'][0];
          } else {
            var raca = resultado['race'];
  
          }
  
          /* fim only monsters */
  
  
          if (resultado['eff_card'].length > 1){
            var efeito = resultado['eff_card'][0];
          } else {
            var efeito = resultado['eff_card'];
  
          }
  
          /* monster , spell or trap */
          if (resultado['type'].length > 1){
            var tipo = resultado['type'][0];
          } else {
            var tipo = resultado['type'][0];
          }
  
          if (resultado['linkval'].length > 1){
            var linkval = resultado['linkval'][0];
          } else {
            var linkval = resultado['linkval'];
          }

            setImg(resultado['image_card'] + '');
            setNomeCarta(nome);
            setTipoCarta(tipo);
            setRacaCarta(raca);
            
            setEfeitoCarta(efeito);
            setAtk('ATK/ ' + atk + ' ');
            setDef('DEF/ ' + def + ' ');

            if (atributo == 'FIRE'){
              setImgAtributo(require('../assets/FIRE.png'));
            } else if (atributo == 'WIND'){
              setImgAtributo(require('../assets/WIND.png'));
            } else if (atributo == 'DARK') {
              setImgAtributo(require('../assets/DARK.png'));
            } else if (atributo == 'LIGHT') {
              setImgAtributo(require('../assets/LIGHT.png'));
            } else if (atributo == 'EARTH') {
              setImgAtributo(require('../assets/EARTH.png'));
            } else if (atributo == 'WATER') {
              setImgAtributo(require('../assets/WATER.png'));
            } else if (atributo == 'DIVINE') {
              setImgAtributo(require('../assets/DIVINE.png'));
            }
            
    
          })
          .catch((erro) => {
            console.log(erro);
          }); 
    
    }
    return(
        
        <ScrollView>
            <Header/>
        <View style={stylesView.main}>
            <View style={{backgroundColor: showSearch? 'grey' : 'transparent', flex: 1,
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            borderRadius: 20}}>
              {
                showSearch? (
                  <TextInput style={styles.input} placeholder='Digite o nome da carta' value={ inputValue } onChangeText={handleInputChange} onSubmitEditing={mostrarTudo}/>

                ):null
              }
            <TouchableOpacity onPress={ search } style={styles.pesq}>
                <MagnifyingGlassIcon size={30} color={'white'}/>
            </TouchableOpacity>


            </View>

            <Image source={{ uri: img }}  style={styles.imgCarta}/>

            <View style={stylesView.informacoes}> 

                <View style={stylesView.nameatributo}>

                  <Text>{ nomeCarta } </Text>
                  <Image source={ imgAtributo } style={styles.atributos}/>

                </View>

                <View style={stylesView.nomeetipo} >
                    <Text>{ tipoCarta } </Text>
                    <Text>{ racaCarta } </Text>
                </View>

                  <View style={stylesView.efeito}>
                      <Text style={styles.efeito}>{ efeitoCarta }</Text>
                  </View>

                <View style={styles.atkdef}>
                    <Text>{ atk }</Text>
                    <Text>{ def }</Text>
                </View>
            </View>

        </View>
        </ScrollView>

    );
}

const stylesView = StyleSheet.create({
    main: {
        display: 'flex',
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: 'white',
        marginTop: -15,
        height: 'auto',

        padding: 20
    },

    informacoes: {
        borderRadius: 10,
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: '#000',
        marginTop: 10,
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10
    },

    nameatributo: {
      flex: 1,
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center'
    },

    nomeetipo: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },

    efeito: {
        padding: 10
    }
});

const styles = StyleSheet.create({
    
    input:{
        width: 300,
        height: 15,
        paddingLeft: 6,
        color: 'white'
    },

    pesq: {
      backgroundColor: 'grey',
      borderRadius: 20,
      padding: 5

    },

    imgCarta: {
        width: 150,
        height: 220,
        marginTop: 10
    },

    efeito: {
        fontWeight: 'bold',
        fontSize: 15
    },

    atkdef: {
        width: '100%',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },

    atributos: {
      width: 40,
      height: 40
    }

    
  });