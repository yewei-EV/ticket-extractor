// const { run, getNtbcc } = require("./slice-ticket.js");
const { run } = require("./ticket_eval.js");
const fs = require("fs");
const fetch = require("node-fetch");
const aesjs = require("aes-js");

const crypto = require("crypto");
fetch("https://www.supremenewyork.com/ticket.js")
    .then((res) => res.text())
    .then(async (res) => {
        res = await fs.readFileSync('ticketdown.js','utf-8')
        result = await run(res);
        // result.ntbcc =  replace ur browser/bot's ntbcc here
        ivHEX = result.ntbcc.substring(result.ntbcc.length - 32);
        iv = aesjs.utils.hex.toBytes(ivHEX);
        encryptedHEX = result.ntbcc.substring(0, result.ntbcc.length - 32);
        encryptedBytes = aesjs.utils.hex.toBytes(encryptedHEX);
        aesCbc = new aesjs.ModeOfOperation.cbc(result.key, iv);
        decryptedBytesNTBCC = aesCbc.decrypt(encryptedBytes);

        //v key you could ignore the below as it's genned by v from live.json itself, can't control the value
        v = result.v.v;
        ivHEX = v.substring(v.length - 32);
        iv = aesjs.utils.hex.toBytes(ivHEX);
        encryptedHEX = v.substring(0, v.length - 32);
        encryptedBytes = aesjs.utils.hex.toBytes(encryptedHEX);
        aesCbc = new aesjs.ModeOfOperation.cbc(result.vkey, iv);
        decryptedBytesV = aesCbc.decrypt(encryptedBytes);

        console.log(decryptedBytesNTBCC);//ntbcc value
        console.log(decryptedBytesV);// v value
        console.log(result.key)//ntbcc key
        console.log(result.vkey) // v key
    });
