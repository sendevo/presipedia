import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import moment from "moment";
import MainView from "../../components/MainView";
import DataTable from "../../components/DataTable";
import GenericCard from "../../components/GenericCard";
import { getFullName, getTermDuration, getLocationName } from "../../model/data";
import { cropString, location2GoogleMap } from "../../model/utils";
import database from "../../assets/database.json";
import background from "../../assets/backgrounds/background.png";


const termHeaders = [
    {
        text: "#",
        key: "number"
    },
    {
        text: "Nombre",
        key: "name"
    },
    {
        text: "Inicio",
        key: "begin"
    },
    {
        text: "Edad",
        key: "age"
    },
    {
        text: "Fin",
        key: "end"
    },
    {
        text: "Duración",
        key: "duration"
    },
    {
        text: "Tend. política",
        key: "party"
    }
];

const termRows = database.terms.map((term, index)=>({
    number:
        <Typography fontSize={12}>
            {index+1}
        </Typography>,
    name: 
        <Link to={`/vis/profile?cid=${encodeURIComponent(term.cid)}`}>
            <Typography fontSize={12} lineHeight={"1em"}>
                {getFullName(database.people[term.cid])}
            </Typography>
        </Link>,
    begin: 
        <Typography fontSize={12} lineHeight={"1em"}>
            {moment(term.begin).format("DD MMMM YYYY")}
        </Typography>,
    age:
        <Typography fontSize={12} lineHeight={"1em"}>
            {moment(term.begin).diff(database.people[term.cid].birth_date,"years", false)} años
        </Typography>,
    end: 
        <Typography fontSize={12} lineHeight={"1em"}>
            {moment(term.end).format("DD MMMM YYYY")}
        </Typography>,
    duration:
        <Typography fontSize={12} lineHeight={"1em"}>
            {getTermDuration(term)}
        </Typography>,
    party: 
        <Typography fontSize={12} lineHeight={"1em"}>
            {term.party}
        </Typography>
}));

const eventHeaders = [
    {
        text: "Evento",
        key: "title"
    },
    {
        text: "Inicio",
        key: "begin"
    },
    {
        text: "Fin",
        key: "end"
    },
    {
        text: "Duración",
        key: "duration"
    },
    {
        text: "Ubicación",
        key: "location"
    },
    {
        text: "Detalle",
        key: "description"
    }
];

const eventRows = database.events.map((event, index)=>({
    title: 
        <Link to={`/vis/event?index=${index}`}>
            <Typography fontSize={12} lineHeight={"1em"}>
                {cropString(event.title, 30)}
            </Typography>
        </Link>,
    begin: 
        <Typography fontSize={12} lineHeight={"1em"}>
            {moment(event.begin).format("DD MMMM YYYY")}
        </Typography>,
    end: 
        <Typography fontSize={12} lineHeight={"1em"}>
            {event.end ? moment(event.end).format("DD MMMM YYYY") : ""}
        </Typography>,
    duration:
        <Typography fontSize={12} lineHeight={"1em"}>
            {event.end ? getTermDuration(event) : ""}
        </Typography>,
    location:
        event.location ? 
            <Typography fontSize={12} lineHeight={"1em"}>
                <a href={location2GoogleMap(event.location)} rel="noopener" target="_blank">{getLocationName(event.location)}</a>
            </Typography>
            :
            <Typography fontSize={12} lineHeight={"1em"}></Typography>,
    description: 
        <Typography fontSize={12} fontStyle={"italic"} lineHeight={"1em"}>
            {cropString(event.description, 50)}
        </Typography>
}));

const View = () => {
    return(
        <MainView title="Base de datos" background={background}>
            <Typography 
                fontWeight={"bold"} 
                fontSize={"16px"} 
                sx={{pb:2}}>
                    Lista completa de mandatos
            </Typography>
            <GenericCard>
                <DataTable headers={termHeaders} rows={termRows}/>
            </GenericCard>
            
            <Typography 
                fontWeight={"bold"} 
                fontSize={"16px"} 
                sx={{pb:2, pt:3}}>
                    Lista de eventos históricos
            </Typography>
            <GenericCard>
                <DataTable headers={eventHeaders} rows={eventRows}/>
            </GenericCard>
        </MainView>
    );
};

export default View;