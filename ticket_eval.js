const esprima = require("esprima");
const fs = require("fs");
KC = 8;
rcon = [0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36, 0x6c, 0xd8, 0xab, 0x4d, 0x9a, 0x2f, 0x5e, 0xbc, 0x63, 0xc6, 0x97, 0x35, 0x6a, 0xd4, 0xb3, 0x7d, 0xfa, 0xef, 0xc5, 0x91];
// prettier-ignore
S = [0x63, 0x7c, 0x77, 0x7b, 0xf2, 0x6b, 0x6f, 0xc5, 0x30, 0x01, 0x67, 0x2b, 0xfe, 0xd7, 0xab, 0x76, 0xca, 0x82, 0xc9, 0x7d, 0xfa, 0x59, 0x47, 0xf0, 0xad, 0xd4, 0xa2, 0xaf, 0x9c, 0xa4, 0x72, 0xc0, 0xb7, 0xfd, 0x93, 0x26, 0x36, 0x3f, 0xf7, 0xcc, 0x34, 0xa5, 0xe5, 0xf1, 0x71, 0xd8, 0x31, 0x15, 0x04, 0xc7, 0x23, 0xc3, 0x18, 0x96, 0x05, 0x9a, 0x07, 0x12, 0x80, 0xe2, 0xeb, 0x27, 0xb2, 0x75, 0x09, 0x83, 0x2c, 0x1a, 0x1b, 0x6e, 0x5a, 0xa0, 0x52, 0x3b, 0xd6, 0xb3, 0x29, 0xe3, 0x2f, 0x84, 0x53, 0xd1, 0x00, 0xed, 0x20, 0xfc, 0xb1, 0x5b, 0x6a, 0xcb, 0xbe, 0x39, 0x4a, 0x4c, 0x58, 0xcf, 0xd0, 0xef, 0xaa, 0xfb, 0x43, 0x4d, 0x33, 0x85, 0x45, 0xf9, 0x02, 0x7f, 0x50, 0x3c, 0x9f, 0xa8, 0x51, 0xa3, 0x40, 0x8f, 0x92, 0x9d, 0x38, 0xf5, 0xbc, 0xb6, 0xda, 0x21, 0x10, 0xff, 0xf3, 0xd2, 0xcd, 0x0c, 0x13, 0xec, 0x5f, 0x97, 0x44, 0x17, 0xc4, 0xa7, 0x7e, 0x3d, 0x64, 0x5d, 0x19, 0x73, 0x60, 0x81, 0x4f, 0xdc, 0x22, 0x2a, 0x90, 0x88, 0x46, 0xee, 0xb8, 0x14, 0xde, 0x5e, 0x0b, 0xdb, 0xe0, 0x32, 0x3a, 0x0a, 0x49, 0x06, 0x24, 0x5c, 0xc2, 0xd3, 0xac, 0x62, 0x91, 0x95, 0xe4, 0x79, 0xe7, 0xc8, 0x37, 0x6d, 0x8d, 0xd5, 0x4e, 0xa9, 0x6c, 0x56, 0xf4, 0xea, 0x65, 0x7a, 0xae, 0x08, 0xba, 0x78, 0x25, 0x2e, 0x1c, 0xa6, 0xb4, 0xc6, 0xe8, 0xdd, 0x74, 0x1f, 0x4b, 0xbd, 0x8b, 0x8a, 0x70, 0x3e, 0xb5, 0x66, 0x48, 0x03, 0xf6, 0x0e, 0x61, 0x35, 0x57, 0xb9, 0x86, 0xc1, 0x1d, 0x9e, 0xe1, 0xf8, 0x98, 0x11, 0x69, 0xd9, 0x8e, 0x94, 0x9b, 0x1e, 0x87, 0xe9, 0xce, 0x55, 0x28, 0xdf, 0x8c, 0xa1, 0x89, 0x0d, 0xbf, 0xe6, 0x42, 0x68, 0x41, 0x99, 0x2d, 0x0f, 0xb0, 0x54, 0xbb, 0x16];
const bypassTests = async (page) => {
    page.evaluateOnNewDocument(()=>{
        window.chrome=null;let gl=document.createElement('canvas').getContext('webgl');
        let glp=Object.getPrototypeOf(gl);
        let origGetParameter = glp.getParameter;
        let debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        glp.getParameter=function getParameter(...args) {
            if(this.canvas) {
                let res;
                if(this.isContextLost()) return null;
                if (args[0] === debugInfo.UNMASKED_VENDOR_WEBGL){
                    res=origGetParameter.call(this,...args);
                    return !res?res:'Apple Inc.'
                }
                if (args[0] === debugInfo.UNMASKED_RENDERER_WEBGL){
                    res=origGetParameter.call(this,...args);
                    return !res?res:'Apple Inc.'
                }
                if (args[0] === 33901) return new Float32Array([1, 8191]);
                if (args[0] === 3386) return new Int32Array([16384, 16384]);
                if (args[0] === 35661) return 80;
                if (args[0] === 34076) return 16384;
                if (args[0] === 36349) return 1024;
                if (args[0] === 34024) return 16384;
                if (args[0] === 3379) return 16384;
                if (args[0] === 34921) return 16;
                if (args[0] === 36347) return 1024;
                return origGetParameter.call(this, ...args);
            } else {
                throw 'err';
            }
        }
    });
};

