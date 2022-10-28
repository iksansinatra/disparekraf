<template>
  <div class="childes bg_img">
    <!-- <div class="child_center">
        <v-card>
          <h1>sda</h1>
        </v-card>

    </div> -->
    <v-row class="child_center">
      <v-col cols="12" md="4" offset-md="4" style="padding-left : 15px; padding-right : 15px">
        <v-card  class="bg-form-login">
          <div style="padding-top:5%; padding-left:10%; padding-right:10%; padding-bottom:5%">

            <img src="img/kreatif.png" style="width:100%">
            <br>
            <div  v-if="errorMessage" >
              <v-alert border="left" color="red lighten-2" style="color:white">
                  <strong>Warning!</strong> {{ errorMessage }}.
              </v-alert>
              <br>
            </div>


            <div class="text-center"  v-if="loadingku">
              <img src="img/loading-20.gif" alt="">
            </div>

            <v-form  @submit.prevent="btn_login()" v-if="!loadingku">
              <!-- <v-text-field
              v-model="user.username"
              label="Username"
              required /> -->
              <br>
              <v-text-field v-model="user.username" class="placeholerku" placeholder="Username" outlined dense required/>

              <!-- <v-text-field
              v-model="user.password"
              type="password"
              label="Password"
              required /> -->

              <v-text-field v-model="user.password" type="password" class="placeholerku" placeholder="Password" outlined dense required/>

              <!-- <hr class="blueku"> -->
              <br>

              <v-btn type="submit" block color="#70c5f2">
                <span style="color:white">Login</span>
              </v-btn>

              <br>

              <v-btn @click="mdl_add = true" v-bind="attrs" v-on="on" block color="#ffb400">
                <span style="color:white">Register</span>
              </v-btn>

            </v-form>


            <br>

          </div>
        </v-card>
      </v-col>
      <!-- =========================== ADD DATA ============================== -->
        <v-dialog v-model="mdl_add" persistent max-width="600px">

          <v-card>

            <v-app-bar flat class="bg-primaryku">
              <v-toolbar-title class="title white--text pl-5">
                Registrasi User
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn color="white" icon  @click="mdl_add = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-app-bar>



            <v-card-text>

              <v-container>

                <v-alert outlined type="warning" prominent border="left"  v-if="pesanErr">
                    <strong>Warning!</strong> {{ pesanErr }}.
                  </v-alert>
                                  
                <v-row>
                  <v-col cols="12" md="12"  class="">
                    <small>*Nama Lengkap</small>
                    <v-text-field v-model="dataku.nama" class="placeholerku" outlined dense required/>
                  </v-col>

                  <v-col cols="12" md="12"  class="divInput1">
                    <small>*Nomor Kontak</small>
                    <v-text-field v-model="dataku.hp" class="placeholerku" outlined dense required/>
                  </v-col>

                  <v-col cols="12" md="12"  class="divInput1">
                    <small>*Email</small>
                    <v-text-field v-model="dataku.email" class="placeholerku" outlined dense required/>
                  </v-col>

                  <v-col cols="12" md="12"  class="divInput1">
                    <small>*Username</small>
                    <v-text-field v-model="dataku.username" class="placeholerku" outlined dense required/>
                  </v-col>

                  <v-col cols="12" md="12"  class="divInput1">
                    <small>*Password</small>
                    <v-text-field  type="password" v-model="dataku.password" class="placeholerku" outlined dense required/>
                  </v-col>

                  <v-col cols="12" md="12"  class="divInput1">
                    <small>*Confirm Password</small>
                    <v-text-field  type="password" v-model="dataku.confirmPassword" class="placeholerku" outlined dense required/>
                  </v-col>


                </v-row>

              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="addData()">Register</v-btn>
              <v-btn color="red darken-1" text @click="mdl_add = false">Batal</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      <!-- =========================== ADD DATA ============================== -->
    </v-row>

  </div>
</template>

<script>

// const ADD_URL = URL_APP + "api/v1/rincian_obyek/";

