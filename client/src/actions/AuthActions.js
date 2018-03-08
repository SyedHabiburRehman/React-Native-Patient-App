import axios from 'axios';
import { NavigationActions } from 'react-navigation';

import {
    USER_CHANGED,
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    SIGNUP_USER,
    SIGNUP_USER_SUCCESS,
    SIGNUP_USER_FAIL,
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGOUT
} from './types';



export const userChanged = ({ prop, value }) => {
    return {
        type: USER_CHANGED,
        payload: { prop, value }
    }
}

export const emailChanged = (text) => {
    return {
        type: EMAIL_CHANGED,
        payload: text
    };
}

export const passwordChange = (password) => {
    return {
        type: PASSWORD_CHANGED,
        payload: password
    };
}

export const loginUser = ({ email, password, navigation }) => {
    return (dispatch) => {
        console.log(email, password);
        dispatch({ type: LOGIN_USER });

        axios.post('https://patienttrackingapp.herokuapp.com/api/login', { email, password })
            .then((response) => {
                console.log(response.data);
                if (response.status === 200 && response.data.error === undefined) {
                    console.log(response.data);
                    dispatch(loginUserSuccess(response.data));
                    navigation.navigate('Patient');
                } else  {
                    console.log(response.data.error);
                    loginUserFail(dispatch);
                }

            })
            .catch((error) => {
                console.log('ERROR', error);
                loginUserFail(dispatch);
            });
    };
};

const loginUserFail = (dispatch) => {
    dispatch({
        type: LOGIN_USER_FAIL,
    });
};

const loginUserSuccess = (user) => {

    return {
        type: LOGIN_USER_SUCCESS,
        payload: user
    };

};

export const SignupUser = ({ name, email, password, navigation }) => {
    return (dispatch) => {
        console.log(email, password);
        dispatch({ type: SIGNUP_USER });

        axios.post('https://patienttrackingapp.herokuapp.com/api/signup', { name, email, password })
            .then((response) => {
                console.log('RESPONSE OF SIGNUP MIDDLEWARE', response)
                if (response.status === 200 && response.data.error === undefined) {
                    console.log(response.data);
                    dispatch(signupUserSuccess(response.data));
                    navigation.navigate('Home');
                } else if (response.data.error) {
                    signupUserFail(dispatch);
                }
            })
            .catch((error) => {
                console.log('ERROR', error);
                signupUserFail(dispatch);
            });
    };
};

const signupUserSuccess = (user) => {
    return {
        type: SIGNUP_USER_SUCCESS,
        payload: user
    };

};

const signupUserFail = (dispatch) => {
    dispatch({
        type: SIGNUP_USER_FAIL,
    });
};


export const logout = (props) => {
    console.log(props)
    return (dispatch) => {
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'Home' }),
            ],
        });
        props.navigation.dispatch(resetAction);

        dispatch({ type: LOGOUT });
    };
};