async function runSetup(inject) {
    const puppeteer = require("puppeteer-extra");
    const pluginStealth = require("puppeteer-extra-plugin-stealth");
    puppeteer.use(pluginStealth());

    let browser = await puppeteer.launch({
        // 这行可以保存外部代码的断点，这样不用每次加一遍断点了，eval里面的断点没法保存只能每次弄一遍
        // userDataDir: './myUserDataDir',
        headless: false,
        // devtools: true,
        args: ["--user-agent=Mozilla/5.0 (iPhone; CPU iPhone OS 13_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.5 Mobile/15E148 Safari/604.1", "--no-sandbox", "--disable-setuid-sandbox"],
    });


    let mainPage = (await browser.pages())[0];
    await bypassTests(mainPage);

    await mainPage.setRequestInterception(true);

    await mainPage.evaluateOnNewDocument(() => {
        window.resetArr = function () {
            Object.keys(window.bodyArr).forEach((key) => window.bodyArr[key].push([]));
            Object.keys(window.headArr).forEach((key) => window.headArr[key].push([]));
        };
        window.varName=[];
        window.headArrLeft = [];
        window.headArrRight = [];
        window.setArr0 = function (ind, leftSide, rightSide) {
            try {
                if (typeof leftSide === "number" && typeof rightSide === "number") {
                    window.headArrLeft.push(leftSide);
                    window.headArrRight.push(rightSide);
                }
            } catch (e) {
                console.error(e);
            }
        };



        Function.prototype._toString = Function.prototype.toString;
        Function.prototype.toString = function(a) {
            return this._toString().replace(/emal/g, "eval")
        }
        window.emal = function(code) {
            let fileAdjustments = [];
            let nameArray = [];
            esprima.parseScript(code, { range: true }, function (node) {
                if (node.type === "BinaryExpression" && node.operator === "/") {
                    let index = 1; //code.substring(...node.left.property.range);
                    let leftSide = code.substring(...node.right.range);
                    let rightSide = code.substring(...node.left.range);
                    fileAdjustments.push({
                        index: node.range[0],
                        insertCode: `+(()=>{window.setArr0(${index}, ${leftSide}, ${rightSide});return 0;})()+`,
                    });
                }
            });
            for (let i = fileAdjustments.length - 1; i >= 0; i--) {
                code = code.slice(0, fileAdjustments[i].index) + fileAdjustments[i].insertCode + code.slice(fileAdjustments[i].index);
            }
            //把每块eval内部的debugger可以这样去掉，外面的debugger要自己加never pause here
            if (code.includes('debugger')){code = code.replace('debugger',';')}

            //第一种情况，如果已经知道我要查的内容，比如probably,可以这样加断点：并且这样可以顺便看到所有变量的名字，放在window.varName里面
            esprima.parseScript(code, { range: true }, function (node) {
                if (node.operator === "+=") {
                    let index = 1; //code.substring(...node.left.property.range);
                    let rightSide = code.substring(...node.left.range);
                    nameArray.push({
                        index: node.range[0],
                        insertCode: `if(typeof ${rightSide}==='string'&&${rightSide}.includes('content')){window.varName.push(${rightSide});debugger;};`,
                    });
                }
            });
            // for (let i = nameArray.length - 1; i >= 0; i--) {
            //     code = code.slice(0, nameArray[i].index) + nameArray[i].insertCode + code.slice(nameArray[i].index);
            // }

            // 第二种，如果我要停在某一行的前面，就这么写然后重启代码
            // media codecs
            // if (code.includes('c2d[8]=Q7S.d1o()[X4AA.P1o][X4AA[254283]][X4AA.J1o]')) {code = code.replace('c2d[8]=Q7S.d1o()[X4AA.P1o][X4AA[254283]][X4AA.J1o]','debugger;c2d[8]=Q7S.d1o()[X4AA.P1o][X4AA[254283]][X4AA.J1o]')}
            // if (code.includes('i5d[9]=b7S.l1o()[X4AA.G1o]')) {code = code.replace('i5d[9]=b7S.l1o()[X4AA.G1o]','debugger;i5d[9]=b7S.l1o()[X4AA.G1o]')}
            // if (code.includes('i5d[9]=b7S.l1o()[X4AA.G1o]')) {code = code.replace('i5d[9]=b7S.l1o()[X4AA.G1o]','debugger;i5d[9]=b7S.l1o()[X4AA.G1o]')}

            // 第一次跑的时候
            // return eval('debugger;' + code)
            return eval(code)

        }
    });
    let vValue;
    const mobileUrl = "https://www.supremenewyork.com/mobile/";
    mainPage.on("request", async (request) => {
        if (request.url().indexOf("/checkOrder") > -1 || request.url().indexOf("/mobile_stock.json") > -1
            || request.url().indexOf(".jpg") > -1 || request.url().indexOf(".gif") > -1
            || request.url().indexOf("google-analytics") > -1) {
            request.respond({ status: 404 });
        } else if (request.url().indexOf("ticket.js") > -1) {
            let requestLib = require("request");

            requestLib(request.url(), function (err, res, code) {
                //inject your own ticket here
                code = codeReplacement(inject);
                request.respond({
                    status: 200,
                    contentType: res.headers["content-type"],
                    body: code,
                });
            });
        } else if (request.url().indexOf("live.json") > -1) {
            let requestLib = require("request");

            requestLib(request.url(), function (err, res) {
                vValue = JSON.parse(res.body);
                request.respond({
                    status: 200,
                    contentType: res.headers["content-type"],
                    body: res.body,
                });
            });
        } else {
            request.continue();
        }
    });

    function codeReplacement(code) {
        code = code.replace(/eval/g, "emal");
        return code;
    }
    await mainPage.evaluateOnNewDocument(fs.readFileSync("./esprima.js", "utf8"));
    await mainPage.goto(mobileUrl, {
        waitUntil: "domcontentloaded",
        timeout: 0,
    });
    await mainPage.waitForFunction(() => document.cookie.includes("ntbcc"));

    let arrays = await mainPage.evaluate(() => {
        return { left: window.headArrLeft, right: window.headArrRight };
    });

    const fullCookies = await mainPage.cookies();

    // let nameArrays = await mainPage.evaluate(() => {
    //     return window.varName;
    // });
    // console.dir(nameArrays, {'maxArrayLength': null});
    // nameArrays = nameArrays.toString();
    // let arrs = nameArrays.split(",");
    // for (const value of arrs) {
    //     if (value.toString().includes("prob")) {
    //         console.log("found: " + value)
    //     }
    // }

    //await browser.close();
    console.log(arrays);
    return {
        vValue,
        arrays,
        fullCookies,
    };
}

