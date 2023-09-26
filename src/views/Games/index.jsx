import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import moment from "moment";
import MainView from "../../components/MainView";
import GridMenu from "../../components/GridMenu";
import { CANDIDATE_RESULTS_KEY, QUIZ_PROGRESS_KEY } from "../../model/storage";
import candidateIcon from "../../assets/icons/candidate_gauge.png";
import quizIcon from "../../assets/icons/test.png";
import background from "../../assets/backgrounds/background8.jpg";


const content = [
    {
        path: "/games/candidate",
        title: "Presidenciómetro",
        text: "¿Podrás ser el siguiente?",
        icon: candidateIcon
    },
    {
        path: "/games/quiz",
        title: "Preguntas y respuestas",
        text: "Pon a prueba tus conocimientos",
        icon: quizIcon
    }
];

const getStoredItems = (key, linkFormatter, titleFormatter) => {
    const data = localStorage.getItem(key);
    if(data){
        const items = JSON.parse(data);
        return Object.keys(items).map(cid => ({
            cid,
            type: key,
            link: linkFormatter(cid),
            title: titleFormatter(items, cid),
            timestamp: items[cid].timestamp
        }));
    }
    return [];
}

const View = () => {
    
    const [storedGames, setStoredGames] = useState([]);

    useEffect(() => {
        const nextStoredGames = [];

        nextStoredGames.push(...getStoredItems(
            CANDIDATE_RESULTS_KEY, 
            cid => `/games/candidate?cid=${encodeURIComponent(cid)}`,
            (data, cid) => data[cid].name
        ));

        nextStoredGames.push(...getStoredItems(
            QUIZ_PROGRESS_KEY,
            cid => `/games/quiz?cid=${encodeURIComponent(cid)}`,
            (data, cid) => data[cid]?.players?.join(",") || "Sin nombres"
        ));

        setStoredGames(nextStoredGames);
    }, []);

    const handleRemoveGame = (type, cid) => {
        const oldData = localStorage.getItem(type);
        if(oldData){
            const items = JSON.parse(oldData);
            delete items[cid];
            localStorage.setItem(type, JSON.stringify(items));
            setStoredGames(prevGames => prevGames.filter(g => g.cid !== cid));
        }else{
            console.error("Error: no data in localStorage");
        }
    };

    return (
        <MainView title="Entretenimiento" background={background}>
            <GridMenu items={content} subtitle=""/>
            <Box sx={{mt:2}}>
                {storedGames.length > 0 && <Typography>Guardado</Typography>}
                {
                    storedGames.map((g, index) => (
                        <Box key={index} display={"flex"} flexDirection={"row"}>
                            <Typography fontSize={12}>{g?.title || "Sin titulo"} - {moment(g.timestamp).format("D/M/YYYY - HH/mm")}</Typography>
                            <Link to={g.link}>Abrir</Link>
                            <Button size="small" variant="contained" onClick={() => handleRemoveGame(g.type, g.cid)}>Eliminar</Button>
                        </Box>
                    ))
                }
            </Box>
        </MainView>
    );
};

export default View;
