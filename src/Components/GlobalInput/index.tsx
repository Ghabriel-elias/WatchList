import { Animated, Keyboard, TextInput, TouchableOpacity, ViewStyle } from 'react-native'
import * as S from './styles'
import themes from '../../Global/themes'
import { useEffect, useRef, useState } from 'react'
import { GlobalTextComponent } from '../GlobalTextComponent';
import { RFValue } from 'react-native-responsive-fontsize';
import Feather from 'react-native-vector-icons/Feather';

interface GlobalInputProps  {
    value: string;
    onChangeText: (value: string) => void;
    label: string;
    inputRef?: React.MutableRefObject<TextInput | undefined>;
    onBlur?: () => void;
    onFocus?: () => void;
    style?: ViewStyle;
    keyboardType?: 'numeric' | 'email-address';
}

export const GlobalInput = ({
    value,
    onChangeText,
    onFocus,
    label,
    onBlur,
    inputRef,
    style,
    keyboardType,
}: GlobalInputProps) => {

    const animatedLabelRef = useRef(new Animated.Value(0)).current;

    const {colors} = themes
    const [showLabel, setShowLabel] = useState(value === '')
    const [animationTop, setAnimationTop] = useState(RFValue(5))
    const translateY = animatedLabelRef.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 2],
    });

    const [showPassword, setShowPassword] = useState(false)

    function handleShowPassword() {
        setShowPassword(!showPassword)
    }

    useEffect(() => {
        const keyboard = Keyboard.addListener('keyboardDidHide', () => {
            inputRef?.current?.blur()
        })
     
        Animated.timing(animatedLabelRef, {
          toValue: animationTop,
          duration: 200,
          useNativeDriver: true,
        }).start()
        
        return () => {
            keyboard.remove()
        }
    }, [animationTop, inputRef]);

    return (
        <S.Container style={style}>
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
                        fontSize={11}
                        text={label}
                        alignFontWithMargin
                    />
                </S.AnimatedLabel>
            ): null}
            <S.Input
                value={value}
                showLabel={showLabel}
                onChangeText={onChangeText}
                ref={inputRef}
                editable={true}
                keyboardType={keyboardType || 'default'}
                secureTextEntry={keyboardType === 'numeric' && !showPassword}
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
            {keyboardType === 'numeric' ? (
                <S.BoxEyeInput onPress={handleShowPassword}>
                    <Feather name={showPassword ? "eye-off" : "eye"} size={RFValue(18)} color={colors.lightColor} />
                </S.BoxEyeInput>
            ): null}
       </S.Container>
    )
}