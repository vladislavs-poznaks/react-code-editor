export interface ILanguage {
    id: number,
    name: string,
    value: string,
    label: string
}

export const languages: ILanguage[] = [
    {
        id: 46,
        name: "Bash (5.0.0)",
        label: "Bash (5.0.0)",
        value: "bash",
    },
    {
        id: 54,
        name: "C++ (GCC 9.2.0)",
        label: "C++ (GCC 9.2.0)",
        value: "c++",
    },
    {
        id: 60,3
        name: "Go (1.13.5)",
        label: "Go (1.13.5)",
        value: "go",
    },
    {
        id: 63,
        name: "JavaScript (Node.js 12.14.0)",
        label: "JavaScript (Node.js 12.14.0)",
        value: "javascript",
    },
    {
        id: 68,
        name: "PHP (7.4.1)",
        label: "PHP (7.4.1)",
        value: "php",
    },
    {
        id: 71,
        name: "Python (3.8.1)",
        label: "Python (3.8.1)",
        value: "python",
    },
    {
        id: 74,
        name: "TypeScript (3.7.4)",
        label: "TypeScript (3.7.4)",
        value: "typescript",
    },
]

