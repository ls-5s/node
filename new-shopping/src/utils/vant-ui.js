import Vue from 'vue'
import { Tabbar, TabbarItem, NavBar, Toast, Search, Swipe, SwipeItem, Grid, GridItem, Icon, Lazyload, ActionSheet, Dialog, Rate, Checkbox, Tab, Tabs } from 'vant'

Vue.use(Toast)
Vue.use(NavBar)
Vue.use(Tabbar)
Vue.use(TabbarItem)

Vue.use(GridItem)
Vue.use(Search)
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(Grid)
Vue.use(Icon)
Vue.use(Lazyload)
Vue.use(ActionSheet)
Vue.use(Dialog)
// 2. 注册组件（全局注册，所有组件都能用）
Vue.use(Rate)
Vue.use(Checkbox)
Vue.use(Tab)
Vue.use(Tabs)
