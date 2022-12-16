/*
@ whoever grades this:
in the "final" website, the chart would display data resulting from my research I will have done in the Bachelors Thesis.
But I don't have that yet. 
And just writing up some fake data in json format would be boring.
So I'll instead create a chart and pull data from the star wars api :)
Lg Dario ;D 

TLDR: contains mock data
*/
document.addEventListener("DOMContentLoaded", function(event) {
    const CHART_ID = 'deepfakeAmountChart';
    const chart = document.getElementById(CHART_ID);

    let liveData = {
        labels: ['2016', '2017', '2018', '2019', '2020', '2021', '2022'],
        values: []

    };

    // poll api for data. in production an actual api with correct data will be used.
    fetch("https://swapi.dev/api/people/")
        .then((response) => response.json())
        .then((data) => {
            if(data.results == null) {
                return; // no results 
            }

            data.results.forEach((item) => {
                liveData.values.push(item.height);
            });

            setupChart(liveData);
        });


    /**
     * Set up a chart with given dataset. Dataset contains labels and values
     * @param {*} chartData dataset containing labels and values
     */
    function setupChart(chartData) {
        // init chart
        new Chart(chart, {
            type: 'line',
            data: {
                labels: chartData.labels,
                datasets: [{
                    label: 'Anzahl Videos',
                    data: chartData.values,
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
});
