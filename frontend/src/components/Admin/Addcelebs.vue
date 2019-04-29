<template>
<div class="row">
    <div class="content-wrapper-before gradient-45deg-indigo-purple"></div>
        <div class="breadcrumbs-dark pb-0 pt-4" id="breadcrumbs-wrapper">
            <!-- Search for small screen-->
            <div class="container">
                <div class="row">
                    <div class="col s10 m6 l6">
                    <h5 class="breadcrumbs-title mt-0 mb-0">Add Celebrity</h5>
                    </div>
                </div>
            </div>
        </div>
        <div class="col s12" >
            <div class="container">
                <div class="section section-data-tables">
                    <div class="card">
                        <div class="card-content">
                            <p class="caption mb-0">You should add Celebrity with all fields.</p>
                        </div>
                    </div>
                    <div class="row">
                    <div class="col s12 m12 l12">
                        <div id="button-trigger" class="card card card-default scrollspy">
                        <!-- built files will be auto injected -->
                          <div class="card-content">
                            <div class="row">
                            <form @submit.prevent>
                                <div class="form-group">
                                  <input type="text" class="form-control" @keypress="typing=true" placeholder="What do you want to do?" v-model="celebrity" @keyup.enter="addcelebrity($event)">
                                  <span class="help-block small text-center" v-show="typing">Hit enter to save</span>
                                </div>
                              </form>
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
  import bus from "./../../bus.js";
  
  export default {
    data() {
      return {
        celebrity: '',
        typing: false,
      }
  
    },
  
    methods: {
  
        addcelebrity(event) {
            if (event) event.preventDefault();
    
            let url = 'http://localhost:3000/celebs/add';
            let param = {
            name: this.celebrity,
            done: 0
            };
            axios.post(url, param).then((response) => {
                console.log(response);
                this.clearcelebrity();
                this.refreshcelebrity();
                this.typing = false;
            }).catch((error) => {
                console.log(error);

            })
        },
        
        clearcelebrity() {
         this.celebrity = '';
        },
  
        refreshcelebrity() {
          bus.$emit("refreshcelebrity");
        }
  

    }
  
  
  }
</script>
