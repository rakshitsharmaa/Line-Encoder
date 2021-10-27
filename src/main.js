let input_string_arr = {};    //input charecter array
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

function updated_string(s) {
  let s2 = [];
  s2.push('#');
  for (let i = 0; i < s.length; i++) {
    s2.push(s[i]);
    s2.push('#');
  }
  console.log('s2 ', s2);
  console.log('s2 ', s2.length);
  return s2;
}

function longest_palindromic_substring(s) {

  // Brute Force Algorithm
  // 1.) find out all the substring of a given substring     //O(n^2)
  // 2.) for each substring check if the substring is palindrome or not   //O(n)
  // 3.) calculte the maximum length of a substring among the substrings that are palindrome i.e our longest palindromic substring
  // 4.) Time Complexity = O(N^3)

  //Saving values in algorithms is usually applying dynamic programming

  //Dynamic Programming Solution
  //1.)  bool dp[L][R] => here dp state represents that substring starting at index L & ending at index R is palindrome or NOT having length (R-L+1)
  //2.)  Recurrance Relation => dp[L][R]=(dp[L+1][R-1] && S[L]==S[R])?true:false
  //3.)  Maintain a variable for max_length (LPS) which will store the LPS length from the dp states that having true boolean value
  //4.)  Time Complexity = O(N^2)

  //Manacher algorithm 
  //Time Complexity = O(N)
  let s2 = [];
  s2 = updated_string(s);
  let m = s2.length;     //m= 2*n+1
  let LPS = new Array(m);
  for (let i = 0; i < m; i++) {
    LPS[i] = 0;
  }
  //Here LPS[i] reprsents max  length of the longest palindromic substring centered at index i.
  let cx = 0;   // cx is the index of the center of the palindromic substring
  let r = 0;
  for (let i = 1; i < m; i++) {
    let mirror = cx - (i - cx);
    if (i < r)
      LPS[i] = Math.min(LPS[mirror], r - i);

    while (s2[i + LPS[i] + 1] == s2[i - 1 - LPS[i]]) {
      LPS[i] = LPS[i] + 1;
    }
    if (i + LPS[i] > r) {     //this will execute always after updation of LPS[i] form while loop
      cx = i;
      r = i + LPS[i];
    }
  }
  //Iterating over LPS[] array to find max length of palindromic string & its center
  let max_length = 0;
  let index = 0;
  for (let i = 1; i < m; i++) {
    if (LPS[i] > max_length) {
      max_length = LPS[i];
      index = i;
    }
  }
  let first_index = index - max_length + 1;
  let actual_index = (first_index - 1) / 2;
  let lps = [];
  for (let i = actual_index; i < (actual_index + max_length); i++)
    lps.push(s[i]);
  return lps;
}

function nrziencoder(arr) {
  let encode = [];
  if (arr[0] == 1) {
    encode[0] = 1;
  }
  else {
    encode[0] = -1;
  }
  let currBit = encode[0];
  for (let i = 1; i <= arr.length; i++) {
    if (arr[i] == 0) {
      encode[i] = currBit
    }
    else {
      if (currBit == -1) {
        currBit = 1;
      }
      else {
        currBit = -1;
      }
      encode[i] = currBit;
    }
  }
  return encode;
}


function nrzLencoder(arr) {
  let encode = [];
  for (let i = 0; i <= arr.length; i++) {
    if (arr[i] == 0) {
      encode[i] = -1
    }
    else {
      encode[i] = 1;
    }
  }
  return encode;
}

function rzencoder(arr) {
  let encode = [];
  let index = 0;
  for (let i = 0; i <= arr.length; i++) {
    if (arr[i] == 0) {
      encode[index++] = -1;
      encode[index++] = 0;
    }
    else {
      encode[index++] = 1;
      encode[index++] = 0;
    }
  }
  return encode;
}


