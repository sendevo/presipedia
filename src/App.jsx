import * as Views from './views';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles'; 
import { CssBaseline } from '@mui/material';
import moment from 'moment';
import { MOMENT_LOCALE_CONFIG } from './model/constants';
import theme from './themes';

moment.updateLocale('es', MOMENT_LOCALE_CONFIG);

const App = () => (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
            <Routes>
                <Route path='/about' element={<Views.About/>}/>
                <Route path='/blog' element={<Views.Blog/>}/>
                <Route path='/data' element={<Views.Data/>}/>
                <Route index element={<Views.Home/>} />
                <Route path='/games/predictor' element={<Views.Predictor/>}/>
                <Route path='/games/quiz' element={<Views.Quiz/>}/>
                <Route path='/vis/rankings' element={<Views.Rankings/>}/>
                <Route path='/about/sources' element={<Views.Sources/>}/>
                <Route path='/vis/stats' element={<Views.Stats/>}/>
                <Route path='/about/terms' element={<Views.Terms/>}/>
                <Route path='/vis/timeline' element={<Views.Timeline/>}/>
            </Routes>
        </BrowserRouter>
    </ThemeProvider>
);

export default App;
