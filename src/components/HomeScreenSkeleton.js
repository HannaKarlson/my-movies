import React, {useRef, useEffect} from 'react';
import {View, Animated, StyleSheet} from 'react-native';
import {imageWidth} from './MoviePreview';
import colors from '../theme/colors';

const styles = StyleSheet.create({
  containerView: {
    backgroundColor: colors.lightGray,
    padding: 10,
    paddingTop: 20,
  },
  itemView: {
    flexDirection: 'row',
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: colors.white,
    marginBottom: 20,
  },
  imagePlaceholder: {
    width: imageWidth,
    height: imageWidth * 1.5,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    backgroundColor: colors.structureGray,
  },
  titlePlaceholder: {
    backgroundColor: colors.structureGray,
    height: 21,
    marginBottom: 14,
    width: '60%',
    borderRadius: 11,
  },
  textPlaceholder: {
    backgroundColor: colors.structureGray,
    height: 12,
    marginBottom: 7,
    borderRadius: 6,
  },
  endTextPlaceholder: {
    width: '70%',
  },
});

const SkeletonItem = () => {
  const opacityAnimation = useRef(new Animated.Value(1)).current;
  const opacityStyle = {opacity: opacityAnimation};

  const animateElement = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacityAnimation, {
          toValue: 0.7,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnimation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  };
  useEffect(() => {
    animateElement();
  }, []);
  return (
    <View style={styles.itemView}>
      <Animated.View style={[styles.imagePlaceholder, opacityStyle]} />

      <View style={{flex: 1, padding: 10, marginTop: 7}}>
        <Animated.View style={[styles.titlePlaceholder, opacityStyle]} />
        <Animated.View style={[styles.textPlaceholder, opacityStyle]} />
        <Animated.View style={[styles.textPlaceholder, opacityStyle]} />
        <Animated.View style={[styles.textPlaceholder, opacityStyle]} />
        <Animated.View
          style={[
            styles.textPlaceholder,
            styles.endTextPlaceholder,
            opacityStyle,
          ]}
        />
      </View>
    </View>
  );
};

const HomeScreenSkeleton = () => {
  return (
    <View style={styles.containerView}>
      <SkeletonItem />
      <SkeletonItem />
      <SkeletonItem />
      <SkeletonItem />
    </View>
  );
};

export default HomeScreenSkeleton;
