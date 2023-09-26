import moment from "moment";
import { ZODIAC_SIGNS, MONTHS } from "../model/constants.js";

export const arraySum = (arr, attr="") => arr.reduce((a, b) => a + (attr ? b[attr] : b), 0);

export const round2 = num => Math.round(num*100)/100;

const hsv2rgb = (h,s,v) => {                              
    let f = (n,k = (n+h/60)%6) => v - v*s*Math.max( Math.min(k,4-k,1), 0);     
    return [f(5)*255,f(3)*255,f(1)*255];
};  

export const colorRangeGenerator = (count, hue, satFrom=0.1, satTo=0.9, transparency=0.7) => {
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

export const colorMapGenerator = (values, hue, satFrom=0.1, satTo=0.9, transparency=0.7) => {
    const maxValue = Math.max(...values);
    return values.map(v => {
        const s = v/maxValue*(satTo-satFrom)+satFrom;
        const [r, g, b] = hsv2rgb(hue, s, 0.9);
        return `rgba(${r}, ${g}, ${b}, ${transparency})`;
    });
}

const latLng2GoogleMap = (lat,lng) => `http://www.google.com/maps/place/${lat},${lng}`;

export const location2GoogleMap = location => {
    const [lng, lat] = location.features[0].geometry.coordinates;
    return latLng2GoogleMap(lat, lng);
};

export const getRandomElement = arr => arr[Math.floor(Math.random()*arr.length)];

export const getZodiac = unixTime => {
	var bound = [20,19,20,20,20,21,22,22,21,22,21,21];
	const day = moment(unixTime).date();
	const month = moment(unixTime).month();
    const zIndex = day <= bound[month] ? month : (month+1) % 12;
	return {index: zIndex, name: ZODIAC_SIGNS[zIndex]};
};

export const hash = message => {
    return new Promise((resolve, reject) => {
        const msgBuffer = new TextEncoder().encode(message);
        window.crypto.subtle.digest('SHA-256', msgBuffer)
        .then(hashBuffer => {
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            const hexString = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
            const str = hexString
                .replace(/\r|\n/g, "")
                .replace(/([\da-fA-F]{2}) ?/g, "0x$1 ")
                .replace(/ +$/, "")
                .split(" ");
            const b64 = btoa(String.fromCharCode.apply(null, str));
            resolve(b64);
        })
        .catch(error => {
            console.error(error);
            reject(error);
        });
    });
};

export const capitalize = str => str.charAt(0).toUpperCase()+str.slice(1);

export const cropString = (str,len) => str.slice(0,len)+(str.length > len?"...":"");

export const formatDate = d => {
    const m = moment(d);
    return `${m.date()} de ${MONTHS[m.month()]} de ${m.year()}`;
};

export const readingTime = str => Math.round(str.split(" ").length/130);