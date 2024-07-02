function lookupWord() {
    const form = document.getElementById("lookup-form");
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const data = new FormData(event.target);
        const word = data.get("word");

        const options = {
            method: 'GET',
        };

        document.getElementById('results').innerHTML = `<p>Searching for <em>${word}'</em>...</p>`;

        fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`, options)
            .then(response => response.json())
            .then(data => {
                listOfMeanings=[]
                var word=""
                var phonetic=""
                var sourceUrls=null
                for (each of data){
                word= each.word
                phonetic= each.phonetic
                sourceUrls=  sourceUrls===null ? each.phonetics[0].audio:sourceUrls
                dataEach = {

                    partOfSpeech: each.meanings[0].partOfSpeech,
                    definitions: each.meanings[0].definitions
                };

                listOfMeanings.push(dataEach)
                }
                const template = document.getElementById('results-template').innerText;
                const compiledFunction = Handlebars.compile(template);
                document.getElementById('results').innerHTML = compiledFunction({"obj":listOfMeanings,"word":word,"phonetic":phonetic,"sourceUrls":sourceUrls});
            });
    });;
}
function lookupAntonyms() {
    const form = document.getElementById("lookup-form");
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const data = new FormData(event.target);
        const word = data.get("word");

        const options = {
            method: 'GET',
        };

        document.getElementById('results').innerHTML = `<p>Searching for <em>${word}'</em>...</p>`;

        fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`, options)
            .then(response => response.json())
            .then(data => {

            data={
                listOfMeanings: data[0].meanings,
                word: data[0].word
                };
                const template = document.getElementById('antonymsResult-template').innerText;
                const compiledFunction = Handlebars.compile(template);
                document.getElementById('results').innerHTML = compiledFunction(data);
            });
    });;
}
function lookupSynonyms() {
    const form = document.getElementById("lookup-form");
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const data = new FormData(event.target);
        const word = data.get("word");

        const options = {
            method: 'GET',
        };

        document.getElementById('results').innerHTML = `<p>Searching for <em>${word}'</em>...</p>`;

        fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`, options)
            .then(response => response.json())
            .then(data => {

            data={
                listOfMeanings: data[0].meanings,
                word: data[0].word
                };
                const template = document.getElementById('synonymsResult-template').innerText;
                const compiledFunction = Handlebars.compile(template);
                document.getElementById('results').innerHTML = compiledFunction(data);
            });
    });;
}

// tag::router[]
window.addEventListener('load', () => {
  const app = $('#app');

  const defaultTemplate = Handlebars.compile($('#default-template').html());
  const dictionaryTemplate = Handlebars.compile($('#dictionary-template').html());
  const synonymsTemplate = Handlebars.compile($('#synonyms-template').html());
  const antonymsTemplate = Handlebars.compile($('#antonyms-template').html());

  const router = new Router({
    mode:'hash',
    root:'index.html',
    page404: (path) => {
      const html = defaultTemplate();
      app.html(html);
    }
  });

  router.add('/dictionary', async () => {
    html = dictionaryTemplate();
    app.html(html);
    lookupWord();
  });

  router.add('/antonyms', async () => {
    html = antonymsTemplate();
    app.html(html);
    lookupAntonyms();
  });
  router.add('/synonyms', async () => {
    html = synonymsTemplate();
    app.html(html);
    lookupSynonyms();
  });

  router.addUriListener();

  $('a').on('click', (event) => {
    event.preventDefault();
    const target = $(event.target);
    const href = target.attr('href');
    const path = href.substring(href.lastIndexOf('/'));
    router.navigateTo(path);
  });

  router.navigateTo('/');
});
// end::router[]





//// Wait for the page to load before running JavaScript code
//window.addEventListener('load', () => {
//    const app = $('#app');
//
//    const defaultTemplate = Handlebars.compile($('#default-template').html());
//    const dictionaryTemplate = Handlebars.compile($('#dictionary-template').html());
//    const synonymsTemplate = Handlebars.compile($('#synonyms-template').html());
//    const antonymsTemplate = Handlebars.compile($('#antonyms-template').html());
//
//    const router = new Router({
//        mode: 'hash',
//        root: 'index.html',
//        page404: (path) => {
//            const html = defaultTemplate();
//            app.html(html);
//        }
//    });
//
//    // Define a function for looking up words
//    function lookupWord() {
//        const form = document.getElementById("lookup-form");
//        form.addEventListener("submit", (event) => {
//            event.preventDefault();
//
//            const data = new FormData(event.target);
//            const word = data.get("word");
//
//            const options = {
//                method: 'GET',
//            };
//
//            document.getElementById('results').innerHTML = `<p>Searching for <em>${word}'</em>...</p>`;
//
//            fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`, options)
//                .then(response => response.json())
//                .then(data => {
//                    // Process the data and render the results here
//                    // ...
//
//                    // Example:
//                    const template = document.getElementById('results-template').innerText;
//                    const compiledFunction = Handlebars.compile(template);
//                    document.getElementById('results').innerHTML = compiledFunction(data);
//                });
//        });
//    }
//
//    // Define a function for looking up antonyms
//    function lookupAntonyms() {
//        // Similar structure as lookupWord, but for antonyms
//        // ...
//    }
//
//    // Define a function for looking up synonyms
//    function lookupSynonyms() {
//        // Similar structure as lookupWord, but for synonyms
//        // ...
//    }
//
//    router.add('/dictionary', async () => {
//        const html = dictionaryTemplate();
//        app.html(html);
//        lookupWord();
//    });
//
//    router.add('/antonyms', async () => {
//        const html = antonymsTemplate();
//        app.html(html);
//        lookupAntonyms();
//    });
//
//    router.add('/synonyms', async () => {
//        const html = synonymsTemplate();
//        app.html(html);
//        lookupSynonyms();
//    });
//
//    router.addUriListener();
//
//    $('a').on('click', (event) => {
//        event.preventDefault();
//        const target = $(event.target);
//        const href = target.attr('href');
//        const path = href.substring(href.lastIndexOf('/'));
//        router.navigateTo(path);
//    });
//
//    router.navigateTo('/');
//});
