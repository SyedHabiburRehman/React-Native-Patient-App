import React from 'react';
import { StackNavigator } from 'react-navigation';
import { Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { CardSection, Button } from '../components/common';
import SignupForm from '../components/SignupForm';
import LoginForm from '../components/LoginForm';
import DetailComponent from './screen2';
import PatientDetail from '../components/PatientDetail';
import Logout from '../components/Logout';



const RouterComponent = StackNavigator({
    Home: { screen: LoginForm },
    Signup: { screen: SignupForm },
    TabNavigator: {
        screen: DetailComponent,
        navigationOptions: ({ navigation }) => ({
            title: 'Patient Tracker',
            headerLeft: null,
            headerRight: <Logout navigation={navigation} />
        })
    },
    patientDetail: { screen: PatientDetail }

});


export default RouterComponent;