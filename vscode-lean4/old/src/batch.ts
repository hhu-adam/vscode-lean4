import { NotebookCellOutput, OutputChannel } from 'vscode'
import { spawn } from 'child_process';

export async function batchExecuteFile(
    executablePath: string,
    args: any[],
    workingDirectory: string,
    channel: OutputChannel): Promise<string[]> {

    return new Promise(function(resolve, reject){
        let output : string[] = []

        const exe = spawn(executablePath, args,
            { cwd: workingDirectory, env: {} /* TODO(gabriel): take from server */ });

        exe.stdout.on('data', (line) => {
            channel.appendLine(line);
            output.push(line)
        });

        exe.stderr.on('data', (line) => {
            channel.appendLine(line);
            output.push(line)
        });

        exe.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
            resolve(output)
        });

    });

}
