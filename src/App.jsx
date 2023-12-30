import * as Views from './views';
import { 
    BrowserRouter, 
    Routes, 
    Route, 
    Navigate 
} from 'react-router-dom';
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
                <Route path='/vis/profile' element={<Views.Profile/>}/>
                <Route path='/vis/event' element={<Views.Event/>}/>
                
                <Route path='/games' element={<Views.Games/>}/>
                <Route path='/games/candidate' element={<Views.Candidate/>}/>
                <Route path='/games/quiz' element={<Views.Quiz/>}/>
                
                <Route index element={<Views.Home/>} />
                
                <Route path='/blog' element={<Views.Blog/>}/>
                <Route path='/blog/section' element={<Views.Section/>}/>
                <Route path='/blog/article' element={<Views.Article/>}/>
                
                <Route path='/about' element={<Views.About/>}/>
                <Route path='/about/terms' element={<Views.Terms/>}/>
                <Route path='/about/sources' element={<Views.Sources/>}/>

                <Route path="*" element={<Navigate replace to="/" />} />
            </Routes>
            <Navigation/>
        </BrowserRouter>
    </ThemeProvider>
);

export default App;
