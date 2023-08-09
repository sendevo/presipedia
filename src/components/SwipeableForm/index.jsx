import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import {
    Box,
    Button,
    Stack,
    Typography
} from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { 
    FaUser, 
    FaCity, 
    FaBriefcase, 
    FaUsers, 
    FaArrowAltCircleLeft, 
    FaArrowAltCircleRight 
} from "react-icons/fa";
import { 
    DateInput,
    Input, 
    Radio, 
    Select,
    SuggesterInput 
} from "../Inputs";
import ArgMap from "../ArgMap";
import { PROVINCES, OCCUPATIONS, MONTHS } from "../../model/constants";
import { getZodiac, capitalize } from "../../model/utils";
import genderMale from "../../assets/icons/gender_male.png";
import genderFemale from "../../assets/icons/gender_female.png";
import genderUnk from "../../assets/icons/gender_unk.png";
import processed from "../../assets/processed.json";
import GenericCard from "../GenericCard";


const buttonStyle = {
    animationName: 'pulse',
    animationDuration: '1.0s',
    animationDirection: 'alternate',
    animationIterationCount: 'infinite'
};

const instructionsStyle = {
    mb:2,
    p:1
};

const tipStyle = {
    mt: "5px",
    fontStyle:"italic",
    color: "#444",
    fontSize:"14px",
    lineHeight: "1.1em"
};

const keyframesStyles = `
@keyframes pulse {
    0% {box-shadow: none;}
    100% {box-shadow: 0px 0px 10px 2px rgba(30, 30, 255, 0.8);}
}`;

const slideStyle = {
    mt:0, 
    mb:2,
    p: "0px 10px"
};

const sliderControlStyle = {
    opacity: 0.3,
    transition: "opacity 0.3s ease",
    position:"fixed", 
    width:"100%", 
    left:"0px", 
    bottom:"50px", 
    display:"flex", 
    justifyContent:"space-evenly",
    "&:hover":{
        opacity: 1
    },
    ".info-slide:hover, .info-slide:active":{
        opacity: 1
    }
};
 
