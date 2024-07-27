import { View } from "react-native"
import { GlobalTextComponent } from "../../Components/GlobalTextComponent"
import { GlobalInput } from "../../Components/GlobalInput"
import { GlobalButton } from "../../Components/GlobalButton"
import { AuthFooter } from "./Components/Footer"
import * as S from "./style"
import { LineSeparator } from "../../Components/LineSeparater"
import { useLoginModel } from "./model"

export const LoginView = ({
  setEmail,
  email,
  setPassword,
  password,
  inputRef, 
  loading,
  handleGuest,
  handleLogin,
  handleRegister
}: ReturnType<typeof useLoginModel>) => {

    return (
      <S.Container>
        <View>
          <GlobalTextComponent
            color="lightColor"
            fontFamily="poppinsSemiBold"
            fontSize={17}
            text={`Seja bem vindo ao Movie App`}
            style={{paddingVertical: 16}}
          />
        </View>
        <View style={{flex: 1}}>
          <GlobalInput
            onChangeText={setEmail}
            value={email}
            label="E-mail"
            style={{marginBottom: 16}}
            inputRef={inputRef}
          />
          <GlobalInput
            onChangeText={setPassword}
            value={password}
            label="Senha"
            keyboardType="numeric"
          />
          <GlobalButton
            color="secundaryColor"
            text="Entrar"
            type="solid"
            fontSize={13}
            loading={loading}
            handleButton={handleLogin}
            style={{marginTop: 16}}
          />
          <LineSeparator/>
          <GlobalButton
            color="secundaryColor"
            text="Criar conta"
            type="outline"
            fontSize={13}
            handleButton={handleRegister}
          />
        </View>
        <GlobalButton
          color="secundaryColor"
          text="Continuar sem conta"
          type="transparent"
          fontSize={13}
          handleButton={handleGuest}
          style={{marginBottom: 16}}
        />
        {/* <AuthFooter/> */}
      </S.Container>
    )
}