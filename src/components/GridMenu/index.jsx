import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import GenericCard from "../../components/GenericCard";

const cardStyle = {
    textAlign: "center", 
    height: "150px",
    borderRadius: "15px"
};

const iconStyle = {
    display: "block", 
    marginLeft: "auto", 
    marginRight:"auto",
    filter: "contrast(50%) drop-shadow(3px 5px 3px #888)"
};

const GridMenu = ({title, subtitle, items}) => {
    const navigate = useNavigate();
    return (
        <>
            <Grid item xs={12}>
                {title && <Typography fontSize={18} fontWeight="bold">{title}</Typography>}
                {subtitle && <Typography fontSize={14}>{subtitle}</Typography>}
            </Grid>
            {items.map((item, index) => (
                <Grid key={index} item xs={6}>
                    <GenericCard sx={cardStyle} onClick={()=>navigate(item.path)}>
                        <Box 
                            display="flex" 
                            flexDirection="column"
                            justifyContent="center" 
                            alignItems="center"
                            color={item.disabled ? "gray":"black"}>
                            {typeof(item.icon) === "function" ?
                                <div style={iconStyle}>{item.icon(40)}</div>
                                : 
                                <img src={item.icon} height={"70px"} style={iconStyle}></img>
                            }
                            <Typography sx={{marginTop: "10px"}}><b>{item.title}</b></Typography>
                            <Typography lineHeight={"1.2em"} fontSize={"0.7em"}>{item.text}</Typography>
                        </Box>
                    </GenericCard>
                </Grid>
            ))}
        </>
    );
};

export default GridMenu;