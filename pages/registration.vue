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
    <v-card>
        <register />
        <div v-if="!image">
            <v-card-title class="title">Select your logo</v-card-title>
            <v-file-input multiple label="File input" @change="onFileChange"></v-file-input>
        </div>
        <div v-else>
            <v-card>
                <v-card-text>
                <v-img :src="image"></v-img>
                </v-card-text>
                <v-spacer></v-spacer>
                <v-btn @click="removeImage">Remove image</v-btn>
            </v-card>
        </div>
        <!-- <v-file-input multiple label="File input" @change="onFileChange"></v-file-input> -->
    </v-card>
  </v-flex>
   </v-layout>
</template>

<script>
import register  from '../components/register'

export default {
    components: {
        register
    },
    data: () => ({
        //
        image: ''
    }),
    methods: {
        onFileChange(e) {
            var files = e
            if (!files.length)
                return
            this.createImage(files[0])
            console.log('here')
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