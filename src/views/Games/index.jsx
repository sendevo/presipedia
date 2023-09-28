import { useState } from "react";
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
        key: CANDIDATE_RESULTS_KEY,
        path: "/games/candidate",
        title: "Presidenciómetro",
        text: "¿Podrás ser el siguiente?",
        icon: candidateIcon,
        titleFormatter: (data, cid) => data[cid].name
    },
    {
        key: QUIZ_PROGRESS_KEY,
        path: "/games/quiz",
        title: "Preguntas y respuestas",
        text: "Pon a prueba tus conocimientos",
        icon: quizIcon,
        titleFormatter: (data, cid) => data[cid]?.players?.map(p => p.name).join(",") || "Sin nombres"
    }
];

const getStoredItems = ({key, path, titleFormatter}) => {
    const data = localStorage.getItem(key);
    if(data){
        const items = JSON.parse(data);
        return Object.keys(items).map(cid => ({
            cid,
            key,
            link: `${path}?cid=${encodeURIComponent(cid)}`,
            title: titleFormatter(items, cid),
            timestamp: items[cid].timestamp
        }));
    }
    return [];
};

const View = () => {
    
    const [storedGames, setStoredGames] = useState(
        content.reduce((acc, current) => ([...acc, ...getStoredItems(current)]), [])
    );

    const handleRemoveGame = (key, cid) => {
        const oldData = localStorage.getItem(key);
        if(oldData){
            const items = JSON.parse(oldData);
            delete items[cid];
            localStorage.setItem(key, JSON.stringify(items));
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
                            <Typography fontSize={12}>{g?.title || "Sin titulo"} - {moment(g.timestamp).format("D/M/YYYY - HH:mm")}</Typography>
                            <Link to={g.link}>Abrir</Link>
                            <Button size="small" variant="contained" onClick={() => handleRemoveGame(g.key, g.cid)}>Eliminar</Button>
                        </Box>
                    ))
                }
            </Box>
        </MainView>
    );
};

export default View;
