import * as Views from './views';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles'; 
import moment from 'moment';
import theme from './themes';

moment.locale('es', {
    months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
    monthsShort: 'Ene._Feb._Mar_Abr._May_Jun_Jul._Ago_Sept._Oct._Nov._Dec.'.split('_'),
    weekdays: 'Domingo_Lunes_Martes_Miercoles_Jueves_Viernes_Sabado'.split('_'),
    weekdaysShort: 'Dom._Lun._Mar._Mier._Jue._Vier._Sab.'.split('_'),
    weekdaysMin: 'Do_Lu_Ma_Mi_Ju_Vi_Sa'.split('_'),
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
});

const App = () => (
    <ThemeProvider theme={theme}>
        <BrowserRouter>
            <Routes>
                <Route path='/about' element={<Views.About/>}/>
                <Route path='/blog' element={<Views.Blog/>}/>
                <Route index element={<Views.Home/>} />
                <Route path='/rankings' element={<Views.Rankings/>}/>
                <Route path='/sources' element={<Views.Sources/>}/>
                <Route path='/stats' element={<Views.Stats/>}/>
                <Route path='/terms' element={<Views.Terms/>}/>
                <Route path='/timeline' element={<Views.Timeline/>}/>
            </Routes>
        </BrowserRouter>
    </ThemeProvider>
);

export default App;
