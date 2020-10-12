import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

import DropDownItem from 'react-native-drop-down-item';

import essenceData from '../helpers/EssenceArbre'

const IC_ARR_DOWN = require('../Ressources/Images/ic_arr_down.png');
const IC_ARR_UP = require('../Ressources/Images/ic_arr_up.png');

class MoreInfo extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            contents: essenceData
        }
    }

  render() {
    return (
        <View style={styles.container}>
        <ScrollView style={{ alignSelf: 'stretch' }}>
          {
            this.state.contents
              ? this.state.contents.map((param, i) => {
                return (
                  <DropDownItem
                    key={i}
                    style={styles.dropDownItem}
                    contentVisible={false}
                    invisibleImage={IC_ARR_DOWN}
                    visibleImage={IC_ARR_UP}
                    header={
                      <View>
                        <Text style={styles.title}>{param.title}</Text>
                      </View>
                    }
                  >
                    <Text style={[styles.txt,{fontSize: 20,}]}>{param.body}</Text>
                  </DropDownItem>
                );
              })
              : null
          }
          <View style={{ height: 96 }}/>
        </ScrollView>
      </View>
    )}
}



const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    fontSize: 22,
    color: 'black',
    fontWeight: 'bold'
  },
  header: {
    width: '100%',
    paddingVertical: 8,
    paddingHorizontal: 12,
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTxt: {
    fontSize: 12,
    color: 'rgb(74,74,74)',
    marginRight: 60,
    flexWrap: 'wrap',
  },
  txt: {
    fontSize: 14,
  },
});

export default MoreInfo
