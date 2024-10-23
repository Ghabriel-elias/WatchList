import { useCallback, useEffect, useState } from 'react'
import * as S from './style'
import { GlobalLoading } from '../../Components/GlobalLoading'
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native'
import { getPerson, getPersonCreditsRequest } from '../../Services/api'
import { BackHandler, Dimensions, Image, View } from 'react-native'
import { imageUrl } from '../../Global/imageUrl'
import { PersonProps } from './model'
import { RFValue } from 'react-native-responsive-fontsize'
import { GlobalTextComponent } from '../../Components/GlobalTextComponent'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import { FlatList } from 'react-native-gesture-handler'
import { ShowProps, TypeOfShow } from '../Home/model'
import { RenderItemListShows } from '../Home/Components/RenderItemListShows'
import { FlashList } from '@shopify/flash-list'
import { departmentFormat } from '../../Utils/mask'

const genderFormat = {
  0: 'Não definido / Não especificado',
  1: 'Feminino',
  2: 'Masculino',
  3: 'Não-binário'
};

export const PersonDetails = () => {

  const [loading, setLoading] = useState(true)
  const [personDetails, setPersonDetails] = useState<PersonProps>()
  const {params} = useRoute()
  const {push} = useNavigation()
  dayjs.locale('pt-br');
  const [series, setSeries] = useState([])
  const [movies, setMovies] = useState([])
  const listOfTypeShows: TypeOfShow[] = [
    {id: 0, name: 'Filmes', data: movies},
    {id: 1, name: 'Séries', data: series},
  ]
  const [selectedTypeOfShow, setSelectedTypeOfShow] = useState<TypeOfShow>(listOfTypeShows[0])
  const dataList = selectedTypeOfShow?.name === 'Filmes' ? movies : series

  function handleNavigateShowDetails(item: ShowProps) {
    push('MediaHubDetails', {item, update: true, selectedTypeOfShow: selectedTypeOfShow?.name === 'Filmes' ? 'movie' : 'tv'})
  }

  async function getPersonDetails() {
    setLoading(true)
    const response = await getPerson(params?.id)
    if(response) {
      setPersonDetails(response)
    }
  }

  async function getPersonCredits() {
    const response = await getPersonCreditsRequest(params?.id)
    if(response) {
      setMovies(response?.movies)
      setSeries(response?.series)
    }
    setLoading(false)
  }

  const formatBirthday = (): string => {
    const birthday = personDetails?.birthday
    const formattedDate = dayjs(birthday).format('DD [de] MMMM [de] YYYY');
    const age = dayjs().diff(dayjs(birthday), 'year');
    return `${formattedDate} (${age} de Idade)`;
  };


  const renderItemTypeShow = ({item}: {item: TypeOfShow}) => (
    <S.ButtonRenderItem
      selected={selectedTypeOfShow?.id === item.id}
      onPress={() => {
        setSelectedTypeOfShow(item)
      }}>
      <GlobalTextComponent
        color={selectedTypeOfShow?.id === item?.id ? 'darkColor' : 'lightColor'}
        fontFamily='poppinsMedium'
        fontSize={12}
        text={`${item.name} (${item?.data?.length})`}
      />
    </S.ButtonRenderItem>
  )

  useEffect(() => {
    getPersonDetails()
    getPersonCredits()
  }, [])

  if(loading) {
    return (
      <GlobalLoading/>
    )
  }

  return (
    <S.Container showsVerticalScrollIndicator={false}>
      <View style={{padding: 20}}>
        <View style={{
          flexDirection: 'row',
          width: '100%',
        }}> 
          <View>
            <Image
              width={RFValue(90)}
              height={RFValue(150)}
              resizeMode='cover'
              style={{
                borderRadius: 8,
              }}
              defaultSource={require('../../Assets/defaultImage.jpg')}
              source={{uri: `${imageUrl}${personDetails?.profile_path}`}}
            />

          </View>
          <View style={{
            paddingLeft: 16,
            flex: 1,
          }}> 
            <GlobalTextComponent
              color='lightColor'
              fontFamily='poppinsSemiBold'
              fontSize={18}
              text={personDetails?.name || ''}
              style={{marginBottom: 10}}
            />
            <GlobalTextComponent
              color='lightColor'
              fontFamily='poppinsMedium'
              fontSize={12}
              text={`Conhecido(a) por: ${departmentFormat[personDetails?.known_for_department] || personDetails?.known_for_department}`}
              style={{marginBottom: 10}}
            />
            <GlobalTextComponent
              color='lightColor'
              fontFamily='poppinsMedium'
              fontSize={12}
              text={`Gênero: ${genderFormat[personDetails?.gender]}`}
              style={{marginBottom: 10}}
            />
            <GlobalTextComponent
              color='lightColor'
              fontFamily='poppinsMedium'
              fontSize={12}
              text={`Nascimento: ${formatBirthday()}`}
              style={{marginBottom: 10}}
            />
            {personDetails?.place_of_birth ? (
              <GlobalTextComponent
                color='lightColor'
                fontFamily='poppinsMedium'
                fontSize={12}
                text={`Local de nascimento: ${personDetails?.place_of_birth}`}
                style={{marginBottom: 10}}
              />
            ) : null}
          </View>
        </View>
        {personDetails?.biography ? (
          <>
            <GlobalTextComponent
              color='lightColor'
              fontFamily='poppinsMedium'
              fontSize={16}
              text={`Biografia`}
              style={{marginTop: 16}}
            />
            <GlobalTextComponent
              color='lightColor'
              fontFamily='poppinsMedium'
              fontSize={11}
              text={personDetails?.biography || ''}
              style={{marginTop: 16}}
            />
          </>
        ) : null}
        <FlatList
          style={{marginTop: 16}}
          data={listOfTypeShows}
          horizontal
          keyboardShouldPersistTaps='always'
          renderItem={renderItemTypeShow}
        />
      </View>
      <FlashList
        scrollEnabled={!!dataList?.length}
        data={dataList}
        key={selectedTypeOfShow.id}
        renderItem={({item}) => RenderItemListShows({item, handleRenderItem: handleNavigateShowDetails, renderSkeleton: !dataList?.length})}
        numColumns={3}
        estimatedItemSize={140}
        keyboardShouldPersistTaps='always'
        estimatedListSize={{width: Dimensions.get('screen').width, height: dataList?.length * 140 - 4}}
        contentContainerStyle={{paddingHorizontal: 20}}
        showsVerticalScrollIndicator={false}
      />
    </S.Container>
  )
}