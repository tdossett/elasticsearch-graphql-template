<template>
  <v-stepper v-model="e6" vertical>
    <v-stepper-step :complete="e6 > 1" step="1">
      <p class="mb-1">Register Business Information</p>
      <small>Name, Address, Email, etc.</small>
    </v-stepper-step>

    <v-stepper-content step="1">
      <v-card class="mb-5" height="100%">
        <v-form ref="form" v-model="valid" :lazy-validation="lazy">
            <v-container>
            <v-row>
                <v-col
                cols="12"
                md="4"
                >
                <v-text-field
                    v-model="editedItem.businessName"
                    :rules="businessNameRules"
                    label="Business Name"
                    required
                ></v-text-field>
                </v-col>

                <v-col
                cols="12"
                md="4"
                >
                <v-text-field
                    v-model="editedItem.firstName"
                    :rules="firstNameRules"
                    label="First Name"
                    required
                ></v-text-field>
                </v-col>

                <v-col
                cols="12"
                md="4"
                >
                <v-text-field
                    v-model="editedItem.lastName"
                    :rules="lastNameRules"
                    label="Last Name"
                    required
                ></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col
                cols="12"
                md="4"
                >
                <v-text-field
                    v-model="editedItem.address"
                    label="Address"
                    required
                ></v-text-field>
                </v-col>

                <v-col
                cols="12"
                md="4"
                >
                <v-text-field
                    v-model="editedItem.city"
                    label="City"
                    required
                ></v-text-field>
                </v-col>

                <!-- <v-col
                cols="12"
                md="4"
                >
                <v-text-field
                    v-model="editedItem.state"
                    label="State"
                    required
                ></v-text-field>
                </v-col> -->

                <v-col
                cols="6"
                md="4"
                >
                  <v-select
                    v-model="editedItem.state"
                    :items="states"
                    item-text="state"
                    item-value="id"
                    label="State"
                    return-object
                    single-line
                    clearable
                    clear-icon
                  ></v-select>
                </v-col>

                <v-col
                cols="6"
                md="4"
                >
                <v-text-field
                    v-model="editedItem.zip"
                    label="Zip Code"
                    required
                ></v-text-field>
                </v-col>

                <v-col
                cols="6"
                md="4"
                >
                <v-text-field
                    v-model="editedItem.email"
                    :rules="emailRules"
                    label="Email"
                    required
                ></v-text-field>
                </v-col>

                <v-col
                cols="6"
                md="4"
                >
                <v-text-field
                    v-model="editedItem.website"
                    label="Web Site"
                    required
                ></v-text-field>
                </v-col>

                <v-col
                cols="6"
                md="4"
                >
                <v-text-field
                    v-model="editedItem.phone"
                    label="Phone"
                    required
                ></v-text-field>
                </v-col>
            </v-row>

            
            </v-container>
 
        </v-form>
 
      </v-card>
      <v-btn text medium color="primary"  @click.native="validate">Continue</v-btn>
      <v-btn text medium color="primary"  nuxt to="/">Cancel</v-btn>
    </v-stepper-content>

    <v-stepper-step :complete="e6 > 2" step="2">
        <p class="mb-1">Description</p>
        <small>Brief description of your company</small>
    </v-stepper-step>
   
    <v-stepper-content step="2">
      <v-card class="mb-5" height="100%" max-width="1000">
        <v-container fluid>
          <v-col cols="12">
          <v-textarea
            class="subtitle-1"
            counter
            clearable
            clear-icon="cancel"
            filled
            label="Tells us about your company"
            v-model="editedItem.description"
          ></v-textarea>
          </v-col>
        </v-container>
      </v-card>
        <v-btn text medium color="primary" @click="e6 = 1">Back</v-btn>
        <v-btn text medium color="primary" @click="e6 = 3">Continue</v-btn>
    </v-stepper-content>

    <v-stepper-step :complete="e6 > 3" step="3">
      <p class="mb-1">Upload your business logo</p>
      <small>From your laptop/mac only</small>
    </v-stepper-step>

    <v-stepper-content step="3">
      <v-card class="mb-5" height="200px" max-width="500">
        <v-subheader>Select your logo from a local file</v-subheader>

          <!-- <v-file-input v-model="editedItem.image" accept="image/*" show-size counter label="File input"></v-file-input> -->
          <div v-if="!editedItem.image">
            <v-file-input 
              multiple     
              label="File input" 
              @change="onFileChange">
            </v-file-input>
        </div>
        <div v-else>
            <v-card>
                <v-card-text>
                  <v-img :src="editedItem.image" contain max-height="100px" max-width="150px"></v-img>
                </v-card-text>
                <v-spacer></v-spacer>
                <v-btn class="ml-10" text x-small @click="removeImage">Remove image</v-btn>
             </v-card>
        </div>
      </v-card>
      <v-btn text medium color="primary" @click="e6 = 2">Back</v-btn>
      <v-btn text medium color="primary" @click="e6 = 4">Continue</v-btn>
    </v-stepper-content>

    <v-stepper-step step="4">
      <p class="mb-1">Confirm/Submit Business Information</p>
      <small>Review and submit</small>
    </v-stepper-step>
    <v-stepper-content step="4">
      <v-card class="mb-5" height="200px" width="500">
         <!-- <div class="d-flex flex-no-wrap">
              <div class="">
                <v-card-title
                  class="title"
                  v-text="editedItem.businessName"
                ></v-card-title>

                <v-card-subtitle v-text="fullName"></v-card-subtitle>
              </div>
              <div class="pr-1">
              <v-avatar
              class="ma-3 align-end"
                height="150"
                size="250"
                tile
              >
                <v-img contain max-height="100px" :src="editedItem.image"></v-img>
              </v-avatar>
              </div>
          </div> -->

           <div class="d-flex flex-no-wrap justify-space-between">
                        <div>
                            <v-list-item three-line>
                                <v-list-item-content>
                                    <div class="overline mb-4">OVERLINE</div>
                                    <v-list-item-title class="title mb-1" v-text="editedItem.businessName"></v-list-item-title>
                                    <v-list-item-subtitle v-text="fullName"></v-list-item-subtitle>
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
                                :src="editedItem.image"
                            >
                            </v-img>
                        </v-avatar>
                    </div>
      </v-card>
      
      <v-btn text medium color="primary" @click="e6 = 3">Back</v-btn>
      <v-btn text medium color="primary" @click.native="submit">Submit</v-btn>
    </v-stepper-content>
  </v-stepper>
