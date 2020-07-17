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
  } from 'react-native';
import { Header, ButtonGroup, Icon, SearchBar, Button} from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

const component1 = () => <Icon raised name='search' type='font-awesome' color='#2089dc' onPress={() => Actions.search()} />
const component2 = () => <Icon raised name='camera' type='font-awesome' color='#2089dc' onPress={() => Actions.cam()} />
const component3 = () => <Icon raised name='list' type='font-awesome' color='#2089dc' onPress={() => Actions.logs()} />

export default class Search extends Component{
    state = {
        selectedIndex: 0,
        search: '',
        result: [],
        record: null
    };

    updateIndex = (selectedIndex) => {
        this.setState({selectedIndex: selectedIndex})
    }

    updateResult = (result) => {
        this.setState({record: result[0]})
    }

    onSubmit = () => {
        fetch('https://records-api-lhzq3o43pa-de.a.run.app/'+this.state.search).then(response => response.json())
        .then((responseJson) => {this.updateResult(responseJson.data)});
    }

    updateSearch = (search) => {
        this.setState({ search });
    };

    render(){
        const buttons = [{ element: component1 }, { element: component2 }, { element: component3 }]
        const {selectedIndex, search, record} = this.state
        return(
            <View style={{flex: 1, justifyContent: 'space-between'}}>
            {<Header
                centerComponent={{ text: 'Search', style: { color: '#fff', fontSize: 25 } }}
            />}
            <SearchBar
                placeholder="Example: AAQ-730"
                onChangeText={this.updateSearch}
                value={search}
                lightTheme={true}
            />
            <Button title="Submit" onPress={this.onSubmit} />
            <Text>{record ? "- Number Plate: "+record.number_plate: ""}</Text>
            <Text>{record ? "- Owner Name: "+record.owner_name: ""}</Text>
            <Text>{record ? "- Registration Date: "+record.registration_date.substr(0, 10): ""}</Text>
            <Text>{record ? "- Engine No.: "+record.engine_no: ""}</Text>
            <Text>{record ? "- Body Type: "+record.body_type: ""}</Text>
            <Text>{record ? "- Model Year: "+record.model_year: ""}</Text>
            <Text>{record ? "- Seating Capacity: "+record.seating_capacity: ""}</Text>
            <Text>{record ? "- Horse Power: "+record.horse_power: ""}</Text>
            <Text>{record ? "- Make: "+record.make: ""}</Text>
            <Text>{record ? "- Tax Payment: "+record.tax_payment.substr(0, 10): ""}</Text>
            <Text>{record ? (record.cplc_clear==0 ? "- CPLC Clear: No": "- CPLC Clear: Yes"): ""}</Text>
            <ButtonGroup
                onPress={this.updateIndex}
                selectedIndex={selectedIndex}
                buttons={buttons}
                containerStyle={{height: 60}} />
            </View>
        );
    }
};