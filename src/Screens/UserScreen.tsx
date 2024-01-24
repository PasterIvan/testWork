import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {UserScreenProps} from '../types/navigationType';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {GoBack} from '../assets/GoBack';
import {SCREEN_WIDTH} from '../constance';

export const UserScreen = ({navigation, route}: UserScreenProps) => {
  const {imageURL} = route.params;
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
      <Pressable
        style={styles.goBack}
        hitSlop={20}
        onPress={() => {
          navigation.goBack();
        }}>
        <GoBack />
      </Pressable>
      <FastImage style={styles.image} source={{uri: imageURL}} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  goBack: {
    margin: 15,
    alignSelf: 'flex-start',
  },
  image: {
    width: SCREEN_WIDTH * 0.95,
    height: SCREEN_WIDTH * 0.95,
    borderRadius: 15,
  },
});
