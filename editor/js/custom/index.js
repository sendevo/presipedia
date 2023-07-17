moment.locale('es');


////////// DB //////////

let database = {
    people: {}, // Presidents
    terms: [], // Electoral terms
    events: [], // Miscelaneous events
    blog: [] // Articles
};

const data = localStorage.getItem("database");
if(data){ 
    database = JSON.parse(data);
    updatePeopleTable(database.people);
    updateTermsTable(database.terms);
}


////////// IMPORT //////////

const fileInput = document.getElementById('file-input');
const uploadButton = document.getElementById('upload-button');
uploadButton.addEventListener('click', () => fileInput.click());
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
            updateTermsTable(database.terms);
            localStorage.setItem("database", JSON.stringify(database));
        } catch (error) {
            console.error('Error parsing JSON file:', error);
        }
    };
    console.log("Reading file...");
    reader.readAsText(file);
});


////////// PEOPLE //////////

const personForm = document.getElementById('person-form');
let personEditingCID = "";
personForm.addEventListener('submit', event => {
    event.preventDefault();
    const personData = {
        name: personForm.elements.name.value,
        surname: personForm.elements.surname.value,
        picture: personForm.elements.picture.value,
        birth_date: toUnixTimestamp(personForm.elements.birth_date.value),
        death_date: toUnixTimestamp(personForm.elements.death_date.value),
        cause_of_death: personForm.elements.cause_of_death.value,
        birth_location: lngLat2GeoJson(
            personForm.elements.birth_location.value, 
            personForm.elements.birth_location_name.value
        ),
        occupation: personForm.elements.occupation.value
    };
    console.log("Adding new entry to people db...");
    hash(JSON.stringify(personData))
    .then(cid => {
        database.people[cid] = personData;
        if(cid !== personEditingCID && personEditingCID !== ""){
            delete database.people[personEditingCID];
            findAllIndexes(database.terms, "cid", personEditingCID)
            .forEach(termIndex => {database.terms[termIndex].cid = cid;});
        }
        personForm.reset();
        personEditingCID = "";
        updatePeopleTable(database.people);
        localStorage.setItem("database", JSON.stringify(database));
        console.log("Done", cid);
    })
    .catch(console.error);
});

const deletePerson = cid => {
    console.log("Deleting",cid);
    console.log(database.people[cid]);
    delete database.people[cid];
    updatePeopleTable(database.people);
    localStorage.setItem("database", JSON.stringify(database));
};

const editPerson = cid => {
    console.log("Loading data to person form",cid);
    const person = database.people[cid];
    personForm.elements.name.value = person.name;
    personForm.elements.surname.value = person.surname;
    personForm.elements.picture.value = person.picture;
    personForm.elements.birth_date.value = unixToDate(person.birth_date);
    personForm.elements.death_date.value = unixToDate(person.death_date);
    personForm.elements.cause_of_death.value = person.cause_of_death;
    [
        personForm.elements.birth_location.value,
        personForm.elements.birth_location_name.value
    ] = geojson2LngLat(person.birth_location);
    personForm.elements.occupation.value = person.occupation;
    personEditingCID = cid;
};

const copyCIDToClipboard = cid => {
    copyToClipboard(cid)
    .then(() => console.log('CID copyied to clipboard'))
    .catch(error => console.error('Error when copying CID', error));
};


////////// TERMS //////////

const termForm = document.getElementById("term-form");
let termEditingIndex = -1;
termForm.addEventListener('submit', event => {
    event.preventDefault();
    const cid = termForm.elements.cid.value;
    if(database.people.hasOwnProperty(cid)){
        const termData = {
            cid: cid,
            term_begin: toUnixTimestamp(termForm.elements.term_begin.value),
            term_end: toUnixTimestamp(termForm.elements.term_end.value),
            party: termForm.elements.party.value
        };
        console.log("Adding new entry to terms db...");
        if(termEditingIndex === -1)
            database.terms.push(termData);
        else 
            database.terms[termEditingIndex] = termData;
        termForm.reset();
        termEditingIndex = -1;
        updateTermsTable(database.terms);
        localStorage.setItem("database", JSON.stringify(database));
        console.log("Done");
    }else{
        console.error("Error, person with given CID not found in database.");
    }
});

const deleteTerm = index => {
    console.log("Deleting term number",index);
    console.log(database.terms[index]);
    database.terms.splice(index,1);
    updateTermsTable(database.terms);
    localStorage.setItem("database", JSON.stringify(database));
};

const editTerm = index => {
    console.log("Loading term data to form", index);
    const term = database.terms[index];
    termForm.elements.cid.value = term.cid;
    termForm.elements.term_begin.value = unixToDate(term.term_begin);
    termForm.elements.term_end.value = unixToDate(term.term_end);
    termForm.elements.party.value = term.party;
    termEditingIndex = index;
};


////////// EXPORT //////////

const exportButton = document.getElementById("export-button");
exportButton.addEventListener('click', () => {
    console.log("Generating database.json file");

    /// TODO: sort elements of database before exporting

    const json = JSON.stringify(database);
    const blob = new Blob([json], { type: 'application/json' });
    const downloadUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = 'database.json';
    link.click();
    URL.revokeObjectURL(downloadUrl);
});
