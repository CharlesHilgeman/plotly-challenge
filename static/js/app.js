var data;
var selector = d3.select('#selDataset');
var sample_names = [];

const file = 'samples.json';

function init() {  
    d3.json(file).then((json_data) => {  
         data = json_data;
         console.log("init():", data);
         sample_names = data.names;

         sample_names.forEach((sample) => { 
             selector
             .append("option")        
             .text(sample)        
             .property("value", sample);   
    });

    var sample_id = sample_names[0];
    buildCharts(sample_id);
    buildDemographicInfo(sample_id);

    });
};

