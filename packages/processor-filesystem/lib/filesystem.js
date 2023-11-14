import filesystemCLI from '@putout/cli-filesystem';
import filesystem from '@putout/operator-filesystem';
import {
    fromJS,
    toJS,
    __filesystem,
} from '@putout/operator-json';
import {isFilesystem} from './is-filesystem.cjs';

export const files = [
    '.filesystem.json',
];

export const branch = (rawSource) => {
    filesystem.init(filesystemCLI);
    
    const source = toJS(rawSource, __filesystem);
    
    return [{
        source,
    }];
};

export const merge = (rawSource, list) => {
    filesystem.deinit(filesystemCLI);
    
    const [source] = list.filter(isFilesystem);
    
    return fromJS(source, __filesystem);
};
