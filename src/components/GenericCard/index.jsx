import React from 'react';
import { Card, CardContent } from '@mui/material';

const cardStyle = {
    background: "rgba(255,255,255,0.8)",
    boxShadow: "3px 3px 10px 0px rgba(0,0,0,0.7)"
};

const contentStyle = {
    padding: "10px",
    height: "100%"
};

const GenericCard = ({sx, onClick, children}) => (
    <Card sx={{...cardStyle, ...sx}} onClick={onClick}>
        <CardContent sx={contentStyle}>
            {children}
        </CardContent>
    </Card>
);

export default GenericCard;