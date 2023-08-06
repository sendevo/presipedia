import { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';

const containerStyle = {
    marginTop: "5px",
    padding: "5px",
    border: "1px solid rgb(180, 180, 180)",
    borderRadius: "5px",
    boxShadow: "0px 0px 5px 0px rgba(0, 0, 0, 0.2)",
    backgroundColor: "rgba(250, 250, 250, 0.6)"
};

const spanStyle = {
    display: "inline-block",
    fontSize: "small",
    color: "gray",
    lineHeight: "1.2em"
};

const RadarChart = ({title, clarification, labels, datasets, suffix, onReady}) => {
    const canvasRef = useRef(null);
    const config = {
        type: 'radar',
        data: {labels,datasets},
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
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
                        label: tooltipItem => { 
                            const value = tooltipItem.raw < 1 ? tooltipItem.raw.toFixed(2) : Math.round(tooltipItem.raw);
                            return tooltipItem.dataset.label+": "+value+suffix;
                        }
                    }
                }
            },
            animation: {
                onComplete: () => {                      
                    const dataURL = canvasRef.current?.toDataURL();
                    onReady(dataURL);
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
            <div>
                <canvas ref={canvasRef} />
            </div>
            {clarification && <span style={spanStyle}>{clarification}</span>}
        </div>
    );
};

export default RadarChart;
