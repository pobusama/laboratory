import fs from 'fs';
import path from 'path';
import {workingDir} from '../js/config';

export function fileMappingAppendPlugin(){
    fileMappingPlugin.call(this, false);
}

export function fileMappingPlugin(isInitial = true) {
    this.plugin("done", function (stats) {
        let output = {};
        let assetsByChunkName = stats.toJson().assetsByChunkName;

        for (let chunkName in assetsByChunkName) {
            let chunkValue = assetsByChunkName[chunkName],
                mainPath = "/openplatform/";

            // Webpack outputs an array for each chunkName when using sourcemaps and some plugins
            if (chunkValue instanceof Array) {
                for (let i = 0; i < chunkValue.length; i++) {
                    let asset = chunkValue[i];
                    let originalPath = asset.replace(/-[0-9a-z]+\./i, '.');
                    output[mainPath + originalPath] = mainPath + asset;
                }
            } else {
                let originalPath = chunkValue.replace(/-[0-9a-z]+\./i, '.');
                output[mainPath + originalPath] = mainPath + chunkValue;
            }
        }

        let mappingFile = path.join(workingDir, "webpack-assets.json");

        if(isInitial === true) {
            fs.writeFileSync(
                mappingFile,
                JSON.stringify(output)
            );
        } else {
            let mapping = fs.readFileSync(mappingFile);
            let mergedMapping = Object.assign({}, JSON.parse(mapping), output);
            fs.writeFileSync(
                mappingFile,
                JSON.stringify(mergedMapping)
            );
        }
    })
}
