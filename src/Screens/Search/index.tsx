import { Dimensions, FlatList } from "react-native"
import { GlobalInput } from "../../Components/GlobalInput"
import { GlobalTextComponent } from "../../Components/GlobalTextComponent"
import * as S from './style'
import { FlashList } from "@shopify/flash-list"
import { RenderItemListShows } from "../Home/Components/RenderItemListShows"
import { useSearchController } from "./viewModel"
import { TypeOfShow } from "../Home/model"
import { imageUrl } from "../../Global/imageUrl"
import { memo } from "react"
import { CastMember } from "../MediaHubDetails/model"
import { RFValue } from "react-native-responsive-fontsize"
import { departmentFormat } from "../../Utils/mask"

export const Search = () => {

  const {
    selectedTypeOfShow,
    setSelectedTypeOfShow,
    value,
    setValue,
    debounce,
    searchMedia,
    inputRef,
    handleIcon,
    dataList,
    handleNavigateShowDetails,
    listOfTypeShows,
    navigate,
    persons,
    handleCast,
    handleTypeShow,
    refListTypeShow
  } = useSearchController()

  const renderItemTypeShow = ({item, index}: {item: TypeOfShow, index: number}) => (
    <S.ButtonRenderItem
      selected={selectedTypeOfShow?.id === item.id}
      onPress={() => {
        handleTypeShow(item, index)
      }}>
      <GlobalTextComponent
        color={selectedTypeOfShow?.id === item?.id ? 'darkColor' : 'lightColor'}
        fontFamily='poppinsMedium'
        fontSize={12}
        text={`${item.name} (${item?.data?.length})`}
      />
    </S.ButtonRenderItem>
  )

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
          text={departmentFormat[item?.known_for_department]}
          numberOfLines={2}
        />
      </S.BoxCast>
    </S.BoxRenderItemCast>
  ))

  const ListHeaderComponent = () => (
    value?.length === 0 
    ?
    <S.BoxHeaderList>
      <GlobalTextComponent
        color="lightColor"
        fontSize={16}
        fontFamily="poppinsSemiBold"
        text="Em Destaque"
      />
    </S.BoxHeaderList>
    : null 
  )

  const ListEmptyComponent = () => (
    <S.BoxEmptyComponent>
      <GlobalTextComponent
        color="lightColor"
        fontFamily="poppinsMedium"
        fontSize={13}
        textAlign="center"
        text="Não foram encontrados resultados que correspondam aos seus critérios de busca."
      />
    </S.BoxEmptyComponent>
  )

  return (
    <S.Container>
      <S.ContainerHeader>
        <S.BoxInput>
          <GlobalInput
            label="Buscar..."
            onChangeText={(term) => {
              setValue(term)
              debounce(() => {
                searchMedia(term)
              })
            }}
            value={value}
            autoFocus
            inputType="search"
            inputRef={inputRef}
            handleIcon={handleIcon}
          />
        </S.BoxInput>
        {value?.length ? (
          <FlatList
            style={{marginTop: 16}}
            data={listOfTypeShows}
            horizontal
            ref={refListTypeShow}
            keyboardShouldPersistTaps='always'
            renderItem={renderItemTypeShow}
            showsHorizontalScrollIndicator={false}
          />
        ) : null}
      </S.ContainerHeader>
      {selectedTypeOfShow?.name === 'Pessoas' ? (
         <FlashList
          scrollEnabled={!!persons?.length}
          data={persons}
          renderItem={({item}) => (
            <RenderItemCast item={item}/>
          )}
          numColumns={3}
          ListHeaderComponent={ListHeaderComponent}
          estimatedItemSize={RFValue(130)}
          ListEmptyComponent={ListEmptyComponent}
          keyboardShouldPersistTaps='always'
          estimatedListSize={{width: Dimensions.get('screen').width, height: persons?.length * RFValue(130) - 4}}
          contentContainerStyle={{paddingHorizontal: 20}}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <FlashList
          scrollEnabled={!!dataList?.length}
          data={dataList}
          renderItem={({item}) => RenderItemListShows({item, handleRenderItem: handleNavigateShowDetails, renderSkeleton: !dataList?.length})}
          numColumns={3}
          key={selectedTypeOfShow.id}
          ListHeaderComponent={ListHeaderComponent}
          estimatedItemSize={140}
          ListEmptyComponent={ListEmptyComponent}
          keyboardShouldPersistTaps='always'
          estimatedListSize={{width: Dimensions.get('screen').width, height: dataList?.length * 140 - 4}}
          contentContainerStyle={{paddingHorizontal: 20}}
          showsVerticalScrollIndicator={false}
        />
      )}
    </S.Container>
  )
}