import moment from "moment";

export const getFullName = person => `${person.name} ${person.surname}`;
export const getCity = person => person.birth_location.features[0].properties.city;
export const getBirthDate = person => person.birth_date;
export const getDeathDate = person => person.death_date;
export const getAgeOfDeath = person => moment(person.death_date).diff(person.birth_date,'years',false);
export const isAlive = person => !Boolean(person.death_date);
export const isMale = person => person.gender === "M";
export const getTermDuration = t => {
    const years = moment(t.term_end).diff(t.term_begin, "years", false);
    if(years === 0){
        const months = moment(t.term_end).diff(t.term_begin, "months", false);
        if(months === 0){
            const days = moment(t.term_end).diff(t.term_begin, "days", false);
            return days+" día"+(days>1?"s":"");
        }else{
            return months+" mes"+(months>1?"es":"");
        }
    }else{
        return years+" año"+(years>1?"s":"");
    }
};
export const getAgeOfAssumption = (person, term) => moment(term.term_begin).diff(person.birth_date, 'years');
export const getLastCID = terms => terms.sort((a,b) => b.term_end < a.term_end)[terms.length-1].cid;