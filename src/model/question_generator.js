import moment from "moment";
import { 
    MAX_QUESTION_OPTIONS, 
    DAY_MS, 
    YEAR_MS
} from "./constants";
import { getRandomElement, capitalize, formatDate } from "./utils";
import database from "../assets/database.json";
//import processed from "../assets/processed.json";

const ITERABLE_LEN = 50;
const lastCID = database.terms.sort((a,b) => b.term_end < a.term_end).at(-1).cid;

const getFullName = person => `${person.name} ${person.surname}`;
const getCity = person => person.birth_location.features[0].properties.city;
const getBirthDate = person => person.birth_date;
const getDeathDate = person => person.death_date;
const getAgeOfDeath = person => moment(person.death_date).diff(person.birth_date,'years',false);
const isAlive = person => !Boolean(person.death_date);
const isMale = person => person.gender === "M";
const getTermDuration = term => {
    const unitOfTime = term.term_end-term.term_begin < YEAR_MS ? {name:"months", text:"meses"} : {name:"years", text: "años"};
    return moment(term.term_end).diff(term.term_end, unitOfTime.name, false) + " " + unitOfTime.text;
};

const generateOptions = (iterable, rightIndex, rightValue) => {
    const optionsArray = new Array(MAX_QUESTION_OPTIONS);
    const validOptions = iterable.filter(el => el !== rightValue);
    for(let index = 0; index < MAX_QUESTION_OPTIONS; index++){
        if(index !== rightIndex){
            let op = getRandomElement(validOptions);
            while(optionsArray.includes(op))
                op = getRandomElement(validOptions);
            optionsArray[index] = op;
        }else{
            optionsArray[index] = rightValue;
        }
    };
    return optionsArray;
};


class QuestionBase {
    constructor() {
        this._theme = "Indefinido";
        this._text = " ";
        this._options = new Array(MAX_QUESTION_OPTIONS).fill(" ");
        this._rightOptionIndex = Math.floor(Math.random()*MAX_QUESTION_OPTIONS);
        this._score = 0;
        this._details = " ";
    }

    export() {
        return {
            questionText: this._text,
            options: this._options,
            rightAnswer: this._rightOptionIndex,
            answerValue: this._score,
            feedbackExplanation: this._details
        };
    }
};

class QType1 extends QuestionBase {
    constructor() {
        super();
        this._theme = "Fechas y lugares de nacimiento";
        this._score = 10;
        const person = database.people[getRandomElement(Object.keys(database.people).filter(k => k!==lastCID))];
        this._name = getFullName(person);
        this._location = getCity(person);
        this._birth = getBirthDate(person);
        this._age = moment(person.birth_date).fromNow(true);
        this._genderKW = isMale(person) ? "el":"la";
    }
};

class QT1Subtype1 extends QType1 {
    constructor() {
        super();
        this._text = `¿En qué ciudad nació ${this._genderKW} expresidente ${this._name}?`;
        this._details = `${capitalize(this._genderKW)} expresidente ${this._name} nació en ${this._location}`;
        const iterable = Object.values(database.people)
            .map(p => getCity(p));
        this._options = generateOptions(iterable, this._rightOptionIndex, this._location);
    }
};

class QT1Subtype2 extends QType1 {
    constructor() {
        super();
        this._text = `¿Cuál de los siguientes expresidentes nació en ${this._location}?`;
        this._details = `${capitalize(this._genderKW)} expresidente ${this._name} nació en ${this._location}`;
        const iterable = Object.values(database.people)
            .filter(p => getCity(p) !== this._location)
            .map(p => getFullName(p));
        this._options = generateOptions(iterable, this._rightOptionIndex, this._name);
    }   
};

class QT1Subtype3 extends QType1 {
    constructor() {
        super();
        this._score = 20;
        const formattedBirth = formatDate(this._birth);
        this._text = `¿Cuándo nació ${this._genderKW} expresidente ${this._name}?`;
        this._details = `${capitalize(this._genderKW)} expresidente ${this._name} nació el día ${formattedBirth}`;
        const iterable = Array.from({length: ITERABLE_LEN}, () => formatDate(this._birth+Math.floor((2*Math.random()-1)*45*DAY_MS)));
        this._options = generateOptions(iterable, this._rightOptionIndex, formattedBirth);
    }
};

class QT1Subtype4 extends QType1 {
    constructor() {
        super();
        this._score = 20;
        const formattedBirth = formatDate(this._birth);
        this._text = `¿Qué expresidente nació el día ${formattedBirth}?`;
        this._details = `${capitalize(this._genderKW)} expresidente ${this._name} nació el día ${formattedBirth}`;
        const iterable = Object.values(database.people)
            .map(p => getFullName(p));
        this._options = generateOptions(iterable, this._rightOptionIndex, this._name);
    }
};

