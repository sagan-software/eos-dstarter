import { FormControl, Paper } from '@material-ui/core';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { WithStyles } from '@material-ui/core/styles';
import React from 'react';
import {
    Category,
    getPrimaryCategoryName,
    primaryCategories,
} from '../../store/projects';
import * as startPage from '../../store/startPage';
import styles from '../../styles/startPage';
import {
    Buttons,
    Container,
    Inner,
    NextButton,
    Subtitle,
    Title,
} from './FormStep';

export interface CategoryStepProps extends WithStyles<typeof styles> {
    readonly value: Category;
    readonly setCategory: typeof startPage.setCategory;
    readonly nextStep: typeof startPage.nextStep;
}

function CategoryStep({
    classes,
    value,
    setCategory,
    nextStep,
}: CategoryStepProps) {
    return (
        <Container classes={classes}>
            <Title classes={classes}>First, lets get you set up.</Title>
            <Subtitle classes={classes}>
                Pick a project category to connect with a specific community.
                You can always update this later.
            </Subtitle>
            <Inner classes={classes}>
                <Select
                    value={value}
                    onChange={(e) => setCategory(parseInt(e.target.value, 10))}
                    displayEmpty
                    fullWidth
                    classes={{
                        icon: classes.categorySelectIcon,
                        selectMenu: classes.categorySelectMenu,
                    }}
                >
                    <MenuItem value={undefined}>Select your category</MenuItem>
                    {primaryCategories.map((c) => (
                        <MenuItem key={c} value={c}>
                            {getPrimaryCategoryName(c)}
                        </MenuItem>
                    ))}
                </Select>
            </Inner>
            <Buttons classes={classes}>
                <div />
                <NextButton
                    classes={classes}
                    nextStep={nextStep}
                    disabled={!value}
                >
                    Next: Project Idea
                </NextButton>
            </Buttons>
        </Container>
    );
}

export default CategoryStep;
