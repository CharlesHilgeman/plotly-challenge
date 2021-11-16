function buildMetadata(sample) {
    d3.json("samples.json").then((data) => {
        var metadata = data.metadata;

        var resultArray = metadata.filter(sampleObject => sampleObject.id == sample);
        var result = resultArray[0];

        var PANEL = d3.select("#sample-metadata");


        PANEL.html("");
        

        Object.entries(result).forEach(([key, value]) => {
            PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
        });

    });
};

function buildCharts(sample) {
    d3.json('sample.json').then((data) => {
        var samples = data.samples;
        var resultArray = samples.filter(sampleObject => sampleObject.id ==sample);
        var result = resultArray[0];

        //Bubble Chart
        var bubbleLayout = {
            title: 'OTU Sample Size Bubble Chart',
            margin: {t:0},
            hovermode: 'closest',
            xaxis: {title: 'OTU ID'},
            margin: {t:30}
        };

        var trace2 = [
            {
                x: otuIds,
                y: sampleData,
                text: otuLabels,
                mode: 'markers',
                marker: {
                    size: sampleData,
                    color: otuIds,
                    colorscale: [
                        [0, 'rgb(0,180,255)'],
                        [0.5, 'rgb(0,255,50)'],
                        [1, 'rgb(255, 50, 0)']]
                }
            }
        ];

        Plotly.newPlot('bubble', trace2, bubbleLayout)

        //Bar Chart
        var yticks = otuIds.slice(0,11).map(otuId => 'OTU ${otuID}').reverse();
        var trace1 = [
            {
                y: yticks,
                x: sampleData.slice(0, 10).reverse(),
                text: otuLabels.slice(0,10).reverse(),
                type: "bar",
                orientation: "h"
            }
        ];

        var barLayout = {
            title: 'Top 10 UTOs Found',
            margin: {t:30, l:150}
        };

        Plotly.newPlot('bar',trace1, barLayout)
        
    });
};

function init() {
    // Grab a reference to the dropdown select element
    var selection = d3.select("#selDataset");
    // Use the list of sample names to populate the select options
    d3.json("samples.json").then((data) => {
        var dropItems = data.names;
        
        console.log(dropItems);
        dropItems.forEach((item) => {
        selection.append('option').text(item).property("value", item);
        });

    // Use the first sample from the list to build the initial plots
    var firstSample = dropItems[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
    });
};

function optionChanged(newSample) {
    // Fetch new data each time a new sample is selected
    buildCharts(newSample);
    buildMetadata(newSample);
};

init();