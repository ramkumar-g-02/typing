const HOME_KEYS = 'asdfjkl;'
const HOME_KEYS_DEFAULT_SIZE = 20;
document.addEventListener('DOMContentLoaded', function(){
    let sizeElement = document.getElementById('size');
    sizeElement.value = HOME_KEYS_DEFAULT_SIZE;
     generateRandomCharacters(HOME_KEYS);
     localStorage.setItem('count', 0);
});

let sizeElement = document.getElementById('size');
sizeElement.addEventListener('input', function () {
    generateRandomCharacters(HOME_KEYS)
    document.getElementById('typing').value = '';
    localStorage.setItem('count', 0);
});

let typing = document.getElementById('typing');
typing.addEventListener('keypress', function (event) {
    let randomCharatersElement = document.getElementById('randomCharaters');
    let randomCharacters = randomCharatersElement.value;
    let typedKey = event.key;
    let count = localStorage.getItem('count')
    if (HOME_KEYS.indexOf(typedKey) != -1) {
        let randomCharacter = randomCharacters.charAt(count);
        let randomCharacterElement = document.getElementById(`charater-${count}`);
        if (randomCharacters.charAt(count) == typedKey) {
            count++;
            localStorage.setItem('count', count);
            if (!randomCharacterElement.classList.contains('red'))
                randomCharacterElement.classList.add('green');
        } else {
            randomCharacterElement.classList.add('red');
        }
    } else {

    }
});


function generateRandomCharacters(keys) {
    let sizeElement = document.getElementById('size');
    let size = sizeElement.value;
    size = size ? size : keys.length;
    size = size > 100 ? 100 : size;
    // sizeElement.value = size;
    let randomCharacters = '';
    let charatersElement = document.getElementById('charaters');
    charatersElement.replaceChildren();
    for (let index = 0; index < size; index++) {
        let randomKeyIndex = Math.floor(Math.random() * keys.length);
        let randomCharacter = keys.charAt(randomKeyIndex);
        let span = document.createElement('span');
        span.innerText = randomCharacter;
        span.setAttribute('id', `charater-${index}`);
        span.setAttribute('class', 'mx-1 fs-6 fw-bold');
        charatersElement.append(span);
        randomCharacters += randomCharacter;
    }
    let randomCharatersElement = document.getElementById('randomCharaters');
    randomCharatersElement.value = randomCharacters;
    return randomCharacters;
}