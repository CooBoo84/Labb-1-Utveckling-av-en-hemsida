function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
    return parent.appendChild(el);
}

const ul = document.querySelector('#games');
const url = 'data/data.json';
fetch(url)
    .then((resp) => resp.json())
    .then(function(data) {
        console.log(data.games);
        console.log("Visa första i json-objektet: " + data.games[0].name);
        let games = data.games;

        // Returnerar json-bjekten genom att skapa en ny array med map()
        return games.map(function(game) {
            let li = createNode('li');
            li.innerHTML = game.name + " " + game.price;
            append(ul, li);
        })
    })
    .catch(function(error) {
        console.log(error);
    });