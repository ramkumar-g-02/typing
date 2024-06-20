const keys = {
    HOME_KEYS: { keys: 'asdfjkl;', keyName: 'Home Keys' },
    INDEX_KEYS: { keys: '4567rtyufghjvbnm', keyName: 'Index Finger' },
    L_INDEX_KEYS: { keys: '45rtfgv', keyName: 'Left Index Finger' },
    R_INDEX_KEYS: { keys: '67yuhjnm', keyName: 'Right Index Finger'},
    L_INDEX_WITHOUT_NUM_KEYS: { keys: 'rtfgv', keyName: 'L Index Finger Without Numbers'},
    R_INDEX_WITHOUT_NUM_KEYS: { keys: 'yuhjnm', keyName: 'R Index Finger Without Numbers'},
}

const HOME_KEYS_DEFAULT_SIZE = 20;
const DEFAULT_KEY_TYPE = 'HOME_KEYS';
document.addEventListener('DOMContentLoaded', function () {
    let sizeElement = document.getElementById('size');
    sizeElement.value = HOME_KEYS_DEFAULT_SIZE;
    let keyTypeElement = document.getElementById('keyType');
    for (const key in keys) {
        let optionElement = document.createElement('option');
        optionElement.setAttribute('value', key);
        optionElement.innerHTML = keys[key].keyName;
        keyTypeElement.append(optionElement);
    }
    keyTypeElement.value = DEFAULT_KEY_TYPE;
    generateRandomCharacters(keys.HOME_KEYS.keys);
    localStorage.setItem('count', 0);
    focusCurrentKey()
});

function focusCurrentKey() {
    let count = localStorage.getItem('count')
    let randomCharacterElement = document.getElementById(`charater-${count}`);
    let sizeElement = document.getElementById('size');
    if (count > 0 && count < parseInt(sizeElement.value)) {
        let randomCharacterElement = document.getElementById(`charater-${count - 1}`);
        randomCharacterElement.classList.remove('current-key')
    }
    randomCharacterElement.classList.add('current-key')
}

let sizeElement = document.getElementById('size');
sizeElement.addEventListener('input', function () {
    let keyTypeElement = document.getElementById('keyType');
    generateRandomCharacters(keys[keyTypeElement.value].keys)
    document.getElementById('typing').value = '';
    localStorage.setItem('count', 0);
});

let keyTypeElement = document.getElementById('keyType');
keyTypeElement.addEventListener('change', function () {
    generateRandomCharacters(keys[keyTypeElement.value].keys)
    document.getElementById('typing').value = '';
    localStorage.setItem('count', 0);
    focusCurrentKey()
});

let typing = document.getElementById('typing');
typing.addEventListener('keypress', function (event) {
    let randomCharatersElement = document.getElementById('randomCharaters');
    let randomCharacters = randomCharatersElement.value;
    let typedKey = event.key;
    let count = localStorage.getItem('count')
    let keyTypeElement = document.getElementById('keyType');
    let randomCharacterElement = document.getElementById(`charater-${count}`);
    if (keys[keyTypeElement.value].keys.indexOf(typedKey) != -1) {
        let randomCharacter = randomCharacters.charAt(count);
        if (randomCharacters.charAt(count) == typedKey) {
            count++;
            localStorage.setItem('count', count);
            if (!randomCharacterElement.classList.contains('red'))
                randomCharacterElement.classList.add('green');
            focusCurrentKey()
        } else {
            randomCharacterElement.classList.add('red');
        }
    } else {
        randomCharacterElement.classList.add('red');
    }
});


function generateRandomCharacters(keys) {
    let sizeElement = document.getElementById('size');
    let size = parseInt(sizeElement.value);
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
