import { useEffect, useRef } from "react";
import { Typography } from "@mui/material";
import VerticalTimeline from "../../model/timeline";

const containerStyle = {
    marginTop: "10px",
    padding: "0px 10px 10px 10px",
    border: "1px solid lightgray",
    borderRadius: "5px"
};


const Timeline = ({title, clarification, items}) => {
    const containerRef = useRef();

    useEffect(()=>{
        const tl = new VerticalTimeline(containerRef.current, items);
        return () => tl.destroy();
    }, []);

    return (
        <div style={containerStyle}>
            <Typography fontSize={"large"}>{title}</Typography>
            <div ref={containerRef}></div>
            {clarification && <Typography fontSize={"small"}>{clarification}</Typography>}
        </div>
    );
};

export default Timeline;