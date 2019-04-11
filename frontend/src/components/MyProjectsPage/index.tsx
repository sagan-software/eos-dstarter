import React, { useCallback, useEffect } from 'react';
import * as Route from '../../route';
import * as Store from '../../store';
import * as Page from '../Page';
import * as Site from '../Site';

export default function MyProjectsPage() {
    const dispatch = Store.useDispatch();
    useEffect(() => {
        dispatch<Store.MyProjectsPage.Load>({
            type: Store.MyProjectsPage.Type.Load,
        });
    }, []);
    const getState = (state: Store.Root.State) => state.myProjectsPage;
    const myProjectsPage = Store.useMappedState(useCallback(getState, []));
    return (
        <Site.Skeleton>
            <Page.Header>
                <Page.Title>My Projects</Page.Title>
            </Page.Header>
            {myProjectsPage.status === Store.MyProjectsPage.Status.Loading ? (
                'Loading'
            ) : (
                <ul>
                    {myProjectsPage.projects.map((p) => (
                        <li
                            key={`${p.chainId}/${p.scopeName}/${p.projectName}`}
                        >
                            <Site.Link
                                to={Route.draft(
                                    p.chainId,
                                    p.scopeName,
                                    p.projectName,
                                )}
                            >
                                {p.projectName}
                            </Site.Link>
                        </li>
                    ))}
                </ul>
            )}
        </Site.Skeleton>
    );
}
