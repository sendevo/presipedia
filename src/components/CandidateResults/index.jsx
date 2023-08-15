import { 
    Button, 
    Box, 
    Stack,
    Typography,
    Grid
} from "@mui/material";
import { RadarChart } from "../../charts";
import { colorRangeGenerator } from "../../model/utils";
import { getScaleKeyName, getScaleLongName } from "../../model/candidate/actions";


const mainResultStyle = {
    fontSize: "18px",
    fontWeight: "bold",
    margin: "5px 0px"
};

let imageData = "";

const CandidateResults = ({results, onReset, onShare}) => {

    const labels = Object.keys(results).filter(k => k !== "total" && k !== "name");
    const labelNames = labels.map(k => getScaleKeyName(k));
    const datasets = labels.map(l => results[l].score);
    const strengths = labels.filter(l => results[l].score > 50).map(k => ({name:getScaleLongName(k), value: `${results[k].score.toFixed()} (${results[k].freq.toFixed(2)}%)`}));
    const weakness = labels.filter(l => results[l].score <= 50).map(k => ({name:getScaleLongName(k), value: `${results[k].score.toFixed()} (${results[k].freq.toFixed(2)}%)`}));

    const handleShare = () => {
        const data = {
            ...results,
            image: imageData
        };
        onShare(data);
    };

    return (
        <Box>
            <Box>
                <Typography>Resultados para <b>{results.name}</b></Typography>
                <Typography sx={mainResultStyle}>Puntaje obtenido: {results.total?.toFixed(2)}%</Typography>
                <Grid container direction="row" spacing={1} sx={{fontSize:11}}>
                    {strengths.length > 0 && 
                        <Grid item xs={6}>
                            <Typography fontSize={12}>Los fuertes:</Typography>
                            <ul style={{margin:"0px", paddingLeft: "15px"}}>
                                {strengths.map((item, index) => (
                                    <li style={{paddingLeft: "0px"}} key={index}>{item.name}: {item.value}</li>
                                ))}
                            </ul>
                        </Grid>}
                    {weakness.length > 0 && 
                        <Grid item xs={6}>
                            <Typography fontSize={12}>Las debilidades:</Typography>
                            <ul style={{margin:"0px", paddingLeft: "15px"}}>
                                {weakness.map((item, index) => (
                                    <li style={{paddingLeft: "0px"}} key={index}>{item.name}: {item.value}</li>
                                ))}
                            </ul>
                        </Grid>}
                </Grid>
            </Box>
            <RadarChart 
                title="Compatibilidad por escala"
                labels={labelNames}              
                suffix=" pts."  
                datasets={[{
                    data: datasets,
                    label: "Compatibilidad",
                    backgroundColor: colorRangeGenerator(12, 230),
                    borderColor: 'rgba(20, 20, 250, 0.5)',
                    borderWidth: 1
                }]}
                onReady={data => {imageData = data}}/>
            <Stack sx={{m:3, p:2}}>
                <Button 
                    variant="contained"
                    onClick={onReset}>¡Evaluar otro candidato!</Button>
                <Button 
                    sx={{mt:2}}
                    variant="contained"
                    size="small"
                    color="secondary"
                    onClick={handleShare}>Compartir resultados</Button>
            </Stack>
        </Box>
    )
};

export default CandidateResults;