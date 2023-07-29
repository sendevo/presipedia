import { useState } from 'react';
import { 
    Box,
    FormControl, 
    InputLabel, 
    Select as MuiSelect,
    MenuItem,
    Grid 
} from '@mui/material';
import classes from '../style.module.css';

const Select = props => {

    const {
        icon,
        rIcon,
        onIconClick,
        onChange,
        id,
        label,
        name,
        value,
        options
    } = props;

    const [iconLoaded, setIconLoaded] = useState(false);

    const iconDisplay = icon && iconLoaded || rIcon;

    return (
        <Grid container spacing={2} alignItems="center" sx={{marginBottom:"0px", maxHeight: "60px"}}>
            {icon &&
            <Grid item xs={rIcon ? 1 : 2} display={iconDisplay ? 'grid':'none'}>
                {icon && !rIcon && 
                    <img 
                        onLoad={()=>setIconLoaded(true)} 
                        src={icon} 
                        className={classes.Icon} 
                        alt="icon" 
                        onClick={onIconClick}/>
                }
                {rIcon && 
                    <Box sx={{textAlign:"center"}}>
                        { icon }
                    </Box>
                }
            </Grid>
            }
            <Grid item xs={rIcon ? 11 : (iconDisplay ? 10 : 12)} className={classes.InputContainer}>
                <FormControl fullWidth size="small">
                    <InputLabel id={id}>{label}</InputLabel>
                    <MuiSelect
                        className={classes.SelectContainer}
                        name={name}
                        labelId={id}
                        value={value}            
                        label={label}
                        sx={{zIndex:0}}                        
                        onChange={onChange}>
                        {options.map((item, index) => (
                            <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
                        ))}
                    </MuiSelect>
                </FormControl>
            </Grid>
        </Grid>
    );
};

export default Select;