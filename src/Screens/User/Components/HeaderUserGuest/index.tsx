import { GlobalButton } from "../../../../Components/GlobalButton"
import { GlobalTextComponent } from "../../../../Components/GlobalTextComponent"
import { Container } from "./style"

export const HeaderUserGuest = ({handleButton}: {handleButton: () => void}) => {
  return (
    <Container>
      <GlobalTextComponent
        color="lightColor"
        fontFamily="poppinsMedium"
        fontSize={16}
        text="Você ainda não possui conta, por favor faça login para continuar :)"
        style={{marginBottom: 16}}
      />
      <GlobalButton
        color="lightColor"
        text="Entrar ou cadastrar-se"
        handleButton={handleButton}
        type="outline"
        fontColor="lightColor"
        style={{marginBottom: 8}}
      />
    </Container>
  )
}