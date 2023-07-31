import { useRef } from "react";
import { useNavigate } from "react-router-dom";
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
    pl:2,
    pr:2
};

const Carousel = ({title, linkTo, slides}) => {

    const sliderRef = useRef();
    const navigate = useNavigate();
    const transition = Math.floor(Math.random()*2000) + 3000;
    const speed = Math.floor(Math.random()*300) + 500;

    return (
        <Card sx={cardStyle}>
            <Box textAlign={"right"}>
                <Typography fontSize={12} onClick={()=>navigate(linkTo)}> 
                    Ir a {title} <FaChevronRight style={{paddingTop:"5px"}}/>
                </Typography>
            </Box>
            <CardContent>
                <Box sx={{maxWidth:"75vw", marginTop:"0px"}}>
                    <Slider
                        ref={sliderRef}
                        slidesToShow={1}
                        arrows={false}
                        dots={true}
                        autoplay={true}
                        autoplaySpeed={transition}
                        speed={speed}
                        centerMode={true}
                        centerPadding="5px"
                        slidesToScroll={1}>
                            {slides}
                    </Slider>
                </Box>
            </CardContent>
        </Card>
    );
};

export default Carousel;