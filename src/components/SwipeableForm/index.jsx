import { useState, useRef } from "react";
import {
    Box,
    Button,
    Grid,
    Stack,
    Typography
} from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { FaUser, FaCity, FaBriefcase, FaUsers } from "react-icons/fa";
import { 
    DateInput,
    Input, 
    Radio, 
    Select,
    SuggesterInput 
} from "../Inputs";
import { PROVINCES, OCCUPATIONS } from "../../model/constants";
import { getZodiac } from "../../model/utils";
import genderMale from "../../assets/icons/gender_male.png";
import genderFemale from "../../assets/icons/gender_female.png";
import genderUnk from "../../assets/icons/gender_unk.png";
import processed from "../../assets/processed.json";
import GenericCard from "../GenericCard";
import moment from "moment";

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

const keyframesStyles = `
@keyframes pulse {
    0% {box-shadow: none;}
    100% {box-shadow: 0px 0px 10px 2px rgba(30, 30, 255, 0.8);}
}`;

const inputBoxStyle = {
    mt:2, 
    mb:2,
    p:"0px 10px",
    minHeight: "70vh"
};
 
const SwipeableForm = ({onSubmit}) => {

    const [form, setForm] = useState({
        name: "",
        gender: "",
        province: "",
        birthdate: Date.now(),
        occupation: "",
        party: ""
    });

    const sliderRef = useRef();
    
    const handleNextSlide = () => {
        sliderRef.current.slickNext();
    };

    const handlePrevSlide = () => {
        sliderRef.current.slickPrev();
    };

    const handleInputChange = e => {
        const {name, value} = e.target;
        setForm(prevForm => {
            const form = {...prevForm};
            form[name] = value;
            return form;
        });
    };

    const handleSubmitForm = () => {
        onSubmit(form);
    };

    return ( 
        <Box sx={{maxWidth:"90vw"}}>
            <Slider 
                ref={sliderRef}
                infinite={false}
                centerMode={true}
                centerPadding="5px"
                slidesToShow={1}
                slidesToScroll={1}>
                
                <Box sx={inputBoxStyle}>
                    <style>{keyframesStyles}</style>
                    <Typography>
                        ¿Te ves a vos o a tu mejor amigo/a como próximo/a presidente de nuestro país? ¿Te gustaría saber qué tanto se parece a quienes ya pasaron por el <a href="/blog/article?index=3"><i>Sillón de Rivadavia</i></a>?
                    </Typography>
                    <Typography sx={{mt:1}}>
                        En este juego, te proponemos evaluar las similitudes de tu candidato/a con todos los expresidentes de nuestra base de datos, por lo que te iremos pidiendo algunos datos para que podamos conocerlo/a mejor.
                    </Typography>
                    <Stack sx={{m:3}}>
                        <Button 
                            sx={buttonStyle}
                            variant="contained"
                            onClick={handleNextSlide}>
                                ¡Comenzar!
                        </Button>
                    </Stack>
                    <Typography fontStyle={"italic"} color={"#444"}>
                        <b>Tip:</b> Para avanzar y retroceder sobre el paso a paso, podés deslizar la pantalla hacia los laterales o clickear sobre los controles.
                    </Typography>
                </Box>

                <Box sx={inputBoxStyle}>
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

                <Box sx={inputBoxStyle}>
                    <Typography sx={instructionsStyle}>¿Con qué género se identifica mejor {form.name}?</Typography>
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
                                value: "undefined",
                                icon: genderUnk
                            }
                        ]}
                        onChange={handleInputChange}/>
                </Box>

                <Box sx={inputBoxStyle}>
                    <Typography sx={instructionsStyle}>¿En qué provincia nació {form.name}?</Typography>
                    <Select 
                        icon={<FaCity />}
                        rIcon={true}
                        name="province"
                        id="city"
                        label="Provincia"
                        value={form.province}
                        options={PROVINCES.map((op,i)=>({value:i, label:op}))}
                        onChange={handleInputChange}/>
                </Box>
                
                <Box sx={inputBoxStyle}>
                    <Typography sx={instructionsStyle}>¿Cuál es la principal ocupación de {form.name}?</Typography>
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
                
                <Box sx={inputBoxStyle}>
                    <Typography sx={instructionsStyle}>Si recordás la fecha de nacimiento de {form.name}, seleccionala en este calendario:</Typography>
                    <GenericCard>
                        <DateInput 
                            name="birthdate"
                            value={form.birthdate} 
                            onChange={handleInputChange}/>
                    </GenericCard>
                </Box>
            
                <Box sx={inputBoxStyle}>
                    <Typography sx={instructionsStyle}>Finalmente, te pedimos que indiques la tendencia política con la cual {form.name} se identifica mejor:</Typography>
                    <SuggesterInput 
                        icon={<FaUsers />}
                        rIcon={true}
                        name="party"
                        id="party"
                        label="Tendencia"
                        value={form.party}
                        options={processed.parties.names.map((op,i)=>({key:i, label:op}))}
                        onChange={handleInputChange}/>
                </Box>

                <Box>
                    <Typography sx={instructionsStyle}>
                        Comprueba que los datos estén bien:
                    </Typography>
                    <ul>
                        <li><b>Nombre:</b> {form.name}</li>
                        {form.gender && <li><b>Género:</b> {form.gender==="M" ? "Masculino":"Femenino"}</li>}
                        <li><b>Mes de nacimiento:</b> {moment(form.birthdate).format("MMMM")}</li>
                        <li><b>Edad:</b> {moment().diff(form.birthdate, 'years', false)} años</li>
                        <li><b>Ocupación:</b> {form.occupation.label}</li>
                        <li><b>Signo zodiacal:</b> {getZodiac(form.birthdate).name}</li>
                        <li><b>Provincia de origen:</b> {PROVINCES[form.province]}</li>
                        <li><b>Tendencia política:</b> {form.party.label}</li>
                    </ul>

                    <Stack sx={{m:3}}>
                        <Button 
                            sx={buttonStyle}
                            variant="contained"
                            onClick={handleSubmitForm}>
                                ¡Ver resultados!
                        </Button>
                    </Stack>
                </Box>
            </Slider>
        </Box>
    );
};

export default SwipeableForm;