</template>

<script>
  import states from "../static/states.json"
  import gql from 'graphql-tag';

  const GET_ALL_BLACKSOPEDIA = gql`
  {
    blackospedia {
      businessName
      firstName
      lastName
      website
    }
  }
`;

  export default {
    data () {
      return {
        e6: 1,
        lazy: false,
        valid: false,
        image: '',
        index: 'blacksopedia',
        businessNameRules: [
            v => !!v || 'Business Name is required',
            v => v.length <= 50 || 'Name must be less than 50 characters',
        ],
        firstNameRules: [
            v => !!v || 'First Name is required',
            v => v.length <= 50 || 'Name must be less than 50 characters',
        ],
        lastNameRules: [
            v => !!v || 'Last Name is required',
            v => v.length <= 50 || 'Name must be less than 50 characters',
        ],
        addressRules: [
            v => !!v || 'Address is required',
            v => v.length <= 50 || 'Address must be less than 50 characters',
        ],
        cityRules: [
            v => !!v || 'City is required',
        ],
        stateRules: [
            v => !!v || 'State is required',
        ],
        zipRules: [
            v => !!v || 'Zip Code is required',
        ],
        emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        websiteRules: [
            v => !!v || 'Website is required',
        ],
        editedItem: {
          id: '',
          businessName: '',
          firstName: '',
          lastName: '',
          address: '',
          city: '',
          state: null,
          zip: null,
          email: '',
          website: '',
          phone: '',
          description: '',
          image: ''
        },
        defaultItem: {
          id: '',
          businessName: '',
          firstName: '',
          lastName: '',
          address: '',
          city: '',
          state: null,
          zip: null,
          email: '',
          website: '',
          phone: '',
          description: '',
          image: ''
        },
        name: ''
      }
    },
    computed: {
      states () {
        return states.map((item) => {
          return item;
        })
      },
      fullName () {
       this.name = this.editedItem.firstName.concat(' ' + this.editedItem.lastName)
       return this.name
      }
    },
    methods: {
        validate () {
            if (this.$refs.form.validate()) {
                this.e6 = '2'
            }
        },
        onFileChange(e) {
            var files = e
            if (!files.length)
                return
            this.createImage(files[0])
        },
        createImage(file) {
            console.log('here')
            // var image = new Image()
            var reader = new FileReader()
            var vm = this

            reader.onload = (e) => {
                vm.editedItem.image = e.target.result
            };
            reader.readAsDataURL(file)
        },
        removeImage: function (e) {
            this.editedItem.image = ''
        },
        submit () {
          if (this.$refs.form.validate()) {
          let item = {}
          // Add Task Card
          Object.assign(item, this.editedItem)
          // this.createNewDocument(this.index, item)
          console.log('submit: item', item)
      }
          
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
      }
    }
  }
</script>

<style scoped>
  .v-text-field {
    font-size: medium;
  }
</style>