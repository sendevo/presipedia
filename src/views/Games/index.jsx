import MainView from "../../components/MainView";
import GridMenu from "../../components/GridMenu";
import candidateIcon from "../../assets/icons/candidate.png";
import quizIcon from "../../assets/icons/quiz.png";
import background from "../../assets/backgrounds/background8.jpg";

const View = () => {
    
    const content = [
        {
            path: "/games/candidate",
            title: "Mi candidato",
            text: "¿Podrá ser el siguiente?",
            icon: candidateIcon
        },
        {
            path: "/games/quiz",
            title: "Ponte a prueba",
            text: "Preguntas y respuestas",
            icon: quizIcon
        }
    ];

    return (
        <MainView title="Entretenimiento" background={background}>
            <GridMenu items={content} subtitle=""/>
        </MainView>
    );
};

export default View;
