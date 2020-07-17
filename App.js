import React, { Component } from 'react'
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
} from 'react-native'
import Camera, {
  Aspect,
  CaptureQuality,
  TorchMode,
  RotateMode,
  takePicture,
} from 'react-native-openalpr'
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions'
import { Header, ButtonGroup, Icon } from 'react-native-elements';
import { Router, Scene, Stack, Actions } from 'react-native-router-flux';
import Cam from './components/cam.component';
import Logs from './components/logs.component';
import Search from './components/search.component';

export default class App extends Component {
  
    render(){
      return(
        <Router>
          <Stack key="root">
            <Scene key="cam" component={Cam} title="Camera" hideNavBar={true} initial  />
            <Scene key="logs" component={Logs} title="Logs" hideNavBar={true} />
            <Scene key="search" component={Search} title="Search" hideNavBar={true} />
          </Stack>
        </Router>
      );
    }
}