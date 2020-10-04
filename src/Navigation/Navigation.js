import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Accueil from '../screens/Accueil';
import ArbreItem from '../screens/ArbreItem';
import Historique from '../screens/Historique';
import Scan from '../screens/Scan';
import LoginScreen from '../screens/LoginScreen';

const SearchStackNavigator = createStackNavigator({
  Accueil: {
    screen: Accueil,
    navigationOptions: {
      headerShown: false
    }
  },
  ArbreItem: {
    screen: ArbreItem,
    navigationOptions: {
      headerShown: false
    }
  },
  Historique: {
    screen: Historique,
    navigationOptions: {
      headerShown: false
    }
  },
  Scan: {
    screen: Scan,
    navigationOptions: {
      headerShown: false
    }
  },
  LoginScreen: {
    screen: LoginScreen,
    navigationOptions: {
      headerShown: false
    }
  }
})

export default createAppContainer(SearchStackNavigator)
