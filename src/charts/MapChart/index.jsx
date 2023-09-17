import { useState } from "react";
import { Typography } from "@mui/material";
import GenericCard from "../../components/GenericCard"
import ArgMap from "../../components/ArgMap";
import { colorMapGenerator, round2 } from "../../model/utils";
import { PROVINCES } from "../../model/constants";

const MapChart = ({title, dataset, labels}) => {
    const [selectedProv, setSelectedProv] = useState(-1);
        
    const provinceCounter = new Array(PROVINCES.length).fill(0);
    labels.forEach((p, index) => {
        provinceCounter[PROVINCES.indexOf(p)] = dataset.data[index];
    });
    const colorMap = colorMapGenerator(provinceCounter, 230, 0, 1, 1);

    return (
        <GenericCard sx={{
                margin: "10px 5px",
                border: "1px solid rgb(180, 180, 180)",
                borderRadius: "5px",
                boxShadow: "0px 0px 5px 0px rgba(0, 0, 0, 0.2)",
                backgroundColor: "rgba(250, 250, 250, 0.6)"
            }}
            contentSx={{paddingBottom:"0px!important"}}>
            <Typography fontSize={"18px"} fontWeight={"bold"}>{title}</Typography>
            <ArgMap height="48vh" fillFc={index => colorMap[index]} onClick={index=>setSelectedProv(index)}/>
            {selectedProv > -1 && selectedProv < PROVINCES.length && <Typography fontSize={10} sx={{paddingLeft:"10px"}}>{dataset.label} de {PROVINCES[selectedProv]}: {round2(provinceCounter[selectedProv])}</Typography>}
        </GenericCard>
    );
};

export default MapChart;