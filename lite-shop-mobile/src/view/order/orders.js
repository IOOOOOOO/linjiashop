import api from '@/api/cart'
import order  from '@/api/orders'
import { Row, Col,Checkbox, CheckboxGroup, Card, SubmitBar, Toast, NavBar, Tab,Tabs,Tabbar, TabbarItem,Panel   } from 'vant';

export default {
    components: {
        [Row.name]: Row,
        [Col.name]: Col,
        [Card.name]: Card,
        [Checkbox.name]: Checkbox,
        [SubmitBar.name]: SubmitBar,
        [CheckboxGroup.name]: CheckboxGroup,
        [NavBar.name]: NavBar,
        [Tab.name]:Tab,
        [Tabbar.name]: Tabbar,
        [Tabs.name]: Tabs,
        [TabbarItem.name]: TabbarItem,
        [Panel.name]: Panel

    },

    data() {
        return {
            navList: [
                {name:'待付款',id:1},
                {name:'待发货',id:2},
                {name:'已发货',id:3},
                {name:'已完成',id:4},
            ],
            orderList:[],
            activeNav: 0,
            activeFooter: 3,
            checkedGoods: ['1'],
            goods: [ ],
            imgUrl:'/dev-api/file/getImgStream?idFile=',
            listQuery: {
                page: 1,
                limit: 20,
                status: 1
            }
        };
    },
    mounted(){
        if(this.$route.query){
            let status = this.$route.query.status
            console.log('status',status)
            //使用状态减一作为导航栏的序号，如果状态值改变，则不能使用该方法
            this.activeNav = parseInt(status)-1
            this.listQuery.status = status
        }
      this.init()
    },
    computed: {
        submitBarText() {
            const count = this.checkedGoods.length;
            return '结算' + (count ? `(${count})` : '');
        },
    },

    methods: {
        init(){
            console.log('router1111', this.$router)
            this.getData()

        },
        getData(){
            order.getOrders(this.listQuery).then( response => {
                let orderList = response.data.records
                console.log('orderList',orderList)
                for(var index in  orderList){
                    let orders = orderList[index]
                    orders.title=''+orders.createTime
                    orders.descript = ''+orders.orderSn


                }
                this.orderList = orderList
            }).catch( (err) => {

            })
        },
        formatPrice(price) {
            return (price / 100).toFixed(2);
        },
        onClickLeft(){
            this.$router.go(-1)
        },
        clickNav(index,title){
            this.activeNav = index;
            this.listQuery.status = this.navList[index].id
            this.getData()
        }
    }
};
