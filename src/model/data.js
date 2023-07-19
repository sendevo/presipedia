import moment from "moment";
import {
    VIS_DATE_FORMAT,
    DAY_MS,
    DB_LAST_UPDATE
} from './constants';
import { getZodiac } from "./utils";
import database from "../assets/database.json";

// This file should be executed during build time and exported in json format.

const tic = Date.now(); // Measure computing time (remove before deploy)

////// Timelines //////

const getContentBlock = person => {
    const name = `<p>${person.name} ${person.surname}</p>`;
    const profilePic = `<img src="${'/pictures/'+person.picture}" alt="${person.surname}" width="50px" height="50px" />`;
    const container = `<div style="background-color: #f2f2f2;">
                            ${name}
                            ${profilePic}
                       </div>`;
    return container;
};

export const terms = database.terms
    .map((term, index) => ({
        id: index + 1,
        content: getContentBlock(database.people[term.cid]),
        start: moment(term.term_begin).format(VIS_DATE_FORMAT),
        end: moment(term.term_end).format(VIS_DATE_FORMAT)
    }));

export const periodOfLife = Object.keys(database.people)
    .map((cid, idx) => {
        const person = database.people[cid];
        return {
            id: idx+1,
            content: getContentBlock(person),
            start: moment(person.birth_date).format(VIS_DATE_FORMAT),
            end: moment(person.death_date ? person.death_date : DB_LAST_UPDATE).format(VIS_DATE_FORMAT)
        };
    });


////// Ranking bar charts //////

const getPersonName = (cid, suffix="") => {
    const person = database.people[cid];
    return [person.name,person.surname+suffix];
};

export const longerTerms = database.terms
    .map((term, index) => {
        const duration = moment(term.term_end).diff(term.term_begin, 'years', true);
        const president = getPersonName(term.cid);
        return {
            index,
            duration,
            president,
            cid: term.cid
        };
    })
    .reduce((acc, term) => {
        const existingTerm = acc.find((item) => item.cid === term.cid);
        if (existingTerm)
            existingTerm.duration += term.duration;
        else
            acc.push(term);
        return acc;
    }, [])
    .sort((a, b) => b.duration - a.duration);

export const shorterTerms = [...longerTerms].reverse();

export const oldest = Object.keys(database.people)
    .map(cid => {
        const person = database.people[cid];
        return {
            president: getPersonName(cid,(person.death_date ? "" : " (Vive)")),
            age: moment(person.death_date ? person.death_date : Date.now()).diff(person.birth_date, 'years'),
        };
    })
    .sort((a, b) => b.age - a.age);

export const youngest = [...oldest].reverse();

export const youngestAssumption = database.terms 
    .map(term => {
        const person = database.people[term.cid];
        const president = getPersonName(term.cid);
        const age = moment(term.term_begin).diff(person.birth_date, 'years');
        return {president, age};
    })
    .reduce((acc, current) => {
        if(acc.indexOf(current.president) === -1)
            acc.push(current);
        return acc;
    }, [])
    .sort((a, b) => a.age - b.age);

export const birthsPerMonth = Object.values(database.people)
    .reduce((acc, current) => {
        acc[moment(current.birth_date).month()]++;
        return acc;
    }, Array(12).fill(0));

export const birthsPerZodiacSign = Object.values(database.people)
    .reduce((acc, current) => {
        acc[getZodiac(current.birth_date).index]++;
        return acc;
    }, Array(12).fill(0));


////// Statistics //////

export const birthLocations = Object.values(database.people)
    .reduce((acc, current) => {
        const province = current.birth_location.features[0].properties.province;
        const pIndex = acc.provinces.indexOf(province);
        if(pIndex === -1){
            acc.provinces.push(province);
            acc.count.push(1);
        }else{
            acc.count[pIndex]++;
        }
        return acc;
    }, {
        provinces: [],
        count: []
    });

export const parties = database.terms
    .reduce((acc, current) => {
        const pIndex = acc.names.indexOf(current.party);
        if(pIndex === -1){
            acc.names.push(current.party);
            acc.count.push(1);
        }else{
            acc.count[pIndex]++;
        }
        return acc;
    }, {
        names: [],
        count: []
    });

export const aliveCountPerDate = (() => {
    const startDate = Object.keys(database.people)
        .reduce((acc, currentCID) => {
            return database.people[currentCID].birth_date < acc ?
                database.people[currentCID].birth_date : acc;
        }, Number.POSITIVE_INFINITY);

    const dateToAliveCountIndex = dateMS => Math.floor((dateMS - startDate) / DAY_MS);

    const totalPeriodDays = dateToAliveCountIndex(DB_LAST_UPDATE);
    const aliveCounts = Array(totalPeriodDays).fill(0);

    for (let person of Object.values(database.people)) {
        const personBirthIndex = dateToAliveCountIndex(person.birth_date);
        const personDeathIndex = person.death_date ? dateToAliveCountIndex(person.death_date) : totalPeriodDays;
        for (let i = personBirthIndex; i < personDeathIndex; i++)
            aliveCounts[i]++;
    }

    const aliveCount = aliveCounts.reduce((acc, current, index) => {
        const lastPeriodIndex = acc.length - 1;
        if (current === acc[lastPeriodIndex].count)
            acc[lastPeriodIndex].period[1] = index * DAY_MS + startDate;
        else
            acc.push({
                period: [index * DAY_MS + startDate, (index + 1) * DAY_MS + startDate],
                count: current,
                periodDuration: 1
            });
        return acc;
    }, [{period: [startDate, startDate + DAY_MS], count: 1}]);

    return aliveCount;
})();

export const aliveExPresidentsPerDate = {
    // TODO
};

// Data processing execution time
console.log("Database processed in",Date.now() - tic, "ms");