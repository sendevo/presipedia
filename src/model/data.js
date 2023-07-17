import moment from "moment";
import database from "../assets/database.json";

const getPersonName = cid => {
    const person = database.people[cid];
    return person.name+" "+person.surname;
};

export const longerTerms = database.terms
    .map((term, index) => {
        const duration = moment(term.term_end).diff(term.term_begin, 'years', true);
        const president = getPersonName(term.cid);
        return { index, duration, president, cid: term.cid };
    })
    .reduce((acc, term) => {
        const existingTerm = acc.find((item) => item.cid === term.cid);
        if(existingTerm)
            existingTerm.duration += term.duration;
        else
            acc.push(term);
        return acc;
        }, [])
    .sort((a,b) => b.duration-a.duration);

export const shorterTerms = [...longerTerms].reverse();

export const oldest = Object.keys(database.people).map( cid => {    
        const person = database.people[cid];
        return {
            president: getPersonName(cid) + (person.death_date ? "" : " (Vive)"),
            age: moment(person.death_date ? person.death_date : Date.now()).diff(person.birth_date, 'years'),
        }
    })
    .sort((a,b) => b.age-a.age);

export const youngest = [...oldest].reverse();