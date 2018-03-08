import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { CardSection } from './common';

class PatientListItem extends Component {

    render() {
        const { patientName, date } = this.props.patient;
        const { navigation } = this.props.navigation;
        const { containerStyle, titleStyle, dateStyle } = styles
        console.log('---------', navigation);
        console.log('---------', this.props);
        console.log('---------', date);
        return (

            <TouchableOpacity onPress={() => navigation.navigate('patientDetail', this.props.patient)}>
                <View>
                    <CardSection>
                        <View style={containerStyle}>
                            <Text style={titleStyle}>
                                {patientName}
                            </Text>
                            <Text style={dateStyle}>
                                {date}
                            </Text>
                        </View>
                    </CardSection>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = {
    containerStyle: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingLeft: 15,
    },
    titleStyle: {
        color: 'black', 
        fontSize: 18,
        height: 40
    },
    dateStyle: {
        fontSize: 12,
    }
};

export default PatientListItem;