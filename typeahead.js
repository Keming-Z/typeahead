var typeaheadController = (function() {
    var MAX_RESULTS = 5;
    var RESULT_HEIGHT = 30;
    var words = ['apple', 'appleplay', 'airdrop', 'appstore', 'airpod', 'apple music',
        'bay', 'bay area', 'company', 'create'
    ]
    var focus = -1;
    var first = 0;
    var last = MAX_RESULTS - 1;
    
    var input = document.getElementById('typeahead-input');
    var results = document.getElementById('typeahead-results');
    var items = results.getElementsByTagName('div')
    var resetBtn = document.getElementById('reset-button');
    
    // when type text into input field
    input.addEventListener('input', function (e) {
        clearSearch()
        var inputText = this.value;
        // hide dropdown and reset button when no input value
        if(!inputText) {
            results.style.display = "none"
            resetBtn.style.visibility = "hidden"
        } else {
            results.style.display = "block"
            resetBtn.style.visibility = "visible"
            // match input by word
            var inputRegExp = new RegExp('\\b' + inputText)
            for (var i = 0; i < words.length; i++) {
                var word = words[i]
                var wordMatch = word.match(inputRegExp)
                // if there is a match, create a new div and append to dropdown
                if (wordMatch !== null) {
                    var result = document.createElement("div");
                    result.setAttribute("class", "typeahead-result")

                    var matchIndex = word.search(inputRegExp)
                    result.innerHTML = word.slice(0, matchIndex) + "<strong>" + wordMatch[0] +
                        "</strong>" + word.slice(matchIndex + wordMatch[0].length);
                        
                    results.appendChild(result)
                }
            }
            // if nothing matches input, don't show dropdown 
            if(results.innerHTML === "") {
                results.style.display = "none"
            }
        }
    })
    // reset dropdown and focus cursor
    function clearSearch() {
        results.innerHTML = "";
        focus = -1;
    }

    resetBtn.addEventListener('click', function(e) {
        e.preventDefault()
        clearInput()
    })
    
    resetBtn.addEventListener('keydown', function(e) {
        e.preventDefault()
        if(e.keyCode === 13) {
            clearInput()
        }
    })
    // clear input and set focus and don't show dropdown
    function clearInput() {
        input.value = ""
        input.focus()
        results.style.display = "none"
    }
    // keyboard navigation for dropdown
    results.addEventListener('keydown', function(e) {
        // DOWN
        if(e.keyCode === 40) {
            e.preventDefault()
            if (focus < items.length - 1) {
                focus++;
                onDropdownKeyControl(focus)
                // if reach the end of dropdown view, scroll down
                if(focus > last) {
                    scroll(1)
                }
            }
        }
        // UP
        if(e.keyCode === 38) {
            e.preventDefault()
            if (focus > 0) {
                focus--;
                onDropdownKeyControl(focus)
                // if reach the end of dropdown view, scroll up
                if(focus < first) {
                    scroll(0)
                }
            }
        }
    
        // esc
        if(e.keyCode === 27) {
            input.focus();
        }
    })
    
    input.addEventListener('keydown', function(e) {
        if(e.keyCode === 27) {
            input.value = ""
            results.style.display = "none"
        }
    })

    document.addEventListener('click', function(e) {
        if(e.target.className !== "typeahead-result") {
            results.style.display = "none"
        }
    })
    
    function onDropdownKeyControl() {
        clearSelect();
        if(items[focus]) {
            items[focus].style.backgroundColor = "darkgrey"
        }
    }
    
    function clearSelect() {
        for(var i = 0; i < items.length; i++) {
            items[i].style.background = "none"
        }
    }
    
    // if direction is positive, scroll up. Vice versa.
    function scroll(direction) {
        if(direction) {
            first++;
            last++;
            results.scrollTop += RESULT_HEIGHT
        } else {
            first--;
            last--;
            results.scrollTop -= RESULT_HEIGHT
        }
    }
})()