import React from 'react';
import { StyleSheet, Text, Picker, TextInput, TouchableOpacity } from "react-native";
import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';
import './App.css';
// import PatientsInput from './component/patientsinput';
// import TimelineInput from './component/timelineinput';
import TimelineData from './component/timelineData';
import UseLocalStorage from './useLocalStorage';


function App() {
  // input
  const [age, onchangeAge] = React.useState('');
  const [job, onchangeJob] = React.useState('');
  const [gender, selectGender] = React.useState('');
  var dateValue: Date = new Date();
  const [description, onchangeDes] = React.useState('');

  // refresh page
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(function () {
      setRefreshing(false)
    }, 2000);
  }, []);

  function clickAddData(date: Date, description: string) {
    let storage = new UseLocalStorage();

    // patients from localStorage
    if (gender == '') {
      selectGender('ชาย');
    }
    let patients = {
      gender: gender,
      age: parseInt(age),
      job: job,
    }
    storage.setPatients(patients);

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
    var ddate, dmonth, dmin, a, b, c;
    var x = date.getDate() / 10;
    var y = date.getMonth() / 10;
    var z = date.getMinutes() / 10;
    a = x.toString();
    b = y.toString();
    c = z.toString();
    if (parseInt(a) == 0) {
      ddate = '0' + date.getDate();
    } else {
      ddate = date.getDate();
    }
    if (parseInt(b) == 0) {
      dmonth = '0' + date.getMonth();
    } else {
      dmonth = date.getMonth();
    }
    if (parseInt(c) == 0) {
      dmin = '0' + date.getMinutes();
    } else {
      dmin = date.getMinutes();
    }
    const newData = {
      date: ddate + '/' + dmonth + '/' + date.getFullYear(),
      time: date.getHours() + ':' + dmin,
      description: description,
    }
    timelineList.push(newData);

    // setLocalStorage
    let covidData = { patients, timelineList };
    storage.setTimeline(covidData);

    onRefresh();
  }

  React.useEffect(() => {
    let storage = new UseLocalStorage();
    if (localStorage.getItem('patients') != '') {
      onchangeAge(storage.getAge());
      onchangeJob(storage.getJob());
      selectGender(storage.getGender);
    }
  });

  return (
    <div className="App" style={{ padding: 20 }} >
      <Text style={styles.titletext}>COVID Timeline Genetator</Text>
      <div className="App-page" style={{ display: 'flex', flexDirection: 'row' }}>

        <div className="inputData" style={{ flex: '40%' }}>
          {/* input patients */}
          <div
            className="inputpadding"
            style={{
              padding: 10, paddingTop: 3, borderRadius: 5, margin: 10
            }}>
            <h1 style={{ color: '#27a742' }}>ข้อมูลผู้ป่วย</h1>

            <div style={{ display: 'flex', flexDirection: 'row' }}>

              <div style={{ flex: '50%', marginRight: 10 }}>
                <h2>เพศ</h2>
                <Picker
                  selectedValue={gender}
                  onValueChange={(itemValue, itemIndex) => selectGender(itemValue)}
                  style={styles.picker}>
                  <Picker.Item label="ชาย" value="ชาย" />
                  <Picker.Item label="หญิง" value="หญิง" />
                </Picker>
              </div>

              <div style={{ flex: '50%', marginLeft: 1 }}>
                <h2>อายุ</h2>
                <TextInput
                  value={age}
                  onChangeText={onchangeAge}
                  keyboardType="numeric"
                  style={styles.textinput}
                />
              </div>

            </div>

            <h2>อาชีพ</h2>
            <TextInput
              value={job}
              onChangeText={onchangeJob}
              style={styles.textinput}
            />
          </div>

          {/* timeline input */}
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
              value={dateValue}/>

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
        </div>

        <TimelineData />
      </div>
    </div >
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

  picker: {
    fontFamily: 'Prompt',
    fontSize: 16,
    height: 40,
    padding: 5,
    borderRadius: 5,
    width: '100%'
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

export default App;