export const getFullName = person => `${person.name} ${person.surname}`;

export const getCity = person => person.birth_location.features[0].properties.city;

export const getBirthDate = person => person.birth_date;

export const getDeathDate = person => person.death_date;

export const isAlive = person => !Boolean(person.death_date);

export const isMale = person => person.gender === "M";