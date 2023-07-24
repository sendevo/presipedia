import { Grid } from "@mui/material";
import MainView from "../../components/MainView";
import ArticleCard from "../../components/ArticleCard";
import { readingTime } from "../../model/utils";
import blog from "../../assets/blog.json";
import background from "../../assets/backgrounds/background4.jpg";

const View = () => {
    return(
        <MainView title="Curiosidades" background={background}>
            <Grid container spacing={2}>
            {
                blog.map((article, index) => (
                    <Grid item key={index} xs={12} sm={6}>
                        <ArticleCard
                            title={article.title}
                            cover={article.cover}
                            reading={readingTime(article.content)}
                            link={index}/>
                    </Grid>
                ))
            }
            </Grid>
        </MainView>
    );
};

export default View;