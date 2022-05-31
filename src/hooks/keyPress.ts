import React, {useEffect, useState} from "react";

const useKeyPress = (targetKey: string) => {
    const [keyPressed, setKeyPressed] = useState<boolean>(false)

    // @ts-ignore
    const downHandler = ({key}) => {
        if (key === targetKey) {
            setKeyPressed(true)
        }
    }

    // @ts-ignore
    const upHandler = ({key}) => {
        if (key === targetKey) {
            setKeyPressed(false)
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', downHandler)
        document.addEventListener('keyup', upHandler)

        return () => {
            document.removeEventListener('keydown', downHandler)
            document.removeEventListener('keyup', upHandler)
        }
    })

    return keyPressed
}

export default useKeyPress
