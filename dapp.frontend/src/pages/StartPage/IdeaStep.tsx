import TextField from '@material-ui/core/TextField';
import React from 'react';
import FormStep from './FormStep';
import { Action, FormStepType } from './state';

export interface IdeaStepProps {
    readonly value: string;
    readonly dispatch: React.Dispatch<Action>;
}

function IdeaStep({ value, dispatch }: IdeaStepProps) {
    return (
        <FormStep
            activeStep={FormStepType.Idea}
            headline='Describe what you’ll be creating.'
            subheading='And don’t worry, you can edit this later, too.'
            dispatch={dispatch}
            nextDisabled={value.length === 0 || value.length > 135}
        >
            <TextField
                id='description'
                placeholder='An album of songs based on Pablo Neruda poems.'
                value={value}
                onChange={(e) => {
                    dispatch({
                        type: 'setDescription',
                        description: e.target.value,
                    });
                }}
                multiline
                rowsMax='4'
                helperText={`${value.length} / 135`}
                fullWidth
            />
        </FormStep>
    );
}

export default IdeaStep;
