import { useEffect, useRef, useState } from "react"
import { Animated, Keyboard, SafeAreaView, ScrollView, Text, TextInput, View } from "react-native"
import themes from "../../Global/themes"
import { GlobalTextComponent } from "../../Components/GlobalTextComponent"
import { GlobalInput } from "../../Components/GlobalInput"
import { RFValue } from "react-native-responsive-fontsize"

export const AuthView = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const inputRef = useRef<TextInput>()

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: themes.colors.primaryColor, paddingHorizontal: 16, justifyContent: 'space-between'}}>
            <View style={{alignItems: 'center', justifyContent: 'center',}}>
                <GlobalTextComponent
                  color="lightColor"
                  fontFamily="poppinsSemiBold"
                  fontSize={18}
                  text={`Seja bem vindo ao\nMovie App`}
                  textAlign="center"
                />
            </View>
            <View>
              <GlobalInput
                onChangeText={setEmail}
                value={email}
                label="Nome"
              />
              <GlobalInput
                onChangeText={setPassword}
                value={password}
                label="Senha"
              />
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 16}}>
                <GlobalTextComponent
                  color="lightColor"
                  fontFamily="poppinsRegular"
                  fontSize={12}
                  text='Desenvolvido por Ghabriel'
                />
                <GlobalTextComponent
                  color="lightColor"
                  fontFamily="poppinsRegular"
                  fontSize={12}
                  text='Movie App v1.0.0'
                />
            </View>
        </SafeAreaView>
    )
}