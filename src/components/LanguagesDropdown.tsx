import React, {useState} from "react";
import Select from "react-select";
import {ILanguage, languages} from "../constants/languages";
import {selectStyles} from "../constants/selectStyles";

interface IProps {
    onChange: (language: ILanguage | null) => void;
    language: ILanguage | undefined
}

const LanguagesDropdown = ({onChange, language}: IProps) => {
    return (
        <Select
            placeholder="Select language"
            styles={selectStyles}
            options={languages}
            defaultValue={language}
            onChange={onChange}
        />
    )
}

export default LanguagesDropdown
