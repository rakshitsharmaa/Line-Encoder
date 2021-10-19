$("#dc").remove();
$("#init").click(function (event) {

    const encoding_technique = $("#list-encoding").val();
    const generation_type = $("#list-type").val();

    console.log("enco techq", encoding_technique);
    console.log("gen techq ", generation_type);

    //Encoding Techniques
    if (encoding_technique == "NRZ-UniNRZ") {


        if (generation_type == "completely-random") {
            $("#bottom-panel").remove();
            // $("#numzeros").remove();
            $("#dc").removeClass("data-container1");
            $("dc").addClass("data-container2");

        }
        else if (generation_type == "sub-sequence") {

        }
    }
    else if (encoding_technique == "NRZ-L") {

    }
    else if (encoding_technique == "NRZ-L") {

    }
    else if (encoding_technique == "NRZ-I") {

    }
    else if (encoding_technique == "RZ") {

    }
    else if (encoding_technique == "Mench") {

    }
    else if (encoding_technique == "Diff-Mench") {

    }
    else if (encoding_technique == "AMI") {

    }
    else if (encoding_technique == "B8ZS") {

    }
    else if (encoding_technique == "HDB3") {

    }



});