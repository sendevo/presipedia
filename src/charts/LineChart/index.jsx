import { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';

const containerStyle = {
    marginTop: "10px",
    padding: "10px 5px 25px 5px",
    border: "1px solid rgb(180, 180, 180)",
    borderRadius: "5px",
    boxShadow: "0px 0px 5px 0px rgba(0, 0, 0, 0.2)",
    backgroundColor: "rgba(250, 250, 250, 0.6)",
    height: "50vh"
};

const spanStyle = {
    fontSize: "small",
    color: "gray"
};

const LineChart = ({title, clarification, labels, datasets}) => {
    const canvasRef = useRef(null);
    const config = {
        type: 'line',
        data: {labels, datasets},
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {position: 'bottom'},
                title: {
                    align: "start",
                    display: true,
                    font: {size: 18, weight: "normal"},
                    text: title
                },
                tooltip: {
                    enabled: true,
                    mode: 'point',
                    callbacks: {
                        label: tooltipItem => tooltipItem.dataset.label + ": " + tooltipItem.raw + tooltipItem.dataset.suffix
                    }
                }
            }
        }
    };

    useEffect(() => {
        const chart = new Chart(canvasRef.current, config);
        return () => chart.destroy();
    }, [datasets]);

    return (
        <div style={containerStyle}>
            <canvas ref={canvasRef} />
            {clarification && <span style={spanStyle}>{clarification}</span>}
        </div>
    );
};

export default LineChart;