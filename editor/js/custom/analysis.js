const scaleArray = arr => {
    const maxValueP = Math.max(...arr)/100;
    return  arr.map(x => x/maxValueP);
};

const getProportions = arr => {
    const sum = arraySum(arr);        
    return  arr.map(x => x/sum*100);
};

const analyzeDatabase = database => {

    ////// Ranking bar charts //////

    const getPersonName = (cid, suffix = "") => {
        const person = database.people[cid];
        return [person.name, person.surname + suffix];
    };

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
            const age = moment(term.term_begin).diff(person.birth_date, 'years');
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
                acc.count.push(1);
            }else{
                acc.count[binIndex]++;
            }
            return acc;
        }, {
            names: [],
            count: []
        });
    assumptionAgeHistogram.scaled = scaleArray(assumptionAgeHistogram.count);
    assumptionAgeHistogram.freq = getProportions(assumptionAgeHistogram.count);
    

    const birthsPerMonth = {
        names: MONTHS,
        count: Object.values(database.people)
            .reduce((acc, current) => {
                acc[moment(current.birth_date).month()]++;
                return acc;
            }, Array(12).fill(0)),
        years: database.terms
            .reduce((acc, current) => {
                const person = database.people[current.cid];
                const month = moment(person.birth_date).month();
                const duration = moment(current.term_end).diff(current.term_begin, 'years', true);
                acc[month] += duration;
                return acc;
            }, Array(12).fill(0))
    };
    birthsPerMonth.scaled = scaleArray(birthsPerMonth.count);
    birthsPerMonth.freq = getProportions(birthsPerMonth.count);

    const birthsPerZodiacSign = {
        names: ZODIAC_SIGNS,
        count: Object.values(database.people)
            .reduce((acc, current) => {
                acc[getZodiac(current.birth_date).index]++;
                return acc;
            }, Array(12).fill(0)),
        years: database.terms 
            .reduce((acc, current) => {
                const person = database.people[current.cid];
                const signIndex = getZodiac(person.birth_date).index;
                const duration = moment(current.term_end).diff(current.term_begin, 'years', true);
                acc[signIndex] += duration;
                return acc;
            }, Array(12).fill(0))
    };
    birthsPerZodiacSign.scaled = scaleArray(birthsPerZodiacSign.count);
    birthsPerZodiacSign.freq = getProportions(birthsPerZodiacSign.count);

    const birthLocations = Object.values(database.people)
        .reduce((acc, current) => {
            const province = current.birth_location.features[0].properties.province;
            const pIndex = acc.names.indexOf(province);
            if (pIndex === -1) {
                acc.names.push(province);
                acc.count.push(1);
            } else {
                acc.count[pIndex]++;
            }
            return acc;
        }, {
            names: [],
            count: []
        });
    birthLocations.scaled = scaleArray(birthLocations.count);
    birthLocations.freq = getProportions(birthLocations.count);
    birthLocations.years = database.terms
        .reduce((acc, current) => {
            const person = database.people[current.cid];
            const province = person.birth_location.features[0].properties.province;
            const pIndex = birthLocations.names.indexOf(province);
            const duration = moment(current.term_end).diff(current.term_begin, 'years', true);            
            acc[pIndex] += duration;
            return acc;
        }, Array(birthLocations.names.length).fill(0));

    const occupations = Object.values(database.people)
        .reduce((acc, current) => {
            const occs = current.occupation.split(" y ").map(oc => capitalize(oc));
            occs.forEach(oc => {
                const pIndex = acc.names.indexOf(oc);
                if (pIndex === -1) {
                    acc.names.push(oc);
                    acc.count.push(1);
                } else {
                    acc.count[pIndex]++;
                }
            });
            return acc;
        }, {
            names: [],
            count: []
        });
    occupations.scaled = scaleArray(occupations.count);
    occupations.freq = getProportions(occupations.count);
    occupations.years = database.terms
        .reduce((acc, current) => {
            const person = database.people[current.cid];        
            const occs = person.occupation.split(" y ").map(oc => capitalize(oc));
            const duration = moment(current.term_end).diff(current.term_begin, 'years', true);
            occs.forEach(oc => {
                const pIndex = occupations.names.indexOf(oc);
                acc[pIndex] += duration;
            });
            return acc;
        }, Array(occupations.names.length).fill(0));

    const genders = Object.values(database.people)
        .reduce((acc, current) => {
            const gender = current.gender;
            const pIndex = acc.names.indexOf(gender);
            if (pIndex === -1) {
                acc.names.push(gender);
                acc.count.push(1);
            } else {
                acc.count[pIndex]++;
            }
            return acc;
        }, {
            names: [],
            count: []
        });
    genders.scaled = scaleArray(genders.count);
    genders.freq = getProportions(genders.count);
    genders.years = database.terms
        .reduce((acc, current) => {
            const person = database.people[current.cid];        
            const pIndex = genders.names.indexOf(person.gender);
            const duration = moment(current.term_end).diff(current.term_begin, 'years', true);            
            acc[pIndex] += duration;
            return acc;
        }, Array(genders.names.length).fill(0));

    const parties = database.terms
        .reduce((acc, current) => {
            const duration = moment(current.term_end).diff(current.term_begin,'years', true);
            const pIndex = acc.names.indexOf(current.party);
            if (pIndex === -1) {
                acc.names.push(current.party);
                acc.count.push(1);
                acc.durations.push(duration);
            } else {
                acc.count[pIndex]++;
                acc.durations[pIndex]+=duration;
            }
            return acc;
        }, {
            names: [],
            count: [],
            durations: []
        });
    parties.scaled = scaleArray(parties.count);
    parties.freq = getProportions(parties.count);

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

    console.log(processed);

    return JSON.stringify(processed);
};