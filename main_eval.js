// const { run, getNtbcc } = require("./slice-ticket.js");
const { run } = require("./ticket_eval.js");
const fs = require("fs");
const fetch = require("node-fetch");
const aesjs = require("aes-js");

const crypto = require("crypto");
fetch("https://www.supremenewyork.com/ticket.js")
    .then((res) => res.text())
    .then(async (res) => {
        // res = await fs.readFileSync('ticketeu.js','utf-8')
        result = await run(res);
        // result.ntbcc =  replace ur browser/bot's ntbcc here
        ivHEX = result.ntbcc.substring(result.ntbcc.length - 32);
        iv = aesjs.utils.hex.toBytes(ivHEX);
        encryptedHEX = result.ntbcc.substring(0, result.ntbcc.length - 32);
        encryptedBytes = aesjs.utils.hex.toBytes(encryptedHEX);
        aesCbc = new aesjs.ModeOfOperation.cbc(result.key, iv);
        decryptedBytesNTBCC = aesCbc.decrypt(encryptedBytes);

        //v key you could ignore the below as it's genned by v from live.json itself, can't control the value
        // v = result.v.v;
        // ivHEX = v.substring(v.length - 32);
        // iv = aesjs.utils.hex.toBytes(ivHEX);
        // encryptedHEX = v.substring(0, v.length - 32);
        // encryptedBytes = aesjs.utils.hex.toBytes(encryptedHEX);
        // aesCbc = new aesjs.ModeOfOperation.cbc(result.vkey, iv);
        // decryptedBytesV = aesCbc.decrypt(encryptedBytes);

        console.log("Browser ntbcc value: ");
        console.log(decryptedBytesNTBCC.toString());

        ntbcc='4084edfda7fafc363441261018791190d41445f8e53ec887bc8dc63c5864246631e79dc43bb180aa141c831cf9141edaed346b4d5ff86c8d2a94a1d775488eb588f8da175ca2e56317454a0bced337ed8a1a20159d38ae6bf552430e2b9bdb4eddafe114f06015e388633f4c8f168349049e64a119ae14bf8b926989184574dce5171378bbf82ddd3d6a15d8b30aac58';
        ivHEX = ntbcc.substring(ntbcc.length - 32);
        iv = aesjs.utils.hex.toBytes(ivHEX);
        encryptedHEX = ntbcc.substring(0, ntbcc.length - 32);
        encryptedBytes = aesjs.utils.hex.toBytes(encryptedHEX);
        aesCbc = new aesjs.ModeOfOperation.cbc(result.key, iv);
        decryptedBytesNTBCC = aesCbc.decrypt(encryptedBytes);

        console.log("Input ntbcc value: ");
        console.log(decryptedBytesNTBCC.toString());

        // console.log("v value: ");
        // console.log(decryptedBytesV);// v value
        // console.log("ntbcc key: ");
        // console.log(result.key)//ntbcc key
        // console.log("v key: ");
        // console.log(result.vkey) // v key
    });
