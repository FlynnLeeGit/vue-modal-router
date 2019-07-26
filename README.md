# vue-modal-router

> elegant to manage spa modals

# Breaking Change

- 0.4.0 is differenet to 0.3.x
- [delay] and [model] is config in Vue.use()
- suport component level modals,friendly for dyamicImport,to impress performance

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
Vue.use(VueModalRouter, {
  model: 'show', // this should be equal to modal component model name
  delay: 300 // delay time to destroy modal instance
})

const modalRouter = new VueModalRouter({
  CustomEdit // now modal name can be 'CustomEdit' or 'custom-edit',it will try pascal name
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
  <button v-modal-link="{name: 'custom-edit' }">open custom edit modal</button>
</template>
```

pass props to modal

```html
<template>
  <!-- button to open modal -->
  <button
    tag="button"
    v-modal-link="{name: 'custom-edit',props: {a: 1, b: 2} }"
  >
    open custom edit modal
  </button>
</template>
```

with event

```html
<template>
  <!-- button to open modal -->
  <button v-modal-link="{ name: 'custom-edit', on: {test: onModalTest } }">
    open custom edit modal
  </button>
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

dyamic modals,now you can import modals only in component what you need
no need to import all modals at ones

```html
<template>
  <!-- button to open modal here will  use `modals` config -->
  <button
    tag="button"
    v-modal-link="{name: 'custom-edit-local',props: {a: 1, b: 2} }"
  >
    open custom edit modal
  </button>
</template>

<script>
  import CustomEditLocal from './modals/custom-edit.vue'

  export default {
    modals: {
      CustomEditLocal
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
