////////// CONSTANTS //////////

const DATE_FORMAT = "LL";
const ZODIAC_SIGNS = ["Capricornio", "Acuario", "Piscis", "Aries", "Tauro", "Géminis", "Cáncer", "Leo", "Virgo", "Libra", "Escorpio", "Sagitario"];
const MONTHS = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
const DAY_MS = 86400000;
const YEAR_MS = 31556952000; 

////////// MISC //////////

const arraySum = (arr, attr="") => arr.reduce((a, b) => a + (attr ? b[attr] : b), 0);

const findAllIndexes = (objArr, attr, key) => objArr.reduce((indexes, element, current) => {
    if(element[attr] === key) indexes.push(current);
    return indexes;
}, []);

const capitalize = str => str.charAt(0).toUpperCase()+str.slice(1);

const round2 = num => Math.round(num*100)/100;

////////// TIME //////////

const toUnixTimestamp = date => moment(date, "YYYY-MM-DD").unix()*1000;

const unixToDate = timestamp => moment.unix(timestamp/1000).format('YYYY-MM-DD');

const getZodiac = unixTime => {
	var bound = [20,19,20,20,20,21,22,22,21,22,21,21];
	const day = moment(unixTime).date();
	const month = moment(unixTime).month();
    const zIndex = day <= bound[month] ? month : (month+1) % 12;
	return {index: zIndex, name: ZODIAC_SIGNS[zIndex]};
};

const getAgeBin = birthDate => {
    const age = (Date.now()-moment(birthDate).unix()*1000)/YEAR_MS;
    const binStart = Math.floor(age/10)*10;
    const binEnd = binStart+10;
    return `${binStart}-${binEnd}`;
}
const getZodiac2 = birthDate => getZodiac(moment(birthDate).unix()*1000);

////////// LOCATIONS //////////

const lngLat2GeoJson = (lngLat, city=null, province=null) => {
    const [lng, lat] = lngLat.split(",");
    return {
        type: "FeatureCollection",
        features: [{
            type: "Feature",
            properties: {city, province},
            geometry: {
                coordinates: [
                    parseFloat(lng),
                    parseFloat(lat)
                ],
                type: "Point"
            }
        }]
    };
};

const geojson2LngLat = geojson => ([
    geojson.features[0].geometry.coordinates.join(","),
    geojson.features[0].properties.city,
    geojson.features[0].properties.province
]);

const latLng2GoogleMap = (lat,lng) => `http://www.google.com/maps/place/${lat},${lng}`;

const getLocationLink = (geojson, text, linkFormat) => {
    const [lng, lat] = geojson.features[0].geometry.coordinates;
    const link = latLng2GoogleMap(lat, lng);
    return linkFormat ? `<a href=${link} rel="noopener" target="_blank">${text}</a>` : link;
};

////////// CRYPTO //////////

const hash = message => {
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
        .catch(console.error);
    });
};


////////// BROWSER //////////

const copyToClipboard = text => navigator.clipboard.writeText(text);


////////// PEOPLE //////////

const updatePeopleTable = (people,updated) => {
    document.getElementById('db-last-update').innerHTML = moment(updated).format("LL")+"("+moment(updated).fromNow()+")";
    const tbody = document.getElementById('people-tbody');
    tbody.innerHTML = "";
    let index = 0;
    for(let cid in people) {
        const person = people[cid];
        index++;
        const row = document.createElement('tr');
        const birth_date = (moment(person.birth_date).format(DATE_FORMAT));
        const death_date = moment(person.death_date).format(DATE_FORMAT);
        const death_age = person.death_date ? moment(person.death_date).diff(person.birth_date, 'years', false) : "";
        const current_age = moment().diff(person.birth_date, 'years', false);
        const location_city = person.birth_location.features[0].properties.city;
        //const location_province = person.birth_location.features[0].properties.province;
        row.innerHTML = `
            <td>${index}</td>
            <td>${person.name + " " + person.surname}</td>
            <td style="text-align: center;">
                <img class="profile-pic" src="pictures/${person.picture}" alt="${person.surname}"/>
            </td>
            <td>${getLocationLink(person.birth_location, location_city, true) + ", " + birth_date}</td>
            <td>${(person.death_date ? death_date+", a los "+death_age : "Tiene "+current_age)+" años"}</td>
            <td>${person.cause_of_death}</td>
            <td>${person.occupation}</td>
            <td>
                <button onClick="editPerson('${cid}')" title="Editar"><i class="fa fa-edit"></i></button>
                <button onClick="deletePerson('${cid}')" title="Borrar"><i class="fa fa-trash"></i></button>
                <button onClick="copyCIDToClipboard('${cid}')" title="Copiar CID"><i class="fa fa-copy"></i></button>
            </td>
        `;
        tbody.appendChild(row);
    };
    const section = document.getElementById('people-section');
    section.style.display = index === 0 ? "none" : "block";
};


////////// TERMS //////////

const updateTermsTable = terms => {
    const tbody = document.getElementById('terms-tbody');
    tbody.innerHTML = "";
    terms.forEach((term, index) => {
        const person = database.people[term.cid];
        if(person){
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index+1}</td>
                <td>${person.name + " " + person.surname}</td>
                <td>${moment(term.begin).format(DATE_FORMAT)}</td>
                <td>${term.end ? moment(term.end).format(DATE_FORMAT) : 'Actualmente en el cargo'}</td>
                <td>${term.party}</td>
                <td>
                    <button onClick="editTerm('${index}')" title="Editar"><i class="fa fa-edit"></i></button>
                    <button onClick="deleteTerm('${index}')" title="Borrar"><i class="fa fa-trash"></i></button>
                </td>
            `;
            tbody.appendChild(row);
        }else{
            console.error("Error: person with given CID not found");
        }
    });
    const section = document.getElementById('terms-section');
    section.style.display = terms.length === 0 ? "none" : "block";
};
