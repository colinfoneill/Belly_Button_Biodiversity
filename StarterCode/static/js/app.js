// pull in the json data from the data folder and create traces
d3.json("../../data/samples.json").then((data) => {
    
    // add data to the dropdown menu
    var dropDown = d3.select("#selDataset");
    data.names.forEach(function (value) {
        var option = dropDown.append("option");
        option.attr("value", value);
        option.text(value);
    });
    
    // plot the 940 subject ID as a default plot when webpage loads
    console.log(data.samples)
    data.samples.forEach(function(value) {
        
        
        
        if (value.id === "940") {

            var yAxis = value.otu_ids.map(y => "OTU ID:" + y);
            console.log(value.otu_labels[0])
            var traceD = {
                x: value.sample_values.slice(0,10).reverse(),
                y: yAxis.slice(0,10).reverse(),   
                type: "bar",
                orientation: "h",
                text: value.otu_labels.slice(0,10).reverse(),
               
        };

            plotD = [traceD];

            Plotly.newPlot("bar", plotD)

        // plot the default bubble chart on page
            var traceBD = {
                x: value.otu_ids.slice(0,10),
                y: value.sample_values.slice(0,10),
                mode: 'markers',
                marker: {
                color: value.otu_ids,
                size: value.sample_values.map(d=>(d/3)),
                
                },
                text: value.otu_labels.slice(0,10)
            };

            plotBD = [traceBD];

            Plotly.newPlot("bubble", plotBD);
        };
    });

    var demoTable = d3.select(".panel-body");
    
    data.metadata.forEach(function (value) {
        var num = value.id.toString()
        
        if (num === "940") {
            
            var p = demoTable.append("p");
            p.attr("value", value.id);
            p.text("ID:" + " " + value.id);

            var p = demoTable.append("p");
            p.attr("value", value.ethnicity);
            p.text("Ethnicity:" + " " + value.ethnicity);

            var p = demoTable.append("p");
            p.attr("value", value.gender);
            p.text("Gender:" + " " + value.gender);

            var p = demoTable.append("p");
            p.attr("value", value.age);
            p.text("Age:" + " " + value.age);

            var p = demoTable.append("p");
            p.attr("value", value.location);
            p.text("Location:" + " " + value.location);

            var p = demoTable.append("p");
            p.attr("value", value.bbtype);
            p.text("bbtype:" + " " + value.bbtype);

            var p = demoTable.append("p");
            p.attr("value", value.wfreq);
            p.text("wfreq:" + " " + value.wfreq);
        
        };
    
    });


    

    // select the drop down menu to call a function to chart the id selected
    d3.selectAll("#selDataset").on("change", optionChanged);


    function optionChanged() {

        // clear out the metadata box
        var panelBody = d3.select(".panel-body");

        panelBody.html("")
        
        //use D3 to select the drop down menu
        var dropDownMenu = d3.selectAll("#selDataset");

        // assign the value of the drop down menu selection to a variable
        var selection = dropDownMenu.property("value");


        // pull out the sampleValues for each subject using map and arrow functions
        
        
        data.samples.forEach(function(value) {

            
            
            if (value.id === selection) {

                var yAxis = value.otu_ids.map(y => "OTU ID:" + y);
                
                var trace1 = {
                    x: value.sample_values.slice(0,10).reverse(),
                    y: yAxis.slice(0,10).reverse(),
                    type: "bar", 
                    orientation: "h",
                    text: value.otu_labels.slice(0,10).reverse(),
                };
        
                plot = [trace1];

                Plotly.newPlot("bar", plot)
            };
        });
    
        // create bubble chart
        data.samples.forEach(function(value) {
            if (value.id === selection) {
                var traceB = {
                    x: value.otu_ids.slice(0,10),
                    y: value.sample_values.slice(0,10),
                    mode: 'markers',
                    marker: {
                      color: value.otu_ids,
                      size: value.sample_values.map(d=>(d/3))
                    },
                    text: value.otu_labels.slice(0,10)
                  };
        
                plotB = [traceB];

                Plotly.newPlot("bubble", plotB)

                console.log(value.otu_ids);
                console.log(value.sample_values);
            };
        });

        // populate the demographic info in the table upon change
        var demoTable = d3.select(".panel-body");

        data.metadata.forEach(function (value) {
            var num = value.id.toString()
            
            if (num === selection) {
                
                var p = demoTable.append("p");
                p.attr("value", value.id);
                p.text("ID:" + " " + value.id);

                var p = demoTable.append("p");
                p.attr("value", value.ethnicity);
                p.text("Ethnicity:" + " " + value.ethnicity);

                var p = demoTable.append("p");
                p.attr("value", value.gender);
                p.text("Gender:" + " " + value.gender);

                var p = demoTable.append("p");
                p.attr("value", value.age);
                p.text("Age:" + " " + value.age);

                var p = demoTable.append("p");
                p.attr("value", value.location);
                p.text("Location:" + " " + value.location);

                var p = demoTable.append("p");
                p.attr("value", value.bbtype);
                p.text("bbtype:" + " " + value.bbtype);

                var p = demoTable.append("p");
                p.attr("value", value.wfreq);
                p.text("wfreq:" + " " + value.wfreq);
            
            };
        
        });



        
        
    };

});