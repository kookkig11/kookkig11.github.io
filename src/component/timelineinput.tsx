import React from 'react';
import { StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';
import '../App.css';
import UseLocalStorage from '../useLocalStorage';

function TimelineInput() {
    const dateValue: Date = new Date();
    const [description, onchangeDes] = React.useState('');

    function clickAddData(date: Date, description: string) {
        let storage = new UseLocalStorage();

        // patients from localStorage
        let patients = storage.getPatients();

        // timeline from localStorage
        let data: any = {};
        let timelineList = [];
        if (localStorage.getItem('covidData') != null) {
            data = storage.getTimeline();
            for (let key in data) {
                let value = data[key];
                if (value != "") {
                    timelineList.push(value);
                }
            }
        }
        

        // add new timeline data
        const newData = {
            datetime: dateValue,
            description: description,
        }
        timelineList.push(newData);

        // setLocalStorage
        let covidData = { patients, timelineList };
        storage.setTimeline(covidData);
    }

    return (
        <div className="inputpadding"
            style={{
                padding: 10, paddingTop: 3, borderRadius: 5, margin: 10
            }}>
            <h1 style={{ color: '#27a742' }}>ข้อมูลไทม์ไลน์</h1>

            <h2>วันเวลา</h2>
            <DateTimePickerComponent
                style={{
                    fontFamily: 'Prompt',
                    backgroundColor: '#fff',
                    padding: 5
                }}
                value={dateValue} />

            <h2>รายละเอียด</h2>
            <TextInput
                value={description}
                onChangeText={onchangeDes}
                multiline
                numberOfLines={4}
                style={styles.textinput}
            />

            <TouchableOpacity
                onPress={() => clickAddData(dateValue, description)}
                style={styles.button}
            >+ เพิ่มข้อมูล
            </TouchableOpacity>
        </div>
    );
}

const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        color: '#012d5e',
        backgroundColor: '#ffc107',
        padding: 5,
        borderRadius: 5,
        fontFamily: 'Prompt',
        margin: 10
    },

    textinput: {
        fontFamily: 'Prompt',
        fontSize: 16,
        height: 40,
        width: '100%',
        padding: 5,
        borderRadius: 5,
        backgroundColor: "#fff"
    }
});

export default TimelineInput;