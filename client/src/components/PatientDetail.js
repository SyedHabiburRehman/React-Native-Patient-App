import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { CardSection } from './common';

class PatientDetail extends Component {
    static navigationOptions = {
        title: 'Patient Detail',
    };

    render() {
        console.log('patient Detail')
        console.log(this.props.navigation.state.params);
        const { params } = this.props.navigation.state;
        const { containerStyle, nestedContainerStyle, labelStyle, textStyle } = styles;
        return (
            <CardSection>
                <View style={containerStyle}>
                    <View style={nestedContainerStyle}>
                        <Text style={labelStyle}>Name:</Text>
                        <Text style={textStyle}>
                            {params.patientName}
                        </Text>
                    </View>

                    <View style={nestedContainerStyle}>
                        <Text style={labelStyle}>Disease:</Text>
                        <Text style={textStyle}>
                            {params.disease}
                        </Text>
                    </View>

                    <View style={nestedContainerStyle}>
                        <Text style={labelStyle}>Medication:</Text>
                        <Text style={textStyle}>
                            {params.medication}
                        </Text>
                    </View>

                    <View style={nestedContainerStyle}>
                        <Text style={labelStyle}>Date:</Text>
                        <Text style={textStyle}>
                            {params.date}
                        </Text>
                    </View>
                </View>
            </CardSection>
        );
    };
}
const styles = {
    containerStyle: {
        flex: 1,
        flexDirection: 'column',
        // alignItems: 'space-around'
    },
    nestedContainerStyle: {
        flexDirection: 'row',
    },

    labelStyle: {
        // flex: 1,
        fontSize: 20,
        paddingLeft: 10
    },
    textStyle: {
        // flex: 2,
        fontSize: 20,
        paddingLeft: 10,

    }
}

export default PatientDetail;