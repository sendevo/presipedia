import MainView from "../../components/MainView";
import HorizontalBarChart from "../../components/HorizontalBar";
import { Slider } from "../../components/Inputs";
import database from "../../assets/database.json";

const d = {
    labels: ['Rivadavia', 'Derqui', 'Paso'],
    datasets: [
        {
            data: [30, 20, 10],
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }
    ]
};

const View = () => {
    return(
        <MainView title="Clasificaciones">
            <Slider 
                name="Cantidad de mandatarios a mostrar" 
                withmarks="true" 
                min={10} 
                max={50} 
                ticks={5} 
                step={5}
                suffix="primeros"/>
            <HorizontalBarChart title="Mandatos más prolongados" labels={d.labels} datasets={d.datasets}/>
            <HorizontalBarChart title="Mandatos más breves" labels={d.labels} datasets={d.datasets}/>
            <HorizontalBarChart title="Los presidentes más longevos" labels={d.labels} datasets={d.datasets}/>
            <HorizontalBarChart title="Edades al asumir el cargo de presidente" labels={d.labels} datasets={d.datasets}/>
        </MainView>
    );
};

export default View;