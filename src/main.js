let array = {};
//Sub Sequence Generation
function fixedSubSequence(nums) {
    let arr = [];
    for (let i = 0; i <= 4; i++) {
        arr.push((Math.random) * 2);
    }

    //fixed sub-sequences
    for (let i = 5; i < (5 + nums); i++) {
        arr.push(0);
    }
    for (let i = (5 + nums); i <= 14; i++) {
        arr.push((Math.random) * 2);
    }
}



$("#init").click(function (event) {

    const encoding_technique = $("#list-encoding").val();
    const generation_type = $("#list-type").val();

    console.log("enco techq", encoding_technique);
    console.log("gen techq ", generation_type);

    $("#bottom-panel").remove();
    $("#dc").removeClass("data-container1");
    $("#dc").addClass("data-container2");

    if (generation_type == "completely-random") {
        $("#numzeros").remove();
    }
    else if (generation_type == "sub-sequence") {
        $("#binary-data").remove();
    }

    //Encoding Techniques
    if (encoding_technique == "NRZ-UniNRZ") {
        $("#txt").text("NRZ (NON - RETRUN - TO - ZERO UNIPOLAR) ");
    }
    else if (encoding_technique == "NRZ-L") {
        $("#txt").text("NRZ-L (NON-RETURN-TO-ZERO-LEVEL) ");
    }
    else if (encoding_technique == "NRZ-I") {
        $("#txt").text("NRZ-I (NON-RETURN-TO-ZERO-INVERT) ");
    }
    else if (encoding_technique == "RZ") {
        $("#txt").text("RZ (RETURN-TO-ZERO)");
    }
    else if (encoding_technique == "Mench") {
        $("#txt").text("MANCHESTER");
    }
    else if (encoding_technique == "Diff-Mench") {
        $("#txt").text(" DIFFERENTAIL MANCHESTER  ");
    }
    else if (encoding_technique == "AMI") {
        $("#txt").text("ALTERNATE MARK INVERSION (AMI)");
    }
    else if (encoding_technique == "B8ZS") {
        $("#txt").text("BIPLOAR WITH 8-ZERO SUBSTITUTION (B8ZS)");
    }
    else if (encoding_technique == "HDB3") {
        $("#txt").text("HIGH-DENSITY-BIPOLAR 3-ZERO (HDB3)");
    }



});

$("#conszeros").submit(function () {
    var nums = $("#numzr").val();
    console.log(nums);
    fixedSubSequence(nums);
})
$("#digital-data").submit(function () {
    var $inputs = $('digital-data');
    $inputs.each(function () {
        array.push($(this).val());
    });
    console.log(array);
});
