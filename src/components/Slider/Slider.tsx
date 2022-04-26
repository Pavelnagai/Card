import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider/Slider';
import React from 'react';
import style from './Slider.module.css'


const DoubleSlider = () => {
    const [value, setValue] = React.useState<number[]>([0, 83]);

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
                    max={130}
                    onChange={handleChange}
                    valueLabelDisplay="on"
                    getAriaValueText={valuetext}
                />
            </Box>
        </div>


    )
};

export default DoubleSlider;