class QT1Subtype5 extends QType1 {
    constructor() {
        super();
        this._score = 30;
        this._text = `¿Hace cuántos años nació ${this._genderKW} expresidente ${this._name}?`;
        this._details = `${capitalize(this._genderKW)} expresidente ${this._name} nació hace ${this._age}`;
        const iterable = Array.from({length: ITERABLE_LEN}, () => moment(this._birth + (40*Math.random()-20)*YEAR_MS).fromNow(true));
        this._options = generateOptions(iterable, this._rightOptionIndex, this._age);
    }
};

class QType2 extends QuestionBase {
    constructor() {
        super();
        this._theme = "Segundos nombres";
        this._score = 10;
        const person = getRandomElement(Object.values(database.people).filter(p => p.name.split(" ").length > 1));
        const names = person.name.split(" ");
        this._firstName = names[0];
        this._secondName = names[1];
        this._surname = person.surname;
        this._alive = isAlive(person);
        this._male = isMale(person);
    }
};

class QT2Subtype1 extends QType2 {
    constructor() {
        super();
        const keyword = this._alive ? "es" : "era";
        const genderKW = this._male ? "del":"de la";
        this._text = `¿Cuál ${keyword} el segundo nombre ${genderKW} (ex)presidente ${this._firstName} ${this._surname}?`;
        this._details = `El nombre completo era ${this._firstName} ${this._secondName} ${this._surname}`;
        const iterable = Object.values(database.people)
            .filter(p => p.name.split(" ").length > 1)
            .map(p => p.name.split(" ")[1]);
        this._options = generateOptions(iterable, this._rightOptionIndex, this._secondName);
    }
};

class QT2Subtype2 extends QType2 {
    constructor() {
        super();
        const keyword = this._alive ? "es" : "era";
        this._text = `¿El segundo nombre de qué (ex)presidente ${keyword} ${this._secondName}?`;
        this._details = `El nombre completo era ${this._firstName} ${this._secondName} ${this._surname}`;
        const iterable = Object.values(database.people)
            .filter(p => {
                const names = p.name.split(" ");
                if(names.length > 1)
                    return names[1] !== this._secondName;
                return false;
            })
            .map(p => p.name.split(" ")[0]+" "+p.surname);
        this._options = generateOptions(iterable, this._rightOptionIndex, this._firstName+" "+this._surname);
    }
};

class QType3 extends QuestionBase {
    constructor() {
        super();
        this._theme = "Fechas de fallecimiento";
        this._score = 30;
        const person = getRandomElement(Object.values(database.people).filter(p => !isAlive(p)));
        this._name = getFullName(person);
        this._age = getAgeOfDeath(person);
        this._death = getDeathDate(person);
        this._male = isMale(person);
    }
};

class QT3Subtype1 extends QType3 {
    constructor() {
        super();
        const genderKW = this._male ? "el":"la";
        this._text = `¿A qué edad falleció ${genderKW} expresidente ${this._name}?`;
        this._details = `El expresidente ${this._name} falleció a los ${this._age} años de edad`;
        const iterable = Array.from({length: ITERABLE_LEN}, () => `A los ${this._age + Math.floor(40*Math.random()-20)} años`);
        this._options = generateOptions(iterable, this._rightOptionIndex, `A los ${this._age} años`);
    }
};

class QT3Subtype2 extends QType3 {
    constructor() {
        super();
        const genderKW = this._male ? "el":"la";
        this._text = `¿Cuál de los siguientes expresidentes falleció a los ${this._age} años?`;
        this._details = `Quien falleció a los ${this._age} años de edad fue ${genderKW} expresidente ${this._name}`;
        const iterable = Object.values(database.people)
            .filter(p => getAgeOfDeath(p)!==this._age && !isAlive(p))
            .map(p => getFullName(p));
        this._options = generateOptions(iterable, this._rightOptionIndex, this._name);
    }
};

class QT3Subtype3 extends QType3 {
    constructor() {
        super();
        const genderKW = this._male ? "el":"la";
        const year = moment(this._death).year();
        this._text = `¿En qué año falleció ${genderKW} expresidente ${this._name}?`;
        this._details = `${capitalize(genderKW)} expresidente ${this._name} falleció en el año ${year}`;
        const iterable = Array.from({length: ITERABLE_LEN}, () => year + Math.floor(Math.random()*50-25));
        this._options = generateOptions(iterable, this._rightOptionIndex, year);
    }
};

