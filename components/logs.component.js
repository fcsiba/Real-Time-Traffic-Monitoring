import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Switch,
    Picker,
    StatusBar,
    ScrollView,
    Platform,
    Image,
    Dimensions,
    AsyncStorage
  } from 'react-native';
import { Header, ButtonGroup, Icon, Button } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

const component1 = () => <Icon raised name='search' type='font-awesome' color='#2089dc' onPress={() => Actions.search()} />
const component2 = () => <Icon raised name='camera' type='font-awesome' color='#2089dc' onPress={() => Actions.cam()} />
const component3 = () => <Icon raised name='list' type='font-awesome' color='#2089dc' onPress={() => Actions.logs()} />

export default class Log extends Component{
    state = {
        selectedIndex: 2,
        log_arr: ''
    };

    updateIndex = (selectedIndex) => {
        this.setState({selectedIndex: selectedIndex})
    }

    async componentDidMount() {
        AsyncStorage.getItem('dataarray', (err, result) => {this.setState({log_arr: result})});
    }

    clearLogs = () => {
        AsyncStorage.removeItem('dataarray');
        this.setState({log_arr: ''});
    }

    render(){
        const buttons = [{ element: component1 }, { element: component2 }, { element: component3 }]
        const {selectedIndex, log_arr} = this.state
        return(
            <View style={{flex: 1, justifyContent: 'space-between'}}>
            {<Header
                centerComponent={{ text: 'Logs', style: { color: '#fff', fontSize: 25 } }}
            />}
            <ScrollView><Text>{log_arr ? log_arr : ""}</Text></ScrollView>
            <Button title="Clear Logs" onPress={this.clearLogs} />
            <ButtonGroup
                onPress={this.updateIndex}
                selectedIndex={selectedIndex}
                buttons={buttons}
                containerStyle={{height: 60}} />
            </View>
        );
    }
};