import React, { useEffect } from 'react';
import { View, Image, Animated, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LogoScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Home');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const opacity = new Animated.Value(0);

  Animated.timing(opacity, {
    toValue: 1,
    duration: 700,
    useNativeDriver: true,
  }).start();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#5D5D5D'}}>
      <Animated.View style={{ opacity }}>
        <Image source={require('../assets/logo2.png')} style={ styles.imgSplash } />
        <Text style={ styles.labelLogo }>DATA BASE YU-GI-OH !!!</Text>
      </Animated.View>
    </View>
  );
};

export default LogoScreen;

const styles = StyleSheet.create({
  imgSplash: {
    width: 160,
    height: 160
  },

  labelLogo: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#fff',
    marginTop: 20
  }
});

