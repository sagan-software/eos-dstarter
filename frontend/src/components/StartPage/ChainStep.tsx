import React, { useCallback } from 'react';
import * as Store from '../../store';
import ChainsList from '../ChainsList';
import * as Form from './FormStep';

export default function ChainStep() {
    const dispatch = Store.useDispatch();
    const { chainId, chains } = Store.useMappedState(
        useCallback(
            (state) => ({
                chainId: Store.StartPage.getChainId(state),
                chains: Store.Chains.getAllOk(state),
            }),
            [],
        ),
    );

    return (
        <Form.Container>
            <Form.Title>Finally, select a blockchain.</Form.Title>
            <Form.Subtitle>
                Tell us what EOSIO blockchain you’re using before we proceed.
            </Form.Subtitle>
            <Form.Inner>
                <ChainsList
                    selected={chainId}
                    chains={chains}
                    onClick={(chain) =>
                        dispatch<Store.StartPage.SetChainId>({
                            type: Store.StartPage.Type.SetChainId,
                            value: chain.chainId,
                        })
                    }
                />
            </Form.Inner>
            <Form.Buttons>
                <Form.PrevButton>Project Idea</Form.PrevButton>
                <Form.NextButton disabled={chainId.length === 0}>
                    Continue
                </Form.NextButton>
            </Form.Buttons>
        </Form.Container>
    );
}
