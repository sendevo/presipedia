import MainView from "../../components/MainView";
import GridMenu from "../../components/GridMenu";
import candidateIcon from "../../assets/icons/candidate_gauge.png";
import quizIcon from "../../assets/icons/test.png";
import savedCandidateIcon from "../../assets/icons/candidate_saved.png";
import savedQuizIcon from "../../assets/icons/test_saved.png";
import background from "../../assets/backgrounds/background8.jpg";

const View = () => {
    
    const content = [
        {
            path: "/games/candidate",
            title: "Presidenciómetro",
            text: "¿Podrás ser el siguiente?",
            icon: candidateIcon
        },
        {
            path: "/games/quiz",
            title: "Preguntas y respuestas",
            text: "Pon a prueba tus conocimientos",
            icon: quizIcon
        },
        {
            path: "/",
            title: "Resultados guardados",
            text: "Presidenciómetro",
            icon: savedCandidateIcon
        },
        {
            path: "/",
            title: "Progreso guardados",
            text: "Preguntas y respuestas",
            icon: savedQuizIcon
        }
    ];

    return (
        <MainView title="Entretenimiento" background={background}>
            <GridMenu items={content} subtitle=""/>
        </MainView>
    );
};

export default View;
