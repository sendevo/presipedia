import MainView from "../../components/MainView";
import GridMenu from "../../components/GridMenu";
import candidateIcon from "../../assets/icons/candidate_gauge.png";
import quizIcon from "../../assets/icons/test.png";
import background from "../../assets/backgrounds/background8.jpg";

const View = () => {
    
    const content = [
        {
            path: "/games/candidate",
            title: "Presidentómetro",
            text: "¿Podrás ser el siguiente?",
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
