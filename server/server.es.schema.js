export const elasticSearchSchema = {
    size: 100,
    from: 0,
    query: {
        match_all: {}
    }
}

export const vueelasticSearchSchema =  {
    size: 100,
    from: 0,
    query: {
        multi_match: {
            query: '',
            type: 'bool_prefix',
            fields: ['cast_name', 'og_name']
        }
    }
}