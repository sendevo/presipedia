import { useEffect, useRef } from "react";
import { Typography } from "@mui/material";
import { Timeline as VisTimeline } from "vis-timeline";

const containerStyle = {
    marginTop: "10px",
    padding: "0px 10px 10px 10px",
    border: "1px solid lightgray",
    borderRadius: "5px"
};

const Timeline = ({title, items}) => {
    const containerRef = useRef();
    
    useEffect(()=>{
        const tl = new VisTimeline(containerRef.current, items, {locale: 'es',height: '400px'});
        return () => tl.destroy();
    }, []);

    return (
        <div style={containerStyle}>
            <Typography fontSize={"large"}>{title}</Typography>
            <div ref={containerRef}></div>
        </div>
    );
};

export default Timeline;