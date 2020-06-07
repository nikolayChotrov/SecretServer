<template>
    <div class="main">
        <div class="box">
            <h1>Add your hash here to see your secret:</h1>
            <input class = "form-control" type="text" v-model="urlHash" name="urlHash" placeholder="urlHash" required>
            <div class="d-flex justify-content-center">
                <button @click = "getSecret">Search</button>
            </div>
            <div>
                <p class="alert alert-success" v-if="dataInfo.hash">Hash : {{dataInfo.hash}}</p>
                <p class="alert alert-success" v-if="dataInfo.hash">Secret Text :{{dataInfo.secretText}}</p>
                <p class="alert alert-success" v-if="dataInfo.hash">Created At : {{dataInfo.createdAt}}</p>
                <p class="alert alert-success" v-if="dataInfo.hash">Expires : {{dataInfo.expires}}</p>
                <p class="alert alert-success" v-if="dataInfo.hash">Remaining Views :{{dataInfo.remainingViews}}</p>
                <p class="alert alert-danger" v-else>{{ dataInfo}}</p>
                <br>
            </div>
        </div>

        <div class="box">
            <h1>Create you secret</h1>
            <input class = "form-control" type="text" v-model="secretText" name="urlHash" placeholder="The Secret You want to add" required>
            <input class = "form-control" type="number" v-model="expireAfterViews" name="urlHash" placeholder="Times To display Secret" required>
            <input class = "form-control" type="number" v-model="expireAfter" name="urlHash" placeholder="TTL of the Secret in min" required>
            <div class="d-flex justify-content-center">
                <button @click = "postSecret">Create</button>
            </div>
            <div>
            <p class="alert alert-success"  v-if="createdDate.hash">Hash : {{createdDate.hash}}</p>
            <p class="alert alert-success"  v-if="createdDate.hash">Secret Text :{{createdDate.secretText}}</p>
            <p class="alert alert-success"  v-if="createdDate.hash">Created At : {{createdDate.createdAt}}</p>
            <p class="alert alert-success"  v-if="createdDate.hash">Expires : {{createdDate.expires}}</p>
            <p class="alert alert-success"  v-if="createdDate.hash">Remaining Views :{{createdDate.remainingViews}}</p>
            <p class="alert alert-danger"  v-else>{{ createdDate}}</p>
            <br>
        </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

const url = 'http://localhost:3000/api/secret/';
export default {
  name: 'PostComponent',
  data () {
      return {
          urlHash: '',
          secretText: '',
          expireAfterViews:'',
          expireAfter:'',
          dataInfo:[],
          createdDate:[],
      }

  },
  methods: {
    getSecret: function () {
        var app = this

        axios.get(url + app.urlHash)
            .then(function (response) {
                console.log(response.data.hash)
                app.dataInfo = response.data
            })
            .catch(function (error) {
                app.dataInfo = error
            })
    },

    postSecret: function () {
        var app = this


        const params = new URLSearchParams();
        params.append('secret', app.secretText);
        params.append('expireAfterViews', app.expireAfterViews);
        params.append('expireAfter', app.expireAfter);
        axios({
            method: 'post',
            url: url,
            data: params
        })
            .then(function (response) {
                console.log(response.data.hash)
                app.createdDate = response.data
            })
            .catch(function (error) {
                app.createdDate = error
            })

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .box{
        max-width: 80%;
        margin: 50px auto;
        background: white;
        border-radius: 5px;
        box-shadow: 5px 5px 15px -5px rgba(0, 0, 0, 0.3);
        box-sizing: border-box;
    }
    .d-flex{
        display: flex;

    }
    .justify-content-center{
        -webkit-box-pack: center!important;
        -ms-flex-pack: center!important;
        justify-content: center!important;
    }
    button {
        min-height: 50px;
        border-radius: 10px;
        border-color: transparent;
        background-color: #A683E3;
        color: #fff;
        font-size: 30px;
        padding-bottom: 6px;
        margin-bottom: 2rem;
    }
    .form-control {
        display: block;
        margin-bottom: 1rem;
        margin-left: auto;
        margin-right: auto;
        width: 80%;
        padding: .375rem .75rem;
        font-size: 1rem;
        line-height: 1.5;
        color: #495057;
        background-color: #fff;
        background-clip: padding-box;
        border: 1px solid #ced4da;
        border-radius: .25rem;
        transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    }
    .alert {
        position: relative;
        padding: .75rem 1.25rem;
        margin-bottom: 1rem;
        border: 1px solid transparent;
        border-radius: .25rem;
    }
    .alert-success {
    color: #155724;
    background-color: #d4edda;
    border-color: #c3e6cb;
    }

    .alert-danger {
    color: #0c5460;
        background-color: #d1ecf1;
        border-color: #bee5eb;
}

    h1 {

        text-align: center;
        padding: 10px;
    }

    p{
        width: 80%;
        margin-left: auto;
        margin-right: auto;
        text-align: center;
        margin-bottom: 4rem;
        word-break: break-all;
        white-space: normal;
    }
</style>
