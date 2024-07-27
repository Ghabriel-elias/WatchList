import { View } from 'react-native';
import { Formik } from 'formik';
import * as S from './style'
import { GlobalInput } from '../../Components/GlobalInput';
import { GlobalTextComponent } from '../../Components/GlobalTextComponent';
import { GlobalButton } from '../../Components/GlobalButton';
import { LineSeparator } from '../../Components/LineSeparater';
import { useRegisterModel } from './model';

export const RegisterView = ({
  goBack,
  handleGuest,
  handleSubmitForm,
  initialValuesForm,
  loading
}: ReturnType<typeof useRegisterModel>) => {

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
      <Formik
        initialValues={initialValuesForm}
        onSubmit={handleSubmitForm}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View style={{flex: 1}}>
            <GlobalInput
              onChangeText={handleChange('name')}
              value={values.name}
              label="Nome"
              style={{marginBottom: 16}}
            />
            <GlobalInput
              onChangeText={handleChange('email')}
              value={values.email}
              label="E-mail"
              style={{marginBottom: 16}}
            />
            <GlobalInput
              onChangeText={handleChange('password')}
              value={values.password}
              label="Senha"
              keyboardType='numeric'
              style={{marginBottom: 16}}
            />
            <GlobalButton
              color="secundaryColor"
              text="Criar Conta"
              type="solid"
              fontSize={13}
              loading={loading}
              handleButton={handleSubmit}
              style={{marginTop: 16}}
            />
            <LineSeparator/>
            <GlobalButton
              color="secundaryColor"
              text="Fazer Login"
              type="outline"
              fontSize={13}
              handleButton={goBack}
            />
          </View>
        )}
      </Formik>
      <GlobalButton
        color="secundaryColor"
        text="Continuar sem conta"
        type="transparent"
        fontSize={13}
        handleButton={handleGuest}
        style={{marginBottom: 16}}
      />
    </S.Container>
  )
}