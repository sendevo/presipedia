import { 
    Box,
    Dialog,
    DialogTitle,  
    DialogContent,
    DialogContentText
} from "@mui/material";
import wrongIcon from "../../assets/icons/wrong_icon.png";
import rightIcon from "../../assets/icons/right_icon.png";
import timeoutIcon from "../../assets/icons/time_icon.png";

const dialogBackdropStyle = {backdrop:{sx:{backdropFilter: "blur(2px)"}}};
const iconContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '16px'
};
const iconStyle = {
    width: '64px',
    height: '64px',
    objectFit: 'cover'
};
const feedbackType = {
    HIDDEN: {color:"rgba(255,255,255,0)", icon:""},
    RIGHT: {color:"rgba(153, 240, 161, 0.9)", icon:rightIcon},
    WRONG: {color:"rgba(245, 162, 162, 0.9)", icon:wrongIcon},
    TIMEOUT: {color:"rgba(176, 190, 247, 0.9)", icon:timeoutIcon}
};

const FeedbackDialog = ({type, title, text}) => {
    const open = type!=="HIDDEN";
    return (
        <Dialog open={open} slotProps={dialogBackdropStyle}>
            {open && <DialogTitle sx={{backgroundColor:feedbackType[type].color}}>
                <Box sx={iconContainerStyle}>
                    <img src={feedbackType[type].icon} style={iconStyle}/>
                </Box>
            </DialogTitle>}
            {open && <DialogContent sx={{backgroundColor:feedbackType[type].color, fontWeight:"bold"}}>
                {title}
                <DialogContentText sx={{fontWeight:"bold", lineHeight:"1.2em"}}>
                    {text}
                </DialogContentText>
            </DialogContent>}
        </Dialog>
    );
};

export default FeedbackDialog;