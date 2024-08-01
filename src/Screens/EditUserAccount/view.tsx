import { View } from "react-native"
import { GlobalButton } from "../../Components/GlobalButton"
import { GlobalTextComponent } from "../../Components/GlobalTextComponent"
import { GlobalInput } from "../../Components/GlobalInput"
import * as S from './style'
import { Formik } from "formik"
import { ModalConfirmPass } from "./ModalConfirmPass"
import { useControllerEditUser } from "./model"

export const EditUserAccountView = ({
  initialValuesForm,
  handleSubmitForm,
  loading,
  modalConfirmPassRef,
  confirmPassword
}: ReturnType<typeof useControllerEditUser>) => {


  return (
    <S.Container>
      <View>
        <GlobalTextComponent
          color="lightColor"
          fontFamily="poppinsSemiBold"
          fontSize={17}
          text='Edite seus dados abaixo'
          style={{paddingVertical: 16}}
        />
      </View>
      <Formik
        initialValues={initialValuesForm}
        onSubmit={handleSubmitForm}>
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
          <GlobalButton
            color="secundaryColor"
            text="Continuar"
            type="solid"
            fontSize={13}
            handleButton={handleSubmit}
            style={{marginTop: 16}}
          />
        </View>
      )}
      </Formik>
      <ModalConfirmPass loadingButton={loading} modalRef={modalConfirmPassRef} handleConfirm={confirmPassword}/>
    </S.Container>   
  )
}