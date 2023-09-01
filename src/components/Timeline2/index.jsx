import { useEffect, useRef } from "react";
import { Box, Typography } from "@mui/material";
import VerticalTimeline from "../../model/timeline";

const containerStyle = {
    marginTop: "10px",
    padding: "0px 10px 10px 10px",
    border: "1px solid lightgray",    
    backgroundColor: "rgba(255,255,255,0.6)",
    borderRadius: "5px"
};


const Timeline = ({title, clarification, items}) => {
    const containerRef = useRef();

    useEffect(()=>{
        if(items && items.length > 0){
            const tl = new VerticalTimeline(containerRef.current, items);
            return () => tl.destroy();
        }
    }, [items]);

    return (
        <Box style={containerStyle}>
            <Typography fontSize={"large"}>{title}</Typography>
            <Box ref={containerRef}></Box>
            {clarification && <Typography fontSize={"small"}>{clarification}</Typography>}
        </Box>
    );
};

export default Timeline;