import { Typography } from "@mui/material";
import MainView from "../../components/MainView";
import DataTable from "../../components/DataTable";
import GenericCard from "../../components/GenericCard";
import { getFullName, getTermDuration } from "../../model/data";
import database from "../../assets/database.json";
import background from "../../assets/backgrounds/background.png";
import moment from "moment";
import { Link } from "react-router-dom";

const headers = [
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
        key: "term_begin"
    },
    {
        text: "Edad",
        key: "age"
    },
    {
        text: "Fin",
        key: "term_end"
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

const rows = database.terms.map((term, index)=>({
    number:
        <Typography fontSize={12}>
            {index+1}
        </Typography>,
    name: 
        <Link to={`/vis/profile?cid=${encodeURIComponent(term.cid)}`}>
            <Typography fontSize={12}>
                {getFullName(database.people[term.cid])}
            </Typography>
        </Link>,
    term_begin: 
        <Typography fontSize={12}>
            {moment(term.term_begin).format("DD MMMM YYYY")}
        </Typography>,
    age:
        <Typography fontSize={12}>
            {moment(term.term_begin).diff(database.people[term.cid].birth_date,"years", false)} años
        </Typography>,
    term_end: 
        <Typography fontSize={12}>
            {moment(term.term_end).format("DD MMMM YYYY")}
        </Typography>,
    duration:
        <Typography fontSize={12}>
            {getTermDuration(term)}
        </Typography>,
    party: 
        <Typography fontSize={12}>
            {term.party}
        </Typography>
}));

const View = () => {
    return(
        <MainView title="Base de datos" background={background}>
            <Typography fontWeight={"bold"} fontSize={"16px"} sx={{pb:2}}>Lista completa de mandatos</Typography>
            <GenericCard>
                <DataTable headers={headers} rows={rows}/>
            </GenericCard>
        </MainView>
    );
};

export default View;