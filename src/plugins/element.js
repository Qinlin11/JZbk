import {DatePicker,Container,Aside,Header,Main, Menu, MenuItem, Submenu, Tabs, TabPane, Button,Card,Tag, Select, Option,Input, Pagination, Dialog, Upload,MessageBox,Message, Form, FormItem, Breadcrumb, BreadcrumbItem} from 'element-ui'
import Vue from 'vue';
Vue.use(Container)
Vue.use(Aside)
Vue.use(Header);
Vue.use(Main);
Vue.use(Menu);
Vue.use(MenuItem)
Vue.use(Submenu)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Button)
Vue.use(Card)
Vue.use(Tag)
Vue.use(Select)
Vue.use(Option)
Vue.use(Input)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Upload)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(DatePicker)
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$message = Message;
