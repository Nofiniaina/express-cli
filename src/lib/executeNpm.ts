import { exec } from 'child_process';

export async function executeNpm(command: string, args: string, library: any) {
  if (Array.isArray(library)) {
    library = library.join(' ');
  }

  exec(`npm ${command} ${args} ${library}`, (error, _stdout, stderr) => {

    if (error) {
      console.error("Installing dependancies error : ", error.message);
    }

    if (stderr) {
      console.error(stderr);
    }
  });
}
