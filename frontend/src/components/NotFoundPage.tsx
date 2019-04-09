import React from 'react';
import * as Site from './Site';

export default function NotFoundPage() {
    return (
        <Site.Skeleton>
            <Site.TopCategories />
            <h2>404 Not Found</h2>
        </Site.Skeleton>
    );
}
