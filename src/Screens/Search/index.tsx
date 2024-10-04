import { Dimensions, FlatList } from "react-native"
import { GlobalInput } from "../../Components/GlobalInput"
import { GlobalTextComponent } from "../../Components/GlobalTextComponent"
import * as S from './style'
import { FlashList } from "@shopify/flash-list"
import { RenderItemListShows } from "../Home/Components/RenderItemListShows"
import { useSearchController } from "./viewModel"

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
    listOfTypeShows
  } = useSearchController()

  const renderItemTypeShow = ({item}: any) => (
    <S.ButtonRenderItem
      selected={selectedTypeOfShow?.id === item.id}
      onPress={() => {
        setSelectedTypeOfShow(item)
      }}>
      <GlobalTextComponent
        color={selectedTypeOfShow?.id === item?.id ? 'darkColor' : 'lightColor'}
        fontFamily='poppinsMedium'
        fontSize={12}
        text={item.name}
      />
    </S.ButtonRenderItem>
  )

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
            keyboardShouldPersistTaps='always'
            renderItem={renderItemTypeShow}
          />
        ) : null}
      </S.ContainerHeader>
      <FlashList
        scrollEnabled={!!dataList?.length}
        data={dataList}
        renderItem={({item}) => RenderItemListShows({item, handleRenderItem: handleNavigateShowDetails, renderSkeleton: !dataList?.length})}
        numColumns={3}
        ListHeaderComponent={ListHeaderComponent}
        estimatedItemSize={140}
        ListEmptyComponent={ListEmptyComponent}
        keyboardShouldPersistTaps='always'
        estimatedListSize={{width: Dimensions.get('screen').width, height: dataList?.length * 140 - 4}}
        contentContainerStyle={{paddingHorizontal: 20}}
        showsVerticalScrollIndicator={false}
      />
    </S.Container>
  )
}