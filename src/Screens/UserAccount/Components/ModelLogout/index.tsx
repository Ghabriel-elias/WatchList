import { Modalize } from "react-native-modalize"
import { IHandles } from "react-native-modalize/lib/options"
import { GlobalButton } from "../../../../Components/GlobalButton";
import { GlobalTextComponent } from "../../../../Components/GlobalTextComponent";
import { Container } from "./style";
import themes from "../../../../Global/themes";
import { RFValue } from "react-native-responsive-fontsize";

interface ModelLogoutProps {
  modalRef: React.RefObject<IHandles>
  handleConfirm: () => void;
}

const {colors} = themes


export const ModelLogout = ({
  modalRef,
  handleConfirm
}: ModelLogoutProps) => {
  
  return (
    <Modalize
      closeOnOverlayTap
      ref={modalRef}
      adjustToContentHeight
      useNativeDriver
      handlePosition="inside"
      handleStyle={{backgroundColor: colors.lightColor}}
      modalStyle={{ borderTopRightRadius: RFValue(28), borderTopLeftRadius: RFValue(28), overflow: 'hidden'}}>
      <Container>
        <GlobalTextComponent
          color="lightColor"
          fontFamily="poppinsSemiBold"
          fontSize={14}
          text="Tem certeza que deseja sair da conta?"
          textAlign="center"
          style={{marginTop: 16}}
        />
        <GlobalTextComponent
          color="lightColor"
          fontFamily="poppinsRegular"
          fontSize={13}
          text={`Você irá precisar para fazer login\nnovamente após está ação`}
          textAlign="center"
          style={{marginTop: 16, paddingBottom: 32}}
        />
        <GlobalButton 
          color="secundaryColor"
          handleButton={() => {
            modalRef.current?.close()
          }}
          text="Cancelar"
          type="solid"
          style={{marginVertical: 16}}
        />
        <GlobalButton 
          color="lightColor"
          handleButton={handleConfirm}
          text="Confirmar"
          type="outline"
        />
      </Container>
    </Modalize>
  )
}