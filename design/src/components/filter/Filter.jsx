import React from 'react';
import {DefaultInput} from './../Inputs/Input'
import Button from './../Buttons/Button'
import './style.scss';
const Filter = (props) => {
    return <div className='filter'>
        <div className='filter-group'>
            <label htmlFor='start'>Start</label>
            <DefaultInput onChange={(e)=> props.setStart(e.target.value)} type='date' id='start' />
        </div>
        <div className='filter-group'>
            <label htmlFor='end'>End</label>
            <DefaultInput onChange={(e) => props.setEnd(e.target.value)} type='date' id='end'/>
        </div>

        <Button type='button' onClick={props.filter} >Filter</Button>
    </div>
}

export default Filter;