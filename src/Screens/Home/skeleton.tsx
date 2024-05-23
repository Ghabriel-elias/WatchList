import { useEffect, useRef } from "react"
import { Animated, Dimensions, View } from "react-native"
import LinearGradient from "react-native-linear-gradient";

export interface SkeletonProps {
  width: number;
  height: number;
}

export const Skeleton = ({
  height,
  width
}: SkeletonProps) => {

  const animationSkeleton = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.loop(
      Animated.timing(animationSkeleton, {
        toValue: 1,
        useNativeDriver: true
      })
    ).start()
  }, []) 

  const widthInterPolate = animationSkeleton.interpolate({
    inputRange: [0, 1],
    outputRange: [0, width]
  })

  return (
    <View style={{
      width: width,
      height: height,
      borderRadius: 8,
      overflow: 'hidden',
      backgroundColor: '#616165',
      marginLeft: 20
    }}>
      <Animated.View style={{
        height: '100%',
        width: 40,
        // backgroundColor: 'red',
        transform: [{
          translateX: widthInterPolate
        }]
      }}>
        <LinearGradient
        colors={['#666', '#999']}
        style={{flex: 1}}
        start={{x:0,y:0}}
        end={{x: 1, y: 0}
      }
         
        />
      </Animated.View>
    </View>
  )
}