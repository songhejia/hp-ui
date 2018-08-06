<template>
  <div class="hello">
    <hp-layout :count="4"
               :horizontal="false">
      <div slot="item-1">
        <hp-hello></hp-hello>
      </div>
      <div slot="item-2">
        <hp-hello></hp-hello>
      </div>
      <div slot="item-3">
        <hp-hello></hp-hello>
      </div>
      <hp-layout slot="item-4"
                 :count="2"
                 horizontal>
        <div slot="item-1">
          <hp-hello></hp-hello>
        </div>
        <div slot="item-2">
          <hp-hello></hp-hello>
        </div>
      </hp-layout>
    </hp-layout>
  </div>
</template>

<script>
import hello from '../../packages/hello'
import layout from '../../packages/layout'
export default {
  name: "HelloWorld",
  components: {
    [hello.name]: hello,
    [layout.name]: layout
  }

};
</script>