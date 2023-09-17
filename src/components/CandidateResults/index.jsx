import { 
    Button, 
    Box, 
    Stack,
    Typography,
    Paper
} from "@mui/material";
import DataTable from "../../components/DataTable";
import { RadarChart } from "../../charts";
import { colorRangeGenerator, round2 } from "../../model/utils";
import { getScaleKeyName, getScaleLongName } from "../../model/candidate/actions";

const paperStyle = {
    p: 1, 
    mt:1, 
    backgroundColor: 'rgba(255, 255, 255, 0.7)' 
};

const mainResultStyle = {
    fontSize: "18px",
    fontWeight: "bold"
};

const tableHeaders = [
    {
        text: "Escala",
        key: "name"
    },
    {
        text: "Puntaje",
        key: "score"
    },
    {
        text: "Frecuencia",
        key: "freq"
    }
];

const getScaleRow = (results, scale) => ({
    name: () => <Typography fontSize={12} lineHeight="1em">{getScaleLongName(scale)}</Typography>,
    score: () => <Typography fontSize={12} lineHeight="1em">{results[scale].score} pts.</Typography>,
    freq: () => <Typography fontSize={12} lineHeight="1em">{round2(results[scale].freq)} %</Typography>
});

let imageData = "";

const CandidateResults = ({results, onReset, onShare}) => {

    const labels = Object.keys(results).filter(k => k !== "total" && k !== "name");
    const labelNames = labels.map(k => getScaleKeyName(k));
    const datasets = labels.map(l => results[l].score);
    const strengths = labels.filter(l => results[l].score > 50).map(k => getScaleRow(results, k));
    const weaknesses = labels.filter(l => results[l].score <= 50).map(k => getScaleRow(results, k));

    const handleShare = () => {
        const data = {
            ...results,
            image: imageData
        };
        onShare(data);
    };

    return (
        <Box>
            <Typography lineHeight="1em">Resultados para: <b>{results.name}</b></Typography>
            <Paper sx={paperStyle}>
                <Typography sx={mainResultStyle}>Puntaje obtenido: {results.total?.toFixed(2)}%</Typography>
            </Paper>
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
            <Box sx={{mt:1}}>
                {strengths.length > 0 && 
                    <Box>
                        <DataTable title="Los fuertes:" headers={tableHeaders} rows={strengths} />
                    </Box>
                }
                {weaknesses.length > 0 && 
                    <Box sx={{mt:1}}>
                        <DataTable title="Las debilidades:" headers={tableHeaders} rows={weaknesses} />
                    </Box>
                }
            </Box>
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