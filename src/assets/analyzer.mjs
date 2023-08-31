import fs from "fs";
import moment from "moment";
import { MONTHS, ZODIAC_SIGNS, DAY_MS } from "../model/constants.js";
import { arraySum, getZodiac, capitalize } from "../model/utils.js";
import { getAgeOfAssumption, getProvince } from "../model/data.js";
import database from "./database.json" assert { type: 'json' };


const scaleArray = arr => {
    const maxValueP = Math.max(...arr)/100;
    return  arr.map(x => x/maxValueP);
};

const getProportions = arr => {
    const sum = arraySum(arr);        
    return  arr.map(x => x/sum*100);
};

const getPersonName = (cid, suffix = "") => {
    const person = database.people[cid];
    return [person.name, person.surname + suffix];
};


////// Ranking bar charts //////

const longerTerms = database.terms
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

const shorterTerms = [...longerTerms].reverse();

const oldest = Object.keys(database.people)
    .map(cid => {
        const person = database.people[cid];
        return {
            president: getPersonName(cid, (person.death_date ? "" : " (Vive)")),
            age: moment(person.death_date ? person.death_date : Date.now()).diff(person.birth_date, 'years'),
        };
    })
    .sort((a, b) => b.age - a.age);

const youngest = [...oldest].reverse();

const youngestAssumption = database.terms
    .map(term => {
        const person = database.people[term.cid];
        const president = getPersonName(term.cid);
        const age = getAgeOfAssumption(person, term);
        return {
            president,
            age
        };
    })
    .reduce((acc, current) => {
        if (acc.indexOf(current.president) === -1)
            acc.push(current);
        return acc;
    }, [])
    .sort((a, b) => a.age - b.age);

const oldestAssumption = [...youngestAssumption].reverse();


////// Statistics //////
const assumptionAgeHistogram = youngestAssumption
    .reduce((acc, current) => {
        const binStart = Math.floor(current.age/10)*10;
        const binEnd = binStart+10;
        const name = `${binStart}-${binEnd}`;
        const binIndex = acc.names.indexOf(name);
        if(binIndex === -1){
            acc.names.push(name);
            acc.terms.count.push(1);
        }else{
            acc.terms.count[binIndex]++;
        }
        return acc;
    }, {
        names: [],
        terms: {
            count: []
        }
    });
assumptionAgeHistogram.terms.scaled = scaleArray(assumptionAgeHistogram.terms.count);
assumptionAgeHistogram.terms.frequency = getProportions(assumptionAgeHistogram.terms.count);

assumptionAgeHistogram.years = {
    count: database.terms .reduce((acc, current) => {
            const person = database.people[current.cid];
            const age = getAgeOfAssumption(person, current);
            const binStart = Math.floor(age/10)*10;
            const binEnd = binStart+10;
            const name = `${binStart}-${binEnd}`;
            const binIndex = assumptionAgeHistogram.names.indexOf(name);
            const duration = moment(current.term_end).diff(current.term_begin, 'years', true);            
            acc[binIndex] += duration;
            return acc;
        }, Array(assumptionAgeHistogram.names.length).fill(0))
};
assumptionAgeHistogram.years.scaled = scaleArray(assumptionAgeHistogram.years.count);
assumptionAgeHistogram.years.frequency = getProportions(assumptionAgeHistogram.years.count);


const birthsPerMonth = {
    names: MONTHS,
    terms: {
        count: Object.values(database.people).reduce((acc, current) => {
                acc[moment(current.birth_date).month()]++;
                return acc;
            }, Array(12).fill(0))
    },
    years: {
        count: database.terms.reduce((acc, current) => {
                const person = database.people[current.cid];
                const month = moment(person.birth_date).month();
                const duration = moment(current.term_end).diff(current.term_begin, 'years', true);
                acc[month] += duration;
                return acc;
            }, Array(12).fill(0))
    }
};
birthsPerMonth.terms.scaled = scaleArray(birthsPerMonth.terms.count);
birthsPerMonth.terms.frequency = getProportions(birthsPerMonth.terms.count);
birthsPerMonth.years.scaled = scaleArray(birthsPerMonth.years.count);
birthsPerMonth.years.frequency = getProportions(birthsPerMonth.years.count);


const birthsPerZodiacSign = {
    names: ZODIAC_SIGNS,
    terms: {
        count: Object.values(database.people).reduce((acc, current) => {
                acc[getZodiac(current.birth_date).index]++;
                return acc;
            }, Array(12).fill(0))
    },
    years: {
        count: database.terms .reduce((acc, current) => {
                const person = database.people[current.cid];
                const signIndex = getZodiac(person.birth_date).index;
                const duration = moment(current.term_end).diff(current.term_begin, 'years', true);
                acc[signIndex] += duration;
                return acc;
            }, Array(12).fill(0))
    }
};
birthsPerZodiacSign.terms.scaled = scaleArray(birthsPerZodiacSign.terms.count);
birthsPerZodiacSign.terms.frequency = getProportions(birthsPerZodiacSign.terms.count);
birthsPerZodiacSign.years.scaled = scaleArray(birthsPerZodiacSign.years.count);
birthsPerZodiacSign.years.frequency = getProportions(birthsPerZodiacSign.years.count);


const birthLocations = Object.values(database.people)
    .reduce((acc, current) => {
        const province = getProvince(current);
        const pIndex = acc.names.indexOf(province);
        if (pIndex === -1) {
            acc.names.push(province);
            acc.terms.count.push(1);
        } else {
            acc.terms.count[pIndex]++;
        }
        return acc;
    }, {
        names: [],
        terms: {
            count: []
        }
    });
birthLocations.terms.scaled = scaleArray(birthLocations.terms.count);
birthLocations.terms.frequency = getProportions(birthLocations.terms.count);

