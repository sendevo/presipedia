import { Grid, Typography } from "@mui/material";
import { useSearchParams } from 'react-router-dom'
import MainView from "../../components/MainView";
import ArticleCard from "../../components/ArticleCard";
import { readingTime } from "../../model/utils";
import { APP_NAME } from '../../model/constants';
import blog from "../../assets/blog.json";
import background from "../../assets/backgrounds/background4.jpg";

const View = () => {
    const [searchParams] = useSearchParams();
    const sectionIndex = searchParams.get("index");
    const section = (sectionIndex >= 0 && sectionIndex < blog.length) ? blog[sectionIndex] : "";
    const available = Boolean(section);

    return(
        <MainView title={section?.title || "Sección no encontrada!"}background={background}>
            {available ? 
                <Grid container spacing={2}>
                {
                    section.articles.map((article, index) => (
                        <Grid item key={index} xs={12} sm={6}>
                            <ArticleCard
                                title={article.title}
                                cover={article.cover}
                                reading={readingTime(article.content)}
                                section={sectionIndex}
                                index={index}/>
                        </Grid>
                    ))
                }
                </Grid>
                :
                <Typography>La sección a la que intenta acceder no se encuentra en la base de datos de <b>{APP_NAME}</b></Typography>
            }
        </MainView>
    );
};

export default View;