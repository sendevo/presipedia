import { useState } from 'react';
import { Grid, Slider as MuiSlider } from '@mui/material';
import classes from '../style.module.css';

const getMarks = (min, max, length) => Array.from({length}, (_, i) => (min + (max-min)/(length-1)*i))
    .map(v => ({
        value: v,
        label: <span>{v}</span>
    }));

const Slider = props => {

    const [iconLoaded, setIconLoaded] = useState(false);

    return (
        <Grid container spacing={2} alignItems="center">
            {props.icon && 
            <Grid item xs={2} display={iconLoaded ? 'block':'none'}>
                <img onLoad={()=>setIconLoaded(true)} src={props.icon} className={classes.Icon} alt="Icon" onClick={props.onIconClick}/>
            </Grid>
            }
            <Grid item xs={props.icon && iconLoaded ? 10 : 12}>
                <span className={classes.Title}>{props.name}</span>
                <div className={classes.SliderContainer}>
                    <MuiSlider
                        size={props.size || "medium"}
                        className={classes.Slider}
                        valueLabelDisplay="auto"
                        marks={props.withmarks && getMarks(props.min, props.max, props.ticks)}
                        valueLabelFormat={v=>`${v} ${props.suffix}`}
                        {...props} />
                </div>
            </Grid>
        </Grid>
    );
};

export default Slider;