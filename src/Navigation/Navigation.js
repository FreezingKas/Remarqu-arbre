import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Accueil from '../Screens/Accueil';
import ArbreItem from '../Screens/ArbreItem';
import Scan from '../Screens/Scan';


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
  Scan: {
    screen: Scan,
    navigationOptions: {
      headerShown: false
    }
  }
})

export default createAppContainer(SearchStackNavigator)
