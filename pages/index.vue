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
                            <v-card-subtitle>blacksopedia</v-card-subtitle>
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

const CREATE_DOCUMENT = gql`
  mutation createDocument(
    $index: String!
    $newDocument: newDocument
  ) {
    createDocument(
      index: $index
      newDocument: $newDocument
    ) {
      newDocument
    }
  }
`;

const UPDATE_DOCUMENT = gql`
  mutation updateDocument(
    $index: String!
    $documentId: String!
    $updatedDocument: updatedDocument
  ) {
    updateDocument(
      index: $index
      documentId: $documentId
      updatedDocument: $updatedDocument
    ) {
      documentId
    }
  }
`;

const DELETE_INDEX = gql`
  mutation deleteIndex(
    $index: String!
  ) {
    deleteIndex(
      index: $index
    ) {
      index
    }
  }
`;

const DELETE_DOCUMENT = gql`
  mutation deleteDocument(
    $index: String!
    $documentId: String!
  ) {
    deleteDocument(
      index: $index
      documentId: $documentId
    ) {
      documentId
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
        newDocument: null,
        updatedDocument: null,
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
      // The following code is sued to prevent pre-fetch errorsbundleRenderer.renderToStream
      // Queries for vueelastic schemas only not blacksopedia
      this.$apollo.queries.vueelastics.setOptions({
      pollInterval: 10000,
      fetchPolicy: 'cache-and-network'
      })

      this.$apollo.queries.vueelastic.setOptions({
      pollInterval: 10000,
      fetchPolicy: 'cache-and-network'
      })

      this.vueelastic_data = this.vueelastics

      // $$$$$$ TESTING blackospedia MUTATION'S for graphql calls to ElasticSearch $$$$$$
      //
      // TEST data for $$$$$$ createNewDocument Vue method $$$$$$
      // let _index = 'blacksopedia'
      // let _documentId = '-3A6FnABQk-s3MblXLhG' // change this id depending on delete / update 'document' mutations
      // this.newDocument = {
      //   business_name: 'Dostek, Inc.',
      //   owner: 'Timothy Dossett',
      //   address: '1952 Street Ave',
      //   city: 'South Pasadena',
      //   state: 'California',
      //   zip: '91030',
      //   email: 'tdossett@dostekinc.net',
      //   website: 'https://www.dostekinc.net',
      //   logo: 'https:XXXXXXXX/dostekinc_logo.png'
      // }
      //
      // // Create Index
      // this.createNewIndex(_index)
      // // Create Index Document
      // this.createNewDocument(_index, this.newDocument)
      //
      // TEST data for $$$$$$ updateDocument method $$$$$$
      // this.updatedDocument = {
      //   business_name: 'Dostek, Inc.',
      //   owner: '$$$$ Timothy Dossett $$$$',
      //   address: '9999 Street Ave',
      //   city: 'South Pasadena',
      //   state: 'California',
      //   zip: '91030',
      //   email: 'tdossett@dostekinc.net',
      //   website: 'https://www.dostekinc.net',
      //   logo: 'https:XXXXXXXX/dostekinc_logo.png'
      // }
      // //
      // this.updateDocument(_index, _documentId, this.updatedDocument)

      // // Delete Index
      // this.deleteIndex(_index)
      //
      // // Delete Index Document
      // this.deleteDocument(_index, _documentId)
      // 

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
          // $$$$ Restful Service Call in Eslatci Search Online
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


          // GraphQL Call :) passing 'search value' to queryString variable for GraphQL
          // query: vueelastic, results will be in apollo object: vueelastic
          // Reset queryString depdening on search criteria
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
      createNewDocument(index, newDocument) {
        this.$apollo
        .mutate({
        mutation: CREATE_DOCUMENT,
          variables: {
            index: index,
            newDocument: newDocument
          }
        })
        .then(data => {
        console.log(data);
        })
        .catch(error => {
        console.error(error);
        });
      },
      updateDocument(index, documentId, updatedDocument) {
        this.$apollo
        .mutate({
        mutation: UPDATE_DOCUMENT,
          variables: {
            index: index,
            documentId: documentId,
            updatedDocument: updatedDocument
          }
        })
        .then(data => {
        console.log(data);
        })
        .catch(error => {
        console.error(error);
        });
      },
      deleteIndex(index) {
        // e.preventDefault();
        this.$apollo
        .mutate({
        mutation: DELETE_INDEX,
          variables: {
            index: index
          }
        })
        .then(data => {
        console.log(data);
        })
        .catch(error => {
        console.error(error);
        });
      },
      deleteDocument(index, documentId) {
        // e.preventDefault();
        this.$apollo
        .mutate({
        mutation: DELETE_DOCUMENT,
          variables: {
            index: index,
            documentId: documentId
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