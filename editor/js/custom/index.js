moment.locale('es');

let database = {
    people: {}, // Presidents
    terms: [], // Electoral terms
    events: [] // Miscelaneous events
};

const data = localStorage.getItem("database");
if(data){ 
    database = JSON.parse(data);
    updatePeopleTable(database.people);
}

const form = document.getElementById('form');
form.addEventListener('submit', event => {
    event.preventDefault();
    const personData = {
        name: form.elements.name.value,
        surname: form.elements.surname.value,
        picture: form.elements.picture.value,
        birth_date: toUnixTimestamp(form.elements.birth_date.value),
        death_date: toUnixTimestamp(form.elements.death_date.value),
        birth_location_name: form.elements.birth_location_name.value,
        birth_location: latLng2GeoJson(form.elements.birth_location.value),
        occupation: form.elements.occupation.value
    };
    console.log("Adding new entry...");
    hash(JSON.stringify(personData))
    .then(cid => {
        database.people[cid] = personData;
        form.reset();
        updatePeopleTable(database.people);
        localStorage.setItem("database", JSON.stringify(database));
        console.log("Done", cid);
    })
    .catch(console.error);
});

const fileInput = document.getElementById('file-input');
const uploadButton = document.getElementById('upload-button');
uploadButton.addEventListener('click', ()=>fileInput.click());
fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.onload = function (event) {
        const jsonContent = event.target.result;
        try {
            const parsedData = JSON.parse(jsonContent);
            console.log("Data laoded:");
            console.log(parsedData);
            database = parsedData;
            uploadButton.disabled = true;
            uploadButton.style.backgroundColor = "#eeeeee";
            updatePeopleTable(database.people);
            localStorage.setItem("database", JSON.stringify(database));
        } catch (error) {
            console.error('Error parsing JSON file:', error);
        }
    };
    console.log("Reading file...");
    reader.readAsText(file);
});

const exportButton = document.getElementById("export-button");
exportButton.addEventListener('click', () => {
    console.log("Generating database.json file");
    const json = JSON.stringify(database);
    const blob = new Blob([json], { type: 'application/json' });
    const downloadUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = 'database.json';
    link.click();
    URL.revokeObjectURL(downloadUrl);
});

const deletePerson = cid => {
    console.log("Deleting",cid);
    console.log(database.people[cid]);
    delete database.people[cid];
    updatePeopleTable(database.people);
    localStorage.setItem("database", JSON.stringify(database));
};

const editPerson = cid => {
    console.log("Loading data to form",cid);
    const person = database.people[cid];
    form.elements.name.value = person.name;
    form.elements.surname.value = person.surname;
    form.elements.picture.value = person.picture;
    form.elements.birth_date.value = unixToDate(person.birth_date);
    form.elements.death_date.value = unixToDate(person.death_date);
    form.elements.birth_location_name.value = person.birth_location_name;
    form.elements.birth_location.value = geoJson2LatLng(person.birth_location);
    form.elements.occupation.value = person.occupation;
    deletePerson(cid);
};

const copyCIDToClipboard = cid => {
    copyToClipboard(cid)
    .then(() => console.log('CID copiado al portapapeles'))
    .catch(error => console.error('Error al intentar copiar CID', error));
};