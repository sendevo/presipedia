import { useSearchParams } from 'react-router-dom'
import { 
    Box,
    Card, 
    CardMedia, 
    CardContent, 
    Typography 
} from '@mui/material';
import moment from 'moment';
import MainView from "../../components/MainView";
import { APP_NAME } from '../../model/constants';
import { 
    getZodiac, 
    location2GoogleMap, 
    formatDate 
} from '../../model/utils';
import { 
    getTermDuration, 
    getAgeOfAssumption,
    isMale,
    getLastCID 
} from '../../model/data';
import database from "../../assets/database.json";
import background from "../../assets/backgrounds/background5.jpg";

const ulStyle = {marginTop: "0px"};

const View = () => {
    const [searchParams] = useSearchParams();
    const cid = decodeURIComponent(searchParams.get("cid"));
    const person = database.people[cid];
    const available = Boolean(person);
    const data = {};
    if(available){
        data.fullname =`${person.name} ${person.surname}`;
        data.picture = person.picture;
        data.birthdate = formatDate(person.birth_date);
        data.zodiac = getZodiac(person.birth_date);
        data.occupation = person.occupation;
        data.deathdate = person.death_date ? formatDate(person.death_date) : false;
        data.deathage = person.death_date ? moment(person.death_date).diff(person.birth_date, "years", false) : false;
        data.cause_of_death = data.deathdate ? person.cause_of_death : false;
        data.city = person.birth_location.features[0].properties.city;
        data.province = person.birth_location.features[0].properties.province;        
        data.locationURL = location2GoogleMap(person.birth_location);
        data.kw = {
            ex: getLastCID(database.terms) === cid ? "" : "ex",
            gender: isMale(person) ? "El" : "La",
            was: person.death_date ? "era":"es"
        };
    }
    return (
        <MainView title={data.fullname || "Persona no encontrada!"} background={background}>
            {available? 
                <Card>
                    <CardMedia
                        sx={{height:"200px"}}
                        image={`/pictures/${data.picture}`}
                        title={data.fullname}/>
                    <CardContent>
                        <Box>
                            <Typography>{data.kw.gender} {data.kw.ex}presidente {data.fullname} nació el {data.birthdate} (bajo el signo {data.zodiac.name}) en la localidad de <a href={data.locationURL} rel="noopener" target="_blank">{data.city}</a> ({data.province}). Su ocupación {data.kw.was} {data.occupation}.</Typography>
                            {data.deathdate && <Typography>{`Falleció a los ${data.deathage} años (${data.deathdate})`}{data.cause_of_death ? `, a causa de "${data.cause_of_death}".` : "."}</Typography>}
                        </Box>
                        <Box>
                            <Typography fontWeight="bold">Mandatos presidenciales:</Typography>
                            <ul style={ulStyle}>
                            {database.terms.filter(t => t.cid === cid).map((t, index) => (
                                <li key={index}>
                                    <Typography>Del {formatDate(t.begin)} al {formatDate(t.end)} (durante {getTermDuration(t)}). Asumió a los {getAgeOfAssumption(person,t)} años de edad y la tendencia política de su mandato {data.kw.was} "{t.party}".</Typography>
                                </li>
                            ))}
                            </ul>
                        </Box>
                    </CardContent>
                </Card>
                :
                <Typography>El perfil de la persona no se encuentra en la base de datos de <b>{APP_NAME}</b></Typography>
            }
        </MainView>
    );
};

export default View;
