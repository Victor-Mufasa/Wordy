const form = document.querySelector("#word-form");
const wordInput = document.querySelector("#word-input");
const defContainer = document.querySelector("#def-container");
const button = document.querySelector("#btn");

// function to create a div element.
function createDefinitionElement(wordObject) {
  const definitionDiv = document.createElement("div");
  definitionDiv.classList.add("def");
  definitionDiv.innerHTML = `
    <h3><strong>Word:</strong> ${wordObject.word}</h3>
    <p><strong>Definition:</strong> ${wordObject.def}</p>
    <p><strong>Pronunciation:</strong> ${wordObject.pronunciation}</p>
    <p><strong>Part of Speech:</strong> ${wordObject.partOfSpeech}</p>
    <p><strong>Synonyms:</strong> ${wordObject.synonyms}</p>
    <p><strong>Antonyms:</strong> ${wordObject.antonyms}</p>
    <audio controls src=${wordObject.audioUrl}></audio>`;
  return definitionDiv;
}

// displaying definitions of words
function displayDefiniton(wordObject) {
  defContainer.innerHTML = "";
  defContainer.appendChild(createDefinitionElement(wordObject));
}

// Adding formEvent listener
document.addEventListener("DOMContentLoaded", function () {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const word = wordInput.value.trim();
    if (word.length === 0) {
      alert("Please enter a word");
    }
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
      .then((res) => res.json())
      .then((data) => {
        const entry = data[0];
        const wordObject = {
          word: entry["word"],
          pronunciation: entry["phonetics"][0]["text"],
          audioUrl: entry["phonetics"][0]["audio"],
          def: entry["meanings"][0]["definitions"][0]["definition"],
          partOfSpeech: entry["meanings"][0]["partOfSpeech"],
          synonyms: entry["meanings"][0]["synonyms"],
          antonyms: entry["meanings"][0]["antonyms"]
        };
        displayDefiniton(wordObject);
      })
      .catch(error => console.error(error));
    form.reset();
  });
});
