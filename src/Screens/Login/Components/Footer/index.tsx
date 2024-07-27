import { getApplicationName, getVersion } from "react-native-device-info"
import { GlobalTextComponent } from "../../../../Components/GlobalTextComponent"
import { ContainerFooter } from "./style"

export const AuthFooter = () => {
  return (
    <ContainerFooter>
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
        text={`${getApplicationName()} v${getVersion()}`}
      />
    </ContainerFooter>
  )
}