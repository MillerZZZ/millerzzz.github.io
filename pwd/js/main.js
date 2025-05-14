/**
 * @copyright 2025 Miller Zhang
 * @author Miller Zhang
 * @license Apache-2.0
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * {@link http://www.apache.org/licenses/LICENSE-2.0}
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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