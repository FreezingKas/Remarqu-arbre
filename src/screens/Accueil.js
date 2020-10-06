import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button, TextInput, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {Modalize} from 'react-native-modalize';
import data from '../helpers/Arbre';
import MyMap from '../components/MyMap';
import Modal from 'react-native-modal';

import { Title } from 'react-native-paper';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';


import ListItem from '../components/ListItem';



class Accueil extends React.Component {


  constructor(props) {
    super(props)
    modalizeRef = React.createRef()
  }

  onOpen = () => {
    modalizeRef.current?.open();
  };
    
  renderItem = (item) => (
    <View style={styles.itemArbre}>
      <View style={{flexDirection: 'row'}}>
        <Image
          style={styles.image}
          source={item.photo}
        />
        <View style={styles.textArbreItem}>
          <Text style={styles.nomArbreItem}>{item.nom}</Text>
          <Text>{item.date}</Text>
        </View>
      </View>
      <View style={{alignItems: 'center'}}>
        <View
          style={{
            backgroundColor: 'black',
            width: 60,
            height: 2,
            marginTop: 5,
            marginBottom: 5,
          }}
        ></View>
      </View>
    </View>
  );
  
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <MyMap></MyMap>
        <Button
          //onPress={() => this.props.navigation.navigate("Scan")}
          onPress={() => this.onOpen()}
          title="Historique"
        />
        <Button
          onPress={() => this.props.navigation.navigate("Scan")}
          title="Scan"
        />


        <Modalize
          ref={modalizeRef}
          flatListProps={{
            style: styles.flatlist,
            data: data,
            keyExtractor: (item) => item.id.toString(),
            renderItem: ({item}) => (
              <ListItem
                item={item}
                nav={this.props.navigation}
              />
            ),
          }}
          modalHeight={500}
          HeaderComponent={
            <View>
              <TextInput style={styles.search} placeholder='Ceci est un TextInput'/>
            </View>
          }
        />
          

            <Modal isVisible={false} style={{backgroundColor: "white", borderRadius: 10}}>
              <View style={{flex: 1, justifyContent:'center', alignItems:'center'}}>
                <View style={styles.container1}>
                  <Title style={styles.titleText}>Welcome to Chat app</Title>
                  <FormInput
                    labelName='Email'
                    
                    autoCapitalize='none'
                    
                  />
                  <FormInput
                    labelName='Password'
                    
                    secureTextEntry={true}
                    
                  />
                  <FormButton
                    title='Login'
                    modeValue='contained'
                    labelStyle={styles.loginButtonLabel}
                  />
                  <FormButton
                    title='New user? Join here'
                    modeValue='text'
                    uppercase={false}
                    labelStyle={styles.navButtonText}
                  />
                </View>
              </View>
            </Modal>
          
        



      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop:20,
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  search: {
    margin: 20,
    borderColor: 'gray',
    borderWidth: StyleSheet.hairlineWidth,
    height: 40,
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 32
  },
  itemArbre: {
    marginTop: 5,
    marginBottom: 5,
  },
  flatlist: {
    marginLeft: 10,
    marginRight: 10
  },
  textArbreItem: {
    justifyContent: 'center',
    marginLeft: 5
  },
  nomArbreItem: {
    fontSize: 20
  },


  container1: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleText: {
    fontSize: 24,
    marginBottom: 10
  },
  loginButtonLabel: {
    fontSize: 22
  },
  navButtonText: {
    fontSize: 16
  }
})

export default Accueil
