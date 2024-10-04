import { GlobalTextComponent } from "../../Components/GlobalTextComponent";
import { IconComponent } from "./Components/IconComponent";
import * as S from './style'
import { FlatList, Image, View } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { RFValue } from "react-native-responsive-fontsize";
import { useMediaHubDetailsController } from "./viewModel";
import { imageUrl } from "../../Global/imageUrl";

const keysForWatch = {
  buy: 'Comprar',
  rent: 'Alugar',
  flatrate: 'Stream',
}

export const MediaHubDetails = () => {

  const {
    goBack,
    formatRuntime,
    formatGenres,
    formatYear,
    mediaHub,
    showFavorited,
    favoriteShow,
    keysWatchProviders,
    cast,
    watchProviders
  } = useMediaHubDetailsController()

  const renderItemIconWatchProvider = ({item}: any) => (
    <Image
      defaultSource={require('../../Assets/defaultImage.jpg')}
      style={{
        width: 40,
        height: 40,
        marginRight: 8,
        borderRadius: 4
      }}
      source={{uri: `${imageUrl}${item?.logo_path}`}}
    />
  )

  const renderItemWatchProvider = ({item}: any) => (
    <View style={{marginBottom: 16}}>
      <GlobalTextComponent
        color="lightColor"
        fontFamily="poppinsSemiBold"
        fontSize={14}
        text={keysForWatch[item]}
        style={{paddingBottom: 16}}
      />       
      <FlatList
        data={watchProviders[item]}
        horizontal
        renderItem={renderItemIconWatchProvider}
      />     
    </View>
  )

  const renderItemCast = ({item}: any) => (
    <View>
      <Image
        defaultSource={require('../../Assets/defaultImage.jpg')}
        style={{
          width: 80,
          height: 80,
          marginRight: 8,
          borderRadius: 4
        }}
        source={{uri: `${imageUrl}${item?.profile_path}`}}
      />
      <View style={{marginTop: 8, width: 80}}>
        <GlobalTextComponent
          color="lightColor"
          fontFamily="poppinsMedium"
          fontSize={9}
          text={item?.name}
          numberOfLines={2}
          style={{paddingBottom: 8}}
        />
        <GlobalTextComponent
          color="lightColor"
          fontFamily="poppinsRegular"
          fontSize={7}
          text={item?.character}
          numberOfLines={2}
        />
      </View>
    </View>
  )

  return (
    <S.Container> 
      <S.Header>
        <IconComponent handleButton={goBack} iconName="arrow-left"/>
        <IconComponent handleButton={favoriteShow} iconName={showFavorited ? "cards-heart" : "cards-heart-outline"}/>
      </S.Header>
      <S.CoverImage
        resizeMode="stretch"
        defaultSource={require('../../Assets/defaultImage.jpg')}
        source={{uri: `${imageUrl}${mediaHub?.backdrop_path}`}}
      />
      <S.MovieInfo>
        <S.BoxTitle>
          <GlobalTextComponent
            color="lightColor"
            fontFamily="poppinsSemiBold"
            fontSize={18}
            text={mediaHub?.title || mediaHub?.name}
            style={{marginTop: 4, flex: 1}}
          />
          <S.BoxStar>
            <MaterialCommunityIcons name={'star'} size={RFValue(20)} color={'#FF3'}/>
            <GlobalTextComponent
              color="lightColor"
              fontFamily="poppinsMedium"
              fontSize={14}
              text={`${mediaHub?.vote_average?.toFixed(1)}/10`}
              style={{marginTop: 4, paddingLeft: 6}}
            />
          </S.BoxStar>
        </S.BoxTitle>
        <GlobalTextComponent
          color="lightColor"
          fontFamily="poppinsMedium"
          fontSize={14}
          text={`${formatYear()} ‧ ${formatGenres}${formatRuntime()}`}
          style={{paddingBottom: 16}}
        />
        {mediaHub?.overview ? (
          <GlobalTextComponent
            color="lightColor"
            fontFamily="poppinsMedium"
            fontSize={14}
            text={`${mediaHub?.overview}`}
            style={{paddingBottom: 16}}
          />
        ) : null}
        {keysWatchProviders.length ? (
          <>    
            <GlobalTextComponent
              color="lightColor"
              fontFamily="poppinsSemiBold"
              fontSize={18}
              text={`Onde posso assistir?`}
              style={{paddingBottom: 16}}
            />
            <FlatList
              data={keysWatchProviders}
              renderItem={renderItemWatchProvider}
            />
          </>
        ) : null}
        <GlobalTextComponent
          color="lightColor"
          fontFamily="poppinsSemiBold"
          fontSize={18}
          text={`Elenco`}
          style={{paddingBottom: 16}}
        />
        <FlatList
          data={cast}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={renderItemCast}
        />
      </S.MovieInfo>
    </S.Container>
  )
}