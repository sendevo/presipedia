import processed from "../../assets/processed.json";

export const evalCandidate = candidate => {
    const result = {};
    let sum = 0;
    Object.keys(candidate).forEach(attr => {
        const index = processed[attr].names.indexOf(candidate[attr]);
        result[attr] = index !== -1 ? processed[attr].scaled.at(index) : 0;
        sum += result[attr];
    });
    result.total = sum/6;
    return result;
};