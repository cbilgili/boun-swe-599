import React from 'react';

export function getNodeIcon(nodeType) {
    switch(nodeType) {
        case 'Goal':
            return <svg width="121" height="52" viewBox="0 0 121 52" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.5" y="0.5" width="120" height="51" rx="14.5" fill="#A0E2A3" stroke="black"/>
            </svg>;
        case 'Refinement':
            return <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="15" cy="15" r="15" fill="black"/>
            </svg>;
        case 'Exclusion':
            return <svg width="78" height="30" viewBox="0 0 78 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="15" cy="15" r="14.5" fill="#A0E2A3" stroke="black"/>
            <path d="M17.877 15.6865H13.9395V18.3525H18.5605V20H11.8887V10.0469H18.5469V11.708H13.9395V14.0801H17.877V15.6865Z" fill="black"/>
            <path d="M60.3536 15.3536C60.5488 15.1583 60.5488 14.8417 60.3536 14.6464L57.1716 11.4645C56.9763 11.2692 56.6597 11.2692 56.4645 11.4645C56.2692 11.6597 56.2692 11.9763 56.4645 12.1716L59.2929 15L56.4645 17.8284C56.2692 18.0237 56.2692 18.3403 56.4645 18.5355C56.6597 18.7308 56.9763 18.7308 57.1716 18.5355L60.3536 15.3536ZM32 15.5H60V14.5H32V15.5Z" fill="black"/>
            <path d="M70.5 8L76.9952 19.25H64.0048L70.5 8Z" fill="black"/>
            </svg>;
        default: 
            return null
    }
}

export function getTransitionIcon(transitionType) {
    if (transitionType === 'V+' || transitionType === 'V-' || transitionType === 'C+' || transitionType === 'C-') {
        return <svg width="82" height="9" viewBox="0 0 82 9" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 7.1841C11.3333 2.51743 41.8 -4.0159 81 7.1841" stroke="black"/>
        <line x1="77.3536" y1="3.64645" x2="81.3536" y2="7.64645" stroke="black"/>
        <line x1="75.9019" y1="8.50971" x2="80.9019" y2="7.50971" stroke="black"/>
        </svg>        
    } else if (transitionType === 'EXC') {

    } else {

    }
}