birthLocations.years = {
    count: database.terms.reduce((acc, current) => {
            const person = database.people[current.cid];
            const province = getProvince(person);
            const pIndex = birthLocations.names.indexOf(province);
            const duration = moment(current.term_end).diff(current.term_begin, 'years', true);            
            acc[pIndex] += duration;
            return acc;
        }, Array(birthLocations.names.length).fill(0))
};
birthLocations.years.scaled = scaleArray(birthLocations.years.count);
birthLocations.years.frequency = getProportions(birthLocations.years.count);


const occupations = Object.values(database.people)
    .reduce((acc, current) => {
        const occs = current.occupation.split(" y ").map(oc => capitalize(oc));
        occs.forEach(oc => {
            const pIndex = acc.names.indexOf(oc);
            if (pIndex === -1) {
                acc.names.push(oc);
                acc.terms.count.push(1);
            } else {
                acc.terms.count[pIndex]++;
            }
        });
        return acc;
    }, {
        names: [],
        terms: {
            count: []
        }
    });
occupations.terms.scaled = scaleArray(occupations.terms.count);
occupations.terms.frequency = getProportions(occupations.terms.count);

occupations.years = {
    count: database.terms.reduce((acc, current) => {
            const person = database.people[current.cid];        
            const occs = person.occupation.split(" y ").map(oc => capitalize(oc));
            const duration = moment(current.term_end).diff(current.term_begin, 'years', true);
            occs.forEach(oc => {
                const pIndex = occupations.names.indexOf(oc);
                acc[pIndex] += duration;
            });
            return acc;
        }, Array(occupations.names.length).fill(0))
};
occupations.years.scaled = scaleArray(occupations.years.count);
occupations.years.frequency = getProportions(occupations.years.count);


const genders = Object.values(database.people)
    .reduce((acc, current) => {
        const gender = current.gender;
        const pIndex = acc.names.indexOf(gender);
        if (pIndex === -1) {
            acc.names.push(gender);
            acc.terms.count.push(1);
        } else {
            acc.terms.count[pIndex]++;
        }
        return acc;
    }, {
        names: [],
        terms: {
            count: []
        }
    });
genders.terms.scaled = scaleArray(genders.terms.count);
genders.terms.frequency = getProportions(genders.terms.count);

genders.years = {
    count: database.terms.reduce((acc, current) => {
            const person = database.people[current.cid];        
            const pIndex = genders.names.indexOf(person.gender);
            const duration = moment(current.term_end).diff(current.term_begin, 'years', true);            
            acc[pIndex] += duration;
            return acc;
        }, Array(genders.names.length).fill(0))
};
genders.years.scaled = scaleArray(genders.years.count);
genders.years.frequency = getProportions(genders.years.count);


const parties = database.terms
    .reduce((acc, current) => {
        const duration = moment(current.term_end).diff(current.term_begin,'years', true);
        const pIndex = acc.names.indexOf(current.party);
        if (pIndex === -1) {
            acc.names.push(current.party);
            acc.terms.count.push(1);
            acc.years.count.push(duration);
        } else {
            acc.terms.count[pIndex]++;
            acc.years.count[pIndex] += duration;
        }
        return acc;
    }, {
        names: [],
        terms: {count:[]},
        years: {count:[]}
    });
parties.terms.scaled = scaleArray(parties.terms.count);
parties.terms.frequency = getProportions(parties.terms.count);
parties.years.scaled = scaleArray(parties.years.count);
parties.years.frequency = getProportions(parties.years.count);


const aliveCountPerDate = (() => {
    const startDate = Object.keys(database.people)
        .reduce(
            (acc, currentCID) =>
            database.people[currentCID].birth_date < acc ?
            database.people[currentCID].birth_date : acc, Number.POSITIVE_INFINITY);

    const dateToAliveCountIndex = dateMS => Math.floor((dateMS - startDate) / DAY_MS);

    const totalPeriodDays = dateToAliveCountIndex(Date.now());
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
    }, [{
        period: [startDate, startDate + DAY_MS],
        count: 1
    }]);

    return aliveCount;
})();

const aliveExPresidentsPerDate = (() => {
    const startDate = database.terms
        .reduce((acc, current) => current.term_begin < acc ? current.term_begin : acc, Number.POSITIVE_INFINITY);

    const dateToAliveCountIndex = dateMS => Math.floor((dateMS - startDate) / DAY_MS);
    const getAssumptionDate = cid => database.terms.find(t => t.cid === cid).term_begin;

    const totalPeriodDays = dateToAliveCountIndex(Date.now());
    const aliveCounts = Array(totalPeriodDays).fill(0);

    for (let cid of Object.keys(database.people)) {
        const person = database.people[cid];
        const assumptionDate = getAssumptionDate(cid);
        const personAssumptionIndex = dateToAliveCountIndex(assumptionDate);
        const personDeathIndex = person.death_date ? dateToAliveCountIndex(person.death_date) : totalPeriodDays;
        for (let i = personAssumptionIndex; i < personDeathIndex; i++)
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
    }, [{
        period: [startDate, startDate + DAY_MS],
        count: 1
    }]);

    return aliveCount;
})();

const processed = {
    longerTerms,
    shorterTerms,
    oldest,
    youngest,
    youngestAssumption,
    oldestAssumption,
    birthsPerMonth,
    birthsPerZodiacSign,
    birthLocations,
    occupations,
    genders,
    parties,
    assumptionAgeHistogram,
    aliveCountPerDate,
    aliveExPresidentsPerDate
};

const jsonData = JSON.stringify(processed);
fs.writeFile('processed.json', jsonData, 'utf8', err => {
    if(err)
        console.error('Error writing to file:', err);
    else
        console.log('Data saved to processed.json');
});