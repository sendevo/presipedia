import Calendar from 'react-calendar';
import { Box } from '@mui/material';
import moment from 'moment';
import './calendar-style.css';

const DateInput = ({name, value, onChange}) => {

    const date = moment(value).toDate();

    const handleDateSelect = d => {
        onChange({
            target:{
                name: name,
                value: moment(d).unix()*1000
            }
        });
    };

    return (
        <Box>                   
            <Calendar 
                calendarType='gregory'
                locale='es-ES'
                selectRange={false}
                value={date}
                onChange={handleDateSelect}/>
        </Box>
    );
};

export default DateInput;