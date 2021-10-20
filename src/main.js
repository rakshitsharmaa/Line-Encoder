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
    input_string_arr = input.split("");
    //These function will do encoding & print    longest palindromic subsequence(lps)  & signal show  
    if (encoding_technique == "NRZ-UniNRZ") {
        let LPS = [];
        LPS = longest_palindromic_substring(input_string_arr);
        console.log(LPS);
        LPS = LPS.join('');
        console.log(LPS);
        $('#LPS').text(LPS);
        //uniNrz()                    
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

