import { WithStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import React from 'react';
import * as startPage from '../../store/startPage';
import {
    Buttons,
    Container,
    Inner,
    NextButton,
    PrevButton,
    Subtitle,
    Title,
} from './FormStep';
import styles from './styles';

export interface IdeaStepProps extends WithStyles<typeof styles> {
    readonly value: string;
    readonly setDescription: typeof startPage.setDescription;
    readonly nextStep: typeof startPage.nextStep;
    readonly prevStep: typeof startPage.prevStep;
}

function IdeaStep({
    classes,
    value,
    setDescription,
    nextStep,
    prevStep,
}: IdeaStepProps) {
    return (
        <Container classes={classes}>
            <Title classes={classes}>Describe what you’ll be creating.</Title>
            <Subtitle classes={classes}>
                And don’t worry, you can edit this later, too.
            </Subtitle>
            <Inner classes={classes}>
                <TextField
                    id='description'
                    placeholder='An album of songs based on Pablo Neruda poems.'
                    value={value}
                    onChange={(e) => setDescription(e.target.value)}
                    multiline
                    rowsMax='4'
                    helperText={`${value.length} / 135`}
                    fullWidth
                />
            </Inner>
            <Buttons classes={classes}>
                <PrevButton classes={classes} prevStep={prevStep}>
                    Category
                </PrevButton>
                <NextButton
                    classes={classes}
                    nextStep={nextStep}
                    disabled={value.length === 0 || value.length > 135}
                >
                    Next: Chain
                </NextButton>
            </Buttons>
        </Container>
    );
}

export default IdeaStep;
