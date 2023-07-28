import { useState } from "react";
import {
    Box,
    Stepper,
    Step,
    StepLabel,
    StepContent,
    Button,
    Typography,
    Grid
} from "@mui/material";
import { Input, DateInput } from "../Inputs";
import { FaUser } from "react-icons/fa";

const buttonStyle = {mt:1,mr:1};

const steps = [
    {
        label: "Género"
    },
    {
        label: "Nombre"
    },
    {
        label: "Lugar de origen"
    },
    {
        label: "Ocupación"
    },
    {
        label: "Fecha de nacimiento"
    },
    {
        label: "Tendencia política"
    }
];

const StepperForm = ({onSubmit}) => {
    const [active, setActive] = useState(0);
    const [form, setForm] = useState({});

    const handleNext = () => {
        if(active === steps.length-1) 
            onSubmit({
                assumptionAgeHistogram: "30-40",
                birthsPerMonth: "Octubre",
                birthsPerZodiacSign: "Libra",
                birthLocations: "Buenos Aires",
                occupations: "Abogado",
                genders: "M",
                parties: "Justicialista"
            });
        else 
            setActive(prev => prev + 1);
    };
    const handleBack = () => setActive(prev => prev - 1);

    return ( 
        <Box>
            <Stepper activeStep={active} orientation="vertical"> 
            {
                steps.map((step, index) => (
                    <Step key={index}>
                        <StepLabel optional={step.label} />
                        <StepContent>
                            {active===0 && 
                                <Grid container direction="row">
                                    <Grid item xs={4}>
                                        <Button 
                                            variant="contained" 
                                            size="small" 
                                            onClick={console.log} >
                                            Hombre
                                        </Button>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Button 
                                            variant="contained" 
                                            size="small" 
                                            onClick={console.log} >
                                            Mujer
                                        </Button>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Button 
                                            variant="contained" 
                                            size="small" 
                                            onClick={console.log} >
                                            Otro
                                        </Button>
                                    </Grid>
                                </Grid>
                            }
                            {active===1 && 
                                <Box sx={{mt:2, mb:2}}>
                                    <Input 
                                        icon={<FaUser/>}
                                        rIcon={true}
                                        value={""}
                                        label="Nombre"
                                        type="text"
                                        onChange={console.log}/>
                                </Box>
                            }
                            {active===2 && 
                                <Box>

                                </Box>
                            }
                            {active===3 && 
                                <Box>

                                </Box>
                            }
                            {active===4 && 
                                <Box>
                                    <DateInput onChange={console.log} />
                                </Box>
                            }
                            {active===5 && 
                                <Box>

                                </Box>
                            }
                            <Button 
                                variant="contained" 
                                size="small" 
                                onClick={handleNext} 
                                sx={buttonStyle}>
                                {index === steps.length-1 ? "Finalizar":"Siguiente"}
                            </Button>
                            {index !== 0 && 
                                <Button 
                                    size="small" 
                                    onClick={handleBack} 
                                    sx={buttonStyle}>
                                    Volver
                                </Button>
                            }
                        </StepContent> 
                    </Step>
                ))
            }
            </Stepper> 
        </Box>
    );
};

export default StepperForm;