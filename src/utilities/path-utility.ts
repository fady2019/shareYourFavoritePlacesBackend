import path from 'path';
import url from 'url';
import { Request } from 'express';

export const backStep = path.join('..', path.sep);

export const rootPath = path.dirname(path.join(require.main?.filename || '', backStep));

export const getPathParts = (pathStr: string) => {
    return path
        .normalize(pathStr)
        .split(path.sep)
        .filter((p) => p.trim() !== '');
};

export const getURL = (req: Request) => {
    return req.protocol + '://' + req.get('host') + '/';
};

export const getPathFromURL = (urlStr: string) => {
    return url.parse(urlStr).pathname;
};
