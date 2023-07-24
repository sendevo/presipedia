import MainView from "../../components/MainView";
import GridMenu from "../../components/GridMenu";
import predictorIcon from "../../assets/icons/predictor.png";
import quizIcon from "../../assets/icons/quiz.png";
import image from "../../assets/backgrounds/background2.jpg";

const View = () => {
    
    const content = [
        {
            path: "/games/predictor",
            title: "Mi candidato",
            text: "¿Podrá ser el siguiente?",
            icon: predictorIcon
        },
        {
            path: "/games/quiz",
            title: "Ponte a prueba",
            text: "Preguntas y respuestas",
            icon: quizIcon
        }
    ];

    return (
        <MainView title="Entretenimiento" background={image}>
            <GridMenu items={content} subtitle=""/>
        </MainView>
    );
};

export default View;
