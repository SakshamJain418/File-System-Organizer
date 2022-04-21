let fs = require("fs");
let path = require("path")

let types = {
    media : ["mp4", "mkv", "mp3", "png", "jpg"],
    archives : ["zip", "7z", "rar", "tar", "gz", "ar", "iso", "xz"],
    documents : [
        "docx",
        "doc",
        "pdf",
        "xlsx",
        "xls",
        "odt",
        "ods",
        "odp",
        "odg",
        "odf",
        "txt",
        "ps",
        "tex"
    ],
    app : ["exe", "dmg", "pkg", "deb"],
}

function organizeFn(dirPath) {
    // console.log("organize command implemented for ", dirPath);
    // 1. input -> directory path
    let destPath;
    if(dirPath == undefined) {
        // console.log("Please enter a directory path");
        createDirectory(process.cwd());
    }
    else {
        createDirectory(dirPath);
    }

    console.log("files organized sucessfully");
}

function createDirectory(dirPath) {
    let doesExists =  fs.existsSync(dirPath);
    if(doesExists == true) {
        // 2. create -> directory inside input directory with name organized_files
        destPath = path.join(dirPath,"organized_files")
        
        if(fs.existsSync(destPath) == false) {
            fs.mkdirSync(destPath);
        }
    }
    else {
        console.log("Please enter a valid directory path");
        return;
    }

    organizeHelper(dirPath,destPath);
}

function organizeHelper(src,dest) {
    // 3. idnetify all files present in src directory with thair extensions

    let childNames = fs.readdirSync(src);
    // console.log(childNames);

    for(let i=0; i<childNames.length; i++) {
        let chlidAddress = path.join(src, childNames[i]);
        let isFile = fs.lstatSync(chlidAddress).isFile();

        if(isFile == true) {
            // console.log(childNames[i]);

            let category = getCategory(childNames[i]);
            // console.log(childNames[i] + " belongs to " + category)

            sendFiles(chlidAddress,dest,category);

            // 4. input d  irectory files copy / cut -> inside organized_files directory, inside category wise directory created
        }
    }
}

function sendFiles(srcFile,dest,category) {
    let categoryPath = path.join(dest,category);

    if(fs.existsSync(categoryPath) == false) {
        fs.mkdirSync(categoryPath);
    }

    let fileName = path.basename(srcFile);
    let destFilePath = path.join(categoryPath,fileName)
    fs.copyFileSync(srcFile,destFilePath);
    fs.unlinkSync(srcFile)
}

function getCategory(name) {
    let ext = path.extname(name);
    ext = ext.slice(1);

    for(let type in types) {
        let cTypeArray = types[type];
        for(let i=0; i<cTypeArray.length; i++) {
            if(ext == cTypeArray[i]) {
                return type;
            }
        }
    }
    return 'others'
}

module.exports = {
    organizeKey : organizeFn
}
