
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

    const birthsPerMonth = Object.values(database.people)
        .reduce((acc, current) => {
            acc[moment(current.birth_date).month()]++;
            return acc;
        }, Array(12).fill(0));

    const birthsPerZodiacSign = Object.values(database.people)
        .reduce((acc, current) => {
            acc[getZodiac(current.birth_date).index]++;
            return acc;
        }, Array(12).fill(0));


    ////// Statistics //////

    const birthLocations = Object.values(database.people)
        .reduce((acc, current) => {
            const province = current.birth_location.features[0].properties.province;
            const pIndex = acc.provinces.indexOf(province);
            if (pIndex === -1) {
                acc.provinces.push(province);
                acc.count.push(1);
            } else {
                acc.count[pIndex]++;
            }
            return acc;
        }, {
            provinces: [],
            count: []
        });

    const parties = database.terms
        .reduce((acc, current) => {
            const pIndex = acc.names.indexOf(current.party);
            if (pIndex === -1) {
                acc.names.push(current.party);
                acc.count.push(1);
            } else {
                acc.count[pIndex]++;
            }
            return acc;
        }, {
            names: [],
            count: []
        });

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

    return JSON.stringify({
        longerTerms,
        shorterTerms,
        oldest,
        youngest,
        youngestAssumption,
        birthsPerMonth,
        birthsPerZodiacSign,
        birthLocations,
        parties,
        aliveCountPerDate,
        aliveExPresidentsPerDate
    });
};