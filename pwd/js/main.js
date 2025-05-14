'use strict';

const randPwd = () => {
    let pwd = '-****-****-****'.split('');
    pwd[RandomUtils.randomBase() % 11 > 3 ? RandomUtils.randomBase() % 2 * 5 + 6 + RandomUtils.randomBase() % 4 : RandomUtils.randomBase() % 3 + 2] = RandomUtils.randomDigit();
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
                    c = RandomUtils.randomLetter();
                    let j = 0;
                    while (++j < cnt && !(flag = pwd[index - j] == c));
                } while (flag);
                pwd[index] = c;
            }
        }
    });
    return pwd.join('').slice(1);
};

const genedPwd = randPwd();
if (location.href.endsWith('/pwd/'))
    document.getElementById("rand-pwd").textContent = genedPwd;
else if (location.href.endsWith('/pwd/json/')) {
    const responseObj = {
        code: 200,
        msg: 'success',
        data: {
            pwd: genedPwd
        }
    };
    document.getElementById("rand-pwd").textContent = JSON.stringify(responseObj, null, 2);
}