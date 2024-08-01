import { Modalize } from "react-native-modalize"
import { IHandles } from "react-native-modalize/lib/options"
import { Container } from "./style";
import { RFValue } from "react-native-responsive-fontsize";
import themes from "../../../Global/themes";
import { GlobalTextComponent } from "../../../Components/GlobalTextComponent";
import { GlobalButton } from "../../../Components/GlobalButton";
import { GlobalInput } from "../../../Components/GlobalInput";
import { Formik } from "formik";
import { View } from "react-native";

interface ModalConfirmPassProps {
  modalRef: React.RefObject<IHandles>
  handleConfirm: (password: string) => void;
  loadingButton: boolean;
}

const {colors} = themes


export const ModalConfirmPass = ({
  modalRef,
  handleConfirm,
  loadingButton
}: ModalConfirmPassProps) => {
  
  return (
    <Modalize
      closeOnOverlayTap
      ref={modalRef}
      adjustToContentHeight
      useNativeDriver
      handlePosition="inside"
      handleStyle={{backgroundColor: colors.lightColor}}
      scrollViewProps={{keyboardShouldPersistTaps: 'always'}}
      modalStyle={{ borderTopRightRadius: RFValue(28), borderTopLeftRadius: RFValue(28), overflow: 'hidden'}}>
      <Container>
        <GlobalTextComponent
          color="lightColor"
          fontFamily="poppinsSemiBold"
          fontSize={14}
          text="Digite sua senha para continuar"
          textAlign="center"
          style={{marginTop: 16}}
        />
        <Formik
          initialValues={{password: ''}}
          onSubmit={(values) => {
            handleConfirm(values.password)
          }}>
          {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View style={{marginTop: 16}}>
            <GlobalInput
              onChangeText={handleChange('password')}
              value={values.password}
              label="Senha"
              keyboardType="numeric"
              style={{marginBottom: 16}}
            />
            <GlobalButton
              color="secundaryColor"
              handleButton={handleSubmit}
              text="Confirmar"
              type="solid"
              style={{marginBottom: 16}}
              loading={loadingButton}
            />
            <GlobalButton 
              color="lightColor"
              handleButton={() => {
                if(loadingButton) return
                modalRef.current?.close()
              }}
              text="Cancelar"
              type="outline"
            />
          </View>
        )}
        </Formik>
      </Container>
    </Modalize>
  )
}