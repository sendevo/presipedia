//// BUILD ////
export const APP_NAME = "Presipedia: Edición Argentina";
export const VERSION_CODE = "1";
export const VERSION_VALUE = "1.0.0 (alpha)";
export const BUILD_DATE = 1689688230639; // 18-7-2023 10:50 hs
export const DB_LAST_UPDATE = 1689688230639; // 18-7-2023 10:50 hs
//// DATE-TIME ////
export const VIS_DATE_FORMAT = "YYYY-MM-DD";
export const DAY_MS = 86400000;
export const ZODIAC_SIGNS = ["Capricornio", "Acuario", "Piscis", "Aries", "Tauro", "Géminis", "Cáncer", "Leo", "Virgo", "Libra", "Escorpio", "Sagitario"];
const MONTHS = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
const MONTHS_SHORT = ["Ene.", "Feb.", "Mar", "Abr.", "May", "Jun", "Jul.", "Ago", "Sept.", "Oct.", "Nov.", "Dic."];
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
//// TRIVIA QUIZ ////
export const MAX_QUIZ_PLAYERS = 4;
export const FEEDBACK_TIMEOUT = 3000;
export const QUESTION_TIMEOUT = 10000;
export const TIMER_UPDATE_PERIOD = 1000;