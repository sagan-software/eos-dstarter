import React from 'react';
import * as Site from '../Site';

export default function HomePage() {
    return (
        <Site.Skeleton>
            <Site.TopCategories />
            <h2>Home</h2>
        </Site.Skeleton>
    );
}