exports.run = async function (inject) {

    let results = await runSetup(inject);
    let possibleBodies = [];
    let possibleKeys = [];

    results.arrays.left.forEach((x,i)=>{
        if ( (results.arrays.right[i-1] == results.arrays.right[i-3] || ((~~ results.arrays.right[i-1]) == results.arrays.right[i-3]))
            && (results.arrays.right[i] == results.arrays.right[i-2] || ((~~ results.arrays.right[i]) == results.arrays.right[i-2]))
            && results.arrays.left[i] == 2 && results.arrays.left[i-2] == 4294967296  ){
            possibleKeys.push(results.arrays.right[i-2])
        }
    });
    for (let i = 0; i <= possibleKeys.length - 48; i++) {
        possibleBodies.push([]);
        let index = 0;
        for (let j = i; j < possibleKeys.length; j = j + 4) {
            possibleBodies[i].push(possibleKeys[j]);
            index++;
            if (index >= 12) {
                break;
            }
        }
    }

    let ntbcc = results.fullCookies.find((c) => c.name === "ntbcc") ? results.fullCookies.find((c) => c.name === "ntbcc").value : null;
    let vvv = results.fullCookies.find((c) => c.name === "vvv") ? results.fullCookies.find((c) => c.name === "vvv").value : null;
    let hnkdtrace = results.fullCookies.find((c) => c.name === "hnkdtrace") ? results.fullCookies.find((c) => c.name === "hnkdtrace").value : null;
    let keyObj = null;
    let vkeyObj = null;

    for (let i = 0; i < possibleBodies.length; i++) {
        let keys = reverseKey(possibleBodies[i].slice(4, 12));
        let tempKey = keys.slice(4, 8);
        if (possibleBodies[i].slice(0, 4).every((value, ind) => value === tempKey[ind])) {
            let shrunkenKey = [];
            for (let keyRoundKeyIndex = 0; keyRoundKeyIndex < keys.length; keyRoundKeyIndex++) {
                const keyRoundKey = keys[keyRoundKeyIndex];
                shrunkenKey.push((keyRoundKey >> 24) & 0xff);
                shrunkenKey.push((keyRoundKey >> 16) & 0xff);
                shrunkenKey.push((keyRoundKey >> 8) & 0xff);
                shrunkenKey.push(keyRoundKey & 0xff);
            }
            keyObj = shrunkenKey;
        }
        if (keyObj) {
            break;
        }
    }

    //find v-key
    for (let i = 0; i < possibleBodies.length; i++) {
        reversePossibleBodies = [];
        reversePossibleBodies.push (mixcolumns(possibleBodies[i].slice(0, 4)))
        reversePossibleBodies.push (mixcolumns(possibleBodies[i].slice(4, 8)))
        reversePossibleBodies.push (mixcolumns(possibleBodies[i].slice(8, 12)))
        reversePossibleBodies = reversePossibleBodies.flat();
        let keys = reverseKey([reversePossibleBodies[4],reversePossibleBodies[5],reversePossibleBodies[6],reversePossibleBodies[7],reversePossibleBodies[0],reversePossibleBodies[1],reversePossibleBodies[2],reversePossibleBodies[3]]);
        let tempKey = keys.slice(4, 8);
        if (reversePossibleBodies.slice(8, 12).every((value, ind) => value === tempKey[ind])) {
            let shrunkenKey = [];
            for (let keyRoundKeyIndex = 0; keyRoundKeyIndex < keys.length; keyRoundKeyIndex++) {
                const keyRoundKey = keys[keyRoundKeyIndex];
                shrunkenKey.push((keyRoundKey >> 24) & 0xff);
                shrunkenKey.push((keyRoundKey >> 16) & 0xff);
                shrunkenKey.push((keyRoundKey >> 8) & 0xff);
                shrunkenKey.push(keyRoundKey & 0xff);
            }
            vkeyObj = shrunkenKey;
        }
    }

    return new Promise(function (resolve) {
        resolve({
            v: results.vValue,
            ntbcc,
            hnkdtrace,
            key: keyObj,
            vkey: vkeyObj,
        });
    });
};

