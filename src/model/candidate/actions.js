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
    birthLocations: "Provincia de nacimiento",
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
            result[attr] = index !== -1 ? processed[attr].scaled.at(index) : 0;
            sum += result[attr];
        }
    });
    result.name = candidate.name;
    result.total = sum/6;
    return result;
};

export const getScaleKeyName = key => {
    return adapter[key];
};

export const getScaleLongName = key => {
    return adapterLong[key];
};