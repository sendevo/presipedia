import { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';

const containerStyle = {
    marginTop: "10px",
    padding: "10px",
    border: "1px solid rgb(180, 180, 180)",
    borderRadius: "5px",
    boxShadow: "0px 0px 5px 0px rgba(0, 0, 0, 0.2)",
    backgroundColor: "rgba(250, 250, 250, 0.6)"
};

const HorizontalBarChart = ({title, labels, datasets, ylabel, xlabel}) => {
    const canvasRef = useRef(null);
    const containerHeight = datasets[0].data.length*30;
    const config = {
        type: 'bar',
        data: {
            labels: labels,
            datasets: datasets
        },
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
        </div>
    );
};

export default HorizontalBarChart;
