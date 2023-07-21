import * as Views from './views';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles'; 
import { CssBaseline, GlobalStyles } from '@mui/material';
import moment from 'moment';
import Navigation from './components/Navigation';
import { MOMENT_LOCALE_CONFIG } from './model/constants';
import theme, { globalStyles } from './themes';

moment.updateLocale('es', MOMENT_LOCALE_CONFIG);

const App = () => (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles styles={globalStyles}/>
        <BrowserRouter>
            <Routes>
                <Route path='/vis' element={<Views.Visualizations/>}/>
                <Route path='/vis/timeline' element={<Views.Timeline/>}/>
                <Route path='/vis/rankings' element={<Views.Rankings/>}/>
                <Route path='/vis/stats' element={<Views.Stats/>}/>
                
                <Route path='/games' element={<Views.Games/>}/>
                <Route path='/games/predictor' element={<Views.Predictor/>}/>
                <Route path='/games/quiz' element={<Views.Quiz/>}/>
                
                <Route index element={<Views.Home/>} />
                
                <Route path='/data' element={<Views.Data/>}/>
                <Route path='/data/blog' element={<Views.Blog/>}/>
                <Route path='/data/raw' element={<Views.Raw/>}/>                
                
                <Route path='/about' element={<Views.About/>}/>
                <Route path='/about/terms' element={<Views.Terms/>}/>
                <Route path='/about/sources' element={<Views.Sources/>}/>
            </Routes>
            <Navigation/>
        </BrowserRouter>
    </ThemeProvider>
);

export default App;
