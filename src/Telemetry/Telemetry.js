import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import 'chartjs-plugin-streaming';
import styles from './Telemetry.module.scss';
import ThreeRenderer from './ThreeRenderer/ThreeRenderer';

class Telemetry extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.onData = this.onData.bind(this);
    }

    componentDidMount() {
        window.arcc.api.attachListener("data", "telemetryListener", this.onData)
        this.startDate = Date.now();

        this.sum = 0;
    }

    onData(newData) {
        this.sum += newData.payload[0][1] / 200;
        const chart = this.chart.chartInstance.chart;
        chart.data.datasets[0].data.push({
            x: Date.now(),
            y: newData.payload[0][1]
        })
        chart.data.datasets[1].data.push({
            x: Date.now(),
            y: this.sum
        })
        chart.update({
            preservation: true
        })
    }


    render() {
        return (
            <div className={styles.chart}>
                <ThreeRenderer/>
            <Line
                ref={ref => this.chart = ref}
                type={'line'}
                data={{
                    datasets: [
                        {
                            label: 'Dataset 1',
                            borderColor: 'rgb(255, 99, 132)',
                            backgroundColor: 'rgba(0, 0, 0, 0)',
                            pointRadius: 0,
                            borderWidth: 1,
                            lineTension: 0.1,
                        },
                        {
                            label: 'Dataset 2',
                            borderColor: 'rgb(99, 255, 132)',
                            backgroundColor: 'rgba(0, 0, 0, 0)',
                            pointRadius: 0,
                            borderWidth: 1,
                            lineTension: 0.1,
                        }
                    ]
                }}
                width={1.0}
                height={0.5}
                options={{
                    maintainAspectRatio:false,
                    tooltips: {
                        enabled: false
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                fontSize: 10
                            }
                        }],
                        xAxes: [{
                            type: 'realtime',
                            ticks: {
                                fontSize: 10,
                            },
                            time: {
                                displayFormats: { 
                                    millisecond: "ss.SS",
                                    second: "ss.SS",
                                    minute: "ss.SS"
                                }
                            },
                            realtime: {
                                duration: 30000,
                                delay: 0,
                                ttl: 30000,
                                refresh: 1,
                                pause: false,
                            }
                        }]
                    },
                    plugins: {
                        streaming: {
                            frameRate: 30
                        }
                    }
                }}
            />
            </div>
        );
    }
}

export default Telemetry;