import { exec } from 'child_process';

export default async function executeNpm(command, args, library) {
    if (Array.isArray(library)) {
        library = library.join(' ');
    }

    exec(`npm ${command} ${args} ${library}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
    });
}