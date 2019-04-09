import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import React, { useCallback } from 'react';
import * as Store from '../../store';
import { makeStyles } from '../../styles';
import * as Form from './FormStep';

const useStyles = makeStyles((theme) => ({
    categorySelectMenu: {
        padding: theme.spacing(2),
        fontSize: theme.typography.h6.fontSize,
    },
    categorySelectIcon: {
        right: theme.spacing(2),
    },
}));

export default function CategoryStep() {
    const classes = useStyles();
    const dispatch = Store.useDispatch();
    const category = Store.useMappedState(
        useCallback(Store.StartPage.getCategory, []),
    );
    return (
        <Form.Container>
            <Form.Title>First, lets get you set up.</Form.Title>
            <Form.Subtitle>
                Pick a project category to connect with a specific community.
                You can always update this later.
            </Form.Subtitle>
            <Form.Inner>
                <Select
                    value={category}
                    onChange={(e) => {
                        dispatch<Store.StartPage.SetCategory>({
                            type: Store.StartPage.Type.SetCategory,
                            value: parseInt(e.target.value, 10),
                        });
                    }}
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
            </Form.Inner>
            <Form.Buttons>
                <div />
                <Form.NextButton disabled={!category}>
                    Next: Project Idea
                </Form.NextButton>
            </Form.Buttons>
        </Form.Container>
    );
}
