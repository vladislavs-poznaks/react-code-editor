import React, {useState} from "react";
import Editor from "@monaco-editor/react";
import useStore from "../stores/Store";

interface IProps {
    onChange: (action: string, data: string) => void,
    language: string,
    // code: string,
    theme: string
}

const CodeEditor = ({ onChange, language, theme}: IProps) => {
    const code = useStore(state => state.code)

    const [value, setValue] = useState<string | undefined>(code || '')

    const handleChange = (value: string | undefined) => {
        setValue(value)

        if (value) {
            onChange('code', value)
        }
    }

    return (
        <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl">
            <Editor
                height={`85vh`}
                width={`100%`}
                language={language || 'javascript'}
                value={value}
                theme={theme}
                defaultValue='// some comment'
                onChange={handleChange}
            />
        </div>
    )
}

export default CodeEditor
