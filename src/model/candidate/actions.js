import { round2 } from "../utils";
import { CANDIDATE_RESULTS_KEY } from "../storage";
import { hash, debug } from "../utils";
import processed from "../../assets/processed.json";


const scales = {
    assumptionAgeHistogram: "Edad",
    birthsPerMonth: "Mes",
    birthsPerZodiacSign: "Signo",
    birthLocations: "Provincia",
    occupations: "Ocupación",
    genders: "Género",
    parties: "Tendencia"
};

const scalesLong = {
    assumptionAgeHistogram: "Edad de asunción",
    birthsPerMonth: "Mes de nacimiento",
    birthsPerZodiacSign: "Signo zodiacal",
    birthLocations: "Pcia. de nacimiento",
    occupations: "Ocupación",
    genders: "Género",
    parties: "Tendencia política"
};

const scalesCount = Object.keys(scales).length;

export const evalCandidate = candidate => {    
    const result = {};
    let sum = 0;
    Object.keys(scales).forEach(attr => {
        if(processed[attr]){
            const index = processed[attr].names.indexOf(candidate[attr]);
            const score = (index >= 0 && index < processed[attr].terms.scaled?.length) ? round2(processed[attr].terms.scaled[index]) : 0;
            const freq = (index >= 0 && index < processed[attr].terms.frequency?.length) ? round2(processed[attr].terms.frequency[index]) : 0;
            sum += score;
            result[attr] = {score, freq};            
        }
    });
    result.name = candidate.name;
    result.total = sum/scalesCount;
    result.timestamp = Date.now();
    return result;
};

export const saveResults = results => {
    return new Promise((resolve, reject) => {
        hash(JSON.stringify(results))
        .then(cid => {
            const data = localStorage.getItem(CANDIDATE_RESULTS_KEY);
            const storedResults = data ? JSON.parse(data) : {};
            storedResults[cid] = results;
            localStorage.setItem(CANDIDATE_RESULTS_KEY, JSON.stringify(storedResults));
            resolve();
        })
        .catch(reject);
    });
};

export const loadResults = cid => {
    const data = localStorage.getItem(CANDIDATE_RESULTS_KEY);
    if(data){
        const allResults = JSON.parse(data);
        const res = allResults[cid];
        if(res){
            return res;
        }else{
            debug(`Error when loading result cid: ${cid}`, "error");
        }
    }else{
        debug("Error while retrieving all saved results", "error");
    }
}

export const getScaleKeyName = key => {
    return scales[key];
};

export const getScaleLongName = key => {
    return scalesLong[key];
};