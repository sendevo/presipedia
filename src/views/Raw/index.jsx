import { Typography } from "@mui/material";
import MainView from "../../components/MainView";
import DataTable from "../../components/DataTable";
import GenericCard from "../../components/GenericCard";
import { getFullName } from "../../model/data";
import database from "../../assets/database.json";
import background from "../../assets/backgrounds/background.png";
import moment from "moment";
import { Link } from "react-router-dom";

const headers = [
    {
        text: "Nombre",
        key: "name"
    },
    {
        text: "Inicio",
        key: "term_begin"
    },
    {
        text: "Fin",
        key: "term_end"
    },
    {
        text: "Tend. política",
        key: "party"
    }
];

const rows = database.terms.map((term, index)=>({
    name: 
        <Link to={`/vis/profile?cid=${encodeURIComponent(term.cid)}`}>
            <Typography fontSize={12}>
                {getFullName(database.people[term.cid])}
            </Typography>
        </Link>,
    term_begin: 
        <Typography fontSize={12}>
            {moment(term.term_begin).format("DD-MMMM/YYYY")}
        </Typography>,
    term_end: 
        <Typography fontSize={12}>
            {moment(term.term_end).format("DD/MMMM/YYYY")},
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