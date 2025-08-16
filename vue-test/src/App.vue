<template>
  <div id="app">
    <div class="traffic-light">
      <div class="light red" :class="{ active: currentLight === 'red' }"></div>
      <div class="light yellow" :class="{ active: currentLight === 'yellow' }"></div>
      <div class="light green" :class="{ active: currentLight === 'green' }"></div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      currentLight: 'red',
      timer: null
    }
  },
  mounted () {
    this.startTrafficLight()
  },
  methods: {
    startTrafficLight () {
      const lights = ['red', 'yellow', 'green']
      let index = 0

      this.timer = setInterval(() => {
        index = (index + 1) % lights.length
        this.currentLight = lights[index]
      }, 2000) // 每2秒切换一次
    }
  },
  beforeDestroy () {
    clearInterval(this.timer)
  }
}
</script>

<style>
.traffic-light {
  width: 100px;
  border: 1px solid #333;
  padding: 10px;
  border-radius: 10px;
  background: #eee;
}

.light {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin: 10px auto;
  opacity: 0.3;
}

.light.red {
  background: red;
}

.light.yellow {
  background: yellow;
}

.light.green {
  background: green;
}

.light.active {
  opacity: 1;
}
</style>
