import { useState } from "react";
import { 
    Box,
    Button,
    Dialog,
    DialogTitle,  
    DialogContent,
    DialogActions,
    Grid,
    DialogContentText,
    Typography
} from "@mui/material";
import { Input } from "../Inputs";
import { FaTrash, FaUser } from "react-icons/fa";

const dialogBackdropStyle = {backdrop:{sx:{backdropFilter: "blur(2px)"}}};

const startButtonStyle = {
    animationName: 'pulse',
    animationDuration: '1.0s',
    animationDirection: 'alternate',
    animationIterationCount: 'infinite'
  };

const keyframesStyles = `
@keyframes pulse {
    0% {box-shadow: none;}
    100% {box-shadow: 0px 0px 10px 2px rgba(30, 30, 255, 0.8);}
}`;

const warningMessageStyle = {
    fontStyle:"italic", 
    lineHeight:"1.2em", 
    color:"gray", 
    fontSize:"14px"
};

const PlayersDialog = ({open, onPlayersReady}) => {

    const [players, setPlayers] = useState(["Jugador 1"]);

    const disableReady = players.length === 0 || players.some(pl => pl === "");

    const handlePlayerNameChange = (value, index) => {
        setPlayers(prevPlayers => {
            prevPlayers[index] = value;
            return [...prevPlayers];
        });
    };

    const handleAddPlayer = () => {
        setPlayers(prevPlayers => {
            prevPlayers.push(`Jugador ${players.length+1}`); 
            return [...prevPlayers];
        });
    };

    const handleRemovePlayer = index => {
        setPlayers(prevPlayers => {
            prevPlayers.splice(index,1);
            return prevPlayers.map((pl, index) => `Jugador ${index+1}`);
        });
    };

    return (
        <Dialog open={open} slotProps={dialogBackdropStyle}>
            <style>{keyframesStyles}</style>
            <DialogTitle sx={{padding:"5px"}}>¿Con quiénes vas a jugar?</DialogTitle>
            <DialogContent>
                {players.length===4 && <DialogContentText sx={warningMessageStyle}>
                    El número máximo de jugadores admitidos es 4
                </DialogContentText>}
                <Grid container direction="column" sx={{marginTop: "10px", width:"100%"}}>
                    {players.map((p, index) => (
                        <Grid container direction="row" key={index} sx={{marginTop:"20px"}}>
                            <Grid item sx={{paddingRight:"5px"}}>
                                <FaUser size={20} />
                            </Grid>
                            <Grid item>
                                <Input 
                                    label={"Nombre de Jugador "+(index+1)}
                                    name="name"
                                    type="text"
                                    value={p}
                                    error={p===""}
                                    onChange={v => handlePlayerNameChange(v.target.value, index)}/>
                            </Grid>
                            {players.length > 1 && 
                                <Grid item sx={{paddingLeft:"5px"}}>
                                    <Box onClick={() => handleRemovePlayer(index)}>
                                        <FaTrash color="darkred"/>
                                    </Box>
                                </Grid>
                            }
                        </Grid>
                    ))}
                </Grid>
            </DialogContent>
            <DialogActions sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Button 
                    disabled={players.length > 3}
                    color="secondary"
                    onClick={handleAddPlayer}>
                        Añadir participante
                </Button>
                <Button 
                    sx={disableReady ? {} : startButtonStyle}
                    disabled={disableReady}
                    variant="contained"
                    onClick={()=>onPlayersReady(players)}>
                        ¡Comenzar!
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default PlayersDialog;