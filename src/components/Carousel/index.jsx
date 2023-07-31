import { useRef } from "react";
import { Link } from "react-router-dom";
import { 
    Box, 
    Typography,
    Card,
    CardContent
} from "@mui/material";
import Slider from "react-slick";
import { FaChevronRight } from "react-icons/fa";


const cardStyle = {
    background: "rgba(255,255,255,0.8)",
    boxShadow: "3px 3px 10px 0px rgba(0,0,0,0.7)",
    p:0
};

const Carousel = ({title, linkTo, slides}) => {

    const sliderRef = useRef();
    const transition = Math.floor(Math.random()*2000) + 3000;
    const speed = Math.floor(Math.random()*300) + 500;

    return (
        <Card sx={cardStyle}>
            <Box textAlign={"right"}>
                <Link to={linkTo}> 
                    <Typography fontSize={12} sx={{cursor:"pointer"}}>
                        Ir a {title} <FaChevronRight style={{paddingTop:"5px"}}/>
                    </Typography>
                </Link>
            </Box>
            <CardContent sx={{p:0, maxWidth:"800px"}}>
                <Box sx={{maxWidth:"95vw", marginTop:"0px"}}>
                    <Slider
                        ref={sliderRef}
                        slidesToShow={1}
                        arrows={false}
                        dots={true}
                        autoplay={true}
                        autoplaySpeed={transition}
                        speed={speed}
                        centerMode={true}
                        centerPadding="0px"
                        slidesToScroll={1}>
                            {slides}
                    </Slider>
                </Box>
            </CardContent>
        </Card>
    );
};

export default Carousel;