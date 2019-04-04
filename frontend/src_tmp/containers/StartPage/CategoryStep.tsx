import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { WithStyles } from '@material-ui/core/styles';
import React from 'react';
import * as Page from '../../components/Page';
import * as Store from '../../store';
import styles from '../../styles/startPage';
import { Buttons, Container, Inner, NextButton } from './FormStep';

export interface CategoryStepProps extends WithStyles<typeof styles> {
    readonly category: Store.Projects.Category;
    readonly setCategory: typeof Store.StartPage.setCategory;
    readonly nextStep: typeof Store.StartPage.nextStep;
}

function CategoryStep({
    classes,
    category,
    setCategory,
    nextStep,
}: CategoryStepProps) {
    return (
        <Container classes={classes}>
            <Page.Title>First, lets get you set up.</Page.Title>
            <Page.Subtitle>
                Pick a project category to connect with a specific community.
                You can always update this later.
            </Page.Subtitle>
            <Inner classes={classes}>
                <Select
                    value={category}
                    onChange={(e) => setCategory(parseInt(e.target.value, 10))}
                    displayEmpty
                    fullWidth
                    classes={{
                        icon: classes.categorySelectIcon,
                        selectMenu: classes.categorySelectMenu,
                    }}
                >
                    <MenuItem value={undefined}>Select your category</MenuItem>
                    {Store.Projects.primaryCategories.map((c) => (
                        <MenuItem key={c} value={c}>
                            {Store.Projects.getPrimaryCategoryName(c)}
                        </MenuItem>
                    ))}
                </Select>
            </Inner>
            <Buttons classes={classes}>
                <div />
                <NextButton
                    classes={classes}
                    nextStep={nextStep}
                    disabled={!category}
                >
                    Next: Project Idea
                </NextButton>
            </Buttons>
        </Container>
    );
}

const mapStateToProps = (state: Store.Root.State) => ({
    category: state.startPage.category,
});

export default Store.connect(mapStateToProps, {
    setCategory: Store.StartPage.setCategory,
    nextStep: Store.StartPage.nextStep,
})(CategoryStep);
