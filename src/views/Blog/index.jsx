import MainView from "../../components/MainView";
import GridMenu from "../../components/GridMenu";
import blog from "../../assets/blog.json";
import background from "../../assets/backgrounds/background4.jpg";

const content = blog.map((section,index) => ({
    ...section,
    path: `/blog/section?index=${index}`,
    text: `${section.articles.length} artículos`
}));

const View = () => {
    return(
        <MainView title="Blog" background={background}>
            <GridMenu items={content}/>
        </MainView>
    );
};

export default View;