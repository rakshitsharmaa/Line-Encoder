let input_string_arr = {};
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

//NRZL Encoder
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
//NRZI Encoder
function nrzIencoder(arr) {
  let encode = [];
  if (arr[0] == 1) {
    encode[0] = 1;
  }
  else {
    encode[0] = -1;
  }
  let currBit = encode[0];
  for (let i = 1; i <= arr.length; i++) {
    //No Transition at 0
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
// RZ Encoder
function rzencoder(arr) {
  let encode = [];
  let index = 0;
  for (let i = 0; i <= arr.length; i++) {
    //Revert Z
    if (arr[i] == 0) {
      encode[index++] = -1;
      encode[index++] = 0;
    }
    //Straight Z
    else {
      encode[index++] = 1;
      encode[index++] = 0;
    }
  }
  return encode;
}

//Manchester Encoder
function manchesterencoder(arr) {
  let encode = [];
  let index = 0;
  for (let i = 0; i < arr.length; i++) {
    //Straight Z
    if (arr[i] == 1) {
      encode[index++] = 1;
      encode[index++] = -1;
    } //Revert Z or S
    else if (arr[i] == 0) {
      encode[index++] = -1;
      encode[index++] = 1;
    }
  }
  return encode;
}

//Diff Manchester Encoder
function diffmanchesterencoder(arr) {
  //  Reverse NRZ-I + RZ
  let encode = [];
  let index = 0;
  let currBit;
  if (arr[0] == 0) {
    encode[index++] = -1;
    encode[index++] = 1;
    currBit = 1;
  }
  else if (arr[0] == 1) {
    encode[index++] = 1;
    encode[index++] = -1;
    currBit = -1;
  }
  for (let i = 1; i < arr.length; i++) {
    //Transition
    if (arr[i] == 0) {
      if (currBit == 1) {
        encode[index++] = -1;
        encode[index++] = 1;
      }
      else if (currBit == -1) {
        encode[index++] = 1;
        encode[index++] = -1;
      }
    }
    //NO Transition
    else if (arr[i] == 1) {
      if (currBit == 1) {
        encode[index++] = 1;
        encode[index++] = -1;
      }
      else if (currBit == -1) {
        encode[index++] = -1;
        encode[index++] = 1;
      }
      currBit = currBit * -1;
    }
  }
  return encode;
}

//AMI Encoder
function amiencoder(arr) {
  let encode = [];
  let currBit = -1;
  //+A || -A  =)RZ
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == 1) {
      currBit = currBit * -1;
      encode.push(currBit);
    }
    else if (arr[i] == 0) {
      encode.push(arr[i]);
    }
  }
  return encode;
}

//B8ZS Encoder
function b8zsencoder(arr) {
  let len = arr.length;
  let encode = new Array(len);
  let count = 0;
  let currBit = -1;
  //Replace 8 consecutive zeros by 000VB0VB
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == 0) {
      count++;
      if (count == 8) {
        //V voilate AMI NO inversion
        encode[i - 4] = currBit;
        currBit = currBit * -1;
        encode[i - 3] = currBit;
        encode[i - 1] = currBit;
        currBit = currBit * -1;
        encode[i] = currBit;
        count = 0;
      }
      else {
        encode[i] = 0;
      }
    }
    else if (arr[i] == 1) {
      count = 0;
      currBit = currBit * -1;
      encode[i] = currBit;
    }
  }
  return encode;
}

