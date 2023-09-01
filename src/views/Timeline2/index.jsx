import Timeline  from '../../components/Timeline2';
import MainView from "../../components/MainView";
import background from "../../assets/backgrounds/background4.jpg";
import database from "../../assets/database.json";

const getContentBlock = person => {
    const name = `${person.name} ${person.surname}`;
    const image = `/pictures/${person.picture}`;
    return {name, image};
};

const terms = database.terms
    .map((term, index) => ({
        id: index + 1,
        content: getContentBlock(database.people[term.cid]),
        start: term.term_begin,
        end: term.term_end
    }));

const View = () => (
    <MainView title="Líneas de tiempo" background={background}>
        <Timeline 
            title="Cronología de mandatos" 
            items={terms} />
    </MainView>
);

export default View;