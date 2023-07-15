import { useEffect, useRef } from "react";
import { Timeline as VisTimeline } from "vis-timeline";

const Timeline = ({options, items}) => {
    const containerRef = useRef();
    
    useEffect(()=>{
        const tl = new VisTimeline(containerRef.current, items, options);
        return () => tl.destroy();
    }, []);

    return (
        <div ref={containerRef}></div>
    );
};

export default Timeline;