function reverseKey(key) {
    for (let keyIndex = KC - 1; keyIndex > KC / 2; keyIndex--) {
        key[keyIndex] ^= key[keyIndex - 1];
    }
    let tt = key[KC / 2 - 1];
    key[KC / 2] ^= S[tt & 0xff] ^ (S[(tt >> 8) & 0xff] << 8) ^ (S[(tt >> 16) & 0xff] << 16) ^ (S[(tt >> 24) & 0xff] << 24);
    for (let keyIndex = KC / 2 - 1; keyIndex > 0; keyIndex--) {
        key[keyIndex] ^= key[keyIndex - 1];
    }
    tt = key[KC - 1];
    key[0] ^= (S[(tt >> 16) & 0xff] << 24) ^ (S[(tt >> 8) & 0xff] << 16) ^ (S[tt & 0xff] << 8) ^ S[(tt >> 24) & 0xff] ^ (rcon[0] << 24);
    return key;
}


function mixcolumns(int32Array){
    let s = [[],[],[],[]]
    s[0][0]= (int32Array[0] >> 24) & 0xFF
    s[1][0]= (int32Array[0] >> 16) & 0xFF
    s[2][0]= (int32Array[0] >> 8) & 0xFF
    s[3][0]= (int32Array[0] >> 0) & 0xFF
    s[0][1]= (int32Array[1] >> 24) & 0xFF
    s[1][1]= (int32Array[1] >> 16) & 0xFF
    s[2][1]= (int32Array[1] >> 8) & 0xFF
    s[3][1]= (int32Array[1] >> 0) & 0xFF
    s[0][2]= (int32Array[2] >> 24) & 0xFF
    s[1][2]= (int32Array[2] >> 16) & 0xFF
    s[2][2]= (int32Array[2] >> 8) & 0xFF
    s[3][2]= (int32Array[2] >> 0) & 0xFF
    s[0][3]= (int32Array[3] >> 24) & 0xFF
    s[1][3]= (int32Array[3] >> 16) & 0xFF
    s[2][3]= (int32Array[3] >> 8) & 0xFF
    s[3][3]= (int32Array[3] >> 0) & 0xFF

    for (var c=0; c<4; c++) {
        var a = new Array(4);  // 'a' is a copy of the current column from 's'
        var b = new Array(4);  // 'b' is a•{02} in GF(2^8)
        for (var i=0; i<4; i++) {
        a[i] = s[i][c];
        b[i] = s[i][c]&0x80 ? s[i][c]<<1 ^ 0x011b : s[i][c]<<1;

        }
        // a[n] ^ b[n] is a•{03} in GF(2^8)
        s[0][c] = b[0] ^ a[1] ^ b[1] ^ a[2] ^ a[3]; // 2*a0 + 3*a1 + a2 + a3
        s[1][c] = a[0] ^ b[1] ^ a[2] ^ b[2] ^ a[3]; // a0 * 2*a1 + 3*a2 + a3
        s[2][c] = a[0] ^ a[1] ^ b[2] ^ a[3] ^ b[3]; // a0 + a1 + 2*a2 + 3*a3
        s[3][c] = a[0] ^ b[0] ^ a[1] ^ a[2] ^ b[3]; // 3*a0 + a1 + a2 + 2*a3
    }

    j=[];
    j[0]= (s[0][0]<<24) | (s[1][0] <<16 ) | (s[2][0] <<8) | (s[3][0]);
    j[1]= (s[0][1]<<24) | (s[1][1] <<16 ) | (s[2][1] <<8) | (s[3][1]);
    j[2]= (s[0][2]<<24) | (s[1][2] <<16 ) | (s[2][2] <<8) | (s[3][2]);
    j[3]= (s[0][3]<<24) | (s[1][3] <<16 ) | (s[2][3] <<8) | (s[3][3]);
    return j;
}
