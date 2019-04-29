<template>
<div class="row">
    <div class="content-wrapper-before gradient-45deg-indigo-purple"></div>
        <div class="breadcrumbs-dark pb-0 pt-4" id="breadcrumbs-wrapper">
            <!-- Search for small screen-->
            <div class="container">
                <div class="row">
                    <div class="col s10 m6 l6">
                    <h5 class="breadcrumbs-title mt-0 mb-0">Celebrity Items</h5>
                    </div>
                </div>
            </div>
        </div>
        <div class="col s12" >
            <div class="container">
                <div class="section section-data-tables">
                    <div class="card">
                        <div class="card-content">
                            <p class="caption mb-0">Celebrity List</p>
                        </div>
                    </div>
                    <div class="row">
                    <div class="col s12 m12 l12">
                        <div id="button-trigger" class="card card card-default scrollspy">
                        <!-- built files will be auto injected -->
                        <div class="card-content chk-list">
                            <div class="row" v-show="Celebs.length>0">
                                <div class="col s12" v-for="(Celeb, idx) in Celebs" :key="idx">

                                    <div class="input-group m-b-5">

                                        <a href="#"><span class="input-group-addon addon-left" title=""
                                            v-on:click="updateData(Celeb)"><i class="material-icons"></i></span></a>
                                        <input type="text" class="form-control" :class="Celeb.done?'Celeb__done':''" v-model="Celeb.name"
                                            @keypress="Celeb.editing=true" @keyup.enter="updateData(Celeb)">



                                        <a href="#"><span class="input-group-addon addon-left" title="Delete Celeb?"
                                            v-on:click="deleteData(Celeb._id)">X</span></a>
                                    </div>

                                    <span class="help-block small" v-show="Celeb.editing">Hit enter to update</span>

                                </div>
                            </div>

                            <div class="row alert alert-info text-center" v-show="Celebs.length==0">
                                <p class="alert alert-info">
                                    <strong>All Caught Up</strong>
                                    <br/>
                                    You do not have any celebrity items</p>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
    import axios from 'axios';

    import bus from './../../bus.js'


    export default {

        data() {

            return {

                Celebs: []

            }

        },

        created: function () {

            this.fetchData();

            this.listenToEvents();

        },


        methods: {

            fetchData() {

                let uri = 'http://localhost:3000/celebs/seenList';

                axios.get(uri).then((response) => {

                    this.Celebs = response.data;

                });

            },

            updateData(Celeb) {

                let id = Celeb._id;

                let uri = 'http://localhost:3000/celebs/update/' + id;

                Celeb.editing = false;

                axios.post(uri, Celeb).then((response) => {

                   // console.log(response);

                }).catch((error) => {

                    //console.log(error);

                })

            },


            deleteData(id) {

                let uri = 'http://localhost:3000/celebs/delete/' + id;

                axios.get(uri);

                this.fetchData();
                this.clearcelebrity();
                this.refreshcelebrity();
            },

            listenToEvents() {

                bus.$on('refreshData', ($event) => {

                    this.fetchData(); //update 

                })

            },
            clearcelebrity() {
            this.Celebs = '';
            },
    
            refreshcelebrity() {
            bus.$emit("refreshcelebrity");
            }            

        }

    }
</script>
