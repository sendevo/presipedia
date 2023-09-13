import moment from "moment";

export const getFullName = person => `${person.name} ${person.surname}`;

export const getCity = person => person.birth_location.features[0].properties.city;

export const getProvince = person => person.birth_location.features[0].properties.province;

export const getBirthDate = person => person.birth_date;

export const getDeathDate = person => person.death_date;

export const getAgeOfDeath = person => moment(person.death_date).diff(person.birth_date,'years',false);

export const isAlive = person => !Boolean(person.death_date);

export const isMale = person => person.gender === "M";

export const getTermDuration = t => {
    const years = moment(t.end).diff(t.begin, "years", false);
    if(years === 0){
        const months = moment(t.end).diff(t.begin, "months", false);
        if(months === 0){
            const days = moment(t.end).diff(t.begin, "days", false);
            return days+" día"+(days>1?"s":"");
        }else{
            return months+" mes"+(months>1?"es":"");
        }
    }else{
        return years+" año"+(years>1?"s":"");
    }
};

export const getLocationName = location => location.features[0].properties.name;

export const getAgeOfAssumption = (person, term) => moment(term.begin).diff(person.birth_date, 'years');

export const getLastCID = terms => terms.sort((a,b) => b.end < a.end)[terms.length-1].cid;

export const terms2Events = (terms, people) => terms.map(term => {
    const names = people[term.cid].name.split(" ");    
    return {
        type: "PERIOD",    
        title: `${names[0]} ${names[1] ? `${names[1].charAt(0)}.` : ""} ${people[term.cid].surname}`,
        image: `/pictures/${people[term.cid].picture}`,
        link: `/vis/profile?cid=${encodeURIComponent(term.cid)}`,
        description: term.party,
        begin: term.begin,
        end: term.end
    };
});