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


function randomBinaryArrayGen(){
    let arr = [];
    for(let i=1;i<=15;i++){
      arr.push(Math.floor((Math.random() * 1.99)));
    }
    return arr;
  }
  function consZeroPosGen() {
    start = (Math.floor(Math.random() * 5.99));
    return start;
  }


  function nrzIencoder(arr){
    let nrzI = [];
    if(arr[0]==1){
      nrzI[0] = 1;
    }else{
      nrzI[0] = -1;
    }
    let currState = nrzI[0];
    for(let i=1;i<=arr.length;i++){
      if(arr[i]==0){
        nrzI[i] = currState;
      }else{
        if(currState==-1){
          currState = 1;
        }else{
          currState = -1;
        }
        nrzI[i] = currState;
      }
    }
    return nrzI; 
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

        function nrzLencoder(arr){
            let nrzL = [];
            for(let i=0;i<=arr.length;i++){
              if(arr[i]==0){
                nrzL[i] = -1
              }else{
                nrzL[i] = 1;
              }
            }
            return nrzL; 
          }
          if(generation_type="compleately-ramdom"){
            function nrzLRandomGen() {
                let arr = randomBinaryArrayGen();
                let input = document.getElementById("nrzLInputCons0");
                let start = consZeroPosGen();
                let cons0 = Number(input.value);
                for (let i = start; i < cons0 + start; i++) {
                  arr[i] = 0;
                }
                let encodedSignal = nrzLencoder(arr);
                nrzLCanvasGenerator(encodedSignal,arr);
              }
          }else{
            function nrzLCustomGen(){
                let input = document.getElementById("nrzLInputDs");
                let string = input.value;
                if (validate(string)) {
                  let arr = parserInt(string);
                  let encodedSignal = nrzLencoder(arr);
                  nrzLCanvasGenerator(encodedSignal, arr);
                } else {
                  alert("Please Enter a valid digital signal");
                }
              }
          }
         
          function nrzLCanvasGenerator(encodedSignal,arr){



          }
          
          
         
    }
    else if (encoding_technique == "NRZ-I") {
        if(generation_type=="completely-random"){
            function nrzIRandomGen() {
                let arr = randomBinaryArrayGen();
                let input = document.getElementById("nrzIInputCons0");
                let start = consZeroPosGen();
                let cons0 = Number(input.value);
                for (let i = start; i < cons0 + start; i++) {
                  arr[i] = 0;
                }
                console.log(arr);
                let encodedSignal = nrzIencoder(arr);
                nrzICanvasGenerator(encodedSignal,arr);
              }
        }else{
            function nrzICustomGen(){
                let input = document.getElementById("nrzIInputDs");
                let string = input.value;
                if (validate(string)) {
                  let arr = parserInt(string);
                  console.log(arr);
                  let encodedSignal = nrzIencoder(arr);
                  nrzICanvasGenerator(encodedSignal, arr);
                } else {
                  alert("Please Enter a valid digital signal");
                }
              }
        }
          
          function nrzICanvasGenerator(dataArray,labelArray) {
            
          }
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

