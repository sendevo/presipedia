import moment from 'moment';
import Timeline  from '../../components/Timeline';
import MainView from "../../components/MainView";
import { VIS_DATE_FORMAT } from '../../model/constants';
import database from '../../assets/database.json';

const options = {
    locale: 'es',
    height: '300px',
    margin: {
        item: 20,
        axis: 40
    }
};

const items = database.terms.map((term, index) => ({
    id: index+1,
    content: database.people[term.cid].name + " " + database.people[term.cid].surname, // use HTML
    start: moment(term.term_begin).format(VIS_DATE_FORMAT),
    end: moment(term.term_end).format(VIS_DATE_FORMAT)
}));

const View = () => (
    <MainView title="Cronología presidencial">
        <Timeline options={options} items={items} />
    </MainView>
);

export default View;