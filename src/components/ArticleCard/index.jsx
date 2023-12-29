import { 
    Card, 
    CardMedia, 
    CardContent, 
    CardActions,
    Typography, 
    Button 
} from "@mui/material";
import { Link } from "react-router-dom";

const cardStyle = {
    backgroundColor: "rgba(255,255,255,0.8)",
    boxShadow: "3px 3px 10px 0px rgba(0,0,0,0.7)",
    borderRadius: "10px"
};

const cardActionStyle = {
    alignSelf: "stretch",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    padding:"0px"
};

const ArticleCard = ({title, cover, reading, section, index}) => {
    return (
        <Card sx={cardStyle}>
            <CardMedia
                sx={{height:"120px"}}
                image={`/blog/${cover}`}
                title={title}/>
            <CardContent sx={{padding:"10px"}}>
                <Typography gutterBottom variant="h5" component="div">
                    {title}
                </Typography>
                <Typography  variant="body2" color="text.secondary">
                    Tiempo de lectura: {reading} minuto{reading > 1 ? "s":""}
                </Typography>
            </CardContent>
            <CardActions sx={cardActionStyle}>
                <Button 
                    LinkComponent={Link} 
                    to={`/blog/article?section=${section}&index=${index}`}>Leer
                </Button>
            </CardActions>
        </Card>
    );
};

export default ArticleCard;