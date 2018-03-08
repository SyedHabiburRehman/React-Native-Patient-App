import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { patientChanged, createPatient } from '../actions'
import { Card, CardSection, Input, Button, DatePicking } from './common';


const mapStateToProps = ({ patientReducer, auth }) => {
    const { _id } = auth.user;
    const { patientName, disease, medication, cost, required } = patientReducer;
    return {
        _id,
        patientName,
        disease,
        medication,
        cost,
        required
    };
};

class CreatePatient extends Component {
    static navigationOptions = {
        tabBarLabel: 'Create Patient',
    };

    constructor(props) {
        super();
        this.state = {
            // date: '',
            error: ''

        };
    }

    onButtonPress() {
        const { _id, patientName, disease, medication, cost, navigation } = this.props;
        // const date = this.state.date;

        if (patientName === '' || patientName === undefined || disease === '' || disease === undefined || medication === '' || medication === undefined || cost === '' || cost === undefined) {
            console.log('HELLOOOOOOOOOOOOOOOOOOOOOOOOOO');
            this.setState({ error: 'Something is Missing' });
        }
        else {
            this.props.createPatient({ _id, patientName, disease, medication, cost, navigation })
        }
    }


    render() {
        return (
            <Card>
                <CardSection>
                    <Input
                        label="Patient Name"
                        placeholder="John"
                        keyboardType='default'
                        onChangeText={value => this.props.patientChanged({ prop: 'patientName', value })}
                        value={this.props.patientName}
                    />
                </CardSection>

                <CardSection>
                    <Input
                        label="Disease"
                        placeholder="Cancer"
                        keyboardType='default'
                        onChangeText={value => this.props.patientChanged({ prop: 'disease', value })}
                        value={this.props.disease}
                    />
                </CardSection>
                <CardSection>
                    <Input
                        label="Medication"
                        placeholder="Risek"
                        keyboardType='default'
                        onChangeText={value => this.props.patientChanged({ prop: 'medication', value })}
                        value={this.props.medication}
                    />
                </CardSection>

                <CardSection>
                    <Input
                        label="Cost"
                        placeholder="Price"
                        keyboardType='numbers-and-punctuation'
                        onChangeText={value => this.props.patientChanged({ prop: 'cost', value })}
                        value={this.props.cost}
                    />
                </CardSection>

                /* <CardSection>
                    <DatePicking
                        onDateChange={(date) => {
                            this.setState({ date: date });
                            console.log(this.state.date)
                        }}
                        date={this.state.date}
                        mode="date"
                        placeholder="MM/DD/YYYY"
                        format="MM/DD/YYYY"
                        minDate="01/01/2016"
                        /* maxDate="2016-06-01" */
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: {
                                marginLeft: 36
                            }
                        }}
                    />
                </CardSection> */

                <CardSection>
                    <Text>{this.state.error}</Text>
                </CardSection>



                <CardSection>
                    <Button onPress={this.onButtonPress.bind(this)}>
                        Add Patient
                    </Button>
                </CardSection>
            </Card>
        )
    }
}


export default connect(mapStateToProps, { patientChanged, createPatient })(CreatePatient);