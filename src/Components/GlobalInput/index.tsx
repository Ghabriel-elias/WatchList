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
    autoFocus?: boolean;
    inputRef?: React.MutableRefObject<TextInput | undefined>;
    onBlur?: () => void;
    onFocus?: () => void;
    style?: ViewStyle;
    keyboardType?: 'numeric' | 'email-address';
    inputType?: 'numeric' | 'email' | 'password' | 'search';
    handleIcon?: () => void;
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
    inputType,
    handleIcon,
    autoFocus
}: GlobalInputProps) => {

    const {colors} = themes
    const [showPassword, setShowPassword] = useState(false)

    function handleShowPassword() {
        setShowPassword(!showPassword)
    }

    useEffect(() => {
        const keyboard = Keyboard.addListener('keyboardDidHide', () => {
            inputRef?.current?.blur()
        })
     
        return () => {
            keyboard.remove()
        }
    }, [inputRef]);

    return (
        <S.Container style={style}>
            <S.Input
                value={value}
                onChangeText={onChangeText}
                ref={inputRef}
                placeholder={label}
                placeholderTextColor={colors.lightColor}
                editable={true}
                autoFocus={autoFocus}
                keyboardType={keyboardType || 'default'}
                secureTextEntry={inputType && inputType === 'password' && !showPassword}
                onFocus={() => {
                    if(onFocus) onFocus()
                }}
                onBlur={() => {
                    if(onBlur) onBlur()
                }}
                cursorColor={colors.disactiveTabBar}
            />
            {inputType && inputType === 'password' ? (
                <S.BoxEyeInput onPress={handleShowPassword}>
                    <Feather name={showPassword ? "eye-off" : "eye"} size={RFValue(18)} color={colors.lightColor} />
                </S.BoxEyeInput>
            ): null}
            {inputType && inputType === 'search' && value.length >= 3 ? (
                <S.BoxEyeInput onPress={handleIcon && handleIcon}>
                    <Feather name={"x"} size={RFValue(18)} color={colors.lightColor} />
                </S.BoxEyeInput>
            ): null}
       </S.Container>
    )
}