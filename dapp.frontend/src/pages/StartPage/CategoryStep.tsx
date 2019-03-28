import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import React from 'react';
import {
    Category,
    getPrimaryCategoryName,
    primaryCategories,
} from '../../categories';
import FormStep from './FormStep';
import { Action, FormStepType } from './state';

export interface CategoryStepProps {
    readonly value: Category;
    readonly dispatch: React.Dispatch<Action>;
}

function CategoryStep({ value, dispatch }: CategoryStepProps) {
    return (
        <FormStep
            activeStep={FormStepType.Category}
            headline='First, lets get you set up.'
            subheading='Pick a project category to connect with a specific community. You can always update this later.'
            dispatch={dispatch}
            nextDisabled={value === 0}
        >
            <Select
                value={value}
                onChange={(e) => {
                    dispatch({
                        type: 'setCategory',
                        category: parseInt(e.target.value, 10),
                    });
                }}
                inputProps={{
                    name: 'category',
                    id: 'category',
                }}
                placeholder='Select your category'
                fullWidth
            >
                {primaryCategories.map((c) => (
                    <MenuItem key={c} value={c}>
                        {getPrimaryCategoryName(c)}
                    </MenuItem>
                ))}
            </Select>
        </FormStep>
    );
}

export default CategoryStep;
