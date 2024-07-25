import { Animated, Keyboard, TextInput } from 'react-native'
import * as S from './styles'
import themes from '../../Global/themes'
import { useEffect, useRef, useState } from 'react'
import { GlobalTextComponent } from '../GlobalTextComponent';
import { RFValue } from 'react-native-responsive-fontsize';

interface GlobalInputProps  {
    value: string;
    onChangeText: (value: string) => void;
    label: string;
    ref?: React.MutableRefObject<TextInput | undefined>;
    onBlur?: () => void;
    onFocus?: () => void;
}

export const GlobalInput = ({
    value,
    onChangeText,
    onFocus,
    label,
    onBlur,
    ref
}: GlobalInputProps) => {

    const animatedLabelRef = useRef(new Animated.Value(0)).current;

    const {colors, fonts} = themes
    const [showLabel, setShowLabel] = useState(true)
    const [animationTop, setAnimationTop] = useState(RFValue(5))
    const translateY = animatedLabelRef.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 2],
    });

    useEffect(() => {
        const keyboard = Keyboard.addListener('keyboardDidHide', () => {
            ref?.current?.blur()
        })
     
        Animated.timing(animatedLabelRef, {
          toValue: animationTop,
          duration: 200,
          useNativeDriver: true,
        }).start()
        
        return () => {
            keyboard.remove()
        }
    }, [animationTop, ref]);

    return (
        <S.Container>
            {showLabel  ? (
                <S.AnimatedLabel  
                  style={{
                    transform: [{
                      translateY: translateY
                    }],
                   top: animationTop
                  }}>
                    <GlobalTextComponent
                        color="lightColor"
                        fontFamily="poppinsRegular"
                        fontSize={10}
                        text={label}
                        alignFontWithMargin
                    />
                </S.AnimatedLabel>
            ): null}
            <S.Input
                value={value}
                showLabel={showLabel}
                onChangeText={onChangeText}
                ref={ref}
                editable={true}
                onFocus={() => {
                    setAnimationTop(RFValue(2))
                    if(onFocus) onFocus()
                }}
                onBlur={() => {
                    setShowLabel(value === '')
                    setAnimationTop(RFValue(5))                
                    if(onBlur) onBlur()
                }}
                cursorColor={colors.disactiveTabBar}
            />
       </S.Container>
    )
}