//NRZL Canvas
function nrzLcanvas(dataArray, labelArray) {
  var ctx = $('#NRZLC');
  const data = {
    labels: labelArray,
    datasets: [{
      label: 'NRZL Encoding',
      data: dataArray,
      fill: false,
      stepped: true,
      borderWidth: 2,
      borderColor: 'rgb(182, 145, 78)',
      backgroundColor: 'cyan',
      cubicInterpolationMode: 'monotone'
    }]
  };
  const options = {
    aspectRatio: 4,
    responsive: true,
    interaction: {
      intersect: false,
      axis: 'x'
    },
    scales: {
      yAxes: {
        ticks: {
          max: 2,
          maxTicksLimit: 12,
          stepSize: 1,
          fontSize: 90,
          fontWeight: 600
        },
        gridLines: {
          zeroLineColor: '#ffcc33',
          display: false,
          color: "#FFFFFF"
        },

      },
      xAxes: {

        gridLines: {
          zeroLineColor: '#ffcc33',
          display: false,
          color: "#FFFFFF"
        },
        fontSize: 90
      },
    },

    plugins: {
      title: {
        display: true,

      }
    }
  }
  var myChart = new Chart(ctx, {
    type: "line",
    data: data,
    options: options
  });
}

function manchestercncoder(arr) {
  let encode = [];
  let index = 0;
  for (let i = 0; i <= arr.length; i++) {
    if (arr[i] == 0) {
      encode[index++] = -1;
      encode[index++] = 1;
    }
    else {
      encode[index++] = 1;
      encode[index++] = -1;
    }
  }
  return encode;
}
function diffmanchestercncoder(arr) {
  let encode = [];
  let index = 0;
  for (let i = 0; i <= arr.length; i++) {
    if (arr[i] == 0) {
      encode[index++] = -1;
      encode[index++] = 1;
    }
    else {
      encode[index++] = 1;
      encode[index++] = -1;
    }
  }
  return encode;
}
function diffmanchestercanvas(dataArray, labelArray) {
  var ctx = $('#NRZIC');
  const data = {
    labels: labelArray,
    datasets: [{
      label: 'NRZI encoding',
      data: dataArray,
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0
    }]
  };

  var myChart = new Chart(ctx, {
    type: "line",
    data: data,
  });
}


