import TextField from '@material-ui/core/TextField';
import React, { useCallback } from 'react';
import * as Store from '../../store';
import * as Form from './FormStep';

export default function IdeaStep() {
    const dispatch = Store.useDispatch();
    const description = Store.useMappedState(
        useCallback(Store.StartPage.getDescription, []),
    );
    return (
        <Form.Container>
            <Form.Title>Describe what you’ll be creating.</Form.Title>
            <Form.Subtitle>
                And don’t worry, you can edit this later, too.
            </Form.Subtitle>
            <Form.Inner>
                <TextField
                    id='description'
                    placeholder='An album of songs based on Pablo Neruda poems.'
                    value={description}
                    onChange={(e) => {
                        dispatch<Store.StartPage.SetDescription>({
                            type: Store.StartPage.Type.SetDescription,
                            value: e.target.value,
                        });
                    }}
                    multiline
                    rowsMax='4'
                    helperText={`${description.length} / 135`}
                    fullWidth
                    error={description.length > 135}
                />
            </Form.Inner>
            <Form.Buttons>
                <Form.PrevButton>Category</Form.PrevButton>
                <Form.NextButton
                    disabled={
                        description.length === 0 || description.length > 135
                    }
                >
                    Next: Chain
                </Form.NextButton>
            </Form.Buttons>
        </Form.Container>
    );
}
