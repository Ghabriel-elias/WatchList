import { useEffect, useRef } from "react"
import { Animated, Dimensions, Easing, StyleSheet, View } from "react-native"
import LinearGradient from "react-native-linear-gradient";
import { GlobalSkeletonComponentProps } from "./model";
import * as S from './style'

export const GlobalSkeletonComponent = ({
  customStyle
}: GlobalSkeletonComponentProps) => {

  const animationSkeleton = useRef(new Animated.Value(0)).current
  
  useEffect(() => {
    Animated.loop(
      Animated.timing(animationSkeleton, {
        toValue: 1,
        useNativeDriver: true,
        duration: 800,
        easing: Easing.linear,

      })
    ).start();
  }, [])

  const widthInterPolate = animationSkeleton.interpolate({
    inputRange: [0, 1],
    outputRange: [0, Dimensions.get('screen').width]
  })

  const AnimatedLinerGradient = useRef( Animated.createAnimatedComponent(LinearGradient)).current

  return (
    <S.ContainerSkeleton 
     style={customStyle}
    >
      <AnimatedLinerGradient
        colors={['#a0a0a0','#b0b0b0', '#b0b0b0','#a0a0a0']}
        start={{x: 0, y: 0}}
        end={{x: 1, y:0}}
        style={[
          StyleSheet.absoluteFillObject,
          {
            width: 80,
            height: '100%',
            transform: [{
              translateX: widthInterPolate
            }]
          }
        ]}
      />
    </S.ContainerSkeleton>
  )
};
