const utils = require('./util.js');
const countries = ['阿富汗', '安圭拉', '亚美尼亚', '阿根廷', '阿鲁巴', '澳大利亚', '奥地利', '阿塞拜疆', '巴哈马', '巴林',
    '孟加拉', '巴巴多斯', '白俄罗斯', '比利时', '伯利兹', '贝宁', '百慕大', '不丹', '玻利维亚', '布维岛',
    '巴西', '文莱', '保加利亚', '布基纳法索', '布隆迪', '柬埔寨', '喀麦隆', '加拿大', '佛得角', '开曼群岛',
    '乍得', '智利', '中国', '哥伦比亚', '科摩罗', '刚果', '哥斯达黎加', '克罗地亚', '塞浦路斯', '捷克',
    '丹麦', '吉布提', '多米尼克', '多米尼加', '埃及', '萨尔瓦多', '厄瓜多尔', '爱沙尼亚', '埃塞俄比亚', '斐济',
    '法罗群岛', '芬兰', '法国', '加蓬', '冈比亚', '格鲁吉亚', '德国', '加纳', '直布罗陀', '希腊',
    '格陵兰', '格林纳达', '关岛', '危地马拉', '几内亚', '圭亚那', '海地', '洪都拉斯', '匈牙利', '冰岛',
    '印度', '印尼', '爱尔兰', '以色列', '意大利', '牙买加', '日本', '乔丹', '肯尼亚', '基里巴斯',
    '科威特', '老挝', '拉脱维亚', '黎巴嫩', '莱索托', '利比里亚', '立陶宛', '卢森堡', '马达加斯加', '马拉维',
    '马来西亚', '马尔代夫', '马里', '马耳他', '马提尼克岛', '毛里塔尼亚', '马约', '墨西哥', '摩尔多瓦', '蒙古',
    '摩洛哥', '莫桑比克', '纳米比亚', '瑙鲁', '尼泊尔', '荷兰', '新喀里多', '新西兰', '尼加拉瓜', '尼日尔',
    '尼日利亚', '挪威', '阿曼', '巴基斯坦', '贝劳', '巴拿马', '巴拉圭', '秘鲁', '菲律宾', '波兰',
    '葡萄牙', '波多黎各', '卡塔尔', '韩国', '马其顿', '留尼旺', '罗马尼亚', '俄罗斯', '沙特阿拉伯', '塞内加尔',
    '塞舌尔', '新加坡', '斯洛伐克', '斯洛文尼亚', '所罗门群岛', '索马里', '南非', '西班牙', '斯里兰卡', '圣赫勒拿',
    '圣露西亚', '苏丹', '苏里南', '斯威士兰', '瑞典', '瑞士', '叙利亚', '塔吉克斯坦', '坦桑尼亚', '泰国',
    '多哥', '汤加', '土耳其', '土库曼斯坦', '图瓦卢', '乌干达', '乌克兰', '阿联酋', '英国', '美国',
    '乌拉圭', '委内瑞拉', '瓦努阿图', '梵蒂冈', '越南', '西撒哈拉', '也门', '南斯拉夫', '扎伊尔', '赞比亚',
    '津巴布韦', '朝鲜'
]

const constellations = ['长蛇座', '室女座', '大熊座', '鲸鱼座', '武仙座', '波江座', '飞马座', '天龙座', '半人马座', '宝瓶座', '蛇夫座', '狮子座', '牧夫座', '双鱼座', '人马座', '天鹅座', '金牛座', '鹿豹座', '仙女座', '船尾座',
    '御夫座', '天鹰座', '巨蛇座', '英仙座', '仙后座', '猎户座', '仙王座', '天猫座', '天秤座', '双子座', '巨蟹座', '船帆座', '天蝎座', '船底座', '麒麟座', '玉夫座', '凤凰座',
    '猎犬座', '白羊座', '摩羯座', '天炉座', '后发座', '大犬座', '孔雀座', '天鹤座', '豺狼座', '六分仪座', '杜鹃座', '印第安座', '南极座', '天兔座',
    '天琴座', '巨爵座', '天鸽座', '狐狸座', '小熊座', '望远镜座', '时钟座', '绘架座', '南鱼座', '水蛇座', '唧筒座', '天坛座', '小狮座', '罗盘座', '显微镜座', '天燕座', '蝎虎座',
    '海豚座', '乌鸦座', '小犬座', '剑鱼座', '北冕座', '矩尺座', '山案座', '飞鱼座', '苍蝇座', '三角座', '蝘蜓座', '南冕座', '雕具座', '网罟座', '南三角座', '盾牌座', '圆规座', '天箭座', '小马座', '南十字座'
]

const tarots = ['愚者', '魔术师', '女祭司', '女皇', '皇帝', '教皇', '恋人', '战车', '力量', '隐者', '命运之轮', '正义', '倒吊人', '死神', '节制', '恶魔', '塔', '星星', '月亮', '太阳', '审判', '世界']

function randomName() {
    return countries[utils.getRandom(countries.length)] + constellations[utils.getRandom(constellations.length)] + tarots[utils.getRandom(tarots.length)]
}

module.exports = {
    randomName
}
