var count = 0;
var resultText = "";

// anagram generator
function main(){
  resultText = "\n"
  // var name = document.getElementById('anagram').vallue;
  var name = yes_anagram.textbox.value;
  // var name = document.forms.ye_anagram.textbox.value;
  if(name.length == 0){
    alert("Enter your name (a-z)");
    return;
  }
  else if(name.match(/[^a-z]/gi)){
    alert("Enter your name (a-z)")
    return;
  }
  else{
    permutation(name, "");
  }

  document.getElementById('result').textContent = resultText;
}

function permutation(q, ans){
  // base case
  if(q.length <= 1){
    if(count % 16 == 0){
      // document.getElementById('result').textContent = "\n";
    }
    // document.getElementById('result').textContent = ans + q + "  ";
    resultText += ans + q + "  ";
    count++;
  }

  // general case
  else{
    for(var i = 0; i < q.length; i++){
      // substring example
      // str = abcde
      // str.substring(2) -> cde
      // str.substring(1, 3) -> bc
      permutation(q.substring(0, i) + q.substring(i + 1), ans + q.substring(i, i + 1));
    }
  }
}
