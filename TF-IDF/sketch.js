// tf: Term Frequency
// idf: Inverse Document Frequency
//
// d: documents
// t: terms
// tfidf[i][j] = tf[i][j] * idf[i]
// tf[i][j] = n[i][j] / sum(n[k][j] k = 0; k < d[j].t.length)
// idf[i] = log(d.length / {d.length: d of t[i]})
// n[i][j]

var txt = []; // array　
var allwords = [];
var tokens = [];
var counts = {}; // dict
var keys = [];

var files = ['rainbow.txt', 'eclipse.txt', 'fish.txt', 'sports.txt'];

function preload(){
  for(var i = 0; i < files.length; i++){
    txt[i] = loadStrings('files/' + files[i]);
  }
}

function setup(){
  noCanvas();

  for(var i = 0; i < files.length; i++){
    allwords[i] = txt[i].join("\n");
    tokens[i] = allwords[i].split(/\W+/); // ^\w -- non word char
    // console.log(tokens);

    for(var j = 0; j < tokens[i].length; j++){
      var word = tokens[i][j].toLowerCase();
      if(counts[word] === undefined){
        // counts[word] = 1;
        counts[word] = {tf: 1, df: 1}; // nested dict
        // counts[word] = {tf: 1, df: true}; // nested dict
        keys.push(word);
      }
      else{
        // counts[word] += 1;
        counts[word].tf += 1;
      }
    }
  }

  for(var i = 0; i < keys.length; i++){
    var word = keys[i];
    // counts[word].df--; // occur 'division-by-zero'
    for(var j = 0; j < files.length; j++){
      if(tokens[j].indexOf(word)){
        counts[word].df++;
      }
    }
  }

  for(var i = 0; i < keys.length; i++){
    var word = keys[i];
    var wordobj = counts[word];
    wordobj.tfidf = wordobj.tf * log(files.length / wordobj.df);
  }

  keys.sort(compare);

  for(var i = 0; i < keys.length; i++){
    var key = keys[i];
    createDiv(key + ': ' + counts[key].tfidf);
  }
}

function compare(a, b){
  var countA = counts[a].tfidf;
  var countB = counts[b].tfidf;
  return countB - countA;
}
