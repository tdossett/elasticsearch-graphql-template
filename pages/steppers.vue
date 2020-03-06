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

                <v-col
                cols="12"
                md="4"
                >
                <v-text-field
                    v-model="editedItem.state"
                    label="State"
                    required
                ></v-text-field>
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
                class="title"
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
      <v-card class="mb-5" height="200px">
        <v-container fluid>
          <v-textarea
            name="input-7-1"
            filled
            label="Tells us about your company"
            auto-grow
            v-model="editedItem.description"
          ></v-textarea>
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
      <v-card class="mb-5" height="200px">
        <v-subheader>Images must be 35/35 pixels in size</v-subheader>

          <!-- <v-file-input v-model="editedItem.image" accept="image/*" show-size counter label="File input"></v-file-input> -->
          <div v-if="!image">
            <v-card-title class="title">Select your logo</v-card-title>
            <v-file-input 
              v-model="image" 
              accept="image/*" 
              show-size 
              counter 
              label="File input" 
              @change="onFileChange">
            </v-file-input>
        </div>
        <div v-else>
            <v-card>
                <v-card-text>
                <v-img :src="uploadedImage"></v-img>
                </v-card-text>
                <v-spacer></v-spacer>
                <v-btn @click="removeImage">Remove image</v-btn>
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
      <v-card class="mb-5" height="200px"></v-card>
        <v-btn text medium color="primary" @click="e6 = 3">Back</v-btn>
        <v-btn text medium color="primary" @click="e6 = 1">Submit</v-btn>
    </v-stepper-content>
  </v-stepper>
</template>

<script>
  export default {
    data () {
      return {
        e6: 1,
        lazy: false,
        valid: false,
        image: '',
        businessNameRules: [
            v => !!v || 'Business Name is required',
            v => v.length <= 10 || 'Name must be less than 10 characters',
        ],
        firstNameRules: [
            v => !!v || 'First Name is required',
            v => v.length <= 25 || 'Name must be less than 25 characters',
        ],
        lastNameRules: [
            v => !!v || 'Last Name is required',
            v => v.length <= 25 || 'Name must be less than 25 characters',
        ],
        addressRules: [
            v => !!v || 'Address is required',
            v => v.length <= 25 || 'Name must be less than 25 characters',
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
            v => /.+@.+/.test(v) || 'E-mail must be valid',
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
          state: '',
          zip: null,
          email: '',
          website: '',
          phone: '',
          description: '',
          image: null
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
          phone: '',
          description: '',
          image: null
        }
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
            var image = new Image()
            var reader = new FileReader()
            var vm = this

            reader.onload = (e) => {
                vm.image = e.target.result
            };
            reader.readAsDataURL(file)
        },
        removeImage: function (e) {
            this.image = ''
        }
    }
  }
</script>

<style scoped>
  .v-text-field {
    font-size: medium;
  }
</style>