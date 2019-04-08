# vue-modal-router

> elegant to manage spa modals

### install

```
npm install vue-modal-router
```

## vue-modal-router

use modals like vue-router style way

### install

modal component

```html
<template>
  <!-- your modal component -->
  <modal v-model="show">
    <h1>something</h1>
    <button @click="onTest">test</button>
  </modal>
</template>

<script>
  export default {
    props: ['a', 'b'],
    data() {
      return {
        show: false
      }
    },
    methods: {
      onTest() {
        this.$emit('test')
      }
    }
  }
</script>
```

App.vue

```html
<template>
  <div id="app">
    <router-view></router-view>
    <!-- modal placeholder -->
    <modal-router-view></modal-router-view>
  </div>
</template>
```

```js
import Vue from 'vue'
import VueModalRouter from 'vue-modal-router'

import CustomEdit from './custom-edit.vue'
Vue.use(VueModalRouter)

const modalRouter = new VueModalRouter({
  model: 'show', // this should be equal to modal component model name
  delay: 300, // delay time to destroy modal instance
  routes: [
    {
      name: 'custom-edit',
      component: CustomEdit
    }
  ]
})

new Vue({
  el: '#app',
  modalRouter
})
```

then in page component

```html
<template>
  <!-- button to open modal -->
  <modal-link tag="button" :to="{name: 'custom-edit' }"
    >open custom edit modal</modal-link
  >
</template>
```

pass props to modal

```html
<template>
  <!-- button to open modal -->
  <modal-link tag="button" :to="{name: 'custom-edit',props: {a: 1, b: 2} }">
    open custom edit modal
  </modal-link>
</template>
```

with event

```html
<template>
  <!-- button to open modal -->
  <modal-link
    tag="button"
    :to="{ name: 'custom-edit', on: {test: onModalTest } }"
  >
    open custom edit modal
  </modal-link>
</template>

<script>
  export default {
    methods: {
      onModalTest() {
        console.log('get modal event here')
      }
    }
  }
</script>
```

use manual api to open a modal

```html
<template>
  <div>
    <button @click="onOpen">
      open
    </button>
  </div>
</template>

<script>
  export default {
    methods: {
      onModalTest() {
        console.log('test here')
      },
      onOpen() {
        this.$modalRouter.push({
          name: 'custom-edit',
          props: { a: 1, b: 2 },
          on: {
            test: this.onModalTest
          }
        })
      }
    }
  }
</script>
```

### Development Setup

```bash
# install deps
npm install

# serve demo at localhost:8080
npm run dev

# build library and demo
npm run build

# build library
npm run build:library

# build demo
npm run build:demo
```

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2018 FlynnLee
