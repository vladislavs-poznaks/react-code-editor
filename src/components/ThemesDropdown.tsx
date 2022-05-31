import React from "react";

import Select from "react-select";

import {themes} from "../constants/themes";
import {selectStyles} from "../constants/selectStyles";
import {ITheme} from "../constants/interfaces";

interface IProps {
    onChange: (theme: ITheme | null) => void;
    theme: ITheme | undefined
}

const ThemesDropdown = ({onChange, theme}: IProps) => {
    return (
        <Select
            placeholder="Select theme"
            styles={selectStyles}
            options={themes}
            defaultValue={theme}
            onChange={onChange}
        />
    )
}

export default ThemesDropdown
