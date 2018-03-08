import { PATIENT_CHANGED, PATIENT_CREATE_SUCCESSFULL, PATIENTS_FETCH_SUCCESSFULL, INPUT_FIELD_MISSING, LOGOUT } from '../actions/types';

const INITIAL_STATE = {
    patientList: [],
    patientName: '',
    disease: '',
    medication: '',
    cost: '',
    required: ''
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PATIENT_CHANGED:
            return { ...state, [action.payload.prop]: action.payload.value };
        case PATIENT_CREATE_SUCCESSFULL:
            console.log('create succesful');
            return INITIAL_STATE;
        case PATIENTS_FETCH_SUCCESSFULL:
            console.log('fetch succesful');
            return { ...state, patientList: action.payload };
        case INPUT_FIELD_MISSING:
            return { ...state, required: 'Something is Missing', patientName: action.payload.patientName, disease: action.payload.disease, medication: action.payload.medication, cost: action.payload.cost };
        case LOGOUT:
            return { ...state, ...INITIAL_STATE };
        default:
            return state;
    }
};