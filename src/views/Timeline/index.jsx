import moment from 'moment';
import Timeline  from '../../components/Timeline';
import MainView from "../../components/MainView";
import { VIS_DATE_FORMAT } from '../../model/constants';
import background from "../../assets/backgrounds/background4.jpg";
import database from "../../assets/database.json";

const getContentBlock = person => {
    const name = `<p>${person.name} ${person.surname}</p>`;
    const profilePic = `<img src="${'/pictures/'+person.picture}" alt="${person.surname}" width="50px" height="50px" />`;
    const container = `<div style="background-color: #f2f2f2;">
                            ${name}
                            ${profilePic}
                       </div>`;
    return container;
};

const terms = database.terms
    .map((term, index) => ({
        id: index + 1,
        content: getContentBlock(database.people[term.cid]),
        start: moment(term.term_begin).format(VIS_DATE_FORMAT),
        end: moment(term.term_end).format(VIS_DATE_FORMAT)
    }));

const periodOfLife = Object.keys(database.people)
    .map((cid, idx) => {
        const person = database.people[cid];
        return {
            id: idx + 1,
            content: getContentBlock(person),
            start: moment(person.birth_date).format(VIS_DATE_FORMAT),
            end: moment(person.death_date ? person.death_date : database.updated).format(VIS_DATE_FORMAT)
        };
    });

const View = () => (
    <MainView title="Líneas de tiempo" background={background}>
        <Timeline 
            title="Cronología de mandatos" 
            items={terms} />
        <Timeline 
            title="Nacimientos y fallecimientos *" 
            clarification="* Hasta la fecha de actualización de los datos." 
            items={periodOfLife} />
    </MainView>
);

export default View;