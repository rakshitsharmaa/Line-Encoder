let array = {};
let encoding_technique;
let generation_type;
//Sub Sequence Generation
function fixedSubSequence(nums) {
    let arr = [];
    nums = parseInt(nums);
    for (let i = 0; i <= 4; i++) {
        arr.push(Math.floor(Math.random() * Math.floor(2)));
    }
    console.log('arr.sz', arr.length);

    //fixed sub-sequences
    for (let i = 5; i < (5 + nums); i++) {
        arr.push(0);
    }
    console.log(arr.length);
    for (let i = (5 + nums); i <= 14; i++) {
        arr.push(Math.floor(Math.random() * Math.floor(2)));
    }
    console.log(arr.length);
    return arr;
}

//on click event Generate button
$("#init").click(function (event) {

    encoding_technique = $("#list-encoding").val();
    generation_type = $("#list-type").val();

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



$("#digitaldata").click(function (event) {
    //method prevent submitting of a form
    event.preventDefault();
    $('#data-container2').remove();
    $('#UNINRZ').removeClass("uninrz");
    $('#UNINRZ').addClass("NRZ-UniNRZ");
    var input = $('#digital-data').val();
    array = input.split("");
    console.log('input= ', input);
    console.log(array);
    if (encoding_technique == "NRZ-UniNRZ") {

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


$("#conszeros").click(function (event) {
    event.preventDefault();
    $('#data-container2').remove();
    $('#UNINRZ').removeClass("uninrz");
    $('#UNINRZ').addClass("NRZ-UniNRZ");
    var nums = $("#numzr").val();
    console.log(nums);
    let Arr = [];   //temp array
    Arr = fixedSubSequence(nums);
    console.log(Arr);
    if (encoding_technique == "NRZ-UniNRZ") {

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
})

