<template>
  <v-card>
    <v-card-title>
      Vue Elastic Data
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="vueelastics"
      :items-per-page="5"
      class="elevation-1"
      :search="search"
    ></v-data-table>
  </v-card>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'
import gql from 'graphql-tag';
// import allVueElastic from '~/apollo/queries/allVueElastic'

const GET_ALL_VUEELASTIC = gql`
  {
    vueelastics {
      cast_name
      og_name
      url
    }
  }
`;

/* const GET_VUEELASTIC = gql`
  query vueelastic($queryString: String) {
    vueelastic (cast_name: $queryString, og_name: $queryString ) {
      cast_name
      og_name
      url
    }
  }
`; */
const GET_VUEELASTIC = gql`
  query vueelastic($queryString: String) {
    vueelastic (queryString: $queryString) {
      cast_name
      og_name
      url
    }
  }
`;

export default {
  components: {
    Logo,
    VuetifyLogo
  },
 apollo: {
    vueelastics: {
      query: GET_ALL_VUEELASTIC,
      fetchPolicy: 'cache-and-network'
    },
    /* vueelastic: {
      query: GET_VUEELASTIC,
      variables() {
        return {
          cast_name: this.queryString,
          og_name:  this.queryString
        };
      },
      fetchPolicy: 'cache-and-network'
    } */
    vueelastic: {
      query: GET_VUEELASTIC,
      variables() {
        return {
          queryString: this.queryString,
        };
      },
      fetchPolicy: 'cache-and-network'
    }
  },
  data () {
    return {
      queryString: 'Lannister',
      test: '',
      vueelastic_data: [],
      pagination: {
        sortBy: 'name'
      },
      selected: [],
      search: '',
      isMobile: false,
      headers: [
        {
          text: 'Cast Name',
          sortable: false,
          value: 'cast_name',
        },
        { text: 'Original Name', value: 'og_name' },
        { text: 'Links', value: 'url' }
      ]
    }
  },
  mounted () {
    // console.log('this.$apollo.queries.vueelastic', this.$apollo.queries.vueelastic)
    // The following code is sued to prevent pre-fetch errorsbundleRenderer.renderToStream

    this.$apollo.queries.vueelastics.setOptions({
      pollInterval: 10000,
      fetchPolicy: 'cache-and-network'
    })

    this.$apollo.queries.vueelastic.setOptions({
      pollInterval: 10000,
      fetchPolicy: 'cache-and-network'
    })

    this.vueelastic_data = this.vueelastics
    this.test = this.$apollo.queries.vueelastic
  }
}
</script>

