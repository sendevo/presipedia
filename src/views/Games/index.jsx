import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Box, Button, Typography } from "@mui/material";
import moment from "moment";
import { FaTrash, FaExternalLinkSquareAlt } from "react-icons/fa";
import MainView from "../../components/MainView";
import GridMenu from "../../components/GridMenu";
import DataTable from "../../components/DataTable";
import { CANDIDATE_RESULTS_KEY, QUIZ_PROGRESS_KEY } from "../../model/storage";
import { cropString } from "../../model/utils";
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
        titleFormatter: (data, cid) => cropString(data[cid]?.players?.map(p => p.name).join(", ") || "Sin nombres", 20)
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

const gameHeaders = [
    {text: "Jugador/es", key: "title"},
    {text: "Juego", key: "game"},
    {text: "Guardado", key: "timestamp"},
    {text: "Acciones", key: "actions"}
];

const iconStyle = {
    display: "block", 
    marginLeft: "auto", 
    marginRight:"auto",
    filter: "contrast(50%) drop-shadow(2px 2px 3px #888)"
};


const View = () => {
    
    const [storedGames, setStoredGames] = useState(
        content.reduce((acc, current) => ([...acc, ...getStoredItems(current)]), [])
    );

    const navigate = useNavigate();

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
            {storedGames.length > 0 && 
                <Box sx={{mt:3}}>
                    <Typography fontWeight={"bold"}>Progreso y resultados guardados:</Typography>
                    <DataTable headers={gameHeaders} rows={storedGames.map(g => (
                        {
                            title: () => <Typography fontSize={12}>{g?.title || "Sin titulo"}</Typography>,
                            game: () => <img src={content.find(c => c.key === g.key).icon} height={"25px"} style={iconStyle}></img>,
                            timestamp: () => <Typography fontSize={10}>{moment(g.timestamp).format("D/M/YYYY HH:mm")}</Typography>,
                            actions: () => <Grid container spacing={0}>  
                                <Grid item xs={6}>
                                    <Box display="flex" justifyContent="flex-end">
                                        <Button size="small" onClick={() => navigate(g.link)} sx={{m:0, p:0}} title="Abrir">
                                            <FaExternalLinkSquareAlt/>
                                        </Button>
                                    </Box>
                                </Grid>
                                <Grid item xs={6}>
                                    <Box display="flex" justifyContent="flex-end">
                                        <Button size="small" onClick={() => handleRemoveGame(g.key, g.cid)} sx={{m:0, p:0}} title="Eliminar">
                                            <FaTrash color="red"/>
                                        </Button>
                                    </Box>
                                </Grid>
                            </Grid>
                        }
                    ))}/>
                </Box>
            }
        </MainView>
    );
};

export default View;