import FETCHING from "../library/fetching";
   import UMUM from "../library/umum";

  import Joi from "joi";
  const schema = Joi.object().keys({
    username: Joi.string().regex(/^[a-zA-Z0-9_]*$/).min(3).max(13).required()
  });


  export default {
    data : function(){
      return {

          errorMessage: '',
          pesanError: '',
          pesanErr: '',
          errorMsg: '',
          user : {
            username : "",
            password : ""
          },

          dataku: {
            id : '',
            username : "",
            nama : '',
            hp: "",
            email: "",
            password : "",
            confirmPassword: ""
        },

          url : {
            LOGIN_URL : this.$store.state.url.URL_APP + "auth/login",
          },
          loadingku : false,
          mdl_add: false,
          FETCHING : FETCHING,
          UMUM : UMUM,
      }
    },
    watch: {
      user: {
          handler() {
              this.errorMessage = "";
              this.pesanError = "";
          },
          deep: true
      },
      dataku: {
          handler() {
              this.errorMsg = "";
              this.pesanErr = "";
          },
          deep: true
      }
    },
    methods: {

      addData: function() {
      this.pesanErr = "";
        if (this.validasiUser()) {
            // Jika user sdh valid lakukan pengiriman data ke server
            const body = {
              username: this.dataku.username,
              password: this.dataku.password
            };
            this.signingUp = true;

            fetch(this.$store.state.url.URL_APP+'auth/signin', {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                    "content-type": "application/json",
                }
            }).then((response) => {
                this.signingUp = false;
                if (response.ok) {
                    this.$store.commit('notifAdd', 'Menambah')
                    // this.getView();
                    // this.$router.push('/login');
                    // return response.json();
                }
                else{
                  return response.json().then(error => {
                    throw new Error(error.message);
                  });

                }
            })
            .catch((error) => {
              setTimeout(() => {
                this.signingUp = false;
                this.pesanErr = error.message;
              }, 1000);
            });
        }else{
          console.log("tidak valid");

        }

    },

      btn_login : function(){


        this.errorMessage = '';
        if(this.validUser()){
          this.loadingku = true;
          const body = {
            username : this.user.username,
            password : this.user.password
          }
          fetch(this.url.LOGIN_URL, {
            method : 'POST',
            headers : {
              'content-type' : 'application/json',
            },
            body : JSON.stringify(body),
          }).then((response) => {

            console.log(response);

                if (response.ok) {
                    return response.json();
                    this.$store.commit("shoWLoading");
                }

                return response.json().then(error => {
                    throw new Error(error.message);
                    this.$store.commit("shoWLoading");
                });
            })
            .then((result) => {
              console.log("=============================");
              console.log(result);
              // menyimpan token yang tergenerate dari server
              localStorage.token = result.token;
              localStorage.profile = JSON.stringify(result.profile);
              setTimeout(() => {

                this.loadingku = false;
                this.$router.push('/');
                // this.loadMenu();
                // location.reload();
              }, 1000);
            })
            .catch(error => {
              setTimeout(() => {
                this.loadingku = false;
                this.errorMessage = error.message;
              }, 1000);
            });;
        }
      },


      validUser: function(){

        const body = {
              username: this.user.username
        };

        const result = schema.validate(body);


        if (result.error === null || result.error ==undefined) {
          return true;
        }
        if (result.error.message.includes("username")) {
          this.errorMessage = "Username tidak valid";
        } else {
          this.errorMessage = "Username tidak valid2";
        }
        return false;
      },

      validasiUser : function(){
      if (this.dataku.password !== this.dataku.confirmPassword) {
          this.pesanError = "Password dan Confirm Password harus sama. !";
          return false;
      }
      // Memulai proses validasi melalui skema Joi yang sebelumnya dibuat
      // req.body merupakan data yang di kirim oleh client dan schema merupakan skema joi yg di buat sebelumnya
      const body = {
              username: this.dataku.username,
              password: this.dataku.password
      };


      const result = schema.validate(body);

      console.log(result.error)

      if (result.error == null || result.error ==undefined) {
          return true;
      }

      if (result.error.message.includes("username")) {
          // jika pesan error yang dihasilkan mengandung char "username" maka
          this.pesanErr = "Username tidak valid (Min : 6 dan Max : 14 Karakter)";
      } else {
          this.pesanErr = "Password tidak valid (Min : 6 Karakter)";
        //   console.log(result.error);

      }
      return false;
    },



      async loadMenu(){

        var get_profile = JSON.parse(localStorage.profile);
        var profileku = get_profile.profile;

        var dataMenu =await this.FETCHING.postMasterMenuGetSideBar(profileku.menu_klp)

        this.$store.commit('ubahState', { name : 'list_menu',  list : dataMenu});

        var cinta = {
          Data_cinta : 'adalah'
        }


        var data = []
        dataMenu.forEach(h => {
            if (h.type == 0) {
              data.push(h)
            } else {
              h.subItem.forEach(i => {
                  if (i.type == 0) {
                    data.push(i)
                  } else {
                    i.subItem.forEach(j => {
                        data.push(j)
                    });
                  }
              });
            }
        });

        var obj = UMUM.ArrToObj(data)
        // this.$store.commit('ubahState', { name : 'aksesMenu',  list : obj});

      },








    },
    mounted : function(){

    },
  };
</script>
