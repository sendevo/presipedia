import { useSearchParams } from 'react-router-dom'
import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import MainView from "../../components/MainView";
import { APP_NAME } from '../../model/constants';
import blog from "../../assets/blog.json";
import image from "../../assets/backgrounds/background2.jpg";

const View = () => {
    const [searchParams] = useSearchParams();
    const articleIndex = searchParams.get("index");
    const article = blog.at(articleIndex);
    const available = Boolean(article);
    return (
        <MainView title={article?.title || "Artículo no encontrado!"} background={image}>
            {available? 
                <Card>
                    <CardMedia
                        sx={{height:"120px"}}
                        image={`/blog/${article.cover}`}
                        title={article.title}/>
                    <CardContent>
                        <div dangerouslySetInnerHTML={{__html:article.content}}></div>
                    </CardContent>
                </Card>
                :
                <Typography>El artículo al que intenta acceder no se encuentra en la base de datos de <b>{APP_NAME}</b></Typography>
            }
        </MainView>
    );
};

export default View;
