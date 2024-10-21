import { FlatList } from "react-native"
import { GlobalTextComponent } from "../../Components/GlobalTextComponent";
import * as S from './style'
import { Header } from "./Components/Header";
import { FavoriteItem } from "./Components/FavoriteItem";
import { useFavoritesController } from "./viewModel";

export const Favorites = () => {

  const {
    favorites,
    formatInfo,
    goBack,
    navigate,
    handleExcludeFav
  } = useFavoritesController()

  const renderItem = ({item}: any) => (
    <FavoriteItem 
      item={item}
      formatInfo={formatInfo}
      handleExcludeFav={() => {
        handleExcludeFav(item)
      }}
      handleRenderItem={() => {
        navigate('MediaHubDetails', {item, selectedTypeOfShow: item?.seasons ? 'tv' : 'movie'})
      }} 
    />
  )
  
  return (
    <S.Container>
      <Header handleButton={goBack} title="Favoritos"/>
      <S.MainContent>
        {favorites?.length === 0 ? (
          <S.BoxListEmpty>
            <GlobalTextComponent
              color="lightColor"
              fontFamily="poppinsMedium"
              fontSize={18}
              text="Ainda não há favoritos para serem exibidos"
              textAlign="center"
            />
          </S.BoxListEmpty>
        ) : (
          <FlatList
            data={favorites}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
          />
        )}
      </S.MainContent>
    </S.Container>
  )
}