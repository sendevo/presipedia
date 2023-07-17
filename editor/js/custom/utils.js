////////// CONSTANTS //////////

const DATE_FORMAT = "LL";


////////// MISC //////////

const findAllIndexes = (objArr, attr, key) => objArr.reduce((indexes, element, current) => {
    if(element[attr] === key) indexes.push(current);
    return indexes;
}, []);



////////// TIME //////////

const toUnixTimestamp = date => moment(date, "YYYY-MM-DD").unix()*1000;

const unixToDate = timestamp => moment.unix(timestamp/1000).format('YYYY-MM-DD');


////////// LOCATIONS //////////

const lngLat2GeoJson = (lngLat, name="") => {
    const [lng, lat] = lngLat.split(",");
    return {
        type: "FeatureCollection",
        features: [{
            type: "Feature",
            properties: {
                name: name ? name : null
            },
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
    geojson.features[0].properties.name
]);

const location2GoggleMap = (lat,lng) => `http://www.google.com/maps/place/${lat},${lng}`;

const getLocationLink = (geojson, text, linkFormat) => {
    const [lng, lat] = geojson.features[0].geometry.coordinates;
    const link = location2GoggleMap(lat, lng);
    return linkFormat ? `<a href=${link} target="_blank">${text}</a>` : link;
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
        .catch(err => reject(handleError("hash", err, "SUBTLECRYPTO_DIGEST_ERROR")));
    });
};


////////// BROWSER //////////

const copyToClipboard = text => navigator.clipboard.writeText(text);


////////// PEOPLE //////////

const updatePeopleTable = people => {
    const tbody = document.getElementById('people-tbody');
    tbody.innerHTML = "";
    let index = 0;
    for(cid in people) {
        const person = people[cid];
        index++;
        const row = document.createElement('tr');
        const birth_date = (moment(person.birth_date).format(DATE_FORMAT));
        const death_date = moment(person.death_date).format(DATE_FORMAT);
        const death_age = person.death_date ? moment(person.death_date).diff(person.birth_date, 'years', false) : "";
        const current_age = moment().diff(person.birth_date, 'years', false);
        const location_name = person.birth_location.features[0].properties.name;
        row.innerHTML = `
            <td>${index}</td>
            <td>${person.name + " " + person.surname}</td>
            <td style="text-align: center;">
                <img class="profile-pic" src="img/${person.picture}" alt="${person.surname}"/>
            </td>
            <td>${getLocationLink(person.birth_location, location_name, true) + ", " + birth_date}</td>
            <td>${(person.death_date ? death_date+", a los "+death_age : "Tiene "+current_age)+" años"}</td>
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
                <td>${moment(term.term_begin).format(DATE_FORMAT)}</td>
                <td>${term.term_end ? moment(term.term_end).format(DATE_FORMAT) : 'Actualmente en el cargo'}</td>
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
