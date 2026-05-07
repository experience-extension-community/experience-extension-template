module.exports = {
    name: 'SampleBoilerplate',
    publisher: 'Sample',
    cards: [{
        type: 'SampleBoilerplateCard',
        source: './src/cards/SampleBoilerplateCard',
        title: 'SampleBoilerplate Card',
        displayCardType: 'SampleBoilerplate Card',
        description: 'This is an introductory card to the Ellucian Experience SDK',
        pageRoute: {
            route: '/',
            excludeClickSelectors: ['a']
        }
    }],
    page: {
        source: './src/page/router.jsx'
    }
};