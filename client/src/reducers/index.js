import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import PatientReducer from './PatientReducer';


export default combineReducers({
    auth: AuthReducer,
    patientReducer: PatientReducer,

});

