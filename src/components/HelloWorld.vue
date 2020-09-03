<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h3>get请求</h3>
    <p>{{ mock1 }}</p>
    <h3>post请求</h3>
    <p>{{ mock2 }}</p>
    <h3>jsonp请求</h3>
    <p>{{ mock3 }}</p>
    <h3>proxy请求</h3>
    <p>{{ mock4 }}</p>
  </div>
</template>

<script>
import { proxy_get } from '../../api/easy_cli_test/index'
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  data () {
    return {
      mock1: null,
      mock2: null,
      mock3: null,
      mock4: null,
    }
  },
  created () {
    this.testMock1()
    this.testMock2()
    this.testMock3((d) => {
      this.mock3 = d.data.projects[1]
    })
    this.testMock4()
  },
  methods: {
    jsonp (src, options) {
      var callback_name = options.callbackName || 'callback'
      var on_success = options.onSuccess || function () { }
      var on_timeout = options.onTimeout || function () { }
      var timeout = options.timeout || 5

      var timeout_trigger = window.setTimeout(function () {
        window[callback_name] = function () { }
        on_timeout()
      }, timeout * 1000)

      window[callback_name] = function (data) {
        window.clearTimeout(timeout_trigger)
        on_success(data)
      }

      var script = document.createElement('script')
      script.type = 'text/javascript'
      script.async = true
      script.src = src

      document.getElementsByTagName('head')[0].appendChild(script)
    },
    testMock1 () {
      this.$axios({
        url: 'http://localhost:8081/api/mocktest',
        method: 'get',
        params: {},
      }).then((res) => {
        this.mock1 = res.data.data.projects[0]
      })
    },
    testMock2 () {
      this.$axios({
        url: 'http://localhost:8081/api/login',
        method: 'post',
        data: { username: 'admin', password: 'admin' },
      }).then((res) => {
        this.mock2 = res.data.data
      })
    },
    testMock3 (cb) {
      this.jsonp(
        'http://localhost:8081/api/mocktest?jsonp_param_name=callback&callback=callback',
        {
          onTimeout: function () {
            // alert('Timeout.')
          },
          onSuccess: function (d) {
            cb(d)
          },
        }
      )
    },
    testMock4 () {
      proxy_get({ params: { q: 'language:javascript', sort: 'stars' } }).then((res) => {
        this.mock4 = res.data.data.code
      })
      // this.$axios({
      //   url: 'http://localhost:8081/api/proxy',
      //   method: 'get',
      //   params: { q: 'language:javascript', sort: 'stars' },
      // }).then((res) => {
      //   this.mock4 = res.data.data.code
      // })
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
