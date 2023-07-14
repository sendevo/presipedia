const DATE_FORMAT = "LL";

//const toUnixTimestamp = date => Math.floor(new Date(date).getTime() / 1000);

const toUnixTimestamp = date => moment(date, "YYYY-MM-DD").unix()*1000;

const unixToDate = timestamp => moment.unix(timestamp/1000).format('YYYY-MM-DD');

const latLng2GeoJson = latLng => {
    const [lat,lng] = latLng.split(",");
    return {
        type: "FeatureCollection",
        features: [{
            type: "Feature",
            properties: {},
            geometry: {
                coordinates: [
                    lat,
                    lng
                ],
                type: "Point"
            }
        }]
    };
};

const geoJson2LatLng = geojson => geojson.features[0].geometry.coordinates.join(",");

const hash = message => { // CID generator   
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

const copyToClipboard = text => navigator.clipboard.writeText(text);

const updatePeopleTable = people => { // Push database to table
    const tbody = document.getElementById('tbody');
    tbody.innerHTML = "";
    for(cid in people) {
        const person = people[cid];
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${person.name + " " + person.surname}</td>
            <td>${person.picture}</td>
            <td>${person.birth_location_name + ", " + (moment(person.birth_date).format(DATE_FORMAT))}</td>
            <td>${person.death_date ? moment(person.death_date).format(DATE_FORMAT) : '-'}</td>
            <td>${person.occupation}</td>
            <td>
                <button onClick="editPerson('${cid}')" title="Editar"><i class="fa fa-edit"></i></button>
                <button onClick="deletePerson('${cid}')" title="Borrar"><i class="fa fa-trash"></i></button>
                <button onClick="copyCIDToClipboard('${cid}')" title="Copiar CID"><i class="fa fa-copy"></i></button>
            </td>
        `;
        tbody.appendChild(row);
    };
};