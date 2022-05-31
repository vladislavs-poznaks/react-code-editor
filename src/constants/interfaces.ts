export interface ITheme {
    id: number,
    name: string,
    value: string,
    label: string
}

export interface IStatus {
    id: number,
    description: string
}

export interface IOutputDetails {
    status: {
        id: number
        description: string
    } | undefined;
    memory: string | undefined;
    time: string | undefined;
    compile_output: string;
    stdout: string;
    stderr: string;
}