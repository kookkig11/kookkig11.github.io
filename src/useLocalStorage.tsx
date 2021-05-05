import { time } from 'node:console';
import React from 'react';

export default class UseLocalStorage {
    setPatients(patients: object): void {
        localStorage.setItem('patients', JSON.stringify(patients));
    }

    setTimeline(newTimeline: object): void {
        // console.log(':: set Timeline');
        localStorage.setItem('covidData', JSON.stringify(newTimeline));
        // console.log(JSON.parse(localStorage.getItem('covidData')!));
    }

    getPatients(): object {
        var patients = JSON.parse(localStorage.getItem('patients')!);
        return patients;
    }

    getGender(): string {
        var data = localStorage.getItem('patients');
        var obj = JSON.parse(data!);
        return obj.gender;
    }

    getAge(): string {
        var data = localStorage.getItem('patients');
        var obj = JSON.parse(data!);
        return obj.age;
    }

    getJob(): string {
        var data = localStorage.getItem('patients');
        var obj = JSON.parse(data!);
        return obj.job;
    }

    getTimeline(): object {
        var timeline;
        if (JSON.parse(localStorage.getItem('covidData')!).timelineList != null) {
            timeline = JSON.parse(localStorage.getItem('covidData')!).timelineList;
        }
        return timeline;
    }
}