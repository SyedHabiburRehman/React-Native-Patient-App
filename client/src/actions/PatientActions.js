import axios from 'axios';
import _ from 'lodash';
import { PATIENT_CHANGED, PATIENT_CREATE_SUCCESSFULL, PATIENTS_FETCH_SUCCESSFULL, INPUT_FIELD_MISSING } from './types';

export const patientChanged = ({ prop, value }) => {
    return {
        type: PATIENT_CHANGED,
        payload: { prop, value }
    };
};

export const createPatient = ({ _id, patientName, disease, medication, cost, navigation }) => {
    console.log('---------', navigation.navigate)

    patientName = patientName.toLowerCase().replace(/[a-z]/, function (letter) {
        return letter.toUpperCase();
    })
    const date = new Date().toLocaleDateString();
    console.log('++++++++++++++++++++++++', patientName, date);
    return (dispatch) => {
        axios.post('https://patienttrackingapp.herokuapp.com/api/createPatient', { _id, patientName, disease, medication, cost, date })
            .then((response) => {
                console.log(response)
                dispatch({ type: PATIENT_CREATE_SUCCESSFULL });
                axios.post('https://patienttrackingapp.herokuapp.com/api/getPatient', { _id })
                    .then((patients) => {
                        console.log(patients.data)
                        dispatch({ type: PATIENTS_FETCH_SUCCESSFULL, payload: patients.data });
                        navigation.navigate('Patient');
                    });
            });
    };
}

export const fetchPatients = (_id) => {
    console.log("fetchinggggggggggggggggggggg");
    console.log(_id);
    return (dispatch) => {
        axios.post('https://patienttrackingapp.herokuapp.com/api/getPatient', { _id })
            .then((patients) => {
                console.log(patients.data)
                dispatch({ type: PATIENTS_FETCH_SUCCESSFULL, payload: patients.data });
            });
    };
}

export const inputFieldMissing = ({ patientName, disease, medication, cost }) => {
    return {
        type: INPUT_FIELD_MISSING,
        payload: { patientName, disease, medication, cost }
    };
}