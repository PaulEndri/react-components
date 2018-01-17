const fs = require('fs');

/*************************
 * All these need to be synchronous because otherwise the final requires won't work
 * because it'll attempt to load all the modules out of order and straight up not work.
 * 
 * The purpose of this file is to dynamically pull every high level component exposed
 * and then put them into an object that can be easily exported by the package
 *************************/
var components  = {};
var directories = fs.readdirSync(__dirname);

for(let directory of directories) {
    let path = `${__dirname}\\${file}`;
    let stat = fs.statSync(path);

    if(stat.isDirectory()) {
        var files = fs.readdirSync(path);

        for(let component of files) {
            let componentPath = `${path}\\${component}`;
            let componentStat = fs.statSync(componentPath);

            if(componentStat.isDirectory() === false) {
                let componentName = component.replace(".js", "");
                
                if(components[file] === undefined) {
                    modules[file] = {
                        [componentName] : require(componentPath)
                    };
                } else {
                    modules[directory][componentName] = require(componentPath);
                }
            }
        }
    }
}

module.exports = components;