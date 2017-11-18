const path = require('path');

const generateEndpoints = require('./endpoints');

const scriptName = path.basename(__filename, '.js');
const categoryName = `${scriptName.charAt(0).toUpperCase()}${scriptName.slice(1)}`;

const apiVersion = '2011-07-01';

const endpointList = [
    'ListMarketplaceParticipations',
    'ListMarketplaceParticipationsByNextToken',
];

const newEndpointList = {
    ListMarketplaceParticipations: {
        throttle: {
            maxInFlight: 15,
            restoreRate: 60,
        },
        params: {
        },
        returns: {
            NextToken: {
                type: 'xs:string',
                required: false,
            },
            ListParticipations: {
                type: 'Participation',
                required: true,
            },
            ListMarketplaces: {
                type: 'Marketplace',
                required: true,
            }
        }
    },
    ListMarketplaceParticipationsByNextToken: {
        throttle: {
            maxInFlight: 15,
            restoreRate: 60,
        },
        params: {
            NextToken: {
                type: 'xs:string',
                required: true,
            },
        },
        returns: {
            NextToken: {
                type: 'xs:string',
                required: false,
            },
            ListParticipations: {
                type: 'Participation',
                required: true,
            },
            ListMarketplaces: {
                type: 'Marketplace',
                required: true,
            }
        }
    },
    GetServiceStatus: {
        throttle: {
            maxInFlight: 2,
            restoreRate: 12,
        },
        params: {
        },
        returns: {
            // TODO: see http://docs.developer.amazonservices.com/en_US/sellers/Sellers_GetServiceStatus.html
            // TODO: these return values need investigating for implementing validation, as the
            // TODO: code description in this segment is not exactly correct, and the doc page
            // TODO: isn't very good.
            Status: {
                type: 'xs:string',
                values: [ 'GREEN', 'YELLOW', 'RED' ],
                required: true,
            },
            Timestamp: {
                type: 'xs:dateTime',
                required: true,
            },
            MessageId: {
                type: 'xs:string',
                required: false,
            },
            Messages: {
                type: 'Message',
                required: false,
            },
            Message: {
                type: 'xs:string',
                required: false,
            }
        },
    }
}

const endpoints = generateEndpoints(
    categoryName,
    apiVersion,
    endpointList,
    newEndpointList,
);

module.exports = endpoints;
