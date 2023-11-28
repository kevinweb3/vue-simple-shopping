<template>
    <div id="my-markdown" class="markdown-body">
        <vue-markdown :source="md"></vue-markdown>
    </div>
</template>
<script>
import VueMarkdown from "vue-markdown";
export default {
    name: "my-markdown",
    components: {
        VueMarkdown
    },
    data: {
        md: ""
    },
    created: function(){
        this.$axios.get("/api/public/docs/README.md",{})
        .then(res => {
            this.md = res.data
        })
        .catch(err => {
            return Promise.reject(err);
        })
    }
}
</script>
<style>
@import "../assets/css/github-markdown.css";
.markdown-body {
  box-sizing: border-box;
  margin: 0 auto;
  padding: 0 40px;
}
</style>