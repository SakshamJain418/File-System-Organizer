#!/usr/bin/env node

let fs = require("fs");
let path = require("path")
let helpObj = require("./commands/help");
let organizeObj = require("./commands/organize")
let treeObj = require("./commands/tree")

let inputArr = process.argv.slice(2);

// node main.js organize "directory path"
// node main.js tree "directory path"
// node main.js help

let command = inputArr[0];


switch(command) {
    case "tree":
       treeObj.treeKey(inputArr[1]);
        break;
    case "organize":
        organizeObj.organizeKey(inputArr[1]);
        break;
    case "help":
        helpObj.helpKey();
        break;
    default:
        console.log("Please Enter Valid Command");
        console.log("Or Please type saksham help to see valid command's");
}





