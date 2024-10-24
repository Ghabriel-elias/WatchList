import { GlobalTextComponent } from "../../Components/GlobalTextComponent";
import { IconComponent } from "./Components/IconComponent";
import * as S from './style'
import { Animated, Dimensions, FlatList, Image, TouchableOpacity, View } from "react-native";
import {MaterialCommunityIcons} from '@expo/vector-icons'
import { RFValue } from "react-native-responsive-fontsize";
import { useMediaHubDetailsController } from "./viewModel";
import { imageUrl } from "../../Global/imageUrl";
import { GlobalLoading } from "../../Components/GlobalLoading";
import { FlashList } from "@shopify/flash-list";
import { RenderItemListShows } from "../Home/Components/RenderItemListShows";
import YoutubePlayer from "react-native-youtube-iframe";
import Carousel from "react-native-reanimated-carousel";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
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
    images,
    crew,
    handleCast
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

  const RenderItemCrew = memo(({item}: {item: CastMember}) => (
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
          text={item?.job}
          numberOfLines={2}
        />
      </S.BoxCast>
    </S.BoxRenderItemCast>
  ))

  const RenderItemCast = memo(({item}: {item: CastMember}) => (
    <S.BoxRenderItemCast onPress={() => {
      handleCast(item)
    }}>
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
        width={Dimensions.get('screen').width}
        height={RFValue(200)}
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
  ), [images, mediaHub])

  const ListVideos = useCallback(() => {
    return (
      videos.length > 1 ? (
        <View style={{
          marginBottom: 16
        }}>    
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
        </View>
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

  const ListCrew = useCallback(() => {
    return (
      crew?.length ? (
        <View style={{marginTop: 16}}>
          <GlobalTextComponent
            color="lightColor"
            fontFamily="poppinsSemiBold"
            fontSize={18}
            text={`Equipe Técnica`}
            style={{paddingBottom: 16}}
          />
          <FlashList
            data={crew}
            horizontal
            estimatedItemSize={RFValue(90)}
            contentContainerStyle={{paddingBottom: 16}}
            estimatedListSize={{width: (crew?.length || 0) * RFValue(90), height: RFValue(130)}}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => (
              <RenderItemCrew item={item}/>
            )}
          />
        </View>
      ) : null
    )
  }, [crew])

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

  const [isExpanded, setIsExpanded] = useState(false);
  const heightAnim = useRef(new Animated.Value(40)).current; // Começa com altura pequena
  const opacityAnim = useRef(new Animated.Value(1)).current; // Opacidade total

  useEffect(() => {
    Animated.parallel([
      // Animação de altura para expandir ou retrair
      Animated.timing(heightAnim, {
        toValue: isExpanded ? 100 : 40, // Expande para 100, recolhe para 40
        duration: 300, // Duração da animação
        useNativeDriver: false, // Desativado para manipular altura
      }),
      // Animação de opacidade para aparecer/desaparecer suavemente
      Animated.timing(opacityAnim, {
        toValue: isExpanded ? 0.5 : 1, // Opacidade muda durante a animação
        duration: 300, 
        useNativeDriver: false, 
      }),
    ]).start();
  }, [isExpanded]);
  const handleToggleExpand = () => {
    setIsExpanded(prev => !prev);
  };


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
           <Animated.View
           style={{
             height: heightAnim, // Altura animada
            //  opacity: opacityAnim, // Opacidade animada
           }}
         >

          <TouchableOpacity 
          onPress={handleToggleExpand}
          activeOpacity={0.5}>
            <GlobalTextComponent
              color="lightColor"
              fontFamily="poppinsMedium"
              fontSize={12}
              text={mediaHub?.overview}
              numberOfLines={isExpanded ? undefined : 3} // Limitar a 3 linhas quando não expandido
              style={{ paddingBottom: 16 }}
            />
            {!isExpanded ? (
            <View
                style={{
                  width: '100%',
                  flex: 1,
                  position: 'absolute',
                  bottom: 12,
                }}
              >
                <View style={{
                  width: '100%',
                  alignItems: 'flex-end',
                  // paddingRight: 10,
                }}>
                  <GlobalTextComponent
                    color="secundaryColor" 
                    fontFamily="poppinsMedium"
                    fontSize={11}
                    text="mais"
                    style={{ 
                      backgroundColor: '#242a32f1',
                      shadowOffset: { width: 2, height: 0 },
                      padding: 4,
                      paddingHorizontal: 10
                    }}
                  />
                </View>
              </View>
            ) : null}
            {/* {isExpanded && (
              <TouchableOpacity onPress={handleToggleExpand}>
                <GlobalTextComponent
                  color="secundaryColor"
                  fontFamily="poppinsMedium"
                  fontSize={12}
                  text="Menos"
                  style={{ textDecorationLine: 'underline' }}
                />
              </TouchableOpacity>
            )} */}
          </TouchableOpacity>
         </Animated.View>
        ) : null}

          <ListVideos/>
          <ListProviders/>
          <ListCast/>
          {/* <ListCrew/> */}
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