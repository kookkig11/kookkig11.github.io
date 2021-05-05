import React from 'react';
import { StyleSheet, Text, View } from "react-native";
import '../App.css';
import UseLocalStorage from '../useLocalStorage'

function TimelineData() {
    var items: any[] = [];

    let storage = new UseLocalStorage();
    var gender = storage.getGender();
    var age = storage.getAge();
    var job = storage.getJob();
    if (localStorage.getItem('covidData') != null) {
        for (const [, value] of Object.entries(storage.getTimeline())) {
            items.push(value);
        }
        // items.reduce((prev, cur) => ({
        //     ...prev,
        //     [cur.date]: (prev[cur.date] || []).concat(cur)
        // }), {});
        // console.log(items);
    }

    return (
        <div
            style={{
                flex: '60%',
                borderColor: '#ffc107',
                borderStyle: 'solid',
                padding: 10,
                margin: 10,
                // width: '100%',
                justifyContent: 'center',
            }}>

            <Text style={[styles.titletext, styles.boldtext,]}>Timeline</Text>

            <View
                style={[styles.button, { borderRadius: 100 }]}
            >
                <h1>ผู้ป่วย{gender} อายุ {age} ปี</h1>
                <h2>อาชีพ {job}</h2>
            </View>

            {
                items.map((obj, i: number) =>
                    <View>
                        <div className="timeline">
                            <div className="container">
                                <div className="content">
                                    <span>
                                        <h2 style={{ color: '#ffc107' }}>{items[i].date} {items[i].time}</h2>
                                        <h2>{items[i].description}</h2>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </View>
                )
            }
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

    titletext: {
        fontFamily: 'Prompt',
        fontSize: 28,
        color: '#ffc107',
    },

    boldtext: { fontWeight: 'bold' },
});

export default TimelineData;