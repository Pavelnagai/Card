import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider/Slider';
import React from 'react';
import style from './Slider.module.css'
import {useAppSelector} from "../../redux/store/store";


const DoubleSlider = () => {
    const [value, setValue] = React.useState<number[]>([0, 83]);
    const maxCardsCount = useAppSelector<number>(state => state.card.maxCardsCount)

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
    };

    function valuetext(value: number) {
        return `${value}`;
    }

    return (

        <div className={style.slider}>
            <Box sx={{width: 200}}>
                <Slider
                    getAriaLabel={() => 'Temperature range'}
                    value={value}
                    max={maxCardsCount}
                    onChange={handleChange}
                    valueLabelDisplay="on"
                    getAriaValueText={valuetext}
                />
            </Box>
        </div>


    )
};

export default DoubleSlider;