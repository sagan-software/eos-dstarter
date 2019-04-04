import React from 'react';
import * as Site from '../../components/Site';

function HomePage() {
    return (
        <Site.Skeleton>
            <Site.TopCategories />
            <h2>Home</h2>
        </Site.Skeleton>
    );
}

export default HomePage;
