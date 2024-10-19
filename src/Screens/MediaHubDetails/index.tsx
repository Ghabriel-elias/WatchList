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
import { memo, useCallback, useMemo } from "react";
import { CastMember, MediaHubTrailerProps, ProviderProps, WatchOptions } from "./model";

const keysForWatch = {
  buy: 'Comprar',
  rent: 'Alugar',
  flatrate: 'Stream',
  ads: 'Anúncios'
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

  const renderItemIconWatchProvider = ({item}: {item: ProviderProps}) => (
    <S.ImageWatchProvider
      defaultSource={require('../../Assets/defaultImage.jpg')}
      source={{uri: `${imageUrl}${item?.logo_path}`}}
    />
  )

  const RenderItemWatchProvider = memo(({item}: {item: string}) => (
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
  ))

  const RenderItemCast = memo(({item}: {item: CastMember}) => (
    <S.BoxRenderItemCast>
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
    </S.BoxRenderItemCast>
  ))

  const RenderTrailer = memo(({item} : {item: MediaHubTrailerProps}) => (
    <S.BoxTrailers>
      <YoutubePlayer
        height={270}
        width={270}
        volume={100}
        videoId={item?.key}
      />
    </S.BoxTrailers>
  ))

  const ListImages = useCallback(() => (
    images?.length > 1 ? (
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
    )
  ), [images])

  const ListVideos = useCallback(() => {
    return (
      videos.length > 1 ? (
        <>    
          <GlobalTextComponent
            color="lightColor"
            fontFamily="poppinsSemiBold"
            fontSize={18}
            text={`Trailers`}
            style={{paddingBottom: 16}}
          />
          <S.BoxListTrailers>
            <FlashList
              data={videos}
              horizontal
              estimatedItemSize={RFValue(270)}
              estimatedListSize={{width: (videos?.length || 0) * RFValue(270), height: RFValue(270)}}
              showsHorizontalScrollIndicator={false}
              renderItem={({item}) => (
                <RenderTrailer item={item}/>
              )}
            />
          </S.BoxListTrailers>
        </>
      ) : null
    )
  }, [videos])

  const ListProviders = useCallback(() => {
    return (
      keysWatchProviders.length ? (
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
            renderItem={({item}) => (
              <RenderItemWatchProvider item={item}/>
            )}
          />
        </>
      ) : null
    )
  }, [keysWatchProviders])

  const ListCast = useCallback(() => {
    return (
      cast?.length ? (
        <>
          <GlobalTextComponent
            color="lightColor"
            fontFamily="poppinsSemiBold"
            fontSize={18}
            text={`Elenco`}
            style={{paddingBottom: 16}}
          />
          <FlashList
            data={cast}
            horizontal
            estimatedItemSize={RFValue(90)}
            contentContainerStyle={{paddingBottom: 16}}
            estimatedListSize={{width: (cast?.length || 0) * RFValue(90), height: RFValue(130)}}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => (
              <RenderItemCast item={item}/>
            )}
          />
        </>
      ) : null
    )
  }, [cast])

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
        <ListImages/>
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
          <ListVideos/>
          <ListProviders/>
          <ListCast/>
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