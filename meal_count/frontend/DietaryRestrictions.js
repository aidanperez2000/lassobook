import React from 'react';
import { Link } from 'react-router-dom';

export default function DietaryRestrictions() {
    return (
        <div>
            <Link to = {"/"}>Back to Meal Count</Link>
            <p>This is the Dietary Restrictions Page</p>
        </div>
    );
}