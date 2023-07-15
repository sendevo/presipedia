import * as Views from './views';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles'; 
import theme from './themes';

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
