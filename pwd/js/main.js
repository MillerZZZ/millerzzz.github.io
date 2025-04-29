let rand = function () {
    if (!window.crypto || !window.crypto.getRandomValues)
        return Math.floor(Math.random() * 100000);
    else return window.crypto.getRandomValues(new Uint32Array(1))[0] % 100000;
}

let randLetter = function () {
    return String.fromCharCode('a'.charCodeAt(0) + rand() % 26);
}

let randNumber = function () {
    return String.fromCharCode('0'.charCodeAt(0) + rand() % 10);
}

let randPwd = function () {
    let pwd = '-****-****-****'.split('');
    pwd[rand() % 11 > 3 ? rand() % 2 * 5 + 6 + rand() % 4 : rand() % 3 + 2] = randNumber();
    let cnt = 0;
    for (let i = 0; i < pwd.length; i++) {
        if (pwd[i] == '-') {
            cnt = 0;
        } else {
            if (pwd[i] == '*') {
                let c = '';
                let flag = true;
                while (flag) {
                    flag = false;
                    c = randLetter();
                    for (let j = 1; j < cnt; j++) {
                        if (pwd[i - j] == c) {
                            flag = true;
                            break;
                        }
                    }
                }
                pwd[i] = c;
            }
            cnt++;
        }
    }
    return pwd.join('').slice(1);
}

window.onload = function () {
    let pwd = randPwd();
    document.getElementById("rand-pwd").textContent = pwd;
}