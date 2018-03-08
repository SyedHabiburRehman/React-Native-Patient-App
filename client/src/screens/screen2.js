import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import PatientList from '../components/PatientList';
import CreatePatient from '../components/CreatePatient';
// import PatientDetail from '../components/PatientDetail';


const DetailComponent = TabNavigator({

    Patient: { screen: PatientList },
    FormPatient: { screen: CreatePatient },
    // stackNavigator: { screen: DetailPatient }
}
    // {
    //     initialRouteName: 'Patient'
    // }
)

// const DetailPatient = StackNavigator({
//     Main: { screen: DetailComponent },
//     patientDetail: { screen: PatientDetail }
// })

export default DetailComponent;