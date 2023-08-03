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

const CandidateResults = ({results, onReset}) => {

    const labels = Object.keys(results).filter(k => k !== "total" && k !== "name");
    const labelNames = labels.map(k => getScaleKeyName(k));
    const datasets = labels.map(l => results[l]);
    const strengths = labels.filter(l => results[l] > 50).map(k => ({name:getScaleLongName(k), value: results[k]}));
    const weakness = labels.filter(l => results[l] < 50).map(k => ({name:getScaleLongName(k), value: results[k]}));

    return (
        <Box>
            <Box>
                <Typography>Resultados para <b>{results.name}</b></Typography>
                <Typography sx={mainResultStyle}>Puntaje obtenido: {results.total?.toFixed(2)}%</Typography>
                <Grid container direction="row" spacing={1} sx={{fontSize:12}}>
                    {strengths.length > 0 && 
                        <Grid item xs={6}>
                            <Typography fontSize={14}>Los fuertes:</Typography>
                            <ul style={{margin:"0px", paddingLeft: "15px"}}>
                                {strengths.map((item, index) => (
                                    <li key={index}>{item.name}: {item.value.toFixed(2)}%</li>
                                ))}
                            </ul>
                        </Grid>}
                    {weakness.length > 0 && 
                        <Grid item xs={6}>
                            <Typography fontSize={14}>Las debilidades:</Typography>
                            <ul style={{margin:"0px", paddingLeft: "15px"}}>
                                {weakness.map((item, index) => (
                                    <li key={index}>{item.name}: {item.value.toFixed(2)}%</li>
                                ))}
                            </ul>
                        </Grid>}
                </Grid>
            </Box>
            <RadarChart 
                title="Compatibilidad por escala"
                labels={labelNames}
                suffix="%"
                datasets={[{
                    data: datasets,
                    label: "Compatibilidad",
                    backgroundColor: colorRangeGenerator(12, 230),
                    borderColor: 'rgba(20, 20, 250, 0.5)',
                    borderWidth: 1
                }]}/>
            <Stack sx={{m:3}}>
                <Button 
                    variant="contained"
                    size="small"
                    onClick={onReset}>¡Evaluar otro candidato!</Button>
            </Stack>
        </Box>
    )
};

export default CandidateResults;