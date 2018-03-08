import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { logout } from '../actions';
import { NavigationActions } from 'react-navigation';


class Logout extends Component {
    // resetNavigation = (targetRoute) => {
    //     console.log(this.props);
    //     const resetAction = NavigationActions.reset({
    //         index: 0,
    //         actions: [
    //             NavigationActions.navigate({ routeName: targetRoute }),
    //         ],
    //     });
    //     this.props.navigation.dispatch(resetAction);
    // };

    render() {
        return (
            <TouchableOpacity
                onPress={() => this.props.logout(this.props)}
            >
                <Text>
                    Logout
                </Text>
            </TouchableOpacity >
        );
    }
};

export default connect(null, { logout })(Logout);