const toUnixTimestamp = date => Math.floor(new Date(date).getTime() / 1000);

const insertItems = data => {
    const tbody = document.getElementById('tbody');
    tbody.innerHTML = "";
    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name + " " + item.surname}</td>
            <td>${item.picture}</td>
            <td>${item.birth_location_name + "," + (new Date(item.birth_date * 1000).toLocaleDateString())}</td>
            <td>${item.death_date ? new Date(item.death_date * 1000).toLocaleDateString() : '-'}</td>
            <td>${item.occupation}</td>
        `;
        tbody.appendChild(row);
    });
};

const data = [];
const form = document.getElementById('form');

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const name = form.elements.name.value;
    const surname = form.elements.surname.value;
    const picture = form.elements.picture.value;
    const birthDate = toUnixTimestamp(form.elements.birth_date.value);
    const deathDate = toUnixTimestamp(form.elements.death_date.value);
    const birthLocationName = form.elements.birth_location_name.value;
    const birthLocation = form.elements.birth_location.value;
    const occupation = form.elements.occupation.value;

    const formData = {
        name,
        surname,
        picture,
        birth_date: birthDate,
        death_date: deathDate,
        birth_location_name: birthLocationName,
        birth_location: birthLocation,
        occupation,
    };

    data.push(formData);
    form.reset();
    insertItems(data);
});