const prompt = require('prompt-sync')();
const fs = require('fs');

// Read Input From CLI
const searchQuery = prompt('Please Enter Your Serach Query?');
console.log(`Your Search Query = ${searchQuery}`);

// Get Data From File And index it in memory
const articles = {};
let names = [];
fs.readFile('./small/20140615-wiki-en_000010.txt', 'utf8', (err, contents) => {
    let currentArticle = null;
    if (contents !== undefined) {
      lines = contents.split('\n');
      lines.forEach(line => {
        const isArticleSection = line.trim().includes('[['); // extract to function
        if(isArticleSection){
            let articleName = line.replace("[[", '').replace("]]",'').trim();
            articles[articleName] = {};
            currentArticle = articleName;
        } else {
            const words = line.split(" ");
            for(let word of words){
                if(word){
                    articles[currentArticle][word] = { // u can create any object
                        position: line.indexOf(word) 
                    }
                }
            }
        }
      });
    }
    
    // Search Query in Indexes
    for(let articleName in articles){
        if(articles[articleName][searchQuery]){
            console.log(`Article Name = ${articleName}`);
            console.log(articles[articleName][searchQuery]);
        }
    }
    
  });



  // Thing That need to do
  // 1. run multiple files with the same logic (run with event stream per each file)
  //    - run on directory and not static files + get the directory it via the cli input 
  //    - run them parallel
  // 2. clean keys in the articles object - use regex to clean it 
  // 3. fix names - clean code
  // 4. add more capability to search engine to search also sentence or part of the sentence such: *word*
  //    - we can create some "DSL" language
  // scalability

  // - wrote tests
  // - insert data to redies DB