'use strict';

let rand = (() => {
    const buffer = new Uint32Array(1);
    const targetRange = 100000;
    const rangeSize = 0x100000000;
    const maxValidValue = Math.floor(rangeSize / targetRange) * targetRange;

    return () => {
      let randomVal;
      do {
        window.crypto.getRandomValues(buffer);
        randomVal = buffer[0];
      } while (randomVal >= maxValidValue);
      return randomVal % targetRange;
    };
})();

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
                do {
                    flag = false;
                    c = randLetter();
                    let j = 0;
                    while (++j < cnt && !(flag = pwd[index - j] == c));
                } while (flag);
                pwd[index] = c;
            }
        }
    });
    return pwd.join('').slice(1);
};

document.addEventListener('DOMContentLoaded', () => {
    const genedPwd = randPwd();
    const responseObj = {
        code: 200,
        msg: 'success',
        data: {
            pwd: genedPwd
        }
    };
    document.getElementById("rand-pwd").textContent = JSON.stringify(responseObj, null, 2);
});