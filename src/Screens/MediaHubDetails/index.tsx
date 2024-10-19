import { GlobalTextComponent } from "../../Components/GlobalTextComponent";
import { IconComponent } from "./Components/IconComponent";
import * as S from './style'
import { Dimensions, FlatList, Image, View } from "react-native";
import {MaterialCommunityIcons} from '@expo/vector-icons'
import { RFValue } from "react-native-responsive-fontsize";
import { useMediaHubDetailsController } from "./viewModel";
import { imageUrl } from "../../Global/imageUrl";
import { GlobalLoading } from "../../Components/GlobalLoading";
import { FlashList } from "@shopify/flash-list";
import { RenderItemListShows } from "../Home/Components/RenderItemListShows";
import YoutubePlayer from "react-native-youtube-iframe";
import Carousel from "react-native-reanimated-carousel";

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
    watchProviders,
    notRelease,
    loading,
    similar,
    handleNavigateShowDetails,
    videos,
    images
  } = useMediaHubDetailsController()

  const renderItemIconWatchProvider = ({item}: any) => (
    <S.ImageWatchProvider
      defaultSource={require('../../Assets/defaultImage.jpg')}
      source={{uri: `${imageUrl}${item?.logo_path}`}}
    />
  )

  const renderItemWatchProvider = ({item}: any) => (
    <S.BoxListWatchProvider>
      <GlobalTextComponent
        color="lightColor"
        fontFamily="poppinsSemiBold"
        fontSize={14}
        text={keysForWatch[item] || item}
        style={{paddingBottom: 16}}
      />       
      <FlatList
        data={watchProviders[item]}
        horizontal
        renderItem={renderItemIconWatchProvider}
      />     
    </S.BoxListWatchProvider>
  )

  const renderItemCast = ({item}: any) => (
    <View>
      <S.ImageCast
        defaultSource={require('../../Assets/defaultImage.jpg')}
        source={{uri: `${imageUrl}${item?.profile_path}`}}
      />
      <S.BoxCast>
        <GlobalTextComponent
          color="lightColor"
          fontFamily="poppinsMedium"
          fontSize={10}
          text={item?.name}
          numberOfLines={2}
          style={{paddingBottom: 8}}
        />
        <GlobalTextComponent
          color="lightColor"
          fontFamily="poppinsRegular"
          fontSize={9}
          text={item?.character}
          numberOfLines={2}
        />
      </S.BoxCast>
    </View>
  )

  if(loading) {
    return (
      <GlobalLoading/>
    )
  }

  return (
    <S.Container showsVerticalScrollIndicator={false}> 
      <S.Header>
        <IconComponent handleButton={goBack} iconName="arrow-left"/>
        <IconComponent handleButton={favoriteShow} iconName={showFavorited ? "cards-heart" : "cards-heart-outline"}/>
      </S.Header>
      {images?.length > 1 ? (
        <Carousel
          testID={"xxx"}
          loop={true}
          width={430}
          height={258}
          snapEnabled={true}
          pagingEnabled={true}
          autoPlay={true}
          autoPlayInterval={2000}
          data={images}
          renderItem={({item}) => {
            return (
              <S.CoverImage
                resizeMode="stretch"
                defaultSource={require('../../Assets/defaultImage.jpg')}
                source={{uri: `${imageUrl}${item?.file_path}`}}
              />
            )
          }}
        />
      ) : (
        <S.CoverImage
          resizeMode="stretch"
          defaultSource={require('../../Assets/defaultImage.jpg')}
          source={{uri: `${imageUrl}${mediaHub?.backdrop_path}`}}
        />
      )}
      <S.MovieInfo>
        <S.BoxTitle>
          <GlobalTextComponent
            color="lightColor"
            fontFamily="poppinsSemiBold"
            fontSize={18}
            text={mediaHub?.title || mediaHub?.name}
            style={{marginTop: 4, width: '75%'}}
          />
          {notRelease ? null : (
            <S.BoxStar>
              <MaterialCommunityIcons name={'star'} size={RFValue(20)} color={'#FF3'}/>
              <GlobalTextComponent
                color="lightColor"
                fontFamily="poppinsMedium"
                fontSize={14}
                text={`${mediaHub?.vote_average?.toFixed(1)}/10`}
                style={{marginTop: 6, paddingLeft: 6}}
              />
            </S.BoxStar>
          )}
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
            fontSize={12}
            text={`${mediaHub?.overview}`}
            style={{paddingBottom: 16}}
          />
        ) : null}
        <>    
          <GlobalTextComponent
            color="lightColor"
            fontFamily="poppinsSemiBold"
            fontSize={18}
            text={`Trailers`}
            style={{paddingBottom: 16}}
          />
          <FlatList
            data={videos}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{
              width: '100%',
              height: RFValue(135)
            }}
            renderItem={({item}) => {
              return (
                <View style={{
                  marginRight: 10,
                }}>
                  <YoutubePlayer
                    height={270}
                    width={270}
                    volume={100}
                    videoId={item?.key}
                  />
                </View>
              )
            }}
          />
        </>
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
        {cast?.length ? (
          <>
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
              style={{paddingBottom: 16}}
            />
          </>
        ) : null}
        {/* {similar?.length > 1 ? (
          <>
            <GlobalTextComponent
              color="lightColor"
              fontFamily="poppinsSemiBold"
              fontSize={18}
              text={`Similares`}
              style={{paddingBottom: 16}}
            />
            <View style={{
              height: RFValue(160),
              width: '100%',
              marginLeft: -4
            }}>
            <FlatList
              scrollEnabled={!!similar?.length}
              data={similar}
              renderItem={({item}) => (
                <View style={{
                  width: RFValue(100),
                  height: RFValue(80),
                }}>
                  {RenderItemListShows({item, handleRenderItem: handleNavigateShowDetails, renderSkeleton: !similar?.length})}
                </View>
              )}
              keyboardShouldPersistTaps='always'
              horizontal
              showsHorizontalScrollIndicator={false}
            />
            </View>
          </>
        ) : null} */}
      </S.MovieInfo>
    </S.Container>
  )
}