import moment from "moment";
import { ZODIAC_SIGNS } from "../model/constants";

const hsv2rgb = (h,s,v) => {                              
    let f = (n,k = (n+h/60)%6) => v - v*s*Math.max( Math.min(k,4-k,1), 0);     
    return [f(5)*255,f(3)*255,f(1)*255];
};  

export const colorMapGenerator = (count, hue, satFrom=0.1, satTo=0.9, transparency=0.7) => {
    const colors = [];
    const step = (satTo - satFrom)/count;
    for(let s = satFrom; s < satTo; s += step){
        const [r, g, b] = hsv2rgb(hue, s, 0.9);
        colors.push(`rgba(${r}, ${g}, ${b}, ${transparency})`);
    }
    return colors;
};

export const randomColorsGenerator = (count, transparency=0.7) => {
    const colors = [];
    for(let c = 0; c < count; c++){
        const [r, g, b] = [
            Math.floor(Math.random()*156+100),
            Math.floor(Math.random()*156+100),
            Math.floor(Math.random()*156+100)
        ];
        colors.push(`rgba(${r}, ${g}, ${b}, ${transparency})`);
    }
    return colors;
};

export const getRandomElement = arr => arr[Math.floor(Math.random()*arr.length)];

export const getZodiac = unixTime => {
	var bound = [20,19,20,20,20,21,22,22,21,22,21,21];
	const day = moment(unixTime).date();
	const month = moment(unixTime).month();
    const zIndex = day <= bound[month] ? month : (month+1) % 12;
	return {index: zIndex, name: ZODIAC_SIGNS[zIndex]};
};

export const capitalize = str => str.charAt(0).toUpperCase()+str.slice(1);