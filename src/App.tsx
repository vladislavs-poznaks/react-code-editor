import React, {useEffect, useState} from 'react';

import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import CodeEditor from "./components/CodeEditor";
import LanguagesDropdown from "./components/LanguagesDropdown";
import ThemesDropdown from "./components/ThemesDropdown";

import {ILanguage, languages} from "./constants/languages";
import {themes} from "./constants/themes";
import {defineTheme} from "./lib/themes";
import OutputDetails from "./components/OutputDetails";
import {IOutputDetails, ITheme} from "./constants/interfaces";
import InputWindow from "./components/InputWindow";
import OutputWindow from "./components/OutputWindow";
import useKeyPress from "./hooks/keyPress";

const defaultCode = '// some comment'

const App = () => {
    const [code, setCode] = useState<string>(defaultCode)

    const [input, setInput] = useState<string>('')

    const [outputDetails, setOutputDetails] = useState<IOutputDetails>({
        status: undefined,
        memory: undefined,
        time: undefined,
        compile_output: '',
        stdout: '',
        stderr: ''
    })
    const [processing, setProcessing] = useState<boolean>(false)

    const [language, setLanguage] = useState<ILanguage>(languages.find(language => language.value === 'javascript') || languages[0])
    const [theme, setTheme] = useState<ITheme>(themes.find(theme => theme.value === 'cobalt') || themes[0])

    const enterPress = useKeyPress('Enter')
    const ctrlPress = useKeyPress('Control')

    const onLanguageChange = (language: ILanguage | null) => {
        if (language) {
            setLanguage(language)
        }
    }

    const onThemeChange = (theme: ITheme | null) => {
        if (theme) {
            // @ts-ignore
            defineTheme(theme).then(() => setTheme(theme))
        }
    }

    const onChange = (action: string, data: string) => {
        switch (action) {
            case 'code':
                setCode(data)
                break
            default:
                console.warn(`Case ${action} not handled!`)
        }
    }

    const handleCompile = () => {
        setProcessing(true)

        const data = {
            language_id: language?.id,
            source_code: btoa(code),
            stdin: btoa(input)
        }

        console.log(process.env.REACT_APP_RAPID_API_HOST)

        const options = {
            method: 'POST',
            url: process.env.REACT_APP_RAPID_API_URL,
            params: {base64_encoded: "true",  fields: '*'},
            headers: {
                'content-type': 'application/json',
                'Content-type': 'application/json',
                'X-RapidAPI-Host': process.env.REACT_APP_RAPID_API_HOST,
                'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
            },
            data: data
        }

        axios
            // @ts-ignore
            .request(options)
            .then(res => {
                console.log(res.data)

                const token = res.data.token
                checkStatus(token)
            })
            .catch(err => {
                let error = err.response ? err.response.data : err;
                setProcessing(false);

                console.log(error);
            })
    }

    const checkStatus = async (token: string) => {
        const options = {
            method: 'GET',
            url: process.env.REACT_APP_RAPID_API_URL + '/' + token,
            params: { base64_encoded: 'true', fields: '*' },
            headers: {
                'X-RapidAPI-Host': process.env.REACT_APP_RAPID_API_HOST,
                'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
            },
        };
        try {
            // @ts-ignore
            let res = await axios.request(options);
            let statusId = res.data.status?.id;

            // Processed - we have a result
            if (statusId === 1 || statusId === 2) {
                // still processing
                setTimeout(() => {
                    checkStatus(token)
                }, 2000)
                return
            } else {
                setProcessing(false)
                setOutputDetails(res.data)

                showSuccessToast(`Compiled Successfully!`)
                return
            }
        } catch (err) {
            setProcessing(false);
            // @ts-ignore
            showErrorToast(err);
        }
    }

    useEffect(() => {
        if (enterPress && ctrlPress) {
            handleCompile()
        }
    }, [enterPress, ctrlPress])

    useEffect(() => {
        if (theme) onThemeChange(theme)
    }, [])

    const showSuccessToast = (msg: string) => {
        toast.success(msg || `Compiled Successfully!`, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    const showErrorToast = (msg: string) => {
        toast.error(msg || `Something went wrong! Please try again.`, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <div className="h-4 w-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500"/>
            <div className="flex flex-row">
                <div className="px-4 py-2">
                    <LanguagesDropdown
                        onChange={onLanguageChange}
                        language={language}
                    />
                </div>
                <div className="px-4 py-2">
                    <ThemesDropdown
                        onChange={onThemeChange}
                        theme={theme}
                    />
                </div>
            </div>
            <div className="flex flex-row space-x-4 items-start px-4 py-4">
                <div className="flex flex-col w-full h-full justify-start items-end">
                    <CodeEditor
                        code={code}
                        onChange={onChange}
                        language={language.value}
                        theme={theme.value}
                    />
                </div>
                <div className="right-container flex flex-shrink-0 w-[30%] flex-col">

                    <OutputWindow details={outputDetails} />

                    <div className="flex flex-col items-end">

                        <InputWindow
                            input={input}
                            setInput={setInput}
                        />

                        <button
                            onClick={handleCompile}
                            disabled={!code || processing}
                            className={`mt-4 border-2 border-black z-10 rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-white flex-shrink-0 ${!code || processing ? "opacity-50" : ""}`}
                        >
                            {processing ? "Processing..." : "Compile and Execute"}
                        </button>
                    </div>

                    {outputDetails?.status && <OutputDetails details={outputDetails} />}

                </div>
            </div>

            {/*<Footer />*/}
        </>
    );
}

export default App;
