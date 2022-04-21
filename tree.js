let fs = require("fs");
let path = require("path")

function treeFn(dirPath) {
    if(dirPath == undefined) {
        // console.log("Please enter directory path");
        treeHelper(process.cwd(), " ");
        return;
    }

    let isValidPath = fs.existsSync(dirPath);

    if(isValidPath == true) {
        treeHelper(dirPath, " ");
    }
    else {
        console.log("Please enter valid directory path");
        return;
    }
}

function treeHelper(dirPath,indent) {
    // Is file or folder
    let isFile = fs.lstatSync(dirPath).isFile();

    if(isFile == true) {
        let fileName = path.basename(dirPath);
        console.log(indent + "├── " + fileName);
    }
    else {
        let dirName = path.basename(dirPath);
        console.log(indent + "└── " + dirName);

        let childrens = fs.readdirSync(dirPath);

        for(let i=0; i<childrens.length; i++) {
            let childAddress = path.join(dirPath,childrens[i])
            treeHelper(childAddress,indent + "\t");
        }
    }
}


module.exports = {
    treeKey : treeFn
}