const SwipeableForm = ({onSubmit}) => {

    const sliderRef = useRef();

    const [form, setForm] = useState({
        name: "",
        gender: undefined,
        province: "",
        birthdate: Date.now(),
        occupation: "",
        party: ""
    });

    const candidateName = form.name || "tu candidato/a";
    const candidateAge = moment().diff(form.birthdate, 'years', false);
    

    const handleInputChange = e => {
        const {name, value} = e.target;
        setForm(prevForm => {
            const form = {...prevForm};
            form[name] = value;
            return form;
        });
    };

    const handleSubmit = () => {
        onSubmit({
            name: candidateName,
            age: candidateAge,
            gender: form.gender,
            //month: candidateAge > 0 ? moment(form.birthdate).format("MMMM") : "",
            month: candidateAge > 0 ? MONTHS[moment(form.birthdate).month()] : "",
            zodiac: candidateAge > 0 ? getZodiac(form.birthdate).name : "",
            province: PROVINCES[form.province],
            occupation: form.occupation?.label,
            party: form.party?.label
        });
    };

    return ( 
        <Box sx={{maxWidth:"90vw", marginTop:"0px"}}>
            <Slider 
                style={{marginTop:"0px"}}
                ref={sliderRef}
                infinite={false}
                arrows={false}
                centerPadding="5px"
                slidesToShow={1}
                slidesToScroll={1}>
                
                <Box sx={slideStyle}>
                    <style>{keyframesStyles}</style>
                    <Typography>
                        ¿Te ves a vos o a tu mejor amigo/a como candidato/a a presidente de nuestro país? ¿Te gustaría saber cuántos parecidos tienen con quienes ya pasaron por el <Link to="/blog/article?index=3"><i>Sillón de Rivadavia</i></Link>?
                    </Typography>
                    <Typography sx={{mt:1}}>
                        En este juego, te proponemos evaluar las similitudes de tu candidato/a con todos los expresidentes de Argentina, por lo que te iremos pidiendo algunos datos para que podamos conocerlo/a mejor.
                    </Typography>
                    <Stack sx={{m:3}}>
                        <Button 
                            sx={buttonStyle}
                            variant="contained"
                            onClick={() => sliderRef.current.slickNext()}>
                                ¡Comenzar!
                        </Button>
                    </Stack>
                    <Typography sx={tipStyle}>
                        <b>Tip:</b> Para avanzar y retroceder sobre el paso a paso, podés deslizar la pantalla hacia los laterales o pulsar sobre los controles.
                    </Typography>
                </Box>

                <Box sx={slideStyle}>
                    <Typography sx={instructionsStyle}>Empecemos por el nombre. ¿Cómo se llama tu candidato/a?</Typography>
                    <Input 
                        icon={<FaUser/>}
                        rIcon={true}
                        value={form.name}
                        name="name"
                        label="Nombre"
                        type="text"
                        onChange={handleInputChange}/>
                </Box>

                <Box sx={slideStyle}>
                    <Typography sx={instructionsStyle}>¿Con qué género se identifica mejor {candidateName}?</Typography>
                    <Radio 
                        name="gender"
                        value={form.gender}
                        options={[
                            {
                                name: "Hombre",
                                value: "M",
                                icon: genderMale
                            },
                            {
                                name: "Mujer",
                                value: "F",
                                icon: genderFemale
                            },
                            {
                                name: "Otro",
                                value: "",
                                icon: genderUnk
                            }
                        ]}
                        onChange={handleInputChange}/>
                </Box>

                <Box sx={slideStyle}>
                    <Typography sx={instructionsStyle}>¿En qué provincia nació {candidateName}?</Typography>
                    <Select 
                        icon={<FaCity />}
                        rIcon={true}
                        name="province"
                        id="city"
                        label="Provincia"
                        value={form.province}
                        options={PROVINCES.map((op,i)=>({value:i, label:op}))}
                        onChange={handleInputChange}/>
                    <ArgMap 
                        fillColor={"rgba(100,100,100,0.3)"}
                        fillFc={index => form.province===index ? "#81DAF5":"rgba(100,100,100,0.3)"}
                        onClick={idx => handleInputChange({target:{name:"province", value:idx}})}/>
                </Box>
                
                <Box sx={slideStyle}>
                    <Typography sx={instructionsStyle}>¿Cuál es la principal ocupación de {candidateName}?</Typography>
                    <SuggesterInput
                        icon={<FaBriefcase/>}
                        rIcon={true}
                        name="occupation"
                        id="occupation"
                        label="Ocupación"
                        value={form.occupation}
                        options={processed.occupations.names.concat(OCCUPATIONS).map((op,i)=>({key:i, label:op}))}
                        onChange={handleInputChange}/>
                </Box>
                
                <Box sx={slideStyle}>
                    <Typography sx={instructionsStyle}>Si recordás la fecha de nacimiento de {candidateName}, seleccionala en este calendario:</Typography>
                    <GenericCard sx={{mb:2, mt:-2}} contentSx={{p:0}}>
                        <DateInput 
                            name="birthdate"
                            value={form.birthdate} 
                            onChange={handleInputChange}/>
                    </GenericCard>
                    <Typography fontWeight={"bold"}>Fecha seleccionada: {moment(form.birthdate).format("DD/MM/YYYY")}</Typography>
                    <Typography sx={tipStyle}>
                        <b>Tip:</b> Para avanzar más rápido sobre los años, podes pulsar/clickear sobre la fecha central.
                    </Typography>
                </Box>
            
                <Box sx={slideStyle}>
                    <Typography sx={instructionsStyle}>Finalmente, te pedimos que indiques la tendencia política con la cual {candidateName} se identifica mejor. Podés dejar el campo en blanco si {candidateName} no se siente identificado con ninguna de las siguientes:</Typography>
                    <SuggesterInput 
                        icon={<FaUsers />}
                        rIcon={true}
                        name="party"
                        id="party"
                        label="Tendencia política"
                        value={form.party}
                        options={processed.parties.names.map((op,i)=>({key:i, label:op}))}
                        onChange={handleInputChange}/>
                </Box>

                <Box>
                    <Typography sx={instructionsStyle}>
                        Comprueba que los datos estén bien:
                    </Typography>
                    <ul>
                        <li><b>Nombre:</b> {capitalize(candidateName)}</li>
                        {form.gender && <li><b>Género:</b> {form.gender==="M" ? "Masculino":"Femenino"}</li>}
                        {candidateAge > 0 && <li><b>Mes de nacimiento:</b> {MONTHS[moment(form.birthdate).month()]}</li>}
                        {candidateAge > 0 && <li><b>Edad:</b> {candidateAge} años</li>}
                        {form.occupation?.label && <li><b>Ocupación:</b> {form.occupation?.label}</li>}
                        {candidateAge > 0 && <li><b>Signo zodiacal:</b> {getZodiac(form.birthdate).name}</li>}
                        {form.province !== "" && <li><b>Provincia de origen:</b> {PROVINCES[form.province]}</li>}
                        {form.party?.label && <li><b>Tendencia política:</b> {form.party?.label}</li>}
                    </ul>

                    <Stack sx={{m:3}}>
                        <Button 
                            sx={buttonStyle}
                            variant="contained"
                            onClick={handleSubmit}>
                                ¡Ver resultados!
                        </Button>
                    </Stack>
                </Box>
            </Slider>

            <Box sx={sliderControlStyle}>
                <Button onClick={() => sliderRef.current.slickPrev()}>
                    <FaArrowAltCircleLeft size={30}/>
                </Button>
                <Button onClick={() => sliderRef.current.slickNext()}>
                    <FaArrowAltCircleRight size={30}/>
                </Button>
            </Box>
        </Box>
    );
};

export default SwipeableForm;