//UNINRZ Canvas
function uninrzcanvas(dataArray) {
  var ctx = $('#UniNRZC');

  const data = {
    labels: dataArray,
    datasets: [{

      label: 'UNINRZ Encoding',
      data: dataArray,
      fill: false,
      stepped: true,
      borderWidth: 2,
      borderColor: 'rgb(182, 145, 78)',
      backgroundColor: 'cyan',
      cubicInterpolationMode: 'monotone'
    }]

  };
  const options = {
    aspectRatio: 4,
    responsive: true,
    interaction: {
      intersect: false,
      axis: 'x'
    },
    scales: {
      yAxes: {
        ticks: {
          max: 2,
          maxTicksLimit: 12,
          stepSize: 1,
          fontSize: 90,
          fontWeight: 600
        },
        gridLines: {
          zeroLineColor: '#ffcc33',
          display: false,
          color: "#FFFFFF"
        },

      },
      xAxes: {

        gridLines: {
          zeroLineColor: '#ffcc33',
          display: false,
          color: "#FFFFFF"
        },
        fontSize: 90
      },
    },

    plugins: {
      title: {
        display: true,

      }
    }
  }
  var myChart = new Chart(ctx, {
    type: "line",
    data: data,
    options: options
  });
}
function nrzicanvas(dataArray, labelArray) {
  var ctx = $('#NRZIC');
  const data = {
    labels: labelArray,
    datasets: [{
      label: 'NRZI encoding',
      data: dataArray,
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  };

  var myChart = new Chart(ctx, {
    type: "line",
    data: data,
  });
}


function rzcanvas(dataArray, labelArray) {
  var ctx = $('#RZC');
  const data = {
    labels: labelArray,
    datasets: [{
      label: 'RZ encoding',
      data: dataArray,
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  };

  var myChart = new Chart(ctx, {
    type: "line",
    data: data,
  });
}


//on click event for Generate button
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
  var input = $('#digital-data').val();
  input_string_arr = input.split("");

  if (encoding_technique == "NRZ-UniNRZ") {
    $('#UNINRZ').removeClass("uninrz");
    $('#UNINRZ').addClass("NRZ-UniNRZ");
    let LPS = [];
    LPS = longest_palindromic_substring(input_string_arr);
    console.log(LPS);
    LPS = LPS.join('');
    console.log(LPS);
    $('#LPSuni').text(LPS);
    //for Last bit siganal push last bit again
    input_string_arr.push(input_string_arr[input_string_arr.length - 1]);
    //uniNrz()          
    //no encoding directly passing to cnavas generator function  
    uninrzcanvas(input_string_arr);
  }

  else if (encoding_technique == "NRZ-L") {
    $('#NRZL').removeClass("nrzl");
    $('#NRZL').addClass("NRZL");
    let LPS = [];
    LPS = longest_palindromic_substring(input_string_arr);
    LPS = LPS.join('');
    console.log(LPS);
    $('#LPSnrzl').text(LPS);
    //NRZL()
    input_string_arr.push(input_string_arr[input_string_arr.length - 1]);
    let arr = [];
    arr = nrzLencoder(input_string_arr);
    nrzLcanvas(arr, input_string_arr);

  }
  else if (encoding_technique == "NRZ-I") {
    $('#NRZL').removeClass("nrzi");
    $('#NRZI').addClass("NRZI");
    let LPS = [];
    LPS = longest_palindromic_substring(input_string_arr);
    LPS = LPS.join('');
    console.log(LPS);
    $('#LPSnrzi').text(LPS);

    //NRZI()
    let arr = [];
    arr = nrzIencoder(input_string_arr);
    nrzIcanvas(arr, input_string_arr);
  }
  else if (encoding_technique == "RZ") {
    $('#RZ').removeClass("rz");
    $('#RZ').addClass("RZ");
    let LPS = [];
    LPS = longest_palindromic_substring(input_string_arr);
    LPS = LPS.join('');
    console.log(LPS);
    $('#LPSrz').text(LPS);
    //rz()
    let arr = [];
    arr = rzencoder(input_string_arr);
    rzcanvas(arr, input_string_arr);
  }
  else if (encoding_technique == "Mench") {
    $('#MENCH').removeClass("mench");
    $('#MENCH').addClass("MENCH");
    let LPS = [];
    LPS = longest_palindromic_substring(input_string_arr);
    LPS = LPS.join('');
    console.log(LPS);
    $('#LPSmench').text(LPS);
    let arr = [];
    arr = manchestercncoder(input_string_arr);
    manchestercanvas(arr, input_string_arr);
  }
  else if (encoding_technique == "Diff-Mench") {
    $('#DIFFMENCH').removeClass("diffmench");
    $('#DIFFMENCH').addClass("DIFFMENCH");
    let LPS = [];
    LPS = longest_palindromic_substring(input_string_arr);
    LPS = LPS.join('');
    console.log(LPS);
    $('#LPSdiffmench').text(LPS);
    //Diff Mench()
  }
  else if (encoding_technique == "AMI") {
    $('#AMI').removeClass("ami");
    $('#RZ').addClass("AMI");
    let LPS = [];
    LPS = longest_palindromic_substring(input_string_arr);
    LPS = LPS.join('');
    console.log(LPS);
    $('#LPSami').text(LPS);
    //AMI()
  }
  else if (encoding_technique == "B8ZS") {
    $('#B8ZS').removeClass("b8zs");
    $('#B8ZS').addClass("b8zs");
    let LPS = [];
    LPS = longest_palindromic_substring(input_string_arr);
    LPS = LPS.join('');
    console.log(LPS);
    $('#LPSb8zs').text(LPS);
    //B8ZS()
  }
  else if (encoding_technique == "HDB3") {
    $('#HDB3').removeClass("hdb3");
    $('#HDB3').addClass("HDB3");
    let LPS = [];
    LPS = longest_palindromic_substring(input_string_arr);
    LPS = LPS.join('');
    console.log(LPS);
    $('#LPShdb3').text(LPS);
    //HDB3()
  }
});


$("#conszeros").click(function (event) {
  event.preventDefault();
  $('#data-container2').remove();
  var nums = $("#numzr").val();
  console.log(nums);
  let Arr = [];   //temp array
  Arr = fixedSubSequence(nums);
  console.log(Arr);
  if (encoding_technique == "NRZ-UniNRZ") {
    $('#UNINRZ').removeClass("uninrz");
    $('#UNINRZ').addClass("NRZ-UniNRZ");
    let LPS = [];
    LPS = longest_palindromic_substring(Arr);
    console.log(LPS);
    LPS = LPS.join('');
    console.log(LPS);
    $('#LPSuni').text(LPS);
    //uniNrz()      
  }
  else if (encoding_technique == "NRZ-L") {
    $('#NRZL').removeClass("nrzl");
    $('#NRZL').addClass("NRZL");
    let LPS = [];
    LPS = longest_palindromic_substring(Arr);
    LPS = LPS.join('');
    console.log(LPS);
    $('#LPSnrzl').text(LPS);
    //NRZL()
    let arr = [];
    arr = nrzLencoder(input_string_arr);
    nrzLCanvas(arr, input_string_arr);

  }
  else if (encoding_technique == "NRZ-I") {
    $('#NRZI').removeClass("nrzi");
    $('#NRZI').addClass("NRZI");
    let LPS = [];
    LPS = longest_palindromic_substring(Arr);
    LPS = LPS.join('');
    console.log(LPS);
    $('#LPSnrzi').text(LPS);
    let arr = [];
    arr = nrzIencoder(input_string_arr);
    nrzICanvas(arr, input_string_arr);
    //NRZI()
  }
  else if (encoding_technique == "RZ") {
    $('#RZ').removeClass("rz");
    $('#RZ').addClass("RZ");
    let LPS = [];
    LPS = longest_palindromic_substring(Arr);
    LPS = LPS.join('');
    console.log(LPS);
    $('#LPSnrzl').text(LPS);
    let arr = [];
    arr = rzencoder(input_string_arr);
    rzCanvas(arr, input_string_arr);
    //RZ()
  }
  else if (encoding_technique == "Mench") {
    $('#MENCH').removeClass("mench");
    $('#MENCH').addClass("MENCH");
    let LPS = [];
    LPS = longest_palindromic_substring(Arr);
    LPS = LPS.join('');
    console.log(LPS);
    $('#LPSmech').text(LPS);
    let arr = [];
    arr = manchestercncoder(input_string_arr);
    manchestercanvas(arr, input_string_arr);
  }
  else if (encoding_technique == "Diff-Mench") {
    $('#DIFFMENCH').removeClass("diffmench");
    $('#DIFFMENCH').addClass("DIFFMENCH");
    let LPS = [];
    LPS = longest_palindromic_substring(Arr);
    LPS = LPS.join('');
    console.log(LPS);
    $('#LPSdiffmech').text(LPS);
    //Diff Mench()
  }
  else if (encoding_technique == "AMI") {
    $('#AMI').removeClass("ami");
    $('#RZ').addClass("AMI");
    let LPS = [];
    LPS = longest_palindromic_substring(Arr);
    LPS = LPS.join('');
    console.log(LPS);
    $('#LPSami').text(LPS);
    //AMI()
  }
  else if (encoding_technique == "B8ZS") {
    $('#B8ZS').removeClass("b8zs");
    $('#B8ZS').addClass("b8zs");
    let LPS = [];
    LPS = longest_palindromic_substring(Arr);
    LPS = LPS.join('');
    console.log(LPS);
    $('#LPSdiffmech').text(LPS);
    //B8ZS()
  }
  else if (encoding_technique == "HDB3") {
    $('#HDB3').removeClass("hdb3");
    $('#HDB3').addClass("HDB3");
    let LPS = [];
    LPS = longest_palindromic_substring(input_string_arr);
    LPS = LPS.join('');
    console.log(LPS);
    $('#LPSHDB3').text(LPS);
    //Diff Mench()
  }
})