class QType4 extends QuestionBase {
    constructor() {
        super();
        this._theme = "Mandatos";
        this._score = 10;
        const term = getRandomElement(database.terms);
        this._term_begin = term.term_begin;
        this._term_end = term.term_end;
        this._term_duration_f = getTermDuration(term);
        this._party = term.party;
        const person = database.people[term.cid];
        this._fullname = getFullName(person);
        this._exkw = term.cid === lastCID ? "" : "ex";
        this._genderKW = isMale(person) ? "el" : "la";
        this._totalDuration = database.terms
            .filter(t => t.cid === term.cid)
            .reduce((acc, current) => acc + current.term_end - current.term_begin, 0);
    }
};

class QT4Subtype1 extends QType4 {
    constructor() {
        super();
        this._text = `¿Quién gobernó entre el ${formatDate(this._term_begin)} y el ${formatDate(this._term_end)}?`;
        this._details = `${capitalize(this._genderKW)} ${this._exkw}presidente ${this._fullname} gobernó en el período ${moment(this._term_begin).format("DD/MM/YYYY")} - ${moment(this._term_end).format("DD/MM/YYYY")}`;
        const iterable = Object.values(database.people).map(p => getFullName(p));
        this._options = generateOptions(iterable, this._rightOptionIndex, this._fullname);
    }
};

class QT4Subtype2 extends QType4 {
    constructor() {
        super();
        this._text = `¿Durante qué período gobernó ${this._fullname}?`;
        this._details = `${capitalize(this._genderKW)} ${this._exkw}presidente ${this._fullname} gobernó en el período ${moment(this._term_begin).format("DD/MM/YYYY")} - ${moment(this._term_end).format("DD/MM/YYYY")}`;
        const iterable = Array.from({length: ITERABLE_LEN}, () => {
            const tb = this._term_begin + (40*Math.random()-20)*YEAR_MS;
            const te = tb + this._term_end - this._term_begin;
            return `${moment(tb).format("DD/MM/YYYY")} - ${moment(te).format("DD/MM/YYYY")}`;
        });
        this._options = generateOptions(iterable, this._rightOptionIndex, `${moment(this._term_begin).format("DD/MM/YYYY")} - ${moment(this._term_end).format("DD/MM/YYYY")}`);
    }
};

class QT4Subtype3 extends QType4 {
    constructor() {
        super();
        this._text = `¿Cuál era la tendencia política del mandato de ${this._fullname}?`;
        this._details = `La tendencia política del mandato de ${this._fullname} era ${this._party}`;
        const iterable = database.terms.map(t => t.party);
        this._options = generateOptions(iterable, this._rightOptionIndex, this._party);
    }
};

class QT4Subtype4 extends QType4 {
    constructor() {
        super();
        this._text = `¿A qué ${this._exkw}presidente se lo asocia con la tendencia ${this._party}?`;
        this._details = `Al ${this._exkw}presidente ${this._fullname} se lo asocia con la tendencia ${this._party}`;
        const iterable = database.terms.filter(t => t.party !== this._party).map(t => getFullName(database.people[t.cid]));
        this._options = generateOptions(iterable, this._rightOptionIndex, this._fullname);
    }
};

class QT4Subtype5 extends QType4 {
    constructor() {
        super();
        this._text = `¿Cuántos años en total gobernó ${this._genderKW} ${this._exkw}presidente ${this._fullname}?`;
        this._details = `${capitalize(this._genderKW)} ${this._exkw}presidente ${this._fullname} gobernó un total de ${Math.floor(this._totalDuration/YEAR_MS)} años`;
        const iterable = Array.from({length: ITERABLE_LEN}, () => Math.floor(Math.random()*10 + 2)+ " años");
        this._options = generateOptions(iterable, this._rightOptionIndex, Math.floor(this._totalDuration/YEAR_MS)+" años");
    }
};

const classes = [
    QT1Subtype1,
    QT1Subtype2,
    QT1Subtype3,
    QT1Subtype4,
    QT1Subtype5,
    QT2Subtype1,
    QT2Subtype2,
    QT3Subtype1,
    QT3Subtype2,
    QT3Subtype3,
    QT4Subtype1,
    QT4Subtype2,
    QT4Subtype3,
    QT4Subtype4,
    QT4Subtype5
];

const getRandomQuestion = () => {
    const constructor = getRandomElement(classes);
    const question = new constructor();
    return question.export();
};

export default getRandomQuestion;

/*
stats based questions:
- [ ] Cuántos expresidentes con vida había entre ... y ...
- [ ] Cuántos expresidentes nacieron en el mes de ...    
- [ ] Cuántos expresidentes nacieron en la provincia de ...

get person from people --> picture
- [ ] A qué presidente corresponde el siguiente retrato:  
- [ ] Cuál de los siguientes retratos corresponde a ....  
*/