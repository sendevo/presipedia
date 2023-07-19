import { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';

const containerStyle = {
    marginTop: "10px",
    padding: "10px 5px 25px 5px",
    border: "1px solid rgb(180, 180, 180)",
    borderRadius: "5px",
    boxShadow: "0px 0px 5px 0px rgba(0, 0, 0, 0.2)",
    backgroundColor: "rgba(250, 250, 250, 0.6)"
};

const spanStyle = {
    fontSize: "small",
    color: "gray"
};

const HorizontalBarChart = ({title, clarification, labels, datasets, ylabel, xlabel}) => {
    const canvasRef = useRef(null);
    const containerHeight = datasets[0].data.length*50;
    const config = {
        type: 'bar',
        data: {labels,datasets},
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {title: {display: ylabel, text: ylabel}},
                x: {title: {display: xlabel, text: xlabel}},
            },
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    align: "start",
                    display: true,
                    font: {size: 18, weight: "normal"},
                    text: title
                }
            }
        }
    };

    useEffect(() => {
        const chart = new Chart(canvasRef.current, config);
        return () => chart.destroy();
    }, [datasets]);

    return (
        <div style={{...containerStyle, height: `${containerHeight}px`}}>
            <canvas ref={canvasRef} />
            {clarification && <span style={spanStyle}>{clarification}</span>}
        </div>
    );
};

export default HorizontalBarChart;
