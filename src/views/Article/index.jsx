import { useSearchParams } from 'react-router-dom'
import { Box, Card, CardMedia, CardContent, Typography } from '@mui/material';
import MainView from "../../components/MainView";
import { APP_NAME } from '../../model/constants';
import blog from "../../assets/blog.json";
import background from "../../assets/backgrounds/background2.jpg";

const View = () => {
    const [searchParams] = useSearchParams();
    const sectionIndex = searchParams.get("section");
    const articleIndex = searchParams.get("index");
    const article = (articleIndex >= 0 && articleIndex < blog[sectionIndex].articles.length) ? blog[sectionIndex].articles[articleIndex] : "";
    const available = Boolean(article);

    return (
        <MainView title={article?.title || "Artículo no encontrado!"} background={background}>
            {available? 
                <Card>
                    <CardMedia
                        sx={{height:"120px"}}
                        image={`/blog/${article.cover}`}
                        title={article.title}/>
                    <CardContent>
                        <div dangerouslySetInnerHTML={{__html:article.content}}></div>
                        <Box sx={{fontSize:"10px"}}>
                            <Typography fontWeight={"bold"} fontSize={"14px"}>Bibliografía</Typography>
                            {article.sources.map((s,i) => (
                                <Typography key={i} fontSize={"11px"}>[{i+1}] {s}</Typography>
                            ))}
                        </Box>
                    </CardContent>
                </Card>
                :
                <Typography>El artículo al que intenta acceder no se encuentra en la base de datos de <b>{APP_NAME}</b></Typography>
            }
        </MainView>
    );
};

export default View;
