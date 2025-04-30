'use strict';

let rand = () => window.crypto.getRandomValues(new Uint32Array(1))[0] % 100000;

if (!window.crypto || !window.crypto.getRandomValues) {
    console.warn('Crypto API not supported, using Math.random() instead.');
    rand = () => Math.floor(Math.random() * 100000);
}

const randLetter = () => String.fromCharCode('a'.charCodeAt(0) + rand() % 26);

const randNumber = () => String.fromCharCode('0'.charCodeAt(0) + rand() % 10);

const randPwd = () => {
    let pwd = '-****-****-****'.split('');
    pwd[rand() % 11 > 3 ? rand() % 2 * 5 + 6 + rand() % 4 : rand() % 3 + 2] = randNumber();
    let cnt = 0;
    pwd.forEach((char, index) => {
        if (char == '-')
            cnt = 0;
        else {
            cnt++;
            if (char == '*') {
                let c = '';
                let flag = true;
                while (flag) {
                    flag = false;
                    c = randLetter();
                    let j = 0;
                    while (++j < cnt && !(flag = pwd[index - j] == c));
                }
                pwd[index] = c;
            }
        }
    });
    return pwd.join('').slice(1);
}

document.addEventListener('DOMContentLoaded', () => {
    const genedPwd = randPwd();
    document.getElementById("rand-pwd").textContent = genedPwd;
});