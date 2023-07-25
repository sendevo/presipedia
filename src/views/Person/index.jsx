import { useSearchParams } from 'react-router-dom'
import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import moment from 'moment';
import MainView from "../../components/MainView";
import { APP_NAME } from '../../model/constants';
import { getZodiac, location2GoggleMap } from '../../model/utils';
import database from "../../assets/database.json";
import image from "../../assets/backgrounds/background2.jpg";


const View = () => {
    const [searchParams] = useSearchParams();
    const cid = searchParams.get("cid");
    const person = database.people[cid];
    const available = Boolean(person);
    const data = {};
    if(available){
        data.fullname =`${person.name} ${person.surname}`;
        data.birthdate = moment(person.birth_date).format("LL");
        data.zodiac = getZodiac(person.birth_date);
        data.deathdate = person.death_date ? moment(person.death_date).format("LL") : false;
        data.deathage = person.death_date ? moment(person.death_date).diff(person.birth_date, "years", false) : false;
        data.city = person.birth_location.features[0].properties.city;
        const [lng, lat] = person.birth_location.features[0].geometry.coordinates;
        data.locationURL = location2GoggleMap(lat,lng);
        data.kw = {
            ex: "",
            gender: "El"
        };
    }
    return (
        <MainView title={data.fullname || "Persona no encontrada!"} background={image}>
            {available? 
                <Card>
                    <CardMedia
                        sx={{height:"200px"}}
                        image={`/pictures/${person.picture}`}
                        title={data.fullname}/>
                    <CardContent>
                        {data.kw.gender} {data.kw.ex}presidente {data.fullname} nació el {data.birthdate} (bajo el signo {data.zodiac.name}) en la localidad de <a href={data.locationURL} rel="noopener" target="_blank">{data.city}</a>.
                        <br/>
                        {data.deathdate && `Falleció a los ${data.deathage} años (${data.deathdate})`}.
                    </CardContent>
                </Card>
                :
                <Typography>El perfil de la persona no se encuentra en la base de datos de <b>{APP_NAME}</b></Typography>
            }
        </MainView>
    );
};

export default View;
