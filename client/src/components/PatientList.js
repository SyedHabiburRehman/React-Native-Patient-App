import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView, TouchableOpacity, View, Text, Picker } from 'react-native';
import { DatePicking } from './common';
import { SearchBar } from 'react-native-elements'
import { fetchPatients } from '../actions';
import PatientListItem from './PatientListItem';


const mapStateToProps = ({ patientReducer, auth }) => {
    console.log(patientReducer.patientList);
    // const { _id } = auth.user;

    return {
        _id : auth.user._id,
        patients: patientReducer.patientList
    };
};

class PatientList extends Component {
    constructor(props) {
        super();
        this.state = {
            date: '',
            searchType: "name",
            searchFilterList: [-1]
        };
    }

    static navigationOptions = {
        tabBarLabel: 'Patient',
    };

    componentWillMount() {
        console.log(this.props._id)
        if(this.props._id !== ''){
            this.props.fetchPatients(this.props._id);
        }

        this.createDataSource(this.props)
        console.disableYellowBox = true;
    }
    componentWillReceiveProps(nextProps) {
        console.log(nextProps.patients)
        this.createDataSource(nextProps);
    }

    createDataSource({ patients }) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 != r2
        });
        this.dataSource = ds.cloneWithRows(patients);
    };

    createDataSource2(searchList) {
        const ds2 = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 != r2
        });
        this.dataSource = ds2.cloneWithRows(searchList);
    };
    // i can do this as well but  by doing this i am not getting this.props here so i am calling renderRow in ListView 
    // so i get this.props
    // renderRow(patient) {
    //      console.log(this.props)
    //     return <PatientListItem patient={patient} />

    // }


    typeChanged(itemValue, itemIndex) {
        this.setState({ searchType: itemValue, searchFilterList: [-1] });
        this.createDataSource(this.props);
        console.log(this.state.searchType)
    };

    searchText(text) {
        console.log(text)
        let searchValue = text;
        let re = new RegExp(searchValue, 'i');
        console.log('-------++++++++++', re);
        const searchedList = _.filter(this.props.patients, (item) => {
            if (this.state.searchType === 'name') {
                return re.test(item.patientName);
            }
            else {
                return re.test(item.date);
            }
        });
        console.log("SEARCHED LIST", searchedList);

        this.createDataSource2(searchedList);
        if (this.state.searchType === 'name') {
            this.setState({ searchFilterList: searchedList, searchFilterList: [-1] });
        }
        else {
            this.setState({ searchFilterList: searchedList, date: text });
        }
    }

    render() {

        console.log(this.props.navigation.navigate)
        // console.log(this.state.searchType)
        return (
            <View style={styles.containerStyle}>
                <View style={styles.nestedContainerStyle}>
                    <View style={styles.nestedContainerStyle1}>
                        {this.state.searchType === 'name' ?
                            <SearchBar
                                round
                                lightTheme
                                onChangeText={this.searchText.bind(this)}
                                placeholder='Type Here...'
                            />
                            :
                            <DatePicking
                                onDateChange={this.searchText.bind(this)}
                                date={this.state.date}
                                mode="date"
                                placeholder="M/D/YYYY"
                                format="M/D/YYYY"
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
                        }
                    </View>
                    <View style={styles.nestedContainerStyle2}>
                        <Picker
                            selectedValue={this.state.searchType}
                            onValueChange={this.typeChanged.bind(this)}
                        >
                            <Picker.Item label="Name" value="name" />
                            <Picker.Item label="Date" value="date" />
                        </Picker>
                    </View>
                </View>

                {console.log(this.state.searchFilterList)}
                {
                    this.state.searchFilterList.length === 0 ?
                        <Text>No Search Found</Text>
                        :
                        <ListView
                            enableEmptySections
                            dataSource={this.dataSource}
                            renderRow={(patient) => <PatientListItem patient={patient} navigation={this.props} />}
                        /* renderRow={this.renderRow} */
                        />
                }
            </View>
        );
    }
}

const styles = {
    containerStyle: {
        flex: 1,
    },
    nestedContainerStyle: {
        flexDirection: 'row',
    },
    nestedContainerStyle1: {
        flex: 3,
    },
    nestedContainerStyle2: {
        flex: 1,
    },
}
export default connect(mapStateToProps, { fetchPatients })(PatientList);