//HDB3 Encoder
function hdb3encoder(arr) {
  let len = arr.length;
  let encode = new Array(len);
  let currBit = -1;
  let count = 0;
  //Replace 4 consecutive zeros by B00V or 000V
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == 0) {
      count++;
      if (count == 4) {
        currBit = currBit * -1;
        encode[i - 3] = currBit;
        //voilate AMI
        encode[i] = currBit;
        count = 0;
      }
      else {
        encode[i] = 0;
      }
    }
    else if (arr[i] == 1) {
      count = 0;
      currBit = currBit * -1;
      encode[i] = currBit;
    }
  }
  return encode;
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
    responsive: true,
    scales: {
      y: {
        ticks: {
          color: "green",
          font: {
            weight: 800,
          },
          max: 2,
          maxTicksLimit: 12,
          stepSize: 1,
          fontSize: 90,
          fontWeight: 600
        },
        grid: {
          color: 'rgba(99, 36, 180, 0.801)',
          borderColor: 'cyan'
        },
        title: {
          display: true,
          text: "voltage",
          align: "center",
          color: "green",
          font: {
            weight: 700,
          },
        },

      },
      x: {
        ticks: {
          color: "green",
          font: {
            weight: 800,
          },
        },
        grid: {
          color: 'rgba(99, 36, 180, 0.801)',
          borderColor: 'cyan'
        },
        title: {
          display: true,
          text: "data elements",
          align: "center",
          color: "green",
          font: {
            weight: 700,
          },
        },
      },
    },

    plugins: {
      legend: {
        labels: {
          color: "rgb(182, 145, 78)",
          font: {
            weight: 800
          }
        }
      },
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
      y: {
        ticks: {
          color: "green",
          font: {
            weight: 800,
          },
          max: 2,
          maxTicksLimit: 12,
          stepSize: 1,
          fontSize: 90,
          fontWeight: 600
        },
        grid: {
          color: 'rgba(99, 36, 180, 0.801)',
          borderColor: 'cyan'
        },
        title: {
          display: true,
          text: "voltage",
          align: "center",
          color: "green",
          font: {
            weight: 700,
          },
        },

      },
      x: {
        ticks: {
          color: "green",
          font: {
            weight: 800,
          },
        },
        grid: {
          color: 'rgba(99, 36, 180, 0.801)',
          borderColor: 'cyan'
        },
        title: {
          display: true,
          text: "data elements",
          align: "center",
          color: "green",
          font: {
            weight: 700,
          },
        },
      },
    },

    plugins: {
      legend: {
        labels: {
          color: "rgb(182, 145, 78)",
          font: {
            weight: 800
          }
        }
      },
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

//NRZI Canvas
function nrzIcanvas(dataArray, labelArray) {
  var ctx = $('#NRZIC');
  const data = {
    labels: labelArray,
    datasets: [{
      label: 'NRZI Encoding',
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
      y: {
        ticks: {
          color: "green",
          font: {
            weight: 800,
          },
          max: 2,
          maxTicksLimit: 12,
          stepSize: 1,
          fontSize: 90,
          fontWeight: 600
        },
        grid: {
          color: 'rgba(99, 36, 180, 0.801)',
          borderColor: 'cyan'
        },
        title: {
          display: true,
          text: "voltage",
          align: "center",
          color: "green",
          font: {
            weight: 700,
          },
        },

      },
      x: {
        ticks: {
          color: "green",
          font: {
            weight: 800,
          },
        },
        grid: {
          color: 'rgba(99, 36, 180, 0.801)',
          borderColor: 'cyan'
        },
        title: {
          display: true,
          text: "data elements",
          align: "center",
          color: "green",
          font: {
            weight: 700,
          },
        },
      },
    },

    plugins: {
      legend: {
        labels: {
          color: "rgb(182, 145, 78)",
          font: {
            weight: 800
          }
        }
      },
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

function UpdatedLabelArray(arr) {
  labelArray = [];
  let index = 0;
  let i = 0;
  while (index < arr.length) {
    if (i % 2 == 0) {
      labelArray.push(arr[index++]);
      i++;
    }
    else {
      labelArray.push('');
      i++;
    }
  }
  return labelArray;
}
// RZ Canvas
function rzcanvas(dataArray, labelArray) {
  var ctx = $('#RZC');
  labelArray = UpdatedLabelArray(labelArray);
  const data = {
    labels: labelArray,
    datasets: [{
      label: 'RZ Encoding',
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
      y: {
        ticks: {
          color: "green",
          font: {
            weight: 800,
          },
          max: 2,
          maxTicksLimit: 12,
          stepSize: 1,
          fontSize: 90,
          fontWeight: 600
        },
        grid: {
          color: 'rgba(99, 36, 180, 0.801)',
          borderColor: 'cyan'
        },
        title: {
          display: true,
          text: "voltage",
          align: "center",
          color: "green",
          font: {
            weight: 700,
          },
        },

      },
      x: {
        ticks: {
          color: "green",
          font: {
            weight: 800,
          },
        },
        grid: {
          color: 'rgba(99, 36, 180, 0.801)',
          borderColor: 'cyan'
        },
        title: {
          display: true,
          text: "data elements",
          align: "center",
          color: "green",
          font: {
            weight: 700,
          },
        },
      },
    },

    plugins: {
      legend: {
        labels: {
          color: "rgb(182, 145, 78)",
          font: {
            weight: 800
          }
        }
      },
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


// Manchester Canvas
function manchestercanvas(dataArray, labelArray) {
  var ctx = $('#MENCHC');
  labelArray = UpdatedLabelArray(labelArray);
  const data = {
    labels: labelArray,
    datasets: [{
      label: 'MANCHESTER Encoding',
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
      y: {
        ticks: {
          color: "green",
          font: {
            weight: 800,
          },
          max: 2,
          maxTicksLimit: 12,
          stepSize: 1,
          fontSize: 90,
          fontWeight: 600
        },
        grid: {
          color: 'rgba(99, 36, 180, 0.801)',
          borderColor: 'cyan'
        },
        title: {
          display: true,
          text: "voltage",
          align: "center",
          color: "green",
          font: {
            weight: 700,
          },
        },

      },
      x: {
        ticks: {
          color: "green",
          font: {
            weight: 800,
          },
        },
        grid: {
          color: 'rgba(99, 36, 180, 0.801)',
          borderColor: 'cyan'
        },
        title: {
          display: true,
          text: "data elements",
          align: "center",
          color: "green",
          font: {
            weight: 700,
          },
        },
      },
    },

    plugins: {
      legend: {
        labels: {
          color: "rgb(182, 145, 78)",
          font: {
            weight: 800
          }
        }
      },
      title: {
        display: true,
      }
    }
  }


  var myChart = new Chart(ctx, {
    type: "line",
    data: data,
    options: options,
  });
}

//Diff Manchester Canvas
function diffmanchestercanvas(dataArray, labelArray) {
  var ctx = $('#DIFFMENCHC');
  labelArray = UpdatedLabelArray(labelArray);
  const data = {
    labels: labelArray,
    datasets: [{
      label: 'Differential MANCHESTER Encoding',
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
      y: {
        ticks: {
          color: "green",
          font: {
            weight: 800,
          },
          max: 2,
          maxTicksLimit: 12,
          stepSize: 1,
          fontSize: 90,
          fontWeight: 600
        },
        grid: {
          color: 'rgba(99, 36, 180, 0.801)',
          borderColor: 'cyan'
        },
        title: {
          display: true,
          text: "voltage",
          align: "center",
          color: "green",
          font: {
            weight: 700,
          },
        },

      },
      x: {
        ticks: {
          color: "green",
          font: {
            weight: 800,
          },
        },
        grid: {
          color: 'rgba(99, 36, 180, 0.801)',
          borderColor: 'cyan'
        },
        title: {
          display: true,
          text: "data elements",
          align: "center",
          color: "green",
          font: {
            weight: 700,
          },
        },
      },
    },

    plugins: {
      legend: {
        labels: {
          color: "rgb(182, 145, 78)",
          font: {
            weight: 800
          }
        }
      },
      title: {
        display: true,
      }
    }
  }



  var myChart = new Chart(ctx, {
    type: "line",
    data: data,
    options: options,
  });
}

//AMI Canvas
function amicanvas(dataArray, labelArray) {
  var ctx = $('#AMIC');

  const data = {
    labels: labelArray,
    datasets: [{
      label: 'AMI Encoding',
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
      y: {
        ticks: {
          color: "green",
          font: {
            weight: 800,
          },
          max: 2,
          maxTicksLimit: 12,
          stepSize: 1,
          fontSize: 90,
          fontWeight: 600
        },
        grid: {
          color: 'rgba(99, 36, 180, 0.801)',
          borderColor: 'cyan'
        },
        title: {
          display: true,
          text: "voltage",
          align: "center",
          color: "green",
          font: {
            weight: 700,
          },
        },

      },
      x: {
        ticks: {
          color: "green",
          font: {
            weight: 800,
          },
        },
        grid: {
          color: 'rgba(99, 36, 180, 0.801)',
          borderColor: 'cyan'
        },
        title: {
          display: true,
          text: "data elements",
          align: "center",
          color: "green",
          font: {
            weight: 700,
          },
        },
      },
    },

    plugins: {
      legend: {
        labels: {
          color: "rgb(182, 145, 78)",
          font: {
            weight: 800
          }
        }
      },
      title: {
        display: true,
      }
    }
  }


  var myChart = new Chart(ctx, {
    type: "line",
    data: data,
    options: options,
  });
}

//B8ZS Canvas
function b8zscanvas(dataArray, labelArray) {
  var ctx = $('#B8ZSC');
  const data = {
    labels: labelArray,
    datasets: [{
      label: 'B8ZS Scrambling ',
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
      y: {
        ticks: {
          color: "green",
          font: {
            weight: 800,
          },
          max: 2,
          maxTicksLimit: 12,
          stepSize: 1,
          fontSize: 90,
          fontWeight: 600
        },
        grid: {
          color: 'rgba(99, 36, 180, 0.801)',
          borderColor: 'cyan'
        },
        title: {
          display: true,
          text: "voltage",
          align: "center",
          color: "green",
          font: {
            weight: 700,
          },
        },

      },
      x: {
        ticks: {
          color: "green",
          font: {
            weight: 800,
          },
        },
        grid: {
          color: 'rgba(99, 36, 180, 0.801)',
          borderColor: 'cyan'
        },
        title: {
          display: true,
          text: "data elements",
          align: "center",
          color: "green",
          font: {
            weight: 700,
          },
        },
      },
    },

    plugins: {
      legend: {
        labels: {
          color: "rgb(182, 145, 78)",
          font: {
            weight: 800
          }
        }
      },
      title: {
        display: true,
      }
    }
  }

  var myChart = new Chart(ctx, {
    type: "line",
    data: data,
    options: options,
  });
}

//HDB3 Canvas
function hdb3canvas(dataArray, labelArray) {
  var ctx = $('#HDB3C');

  const data = {
    labels: labelArray,
    datasets: [{
      label: 'HDB3 Scrambling ',
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
      y: {
        ticks: {
          color: "green",
          font: {
            weight: 800,
          },
          max: 2,
          maxTicksLimit: 12,
          stepSize: 1,
          fontSize: 90,
          fontWeight: 600
        },
        grid: {
          color: 'rgba(99, 36, 180, 0.801)',
          borderColor: 'cyan'
        },
        title: {
          display: true,
          text: "voltage",
          align: "center",
          color: "green",
          font: {
            weight: 700,
          },
        },

      },
      x: {
        ticks: {
          color: "green",
          font: {
            weight: 800,
          },
        },
        grid: {
          color: 'rgba(99, 36, 180, 0.801)',
          borderColor: 'cyan'
        },
        title: {
          display: true,
          text: "data elements",
          align: "center",
          color: "green",
          font: {
            weight: 700,
          },
        },
      },
    },

    plugins: {
      legend: {
        labels: {
          color: "rgb(182, 145, 78)",
          font: {
            weight: 800
          }
        }
      },
      title: {
        display: true,
      }
    }
  }

  var myChart = new Chart(ctx, {
    type: "line",
    data: data,
    options: options,
  });
}

//on click event for Submit button
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
    $("#txt").text(" DIFFERENTIAL MANCHESTER  ");
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

//On click handler for Generate Button In Custom Digital Data Input
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
    //uniNrz      
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
    //NRZL
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
    //NRZI
    input_string_arr.push(input_string_arr[input_string_arr.length - 1]);
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
    //rz
    input_string_arr.push(input_string_arr[input_string_arr.length - 1]);
    let arr = [];
    arr = rzencoder(input_string_arr);
    console.log(arr);
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
    //Menchester
    input_string_arr.push(input_string_arr[input_string_arr.length - 1]);
    let arr = [];
    arr = manchesterencoder(input_string_arr);
    console.log(arr);
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
    //Diff Mench
    input_string_arr.push(input_string_arr[input_string_arr.length - 1]);
    let arr = [];
    arr = diffmanchesterencoder(input_string_arr);
    diffmanchestercanvas(arr, input_string_arr);

  }
  else if (encoding_technique == "AMI") {
    $('#AMI').removeClass("ami");
    $('#AMI').addClass("AMI");
    let LPS = [];
    LPS = longest_palindromic_substring(input_string_arr);
    LPS = LPS.join('');
    console.log(LPS);
    $('#LPSami').text(LPS);
    //AMI
    input_string_arr.push(input_string_arr[input_string_arr.length - 1]);
    let arr = [];
    arr = amiencoder(input_string_arr);
    amicanvas(arr, input_string_arr);
  }
  else if (encoding_technique == "B8ZS") {
    $('#B8ZS').removeClass("b8zs");
    $('#B8ZS').addClass("B8ZS");
    let LPS = [];
    LPS = longest_palindromic_substring(input_string_arr);
    LPS = LPS.join('');
    console.log(LPS);
    $('#LPSb8zs').text(LPS);
    //B8ZS
    input_string_arr.push(input_string_arr[input_string_arr.length - 1]);
    let arr = [];
    arr = b8zsencoder(input_string_arr);
    console.log(arr);
    b8zscanvas(arr, input_string_arr);
  }
  else if (encoding_technique == "HDB3") {
    $('#HDB3').removeClass("hdb3");
    $('#HDB3').addClass("HDB3");
    let LPS = [];
    LPS = longest_palindromic_substring(input_string_arr);
    LPS = LPS.join('');
    console.log(LPS);
    $('#LPShdb3').text(LPS);
    //HDB3
    input_string_arr.push(input_string_arr[input_string_arr.length - 1]);
    let arr = [];
    arr = hdb3encoder(input_string_arr);
    console.log(arr);
    hdb3canvas(arr, input_string_arr);
  }
});

//On Click handler for Generate Buttion in case of Consecutive Zero Scheme
$("#conszeros").click(function (event) {
  event.preventDefault();
  $('#data-container2').remove();
  $('#seq').removeClass('subsequence');
  $('#seq').addClass('Subsequence')
  var nums = $("#numzr").val();
  console.log(nums);
  let Arr = [];   //temperary array
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
    let temp = [];
    temp = Arr.join('');
    $('#sub').text(temp);
    //for Last bit siganal push last bit again
    Arr.push(Arr[Arr.length - 1]);

    //uniNrz   
    //no encoding directly passing to cnavas generator function  
    uninrzcanvas(Arr);
    //Join method  removes , & add space as a delimiter
  }

  else if (encoding_technique == "NRZ-L") {
    $('#NRZL').removeClass("nrzl");
    $('#NRZL').addClass("NRZL");
    let LPS = [];
    LPS = longest_palindromic_substring(Arr);
    LPS = LPS.join('');
    console.log(LPS);
    $('#LPSnrzl').text(LPS);
    let temp = [];
    temp = Arr.join('');
    $('#sub').text(temp);
    //NRZL
    Arr.push(Arr[Arr.length - 1]);
    let arr = [];
    arr = nrzLencoder(Arr);
    nrzLcanvas(arr, Arr);
  }

  else if (encoding_technique == "NRZ-I") {
    $('#NRZI').removeClass("nrzi");
    $('#NRZI').addClass("NRZI");
    let LPS = [];
    LPS = longest_palindromic_substring(Arr);
    LPS = LPS.join('');
    console.log(LPS);
    $('#LPSnrzi').text(LPS);
    let temp = [];
    temp = Arr.join('');
    $('#sub').text(temp);
    //NRZI
    Arr.push(Arr[Arr.length - 1]);
    let arr = [];
    arr = nrzIencoder(Arr);
    nrzIcanvas(arr, Arr);
  }
  else if (encoding_technique == "RZ") {
    $('#RZ').removeClass("rz");
    $('#RZ').addClass("RZ");
    let LPS = [];
    LPS = longest_palindromic_substring(Arr);
    LPS = LPS.join('');
    console.log(LPS);
    $('#LPSrz').text(LPS);
    let temp = [];
    temp = Arr.join('');
    $('#sub').text(temp);
    //RZ
    Arr.push(Arr[Arr.length - 1]);
    let arr = [];
    arr = rzencoder(Arr);
    rzcanvas(arr, Arr);
  }
  else if (encoding_technique == "Mench") {
    $('#MENCH').removeClass("mench");
    $('#MENCH').addClass("MENCH");
    let LPS = [];
    LPS = longest_palindromic_substring(Arr);
    LPS = LPS.join('');
    console.log(LPS);
    $('#LPSmench').text(LPS);
    let temp = [];
    temp = Arr.join('');
    $('#sub').text(temp);
    //MENCH
    Arr.push(Arr[Arr.length - 1]);
    let arr = [];
    arr = manchesterencoder(Arr);
    manchestercanvas(arr, Arr);
  }
  else if (encoding_technique == "Diff-Mench") {
    $('#DIFFMENCH').removeClass("diffmench");
    $('#DIFFMENCH').addClass("DIFFMENCH");
    let LPS = [];
    LPS = longest_palindromic_substring(Arr);
    LPS = LPS.join('');
    console.log(LPS);
    $('#LPSdiffmench').text(LPS);
    let temp = [];
    temp = Arr.join('');
    $('#sub').text(temp);
    //Diff Mench
    Arr.push(Arr[Arr.length - 1]);
    let arr = [];
    arr = diffmanchesterencoder(Arr);
    diffmanchestercanvas(arr, Arr);
  }
  else if (encoding_technique == "AMI") {
    $('#AMI').removeClass("ami");
    $('#AMI').addClass("AMI");
    let LPS = [];
    LPS = longest_palindromic_substring(Arr);
    LPS = LPS.join('');
    console.log(LPS);
    $('#LPSami').text(LPS);
    let temp = [];
    temp = Arr.join('');
    $('#sub').text(temp);
    //AMI
    Arr.push(Arr[Arr.length - 1]);
    let arr = [];
    arr = amiencoder(Arr);
    amicanvas(arr, Arr);
  }
  else if (encoding_technique == "B8ZS") {
    $('#B8ZS').removeClass("b8zs");
    $('#B8ZS').addClass("B8ZS");
    let LPS = [];
    LPS = longest_palindromic_substring(Arr);
    LPS = LPS.join('');
    console.log(LPS);
    $('#LPSb8zs').text(LPS);
    let temp = [];
    temp = Arr.join('');
    $('#sub').text(temp);
    //B8ZS
    Arr.push(Arr[Arr.length - 1]);
    let arr = [];
    arr = b8zsencoder(Arr);
    b8zscanvas(arr, Arr);
  }
  else if (encoding_technique == "HDB3") {
    $('#HDB3').removeClass("hdb3");
    $('#HDB3').addClass("HDB3");
    let LPS = [];
    LPS = longest_palindromic_substring(input_string_arr);
    LPS = LPS.join('');
    console.log(LPS);
    $('#LPShdb3').text(LPS);
    let temp = [];
    temp = Arr.join('');
    $('#sub').text(temp);
    //HDB3
    Arr.push(Arr[Arr.length - 1]);
    let arr = [];
    arr = hdb3encoder(Arr);
    hdb3canvas(arr, Arr);
  }
})

