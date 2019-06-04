import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/page/layout.vue'
import Login from '@/page/login/login.vue'
import Home from '@/page/home/home.vue'
import Book from '@/page/book/book.vue'
import BookDetail from '@/page/book/book-detail.vue'
import BookAdd from '@/page/book/book-add.vue'
import Category from '@/page/category/category.vue'
import Order from '@/page/order/order.vue'
import OrderDetail from '@/page/order/order-detail.vue'
import User from '@/page/user/user.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Layout,
      children: [{
        path: 'home',
        name: 'home',
        component: Home
      }, {
        path: 'book',
        name: 'Book',
        component: Book,
      }, {
        path: 'book/detail',
        name: 'BookDetail',
        component: BookDetail
      }, {
        path: 'book/add',
        name: 'BookAdd',
        component: BookAdd
      }, {
        path: 'category',
        name: 'Category',
        component: Category
      }, {
        path: 'order',
        name: 'Order',
        component: Order
      }, {
        path: 'order/detail',
        name: 'OrderDetail',
        component: OrderDetail
      }, {
        path: 'user',
        name: 'User',
        component: User
      }]
    }, {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
