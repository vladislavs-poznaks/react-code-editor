import create from 'zustand'
import {IStore} from "../constants/interfaces";
import {persist} from "zustand/middleware";

const useStore = create<IStore>()(persist((set) => ({
    code: '',
    setCode: (code: string) => set(state => ({
        code: code
    }))
}), {
    name: "task-storage"
}))

export default useStore
