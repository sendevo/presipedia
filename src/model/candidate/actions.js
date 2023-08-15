import { round2 } from "../utils";
import processed from "../../assets/processed.json";


const adapter = {
    assumptionAgeHistogram: "Edad",
    birthsPerMonth: "Mes",
    birthsPerZodiacSign: "Signo",
    birthLocations: "Provincia",
    occupations: "Ocupación",
    genders: "Género",
    parties: "Tendencia"
};

const adapterLong = {
    assumptionAgeHistogram: "Edad de asunción",
    birthsPerMonth: "Mes de nacimiento",
    birthsPerZodiacSign: "Signo zodiacal",
    birthLocations: "Prov. de nacimiento",
    occupations: "Ocupación",
    genders: "Género",
    parties: "Tendencia política"
};

export const formToCandidate = form => {
    const binStart = Math.floor(form.age/10)*10;
    const binEnd = binStart+10;
    return {
        name: form.name,
        assumptionAgeHistogram: `${binStart}-${binEnd}`,
        birthsPerMonth: form.month,
        birthsPerZodiacSign: form.zodiac,
        birthLocations: form.province,
        occupations: form.occupation,
        genders: form.gender,
        parties: form.party
    };
};

export const evalCandidate = candidate => {
    const result = {};
    let sum = 0;
    Object.keys(adapter).forEach(attr => {
        if(processed[attr]){
            const index = processed[attr].names.indexOf(candidate[attr]);
            const score = (index >= 0 && index < processed[attr].scaled?.length) ? round2(processed[attr].scaled[index]) : 0;
            const freq = (index >= 0 && index < processed[attr].freq?.length) ? round2(processed[attr].freq[index]) : 0;
            sum += score;
            result[attr] = {score, freq};            
        }
    });
    result.name = candidate.name;
    result.total = sum/Object.keys(adapter).length;
    return result;
};

export const getScaleKeyName = key => {
    return adapter[key];
};

export const getScaleLongName = key => {
    return adapterLong[key];
};