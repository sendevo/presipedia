import moment from "moment";

//// BUILD ////
export const APP_NAME = "Presipedia: Edición Argentina";
export const VERSION_CODE = "3";
export const VERSION_VALUE = "1.0.2 (alpha)";
export const BUILD_DATE = 1692656103640; // 21-8-2023 19:15 hs
//// DATE-TIME ////
export const VIS_DATE_FORMAT = "YYYY-MM-DD";
export const DAY_MS = 86400000;
export const YEAR_MS = 31536000000;
export const PROVINCES = ["Buenos Aires", "Capital Federal", "Catamarca", "Chaco", "Chubut", "Córdoba", "Corrientes", "Entre Ríos", "Formosa", "Jujuy", "La Pampa", "La Rioja", "Mendoza", "Misiones", "Neuquén", "Río Negro", "Salta", "San Juan", "San Luis", "Santa Cruz", "Santa Fe", "Santiago del Estero", "Tierra del Fuego", "Tucumán"];
export const OCCUPATIONS = ["Contador", "Agricultor", "Estudiante", "Farmacéutico", "Bombero", "Secretario", "Vendedor", "Veterinario", "Policía", "Enfermero", "Economista", "Pintor", "Albañil", "Mecánico", "Chófer", "Piloto", "Artista", "Cocinero", "Martillero público", "Escribano", "Pescador", "Técnico", "Obrero", "Licenciado", "Plomero", "Soldador", "Herrero", "Diseñador", "Psicólogo", "Deportista", "Mozo", "Entrenador", "Arquitecto", "Carpintero"];
export const PARTIES = ["Socialista", "Libertario", "Comunista"];
export const ZODIAC_SIGNS = ["Capricornio", "Acuario", "Piscis", "Aries", "Tauro", "Géminis", "Cáncer", "Leo", "Virgo", "Libra", "Escorpio", "Sagitario"];
export const MONTHS = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
const MONTHS_SHORT = ["Ene.", "Feb.", "Mar", "Abr.", "May", "Jun.", "Jul.", "Ago.", "Sept.", "Oct.", "Nov.", "Dic."];
const WEEK_DAYS = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
const WEEK_DAYS_SHORT = ["Dom.", "Lun.", "Mar.", "Miér.", "Jue.", "Vier.", "Sáb."];
const WEEK_DAYS_MIN = ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"];
export const MOMENT_LOCALE_CONFIG = {
    months: MONTHS,
    monthsShort: MONTHS_SHORT,
    weekdays: WEEK_DAYS,
    weekdaysShort: WEEK_DAYS_SHORT,
    weekdaysMin: WEEK_DAYS_MIN,
    relativeTime : {
        future : 'dentro de %s',
        past : 'hace %s',
        s : 'segundos',
        m : 'un minuto',
        mm : '%d minutos',
        h : 'una hora',
        hh : '%d horas',
        d : 'un día',
        dd : '%d días',
        M : 'un mes',
        MM : '%d meses',
        y : 'un año',
        yy : '%d años'
    }
};

moment.updateLocale('es', MOMENT_LOCALE_CONFIG);