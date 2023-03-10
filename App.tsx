import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { MainNavs, OnboardingNavs } from './navigators';
import { useFonts } from 'expo-font';

export default function App() {
  const [isOpended, setIsOpened] = useState<boolean>(false);
  const [loaded] = useFonts({
    Nunito: require('./assets/fonts/Nunito-Regular.ttf'),
    'Nunito-bold': require('./assets/fonts/Nunito-Bold.ttf'),
    Raleway: require('./assets/fonts/Raleway-Regular.ttf'),
    'Raleway-bold': require('./assets/fonts/Raleway-Bold.ttf'),
  });

  const storeDevice = async ():Promise<void> => {
    await AsyncStorage.setItem('isOpened', 'true');
  }

  const changeViews = async ():Promise<void> => {
    try {
      await storeDevice();
      setIsOpened(true);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    (async function(){
      const val = await AsyncStorage.getItem('isOpened');
      if(val != null){
        setIsOpened(true);
        console.log(val);
      }
    })();
  }, []);

  if(!loaded){
    return null;
  }

  return (
    ((isOpended)?<MainNavs />:<OnboardingNavs changeViews={changeViews} />)
  );
}
