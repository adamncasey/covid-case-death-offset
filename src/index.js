import Chart from 'chart.js';

let g_deathRawData = [];
let g_Chart;

const ENDPOINT_URL = 'https://api.coronavirus.data.gov.uk/v1/data';

function fetchCaseData() {
    return fetch(ENDPOINT_URL + '?filters=areaType=overview&structure={"date":"date","value":"newCasesBySpecimenDate"}');
}


function fetchDeathData() {
    return fetch(ENDPOINT_URL + '?filters=areaType=nation&structure={"date":"date","value":"newDeathsByDeathDate"}');
}


function applyDateOffset(rawData, dateOffset) {

    let offsetMs = dateOffset * 24 * 60 * 60 * 1000;
    let data = rawData.map(d => {
        return {
            x: d.x + offsetMs,
            y: d.y
        };
    });

    console.log(data);

    return data;
}

async function normalisedDeathData(dateOffset) {
    let response = await fetchDeathData();

    console.log(response);

    let json = await response.json();

    console.log(json);

    let dataset = {};

    for (let obj of json.data) {
        let d = Date.parse(obj.date);
        dataset[d] = (dataset[d] || 0) + obj.value;
    }

    let rawData = [];
    for (let date in dataset) {
        rawData.push({ x: parseInt(date), y: dataset[date] });
    }

    g_deathRawData = rawData;

    let data = applyDateOffset(g_deathRawData, dateOffset);

    return data;
}

async function createDataset(dataPromise) {
    let response = await dataPromise;

    console.log(response);

    let json = await response.json();

    console.log(json);

    return json.data.map(obj => {
        return {
            x: Date.parse(obj.date),
            y: obj.value
        }
    });
}


async function buildCaseGraph() {
    let casesDataset = await createDataset(fetchCaseData());

    console.log(casesDataset);
    let deathsDataset = await normalisedDeathData(document.getElementById("deathDateOffset").value);

    let ctx = document.getElementById("chart1").getContext('2d');
    g_Chart = new Chart(ctx, {
        data: {
            datasets: [{
                label: 'Cases',
                yAxisID: 'Cases',
                type: 'line',
                data: casesDataset,
                backgroundColor: '#f00',
                borderColor: '#f00',
                pointRadius: 0,
                fill: false,
                lineTension: 0,
                borderWidth: 2
            },
            {
                label: 'Deaths',
                yAxisID: 'Deaths',
                type: 'line',
                data: deathsDataset,
                backgroundColor: '#0f0',
                borderColor: '#0f0',
                pointRadius: 0,
                fill: false,
                lineTension: 0,
                borderWidth: 2
            }]
        },
        options: {
            animation: {
                duration: 0
            },
            scales: {
                xAxes: [{
                    type: 'time',
                    distribution: 'series',
                    offset: true,
                    ticks: {
                        major: {
                            enabled: true,
                            fontStyle: 'bold'
                        },
                        source: 'data',
                        autoSkip: true,
                        autoSkipPadding: 75,
                        maxRotation: 0,
                        sampleSize: 100
                    },
                }],
                yAxes: [{
                    id: 'Cases',
                    gridLines: {
                        drawBorder: false
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Cases'
                    }
                }, {
                    id: 'Deaths',
                    gridLines: {
                        drawBorder: false
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Deaths'
                    }
                }]
            },
            tooltips: {
                intersect: false,
                mode: 'index',
            }
        }
    });

}

buildCaseGraph();

document.getElementById("deathDateOffset").addEventListener("input", () => {
    let days = document.getElementById("deathDateOffset").value;

    console.log(g_Chart.data.datasets[1]);
    g_Chart.data.datasets[1].data = applyDateOffset(g_deathRawData, days);
    g_Chart.update();

    document.getElementById("deathDateOffsetValue").innerText = days + " days";
});