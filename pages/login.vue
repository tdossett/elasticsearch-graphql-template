<template>
  <v-app id="inspire">
    <v-main>
      <v-container
         fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>Login</v-toolbar-title>
                <v-spacer />

              </v-toolbar>
              <v-card-text>
                <v-form ref="form" v-model="valid" :lazy-validation="lazy">
                  <v-text-field
                  v-model="userName"
                    label="User Name"
                    prepend-icon="person"
                    :rules="userNameRules"
                    required
                  />

                  <v-text-field
                  v-model="password"
                    label="Password"
                    prepend-icon="lock"
                    type="password"
                    :rules="passwordRules"
                    required
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn small color="primary" @click.native="login">Login</v-btn>
                <v-btn small color="primary" @click.native="cancel">Cancel</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  export default {
    props: {
      source: String,
    },
    data() {
      return {
        lazy: false,
        valid: false,
        userName: '',
        password: '',
        userNameRules: [
            v => !!v || 'User Name is required',
            ],
        passwordRules: [
            v => !!v || 'password is required',
        ],
      }
    },
    mounted () {
      this.$store.commit('setSideBar', false)
     },
    methods: {
      cancel () {
        this.$store.commit('setSideBar', true)
        this.$router.push('/')
      },
      login () {
        if (this.$refs.form.validate()) {
          this.$store.commit('setSideBar', true)
          this.$router.push('/')
        }
      }
    },
  }
</script>