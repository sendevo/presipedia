import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

// Storage target
const DATA_DIR = Directory.Data;
const DOC_DIR = Directory.Documents;

// localStorage keys (implement migrations if updating the following keys)
export const CANDIDATE_RESULTS_KEY = "candidate-results";
export const QUIZ_PROGRESS_KEY = "quiz-progress";

// Migrations
export const migrateLocalStorageData = (oldKey, newKey) => {
    const oldData = localStorage.getItem(oldKey);
    if(oldData){
        localStorage.setItem(newKey, oldData);
        localStorage.removeItem(oldKey);
    }
};

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