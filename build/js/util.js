import fs from 'fs';
import {argv} from 'yargs';
import {localAddress, hmr, workingDir} from './config';

export function getPages(folder, isCommon = false) {
    let pages = [];
    let directories = fs.readdirSync(`${workingDir}/src/${folder}`);
    if (isCommon){
        return [folder];
    }
    for (let dir of directories) {
        if (!dir.startsWith('.')) {
            pages.push(`${folder}/${dir}`);
        }
    }

    return pages;
}

export function getEntries(pages, isHMR = true){
    let entries = {};
    for(let page of pages){
        let key = page;
        let value = `./src/${key}/app.js`;
        if(!argv.dev){
            entries[key] = value;
        } else {
            if (isHMR) {
                entries[key] = [value, hmr];
            } else {
                entries[key] = value;
            }
        }
    }
    return entries;
}
