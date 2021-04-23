import React from 'react';
import { ExtractIdFromUrl } from '../../utilityFunctions/RoutingFunctions';
function DeleteAccount({ match, history }) {
    const id = ExtractIdFromUrl(match.url);
    console.log(id);
}