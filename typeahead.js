var words = ['apple', 'appleplay', 'airdrop', 'appstore', 'airpod', 'apple music',
    'bay', 'bay area', 'company', 'create'
]
var input = document.getElementById('typeahead-input');
var results = document.getElementById('typeahead-results')

input.addEventListener('input', function (e) {
    var inputText = this.value;
    console.log(inputText)
    results.innerHTML = ""
    if(!inputText) {
        results.style.display = "none"
    } else {
        results.style.display = "block"
        var inputRegExp = new RegExp('\\b' + inputText)
        for (var i = 0; i < words.length; i++) {
            var word = words[i]
            var wordMatch = word.match(inputRegExp)
            if (wordMatch !== null) {
                var result = document.createElement("div");
                var matchIndex = word.search(inputRegExp)
                result.innerHTML = word.slice(0, matchIndex) + "<strong>" + wordMatch[0] +
                    "</strong>" + word.slice(matchIndex + wordMatch[0].length);
                console.log(result)
                    
                results.appendChild(result)
            }
        }
    }
})

var focus = -1;
var items = results.getElementsByTagName('div')
results.addEventListener('keydown', function(e) {
    e.preventDefault()
    //DOWN
    if(e.keyCode === 40) {
        focus++;
        keyControlOnResults()
    }
})

function keyControlOnResults() {

}