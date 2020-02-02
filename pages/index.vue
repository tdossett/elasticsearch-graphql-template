<template>
    <v-layout
    justify-center
    align-center
  >
    <v-flex
      xs12
      sm8
      md6
    >
        <v-form>
            <v-container>   
                <v-row>
                    <v-col cols="12">
                    <v-text-field
                        v-model="search"
                        :prepend-icon="icon"
                        clear-icon="mdi-close-circle"
                        clearable
                        label="Search"
                        type="text"
                        @click:append-outer="searchData"
                        @click:prepend="changeIcon"
                        @click:clear="clearMessage"
                        hint="For example, Black Business"
                        @input="searchData"
                    ></v-text-field>
                    </v-col>
                </v-row>
            </v-container>
        </v-form>
        <v-divider></v-divider>
        <v-container>
            <v-row dense>
                <v-col
                v-for="(entry, i) in vueelastic"
                :key="i"
                cols="12"
                >
                <v-card
                    :color=color
                    dark
                    class="mx-auto"
                >
                    <div class="d-flex flex-no-wrap justify-space-between">
                        <div>
                            <v-list-item three-line>
                                <v-list-item-content>
                                    <div class="overline mb-4">OVERLINE</div>
                                    <v-list-item-title class="title mb-1" v-text="entry.cast_name"></v-list-item-title>
                                    <v-list-item-subtitle v-text="entry.og_name"></v-list-item-subtitle>
                                </v-list-item-content>

                               <!--  <v-list-item-avatar
                                    tile
                                    size="125"
                                    class="ma-3"
                                >
                                    <v-img :src="entry.url"></v-img>
                                </v-list-item-avatar> -->
                            </v-list-item>
                            <v-card-subtitle>TESTING</v-card-subtitle>
                        </div>
                        <v-spacer></v-spacer>
                        <v-avatar
                            class="ma-3 align-end"
                            size="125"
                            tile
                        >
                            <v-img 
                                :src="entry.url"
                            >
                            </v-img>
                        </v-avatar>
                    </div>
                </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
import gql from 'graphql-tag';

const GET_ALL_VUEELASTIC = gql`
  {
    vueelastics {
      cast_name
      og_name
      url
    }
  }
`;

const GET_VUEELASTIC = gql`
  query vueelastic($queryString: String) {
    vueelastic (queryString: $queryString) {
      cast_name
      og_name
      url
    }
  }
`;

const CREATE_INDEX = gql`
  mutation createIndex(
    $newIndex: String!
  ) {
    createIndex(
      newIndex: $newIndex
    ) {
      newIndex
    }
  }
`;

const CREATE_BODY = gql`
  mutation createBody(
    $index: String!
    $newBody: newBody
  ) {
    createBody(
      index: $index
      newBody: $newBody
    ) {
      newBody
    }
  }
`;

export default {
    apollo: {
      vueelastics: {
        query: GET_ALL_VUEELASTIC,
        fetchPolicy: 'cache-and-network'
      },
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
    data: () => ({
        queryString: '',
        test: '',
        newBody: null,
        vueelastic_data: [],
        entries: [],
        isLoading: false,
        search: '',
        color: '#000000',
        password: 'Password',
        show: false,
        marker: true,
        iconIndex: 0,
        icons: [
            'mdi-cloud-search-outline'
        ],
    }),
    computed: {
      icon () {
        return this.icons[this.iconIndex]
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

      // TESTING MUTATION'S for graphql calls to ElasticSearch
      // this.createNewIndex('blacksopedia')
      //
      // TEST data for $$$$$$ createBody $$$$$$
      // let _index = 'blacksopedia'
      // // let _newBody = 'TESTING'
      // this.newBody = {
      //   business_name: 'Dostek, Inc.',
      //   owner: 'Timothy Dossett',
      //   address: '1952 Feltcher Ave',
      //   city: 'South Pasadena',
      //   state: 'California',
      //   email: 'tdossett@dostekinc.net',
      //   website: 'https://www.dostekinc.net',
      //   logo: 'https://dostekinc-image.s3-us-west-1.amazonaws.com/dostekinc_logo.png'
      // }
      // // Create Index Body
      // this.createNewBody(_index, this.newBody)

    },
    methods: {
      toggleMarker () {
        this.marker = !this.marker
      },
      clearMessage (e) {
        // Clear apollo queryString variable 
        this.queryString = ''
      },
      resetIcon () {
        this.iconIndex = 0
      },
      changeIcon () {
        this.iconIndex === this.icons.length - 1
        ? this.iconIndex = 0
        : this.iconIndex++
      },
      searchData(e) {
          // Restful Service Call
          // const _username = process.env.elastic_user
          // const _password = process.env.elastic_password

          // axios.get(`http://localhost:5000/search?q=`+this.search)
          // /* axios.get(`https://878f844c9b11486389f2cb421736df26.us-east-1.aws.found.io/vue-elastic/_search?q=`+this.search, {
          //     auth: {
          //         username: _username,
          //         password: _password
          //     }
          // }) */
          // .then(response => {
          //     this.entries = response.data.map(x => x._source)
          // }) 
          // .catch(err => {
          //     console.log(err) // console logging error message
          // })

          // GraphQL Call :) passing search value to queryString variable for GraphQL
          // query: vueelastic results will be in apollo object: vueelastic
          // Reset queryString depdening on search criteria which make === ''
          if (this.search != null) {
            if (this.search.length >= 3) {
              this.queryString = this.search
            }

            if (this.search === '') {
              this.queryString = ''
            }
          }

          this.resetIcon()
      },
      createNewIndex(newIndex) {
        // e.preventDefault();
        this.$apollo
        .mutate({
        mutation: CREATE_INDEX,
          variables: {
            newIndex: newIndex
          }
        })
        .then(data => {
        console.log(data);
        })
        .catch(error => {
        console.error(error);
        });
      },
      createNewBody(index, newBody) {
        this.$apollo
        .mutate({
        mutation: CREATE_BODY,
          variables: {
            index: index,
            newBody: newBody
          }
        })
        .then(data => {
        console.log(data);
        })
        .catch(error => {
        console.error(error);
        });
      }
    }
  }
</script>

<style scoped>
.card-image {
  position: absolute;
  left: -9999px;
  right: -9999px;
  margin: auto;
  height: 220px;
  min-width: 100%;
}
</style>