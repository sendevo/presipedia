import { useState } from 'react';
import Calendar from 'react-calendar';
import { Box } from '@mui/material';
import './calendar-style.css';

const DateInput = ({onChange}) => { 

    const [date, setDate] = useState([new Date()]);

    const handleDateChange = d => {
        setDate(d);
        onChange(d);
    };

    return (
        <Box>                   
            <Calendar 
                calendarType='gregory'
                locale='es-ES'
                selectRange={false}
                value={date}
                onChange={handleDateChange}/>
        </Box>
    );
};

export default DateInput;