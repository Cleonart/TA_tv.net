<template>
    <div class="row justify-content-center">
        <div class="col-lg-12 col-md-12">
            <div class="card bg-secondary shadow border-0">
                <div class="card-body px-lg-5 py-lg-5">
                    <img src="@/assets/logo.png" style="width:50px;margin-bottom:30px;margin-top:20px;">
                    <form @submit.prevent="logging_in()">

                        <input  type="text" 
                                class="form-control mb-2 py-4"
                                placeholder="Nama Pengguna"
                                required
                                v-model="username" />

                         <input  type="password" 
                                class="form-control py-4 mb-3"
                                placeholder="Kata Sandi"
                                required
                                v-model="password" />

                        <base-button @click="logging_in()" type="primary" class="mt-2 mb-3">Masuk</base-button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {apiEndpoint} from '@/functions/universal.js';
    const axios = require('axios');
    const md5 = require('md5');

    export default {
        name: 'login',
        data() {
            return {
                username : '',
                password: ''
            }
        },
        methods : {
            logging_in : function(){
                
                if(!this.username || !this.password){
                    this.$swal("Login Gagal", "Nama pengguna dan kata sandi tidak boleh kosong", "error");
                    return;
                }

                this.$swal({
                    icon: 'warning',
                    title: 'Mohon tunggu',
                    text: 'Sedang Mengirim data...',
                    allowOutsideClick: false,
                    showConfirmButton: false,
                    timerProgressBar: true,
                    onBeforeOpen: () => {
                        this.$swal.showLoading()
                    },
                });

                axios.get(apiEndpoint + "user/login.php?username=" + this.username + "&password=" + this.password)
                     .then(result => {

                        // Login Failed
                        if (result.data == "") {
                            this.$swal("Login Gagal", "Nama Pengguna dan Kata Sandi anda tidak cocok", "error");
                            return;
                        }
                        // Login Success
                        this.$swal("Login Berhasil", "Login berhasil dilakukan", "success");
                        localStorage.setItem("login_credential", md5(result.data[0].accounts_debt_collector_status));
                        this.$router.replace("/dashboard");
                    })
            }
        },
        created(){
            if (localStorage.getItem("login_credential") != null){
                this.$swal("Anda telah login", "Mengarahkan ke halaman utama", "success");
                this.$router.replace("/dashboard");
            }
        }
    }
</script>
<style>
</style>

// Credential for super user : c4ca4238a0b923820dcc509a6f75849b
