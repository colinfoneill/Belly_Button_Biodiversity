// pull in the json data from the data folder and create traces
d3.json("../../data/samples.json").then((data) => {
    
    // add data to the dropdown menu
    var dropDown = d3.select("#selDataset");
    data.names.forEach(function (value) {
        var option = dropDown.append("option");
        option.attr("value", value);
        option.text(value);
    });

    

    // select the drop down menu to call a function to chart the id selected
    d3.selectAll("#selDataset").on("change", optionChanged);


    function optionChanged() {
        
        //use D3 to select the drop down menu
        var dropDownMenu = d3.selectAll("#selDataset");

        // assign the value of the drop down menu selection to a variable
        var selection = dropDownMenu.property("value");


        // pull out the sampleValues for each subject using map and arrow functions
        data.samples.forEach(function(value) {
            if (value.id === selection) {
                var trace1 = {
                    x: value.sample_values.reverse(),
                    labels: value.otu_ids.reverse(),
                    type: "bar", 
                    orientation: "h"
                };
        
                plot = [trace1];

                Plotly.newPlot("bar", plot)
            };
        });
        // var otuIds = data.samples.map(id => id.otu_ids);

        //slice the sampleValues and otuIds arrays to the top ten
        // var sampleValues = sampleValues[0];
        // var otuIds = otuIds[0];

        //sort sample values in descending order and slice to top 10
        // var sortedSlicedSampleValues = sampleValues.map(result => result.slice(0,10));

        // var sortedSlicedOtuIds = otuIds.map(result => result.slice(0,10));

        // do a .reverse on the sliced data arrays



        // // create a trace which plots a horizontal bar of otu id's and the sample values
        // var trace1 = {
        //     x: sortedSlicedSampleValues[0],
        //     labels: sortedSlicedOtuIds[0],
        //     type: "bar", 
        //     orientation: "h"
        // };

        // data = [trace1];


        // console.log(sortedSlicedSampleValues);
        // console.log(sortedSlicedOtuIds);


        
        
    };

});