import * as Views from './views';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles'; 
import theme from './themes';

const App = () => (
    <ThemeProvider theme={theme}>
        <BrowserRouter>
            <Routes>
                <Route index element={<Views.Home/>} />
                <Route path='/about' element={<Views.About/>}/>
                <Route path='/terms' element={<Views.Terms/>}/>
            </Routes>
        </BrowserRouter>
    </ThemeProvider>
);

export default App;
