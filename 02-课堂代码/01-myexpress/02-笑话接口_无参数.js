// 1. 按需导入 express 包
const express = require('express');
// 2. 创建一个服务器
const app = express();
// 3. 后端路由
// get        代表请求方式
//   /        url 地址
// request    请求报文 - 客户端发过来的
// response   响应报文 - 服务器返回去的


// ### 获取一条随机笑话

// > 随机获取笑话的接口

// - 请求地址：/api/joke
// - 请求方法：get
// - 请求参数：无
// - 响应内容：随机笑话

const jokes = [
    "为什么古装剧里总是有女人会对恩人说：小女子无以为报，唯有以身相许，古代真的存在这种现象吗？ 扯淡，那是因为她喜欢他，要是不喜欢，她就会说：小女子无以为报，唯有来生再报了。",
    "刚才玩了一把狼人杀，网杀。 我是最后一头狼了，悍跳预言家。 游戏已经进行到了三对一，而我主导着好人阵营的风向，本来都已经说好了共同出4。然后我随便刀死一个获得胜利，美滋滋。 结果，在我的发言阶段……正在尽力表演的时候…… 我的舍友突然在旁边大喊了一声…… 卧槽，你居然是狼人！",
    "昨天从外地回来，没回家，今天到家看到老爸醉熏熏地在沙发上。老爸：“什么时候回来的？”我：“昨晚回来的”。他大怒道：“坐碗回来的？怎么不坐盆回来？”我。。。",
    "路上看到一个黑色塑料袋踢了一脚特么是一条睡着的大黑狗，涕泗横流的被追了三里地。",
    "一个胆小紧张的证人正在接受律师的询问。 律师厉声问道：“你是否结过婚？” “是的，我结过一次。”证人声音很小，还有些颤抖。 “那么你和谁结婚了？” “一个女人。” 律师有些发怒，“废话，你当然是和一个女人结婚了。你听说过有谁会和一个男人结婚吗？” 证人颤抖着说：“听说过，我姐姐”。",
    "一位女明星走进鞋店，试了好几双鞋子都不合脚，老板亲自蹲下来替她量脚的尺寸。这位女明星有些近视，看见老板的秃头，以为是自己的膝盖露出来了，便用裙子将它盖住，然而，她立即听到老板的一声闷叫：“真混蛋，又停电了。”",
    "重庆江北北宾路，一酒驾司机被交警拦下.就在他下车一瞬间，这哥们抄起瓶五粮液，一扬脖就喝了半瓶.然后边喝边说，“我不是酒后驾车，我是驾后喝酒.现在我喝了酒，不能开车了，不然要拘6个月.我车就停这，乱停车你们开罚单，拖走也行.我打车走了，明再来提车”.交警茫然...",
    "昨晚喝多了，老婆不在家，让女儿给我倒杯糖水解酒。女儿问：“什么糖都行吗？”我说行。几分钟后，只见女儿颤巍巍的端来一杯水，上面飘着几块口香糖。",
    "昨天发现楼下小摊有5块钱一个的高仿iPhone7模型，于是买了一个然后在一个人多的广场河边假装打电话:“妈蛋，给劳资滚，劳资不会原谅你的，分手吧”然后潇洒的把手机模型扔到了河里，拿出一根烟，故作忧郁的在那里摆了个销魂的姿势站着，看着旁边好多妹子用那花痴的表情看着我。正在我为今天晚上是双飞还是群P伤透脑筋的时候，一个小盆友过来拍了拍我，大声的对我说:“叔叔，你的手机浮上来了。。。最讨厌小盆友了",
    "晚上打的，我：“师傅，服务卡上是你吗？” 他：“是的。” 我：“我看你开车技术很好啊？” 他：“还行吧。” 我：“看你这水平，你以前开过赛车吧？” 他不自信的装B道：“是呀，是呀！这你都能看得出来。” 我：“那是，喜欢兜圈子是不是开赛车留下的职业病？” 他。。。"
]

// 获取一条随机笑话
app.get('/api/joke', (request, response) => {
    // 1. 准备一个随机整数
    const index = Math.floor(Math.random() * jokes.length);
    // 2. 根据随机整数从数组中获取一条笑话
    const joke = jokes[index];
    response.send(joke);
});

// 4. 监听端口
app.listen(3000, () => {
    console.log('服务器启动');
});

// 浏览器端访问：     本地服务器地址 + 端口号 + 接口地址
// 客户端访问的完整地址：   127.0.0.1:3000/api/joke