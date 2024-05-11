import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import tw from "twrnc"

const Loader = () => {
  const dot1Opacity = useRef(new Animated.Value(0)).current;
  const dot2Opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const fadeIn = Animated.timing(dot1Opacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    });

    const fadeOut = Animated.timing(dot2Opacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    });

    Animated.loop(Animated.sequence([fadeIn, fadeOut])).start();
  }, []);

  return (
    <View style={[tw`w-[100%] h-[100%]`,styles.loader]}>
      <Animated.View style={[styles.dot, { opacity: dot1Opacity, backgroundColor: 'green' }]} />
      <Animated.View style={[styles.dot, { opacity: dot2Opacity, backgroundColor: '#15803d' }]} />
      <Animated.View style={[styles.dot, { opacity: dot2Opacity, backgroundColor: '#34d399' }]} />
      <Animated.View style={[styles.dot, { opacity: dot2Opacity, backgroundColor: '#064e3b' }]} />
      <View style={styles.dot} />
      <View style={styles.dot} />
    </View>
  );
};

const styles = StyleSheet.create({
  loader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    margin: 5,
  },
});

export default Loader;
