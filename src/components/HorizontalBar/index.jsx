import { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';

const canvasStyle = {
    marginTop: "10px",
    padding: "10px",
    backgroundColor: "rgba(250, 250, 250, 0.6)",
    border: "1px solid rgb(180, 180, 180)",
    borderRadius: "5px",
    boxShadow: "0px 0px 5px 0px rgba(0, 0, 0, 0.2)"
};

const HorizontalBarChart = ({title, labels, datasets}) => {
    const canvasRef = useRef(null);
    const config = {
        type: 'bar',
        data: {
            labels: labels,
            datasets: datasets
        },
        options: {
            indexAxis: 'y',
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
    }, []);

    return (
        <canvas style={canvasStyle} ref={canvasRef} />
    );
};

export default HorizontalBarChart;
