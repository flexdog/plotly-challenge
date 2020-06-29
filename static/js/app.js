function getPlots(id) {
    console.log(`getPlots ID: ${id}`);
        
    //Read samples.json
        d3.json("samples.json").then((sData) =>{
           
            idArray = sData.names
            console.log(`Name Array: ${idArray}`);
            
            var index2s = id.toString();
            console.log(`Index of String ID: ${index2s}`);

            var index;
            index = idArray.indexOf(index2s);
            
            console.log(`Search Index: ${index}`);

            var ids = sData.samples[index].otu_ids;
            console.log(`OTU IDs: ${ids}`);
            var sampleValues =  sData.samples[index].sample_values.slice(0,10).reverse();
            console.log(`Top 10 Sample Values: ${sampleValues}`)
            var labels =  sData.samples[index].otu_labels.slice(0,10);
            console.log (`Top 10 OTU Labels: ${labels}`)

            var OTU_top = ( sData.samples[index].otu_ids.slice(0, 10)).reverse();

            var OTU_id = OTU_top.map(d => "OTU " + d);
            console.log(`OTU IDS: ${OTU_id}`)

            //var labels =  sData.samples[0].otu_labels.slice(0,10);
            //console.log(`Top 10 OTU_labels: ${labels}`)
            var trace = {
                x: sampleValues,
                y: OTU_id,
                text: labels,
                marker: {
                color: 'blue'},
                type:"bar",
                orientation: "h",
            };

            var data = [trace];

            var layout = {
                title: "Top 10 OTU",
                yaxis:{
                    tickmode:"linear",
                },
                margin: {
                    l: 100,
                    r: 100,
                    t: 100,
                    b: 30
                }
            };


            Plotly.newPlot("bar", data, layout);

            var trace1 = {
                x: sData.samples[index].otu_ids,
                y: sData.samples[index].sample_values,
                mode: "markers",
                marker: {
                    size: sData.samples[index].sample_values,
                    color: sData.samples[index].otu_ids
                },
                text:  sData.samples[index].otu_labels
    
            };


            var layout_2 = {
                xaxis:{title: "OTU ID"},
                height: 600,
                width: 1000
            };

            var data1 = [trace1];

            Plotly.newPlot("bubble", data1, layout_2);
        });
    };  
    // function to get the necessary data
    function getDemoInfo(id) {
    // read the json file to get data
        d3.json("samples.json").then((data)=> {
            var metadata = data.metadata;
            console.log(`getDemoInfo Metadata: ${metadata}`);
    
            var result = metadata.filter(meta => meta.id.toString() === id)[0];
            console.log(`getDemoInfo Result: ${result}`)
            var demographicInfo = d3.select("#sample-metadata");
            
            demographicInfo.html("");
    
            Object.entries(result).forEach((key) => {   
                demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
            });
        });
    };
    function optionChanged(id) {
        getPlots(id);
        getDemoInfo(id);
    }
    
    // function for the initial data rendering
    function init() {
        var dropdown = d3.select("#selDataset");
    
        d3.json("samples.json").then((data)=> {
        console.log(`Main Data: ${data}`)
    
        data.names.forEach(function(name) {
        dropdown.append("option").text(name).property("value");
        });
    
        getPlots(data.names[0]);
        getDemoInfo(data.names[0]);
        });
    }
    
    init();