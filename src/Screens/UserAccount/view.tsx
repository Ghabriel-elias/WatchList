import { Dimensions, View } from "react-native"
import * as S from './style'
import { HeaderUserGuest } from "./Components/HeaderUserGuest"
import { HeaderUser } from "./Components/HeaderUser"
import { FlashList } from "@shopify/flash-list"
import { FooterCopyright } from "./Components/Footer"
import { RenderItem } from "./Components/RenderItem"
import { RFValue } from "react-native-responsive-fontsize"
import { ModelDeleteAccount } from "./Components/ModelDeleteAccount"
import { ModelLogout } from "./Components/ModelLogout"
import { useControllerUser } from "./model"

export const UserAccountView = ({
  deleteAccount,
  deleteUserRef,
  handleLogout,
  isGuest,
  loadingButton,
  logoutUserRef,
  user,
  userOptions
}: ReturnType<typeof useControllerUser>) => {

  return (
    <S.Container>
      {isGuest ? <HeaderUserGuest handleButton={handleLogout} /> : <HeaderUser userName={user?.name || ''}/>}
      <View style={{flex: 1, padding: 16}}>
        <FlashList
          estimatedItemSize={RFValue(48)}
          estimatedListSize={{height: userOptions.length * RFValue(48), width: Dimensions.get('screen').width}}
          data={userOptions}
          renderItem={RenderItem}
        />
      </View>
      <FooterCopyright/>
      <ModelDeleteAccount modalRef={deleteUserRef} handleConfirm={deleteAccount} loadingButton={loadingButton}/>
      <ModelLogout modalRef={logoutUserRef} handleConfirm={handleLogout}/>
    </S.Container>
  )
}