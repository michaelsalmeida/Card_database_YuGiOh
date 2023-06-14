import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';

export default function Header(){
    return(
        <View style={styles.header}>
            <Image source={require('../assets/logo.png')} style={styles.imgHeader} />
            <Image source={require('../assets/cristal_vermelho.png')} style={styles.imgMenuHam}/>
        </View>
    )
}


const styles = StyleSheet.create({
    header: {
            backgroundColor: '#000',
            opacity: 0.75,
            width: '100%',
            height: 150,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingLeft: 20,
            paddingRight: 20
    },

    imgHeader: {
        width: '25%',
        height: '65%'
    },

    imgMenuHam: {
        width: '15%',
        height: '25%'
    }
  });