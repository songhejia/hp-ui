<template>
  <div class="hello">
    <hp-hello></hp-hello>
  </div>
</template>

<script>
import hello from '../../packages/hello/index'
console.log('hello', hello)
export default {
  name: "HelloWorld",
  components: {
    [hello.name]: hello
  }

};
</script>