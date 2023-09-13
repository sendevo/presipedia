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
import { location2GoogleMap } from '../../model/utils';
import { getLocationName } from '../../model/data';
import database from "../../assets/database.json";
import background from "../../assets/backgrounds/background5.jpg";

const View = () => {
    const [searchParams] = useSearchParams();
    const index = searchParams.get("index");
    const event = database.events[index];
    const available = Boolean(event);
    const data = {};
    if(available){
        data.title = event.title;
        data.description = event.description;
        data.time = (event.end ? "Del " : "")+moment(event.begin).format("D/M/YYYY")+(event.end ? (" hasta el "+moment(event.end).format("D/M/YYYY")):"");
        data.sources = event.sources;
        if(event.location){
            data.locationURL = location2GoogleMap(event.location);
            data.locationName = getLocationName(event.location);
        }
    }
    return (
        <MainView title={"Evento histórico" || "Evento no encontrado!"} background={background}>
            {available? 
                <Card>
                    {event.picture && <CardMedia
                        sx={{height:"200px"}}
                        image={`/pictures/${event.picture}`}
                        title={data.title}/>}
                    <CardContent>
                        <Box>
                            <Typography 
                                variant="h5" 
                                lineHeight={"1em"}>
                                    {data.title}
                            </Typography>
                            <Typography 
                                fontSize={14} 
                                fontStyle={"italic"}>
                                    Fecha: {data.time}
                            </Typography>
                            <Typography>{data.description}</Typography>
                            {data.locationURL && <Typography>Este evento ocurrió en <a href={data.locationURL} rel="noopener" target="_blank">{data.locationName}</a></Typography>}
                        </Box>
                        <Box>
                            <Typography fontWeight={"bold"} fontSize={"14px"}>Fuente(s)</Typography>
                            {data.sources.map((s,i) => (
                                <Typography key={i} fontSize={"11px"}>[{i+1}] {s}</Typography>
                            ))}
                        </Box>
                    </CardContent>
                </Card>
                :
                <Typography>El detalle del evento no se encuentra en la base de datos de <b>{APP_NAME}</b></Typography>
            }
        </MainView>
    );
};

export default View;
