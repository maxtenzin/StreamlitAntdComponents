import {Streamlit} from "streamlit-component-lib";
import React, {useEffect, useState} from "react";
import {SegmentedControl} from '@mantine/core';
import {strToNode} from "../js/segmented.react";
import {LabelComponent} from "../js/utils.react"
import "../css/segmented.css"

interface SegmentedProp {
    items: any[];
    index: number;
    label: string;
    radius: string;
    size: string;
    color: string;
    bg_color: string;
    align: any;
    position: any;
    direction: any;
    disabled: boolean;
    divider: boolean;
    grow: boolean;
    readonly: boolean;
    return_index: boolean;
    kv: any;
}


const AntdSegmented = (props: SegmentedProp) => {
    //get data
    const items = strToNode(props['items'])
    const index = String(props['index'])
    const label = props['label']
    const radius = props['radius']
    const size = props['size']
    const color = props['color']
    const bg_color = props['bg_color']
    const align = props['align']
    const position = props['position']
    const direction = props['direction']
    const disabled = props['disabled']
    const divider = props['divider']
    const grow = props['grow']
    const readonly = props['readonly']
    const return_index = props['return_index']
    const kv = props['kv']

    // component height
    useEffect(() => Streamlit.setFrameHeight())

    const [value, setValue] = useState(index)

    //callback
    const onChange = (value: string) => {
        setValue(value)
        Streamlit.setComponentValue(return_index ? Number(value) : kv[Number(value)])
    }

    const segmentedWrap = <SegmentedControl
        color={color}
        data={items}
        defaultValue={index}
        onChange={onChange}
        value={value}
        fullWidth={grow}
        disabled={disabled}
        size={size}
        radius={radius}
        orientation={direction}
        readOnly={readonly}
        className={'d-flex flex-wrap'}
        styles={(theme) => ({
            root: {
                backgroundColor: bg_color == null ? 'var(--secondary-background-color)' : bg_color,
            },
            label: {
                color: 'var(--text-color)',
                marginBottom: 0,
                '&:hover': {
                    color: 'var(--text-color)'
                },
                '&[data-active]': {
                    color: '#fff'
                },
                '&[data-active]:hover': {
                    color: '#fff'
                },
            },
            indicator: {
                backgroundColor: color == null ? 'var(--primary-color)' : 'none',
            },
            control: {
                '&:not(:first-of-type)': {
                    borderStyle: divider ? "solid" : 'none'
                }
            }
        })}
    />

    if (grow) {
        return segmentedWrap
    } else {
        return <LabelComponent
            label={label}
            align={align}
            position={position}
            children={segmentedWrap}
        />
    }
};

export default AntdSegmented
