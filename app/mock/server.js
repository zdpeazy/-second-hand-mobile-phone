var app = require('koa')();
var router = require('koa-router')();
var koaBody = require('koa-body')();
var cors = require('koa-cors')

// 支持跨域
app.use(cors())

// 首页 —— 推荐列表（猜你喜欢）
var homeListData1 = require('./goodList/List1.js');
var homeListData2 = require('./goodList/List2.js');
var homeListData3 = require('./goodList/List3.js');
router.post('/api/goodList', koaBody, function *(next) {
    // 参数
    const params = this.request.body;
    const paramsPage = params.pageNo
    var homeListData = null;

    console.log('当前页数：' + paramsPage)

    if(paramsPage * 1 == 1){
    	homeListData = homeListData1;
    } else if(paramsPage * 1 == 2){
    	homeListData = homeListData2;
    } else if(paramsPage * 1 == 3){
    	homeListData = homeListData3;
    } else {
    	homeListData = {
    		code: 0,
    		data: {},
    		result: '没有更多数据了'
    	}
    }
    this.body = homeListData;
});

var goodDetailData1 = require('./goodDetail/7881.js');
var goodDetailData2 = require('./goodDetail/7880.js');
var goodDetailData3 = require('./goodDetail/8110.js');
router.post('/api/goodDetail', koaBody, function *(next) {
    // 参数
    const params = this.request.body;
    const goodId = params.goodId
    var goodDetailData = null;

    console.log('当前goodId' + goodId)

    if(goodId * 1 == 7881){
    	goodDetailData = goodDetailData1;
    } else if(goodId * 1 == 7880){
    	goodDetailData = goodDetailData2;
    } else if(goodId * 1 == 8110){
    	goodDetailData = goodDetailData3;
    } else {
    	goodDetailData = {
    		code: 0,
    		data: {},
    		result: '该商品暂无数据'
    	}
    }
    this.body = goodDetailData;
});
/*router.get('/api/goodList', function *(next) {
    const params = this.params
    console.log(this.params)
    const paramsPage = params.page
    var homeListData = null;
    this.body = homeListData
});
*/


// 开始服务并生成路由
app.use(router.routes())
   .use(router.allowedMethods());
app.listen(3000);
