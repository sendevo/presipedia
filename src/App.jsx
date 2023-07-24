import * as Views from './views';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles'; 
import { CssBaseline, GlobalStyles } from '@mui/material';
import Navigation from './components/Navigation';
import theme, { globalStyles } from './themes';

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
                <Route path='/vis/raw' element={<Views.Raw/>}/>   
                
                <Route path='/games' element={<Views.Games/>}/>
                <Route path='/games/predictor' element={<Views.Predictor/>}/>
                <Route path='/games/quiz' element={<Views.Quiz/>}/>
                
                <Route index element={<Views.Home/>} />
                
                <Route path='/blog' element={<Views.Blog/>}/>
                <Route path='/blog/article' element={<Views.Article/>}/>
                
                <Route path='/about' element={<Views.About/>}/>
                <Route path='/about/terms' element={<Views.Terms/>}/>
                <Route path='/about/sources' element={<Views.Sources/>}/>
            </Routes>
            <Navigation/>
        </BrowserRouter>
    </ThemeProvider>
);

export default App;
