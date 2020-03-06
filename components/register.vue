<template>
    <div class="text-xs-center">
    <v-dialog v-model="dialog" scrollable max-width="500px">
      <template v-slot:activator="{ on }">
      <v-btn small class="mt-5"
          dark
          large 
          :class="{'subtitle-2': $vuetify.breakpoint.xs}"
          v-on="on"
        >Register Business
      </v-btn>
      </template>
      <v-card>
        <v-card-title class="white--text black" primary-title>
          <span class="headline text-md-center" :class="{'title': $vuetify.breakpoint.xs}">Register Business Information</span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <ValidationObserver ref="observer" v-slot="{ validate, reset }">
            <v-form>
              <ValidationProvider v-slot="{ errors }" name="Business Name" rules="required|max:10">
                <v-text-field
                  label="Business Name"
                  v-model="editedItem.businessName"
                  :error-messages="errors"
                  :counter="10"
                  required
                  :class="{'caption': $vuetify.breakpoint.xs}"
                ></v-text-field>
              </ValidationProvider>
              <ValidationProvider v-slot="{ errors }" name="First Name" rules="required|max:10">
                <v-text-field
                  label="First Name"
                  v-model="editedItem.firstName"
                  :error-messages="errors"
                  :counter="10"
                  required
                  :class="{'caption': $vuetify.breakpoint.xs}"
                ></v-text-field>
              </ValidationProvider>
              <ValidationProvider v-slot="{ errors }" name="Last Name" rules="required|max:10">
                <v-text-field
                  label="Last Name"
                  v-model="editedItem.lastName"
                  :error-messages="errors"
                  :counter="10"
                  required
                  :class="{'caption': $vuetify.breakpoint.xs}"
                ></v-text-field>
              </ValidationProvider>
              <ValidationProvider v-slot="{ errors }" name="Address" rules="required|max:10">
                <v-text-field
                  label="Address"
                  v-model="editedItem.address"
                  :error-messages="errors"
                  required
                  :class="{'caption': $vuetify.breakpoint.xs}"
                ></v-text-field>
              </ValidationProvider>
              <ValidationProvider v-slot="{ errors }" name="City" rules="required|max:10">
                <v-text-field
                  label="City"
                  v-model="editedItem.city"
                  :error-messages="errors"
                  required
                ></v-text-field>
              </ValidationProvider>
              <ValidationProvider v-slot="{ errors }" name="State" rules="required|max:10">
                <v-text-field
                  label="State"
                  v-model="editedItem.state"
                  :error-messages="errors"
                  required
                  :class="{'caption': $vuetify.breakpoint.xs}"
                ></v-text-field>
              </ValidationProvider>
              <ValidationProvider v-slot="{ errors }" name="Zip Code" rules="required|max:10">
                <v-text-field
                  label="Zip Code"
                  v-model="editedItem.zip"
                  :error-messages="errors"
                  required
                  :class="{'caption': $vuetify.breakpoint.xs}"
                ></v-text-field>
              </ValidationProvider>
              <ValidationProvider v-slot="{ errors }" name="Email" rules="required|max:10">
                <v-text-field
                  label="Email"
                  v-model="editedItem.email"
                  :error-messages="errors"
                  required
                  :class="{'caption': $vuetify.breakpoint.xs}"
                ></v-text-field>
              </ValidationProvider>
              <ValidationProvider v-slot="{ errors }" name="Website" rules="required|max:10">
                <v-text-field
                  label="Website"
                  v-model="editedItem.website"
                  :error-messages="errors"
                  required
                  :class="{'caption': $vuetify.breakpoint.xs}"
                ></v-text-field>
              </ValidationProvider>
              <ValidationProvider v-slot="{ errors }" name="Phone" rules="required|max:10">
                <v-text-field
                  label="Phone"
                  v-model="editedItem.website"
                  :error-messages="errors"
                  required
                  :class="{'caption': $vuetify.breakpoint.xs}"
                ></v-text-field>
              </ValidationProvider>
              <v-divider></v-divider>
              <v-alert type="success" dismissible v-model="alert">
                Thank you for registering your business information.
              </v-alert>
            </v-form>
          </ValidationObserver>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click.native="close" :class="{'caption': $vuetify.breakpoint.xs}">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click.native="send" :disabled="!valid" :class="{'caption': $vuetify.breakpoint.xs}">Send</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </div>
</template>



<script>
import gql from 'graphql-tag'
import { required, email, max } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'

setInteractionMode('eager')

extend('required', {
...required,
message: 'Field can not be empty',
})

extend('max', {
...max,
message: 'The name field may not be greater than {length} characters',
})

extend('email', {
...email,
message: 'This field must be a valid email',
})

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

export default {
    components: {
      ValidationProvider,
      ValidationObserver,
    },
    data: () => ({
        newDocument: null,
        indexName: 'blacksopedia',
        valid: true,
        alert: false,
        dialog: false,
        editedItem: {
          id: '',
          businessName: '',
          firstName: '',
          lastName: '',
          address: '',
          city: '',
          state: '',
          zip: null,
          email: '',
          website: '',
          phone: ''
        },
        defaultItem: {
          id: '',
          businessName: '',
          firstName: '',
          lastName: '',
          address: '',
          city: '',
          state: '',
          zip: null,
          email: '',
          website: '',
          phone: ''
        },
        firstNameRules: [
        v => !!v || 'First Name is required',
        v => (v && v.length <= 50) || 'Name must be less than 50 characters'
        ],
        lastNameRules: [
          v => !!v || 'Last Name is required',
          v => (v && v.length <= 50) || 'Name must be less than 50 characters'
        ]
    }),
    methods: {
        submit () {
            // this.$refs.observer.validate()
        },
        clear () {
            // this.name = ''
            // this.email = ''
            // this.select = null
            // this.checkbox = null
            this.editedItem = null
            this.$refs.observer.reset()
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
        send () {
          if (this.$refs.observer.validate()) {
            let item = {}
            // Add Task Card
            Object.assign(item, this.editedItem)
            // this.addBusiness(item)
          }
        },
        close () {
          this.dialog = false
          setTimeout(() => {
            this.clear()
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
          }, 300)
        }
    }
}
</script>

<style>

</style>