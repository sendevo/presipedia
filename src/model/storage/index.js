import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

// Storage target
const DATA_DIR = Directory.Data;
const DOC_DIR = Directory.Documents; // Check permissions

export const readFile = filename => {
    return Filesystem.readFile({
        path: filename,
        directory: DATA_DIR,
        encoding: Encoding.UTF8
    }); 
};

export const writeFile = (data, filename, dir="default", encoding="utf8") => {
    return Filesystem.writeFile({
        data: data, 
        path: filename,
        directory: dir==="default" ? DATA_DIR : DOC_DIR,
        replace: true,
        recursive: true,
        encoding: encoding === "utf8" ? Encoding.UTF8 : undefined
    }); 
};

export const deleteFile = filename => {
    return Filesystem.deleteFile({
        path: filename,        
        directory: DATA_DIR
    });
};

export const listDirectory = () => {
    return Filesystem.readdir({
        directory: DATA_DIR,
        path: ""
    });
};