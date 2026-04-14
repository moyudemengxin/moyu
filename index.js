// ========================  道途定义  ========================
// ========================  道途定义  ========================
const DAO_LIST = [
    "神道", "魔道", "逍遥道", "长生道", "众生道", "苍生道",
    "医道", "杀道", "无情道", "红尘道", "炼器道", "御器道",
    "逆天道", "顺天道", "文道", "武道", "禅道", "凡人道"
];

const DAO_DESCRIPTIONS = {
    "神道": { quote:" 执棋掌命，代天行章 ", desc:"道心如磐，意志如铁。你生来便知秩序的重量，不喜失控，不屑苟且。于纷乱中你看见规则，于混沌中你建立章法。" },
    "魔道": { quote:" 问道由我，不拜四方 ", desc:"你不信命，不拜神，只拜自己。规矩是别人定的，路是你自己踩出来的。心头那团火，烧的是不甘，炼的是执念。" },
    "逍遥道": { quote:" 御风千里，天地为乡 ", desc:"你不愿被任何事物拴住。来是一阵风，去是一片云。这天地偌大，何处不是归处？你只求一个自在。" },
    "长生道": { quote:" 不争朝夕，只问久长 ", desc:"你从不赌一时之快。旁人争春，你等秋实。走得快的不一定走得远，而你想看看这条路的尽头。" },
    "众生道": { quote:" 化入江海，一滴无疆 ", desc:"你不做孤峰，愿为川流。把自己揉碎撒进人海，渡人即是渡己。" },
    "苍生道": { quote:" 燃灯照夜，以身渡航 ", desc:"你生来便觉得肩上沉甸甸。黑暗里你走在最前，灯火燃尽之前，照一寸是一寸，渡一人是一人。" },
    "医道": { quote:" 悬壶济世，枯木回阳 ", desc:"你见不得破碎。总想把这世间的裂痕也一并缝补。敢直面伤痛并试图治愈它，本身就是一种孤勇。" },
    "杀道": { quote:" 霜刃无眼，斩业断肠 ", desc:"你的手起刀落，从不犹豫。以杀止杀，是你给这世道最沉默的慈悲。" },
    "无情道": { quote:" 心如止水，不染尘霜 ", desc:"你不是没有心，只是把心沉得太深。靠得太近会灼伤，不如隔着一层霜，两两相望。" },
    "红尘道": { quote:" 醉卧烟火，笑饮痴狂 ", desc:"你要的从来不是结果，是过程。爱要痛快，恨要尽兴，若不纵情活一回，岂不是白来这一趟。" },
    "炼器道": { quote:" 千锤铸骨，百炼成钢 ", desc:"你信笨功夫。火候到了，铁自然成钢；功夫到了，道自然现身。" },
    "御器道": { quote:" 万物在手，皆为锋芒 ", desc:"你不执着于拥有，只在意能用。天下无一物不可为你所用，四两拨千斤才是你的道。" },
    "逆天道": { quote:" 踏碎凌霄，我自为王 ", desc:"压你的，你要掀翻；拦你的，你要踏碎。你的道不在天上，在自己脚下。" },
    "顺天道": { quote:" 潮起潮落，与道俯仰 ", desc:"你不争，信万物自有其时。逆流而上固然勇猛，顺水推舟才是智慧。" },
    "文道": { quote:" 一笔落定，万古流芳 ", desc:"你信文字比肉身长久。千年之后，你留下的那几行字，或许还能在某个月夜被念起。" },
    "武道": { quote:" 身镇山河，拳破苍茫 ", desc:"想不明白的，先做了再说。这世间的道理，有时候一拳打出去就通了。" },
    "禅道": { quote:" 枯荣不语，明镜照常 ", desc:"你不说，不是无话可说；你不动，不是无路可走。心里空了，天地才装得进来。" },
    "凡人道": { quote:" 柴门炊火，亦是道场 ", desc:"你从不觉得自己有什么特别。把平凡的日子一天天过好，把身边的那几个人一个个护好，便是最大的本事。" }
};

// 道途关联性映射（用于多个同分辅修时选择最相关的）
const DAO_AFFINITY = {
    "神道": ["魔道","顺天道","炼器道"], "魔道": ["神道","逆天道","御器道"],
    "逍遥道": ["长生道","禅道","红尘道"], "长生道": ["逍遥道","医道","凡人道"],
    "众生道": ["苍生道","顺天道","凡人道"], "苍生道": ["众生道","医道","文道"],
    "医道": ["杀道","苍生道","长生道"], "杀道": ["医道","魔道","武道"],
    "无情道": ["红尘道","神道","禅道"], "红尘道": ["无情道","逍遥道","凡人道"],
    "炼器道": ["御器道","神道","文道"], "御器道": ["炼器道","魔道","顺天道"],
    "逆天道": ["顺天道","武道","魔道"], "顺天道": ["逆天道","神道","长生道"],
    "文道": ["武道","苍生道","炼器道"], "武道": ["文道","逆天道","杀道"],
    "禅道": ["凡人道","逍遥道","无情道"], "凡人道": ["禅道","红尘道","众生道"]
};

// ========================  题目数据（56题） ========================
function buildQuestions() {
    return [
        // 维度一：道心与意志 (1-8)
        { text:"你决定每天早上6点起床学习/锻炼。坚持两周后的一个雨夜，朋友深夜找你倾诉心事到凌晨2点。明天6点的闹钟，你会：", options:[
            { text:"照常6点起。承诺自己的事，雷打不动。", scores:{"神道":1,"武道":1} },
            { text:"调成7点半，睡5个半小时，尽量兼顾。", scores:{"长生道":1,"炼器道":1} },
            { text:"关掉闹钟睡到自然醒。朋友的陪伴比自律更重要。", scores:{"红尘道":1,"凡人道":1} },
            { text:"起不来就算了，明天再补。人生不必太紧绷。", scores:{"逍遥道":1,"禅道":1} },
            { text:"看情况，如果朋友的事很重要就陪到底，不重要就委婉结束去睡。", scores:{"苍生道":1,"医道":1} }
        ]},
        { text:"你在公司提出一个方案，被领导当众批评“不切实际”。你的第一反应是：", options:[
            { text:"冷静记录批评要点，回去复盘哪里可以改进。", scores:{"神道":1,"文道":1} },
            { text:"心里不服，找机会用事实和数据证明自己是对的。", scores:{"逆天道":1,"魔道":1} },
            { text:"领导说得对，是我考虑不周，按领导意思改。", scores:{"顺天道":1,"长生道":1} },
            { text:"有点沮丧，但过会儿就忘了，一份工作而已。", scores:{"逍遥道":1,"凡人道":1} },
            { text:"被批评很正常，理解领导的立场，但也保留自己认为对的部分。", scores:{"苍生道":1,"医道":1} }
        ]},
        { text:"你花三个月准备一场重要考试/面试，最后差2分落选。你会：", options:[
            { text:"分析失败原因，立刻制定下一次备考计划。", scores:{"神道":1,"武道":1} },
            { text:"愤怒且不甘，发誓下次一定要以碾压成绩通过。", scores:{"魔道":1,"杀道":1} },
            { text:"难过几天，然后接受结果，命里有时终须有。", scores:{"顺天道":1,"禅道":1} },
            { text:"算了，条条大路通罗马，换条路走也未尝不可。", scores:{"逍遥道":1,"众生道":1} },
            { text:"反思自己是否真的适合这条路，如果不适合就调整方向。", scores:{"长生道":1,"炼器道":1} }
        ]},
        { text:"你正在减肥/戒糖，朋友送你一盒你最喜欢的甜点作为生日礼物，热情地看着你让你尝一口。你会：", options:[
            { text:"感谢但婉拒，解释自己在控制饮食，一口都不破戒。", scores:{"神道":1,"无情道":1} },
            { text:"吃一口，然后去跑5公里抵消掉。既然吃了就要付出代价。", scores:{"魔道":1,"武道":1} },
            { text:"开心地吃，朋友的心意比热量重要，开心最重要。", scores:{"红尘道":1,"凡人道":1} },
            { text:"吃一半，既不让朋友扫兴，也不让自己太放纵。", scores:{"苍生道":1,"医道":1} },
            { text:"放着，说“等过几天奖励日再吃”，然后真的等到那天才吃。", scores:{"长生道":1,"御器道":1} }
        ]},
        { text:"你发现坚持了很久的一件事（健身/学乐器/写公众号）好像没什么进步，进入了平台期。你会：", options:[
            { text:"继续坚持，量变引起质变，熬过去就是突破。", scores:{"武道":1,"逆天道":1} },
            { text:"换方法，研究别人是怎么突破的，调整训练/学习方案。", scores:{"炼器道":1,"文道":1} },
            { text:"暂停一段时间，让自己休息一下，说不定回来就有新感觉。", scores:{"逍遥道":1,"禅道":1} },
            { text:"降低目标，维持现状也挺好，不一定要一直进步。", scores:{"长生道":1,"顺天道":1} },
            { text:"找人请教，或者找个搭子一起练，互相督促。", scores:{"苍生道":1,"众生道":1} }
        ]},
        { text:"朋友聚会上，大家聊到一个你强烈不认同的观点，所有人都表示赞同。你会：", options:[
            { text:"直接说出自己的不同意见，不怕成为少数派。", scores:{"逆天道":1,"武道":1} },
            { text:"保持沉默，没必要破坏气氛，心里怎么想是我自己的事。", scores:{"神道":1,"无情道":1} },
            { text:"附和一下，社交场合嘛，不必太认真。", scores:{"顺天道":1,"凡人道":1} },
            { text:"用开玩笑的方式委婉表达一下不同意见，然后转移话题。", scores:{"逍遥道":1,"红尘道":1} },
            { text:"认真听他们为什么这么想，试图理解不同的立场。", scores:{"苍生道":1,"文道":1} }
        ]},
        { text:"你有一个纠缠多年的坏习惯，多次想改都没改掉。你现在的态度是：", options:[
            { text:"继续和它斗争，制定更严格的管控措施，不信改不了。", scores:{"神道":1,"逆天道":1} },
            { text:"接受它作为自己的一部分，找到和它共存但不影响正事的方式。", scores:{"长生道":1,"御器道":1} },
            { text:"放过自己，人无完人，有点小毛病很正常。", scores:{"逍遥道":1,"凡人道":1} },
            { text:"找到这个习惯背后的心理需求，从根源上疏导而不是压制。", scores:{"医道":1,"禅道":1} },
            { text:"设置惩罚机制，犯一次罚自己一次，用代价来约束。", scores:{"魔道":1,"杀道":1} }
        ]},
        { text:"如果有人问你“你觉得自己是一个意志坚定的人吗”，你最真实的回答是：", options:[
            { text:"是的，认定的事几乎不会动摇。", scores:{"神道":1,"无情道":1} },
            { text:"看情况，真正重要的事我很坚定，小事无所谓。", scores:{"苍生道":1,"炼器道":1} },
            { text:"不太坚定，容易受外界影响，但也在慢慢改善。", scores:{"凡人道":1,"顺天道":1} },
            { text:"我追求的不是“坚定”，而是“自在”，不被任何事绑住。", scores:{"逍遥道":1,"众生道":1} },
            { text:"我对别人不太坚定，但对自己狠得下心。", scores:{"魔道":1,"杀道":1} }
        ]},
        // 维度二：力量与因果 (9-16)
        { text:"你在工作中积累了一套高效的方法/资源，让你在团队中脱颖而出。一个新同事诚恳地向你请教这套方法，你会：", options:[
            { text:"毫无保留地教。方法只有传播出去才有更大价值。", scores:{"苍生道":1,"文道":1} },
            { text:"教一部分核心，保留最关键的部分。总要给自己留点底牌。", scores:{"长生道":1,"御器道":1} },
            { text:"委婉拒绝。这是我辛苦摸索出来的竞争优势，凭什么白给。", scores:{"魔道":1,"无情道":1} },
            { text:"看人，如果对方值得培养就教，不值得就算了。", scores:{"神道":1,"医道":1} },
            { text:"随便讲点皮毛应付一下，反正真正核心的东西教了他也学不会。", scores:{"逍遥道":1,"杀道":1} }
        ]},
        { text:"你发现某个同事通过拉帮结派、排挤他人获得了晋升机会。你内心最真实的想法是：", options:[
            { text:"愤怒。这种人不该得逞，如果我有能力一定要阻止。", scores:{"苍生道":1,"逆天道":1} },
            { text:"不屑。他走他的独木桥，我走我的阳关道，不关我事。", scores:{"神道":1,"禅道":1} },
            { text:"理解。职场本来就是丛林法则，他能上位是他的本事。", scores:{"魔道":1,"杀道":1} },
            { text:"警惕。以后离他远点，别被波及就行。", scores:{"长生道":1,"顺天道":1} },
            { text:"观察。研究他的手段，不是要学，但要防着。", scores:{"炼器道":1,"武道":1} }
        ]},
        { text:"你的好朋友被人欺负了，来找你诉苦。对方比你朋友强势很多，你介入可能会给自己惹麻烦。你会：", options:[
            { text:"帮朋友出头，哪怕得罪人。朋友受欺负我不能坐视不管。", scores:{"武道":1,"红尘道":1} },
            { text:"帮朋友分析情况，教他/她怎么应对，但不直接出面。", scores:{"文道":1,"医道":1} },
            { text:"安慰朋友，但建议他/她算了，惹不起躲得起。", scores:{"顺天道":1,"长生道":1} },
            { text:"看情况。如果朋友占理且我有能力就帮，否则就只做听众。", scores:{"神道":1,"御器道":1} },
            { text:"劝朋友放下，不值得为这种事消耗情绪，自己开心最重要。", scores:{"逍遥道":1,"凡人道":1} }
        ]},
        { text:"你参加一个比赛/竞聘，发现一个选手和评委有私下关系，明显会受到照顾。你会：", options:[
            { text:"更加努力，用绝对的实力碾压，让他有关系也没用。", scores:{"武道":1,"逆天道":1} },
            { text:"举报或者公开提出质疑，要求公平竞争。", scores:{"苍生道":1,"文道":1} },
            { text:"无所谓，反正我也没想赢，参与就好。", scores:{"逍遥道":1,"禅道":1} },
            { text:"想办法也找找关系，既然规则如此，那就按规则玩。", scores:{"魔道":1,"御器道":1} },
            { text:"心态放平，这世界上本来就没有绝对的公平，做好自己就行。", scores:{"神道":1,"众生道":1} }
        ]},
        { text:"你在路上看到有人在争吵，一方明显在欺负另一方。围观的人很多，但没人上前。你会：", options:[
            { text:"上前制止。路见不平，该出手时就出手。", scores:{"武道":1,"苍生道":1} },
            { text:"拍视频留证，然后报警。既要管，也要保护自己。", scores:{"文道":1,"炼器道":1} },
            { text:"站在人群中观望，如果有人带头我就跟着上。", scores:{"凡人道":1,"众生道":1} },
            { text:"走开。多一事不如少一事，我又不是警察。", scores:{"无情道":1,"逍遥道":1} },
            { text:"远远看看什么情况，如果不严重就走，严重就帮忙报警。", scores:{"神道":1,"长生道":1} }
        ]},
        { text:"你所在的行业/公司有一个“潜规则”，不遵守就会吃亏（比如无意义加班、酒桌文化）。你的态度是：", options:[
            { text:"拒绝遵守。大不了换工作，不惯着这种风气。", scores:{"逆天道":1,"无情道":1} },
            { text:"表面上遵守，但内心保持距离，找机会改变它或逃离它。", scores:{"神道":1,"炼器道":1} },
            { text:"适应它。既然改变不了环境，就改变自己，活下去最重要。", scores:{"顺天道":1,"长生道":1} },
            { text:"利用它。既然大家都玩这套，那我就玩得比谁都好。", scores:{"魔道":1,"御器道":1} },
            { text:"找一个折中的方式，既不太委屈自己，也不太得罪人。", scores:{"苍生道":1,"医道":1} }
        ]},
        { text:"有人未经你同意，把你的劳动成果拿去邀功了。你发现后，会：", options:[
            { text:"直接找对方对质，要求给个说法，必要时公开撕。", scores:{"武道":1,"逆天道":1} },
            { text:"收集证据，找合适的时机和渠道揭发，让他付出代价。", scores:{"杀道":1,"文道":1} },
            { text:"吃一堑长一智，以后防着点，这次就算了。", scores:{"长生道":1,"顺天道":1} },
            { text:"心里不爽，但不会撕破脸，找机会用自己的方式找补回来。", scores:{"魔道":1,"红尘道":1} },
            { text:"看对方是谁。如果是重要的人就敲打一下，不重要的就拉黑。", scores:{"神道":1,"凡人道":1} }
        ]},
        { text:"如果用一个比喻来形容你和这个世界的关系，最接近的是：", options:[
            { text:"我是棋手，世界是棋盘，我要努力掌控局面。", scores:{"神道":1,"炼器道":1} },
            { text:"我是战士，世界是战场，我要不断战斗证明自己。", scores:{"武道":1,"杀道":1} },
            { text:"我是过客，世界是风景，我来看看然后离开。", scores:{"逍遥道":1,"禅道":1} },
            { text:"我是水滴，世界是大海，我最终要融入其中。", scores:{"顺天道":1,"众生道":1} },
            { text:"我是医生，世界是病人，我能帮一点是一点。", scores:{"医道":1,"苍生道":1} }
        ]},
        // 维度三：情感与羁绊 (17-24)
        { text:"你和一位密友因为一件事产生了严重分歧，对方说了伤人的话。事后对方向你道歉，但你觉得裂痕已经产生。你会：", options:[
            { text:"接受道歉，但心里从此保持距离，不会再像以前一样掏心掏肺。", scores:{"无情道":1,"长生道":1} },
            { text:"把话说开，告诉对方自己真实的感受，然后翻篇，继续做朋友。", scores:{"红尘道":1,"苍生道":1} },
            { text:"表面和好，但心里记着这件事，以后再有一次就绝交。", scores:{"魔道":1,"杀道":1} },
            { text:"算了，人都有情绪失控的时候，不必太计较，朋友还是朋友。", scores:{"凡人道":1,"逍遥道":1} },
            { text:"看对方道歉的诚意，如果是真心就原谅，如果敷衍就疏远。", scores:{"神道":1,"医道":1} }
        ]},
        { text:"你的父母对你的职业/婚恋选择非常不认同，甚至说出“不听我们的就别回家了”这种话。你会：", options:[
            { text:"坚持自己的选择，不被亲情绑架。我的人生我自己负责。", scores:{"无情道":1,"逆天道":1} },
            { text:"和他们好好沟通，用时间和行动证明自己的选择是对的。", scores:{"苍生道":1,"文道":1} },
            { text:"表面顺从，背地里按自己的方式来，不被发现就好。", scores:{"长生道":1,"御器道":1} },
            { text:"妥协。父母年纪大了，不想让他们伤心，自己委屈一点没关系。", scores:{"凡人道":1,"顺天道":1} },
            { text:"先冷处理一段时间，等双方情绪平复了再谈。", scores:{"神道":1,"禅道":1} }
        ]},
        { text:"你和恋人/最好的朋友分隔两地，保持联系需要投入大量时间和精力。一段时间后，你觉得这段关系让你有些疲惫。你会：", options:[
            { text:"减少联系频率，各自安好就好。真正的关系不需要刻意维持。", scores:{"无情道":1,"逍遥道":1} },
            { text:"坚持维系。重要的人值得付出努力，疲惫只是暂时的。", scores:{"红尘道":1,"苍生道":1} },
            { text:"评估一下这段关系的未来，如果有结果就坚持，没结果就慢慢淡了。", scores:{"长生道":1,"炼器道":1} },
            { text:"顺其自然，想联系就联系，不想联系就不联系，不强求。", scores:{"凡人道":1,"禅道":1} },
            { text:"和对方坦诚自己的感受，一起商量一个双方都舒服的相处模式。", scores:{"医道":1,"众生道":1} }
        ]},
        { text:"你发现一位关系不错的同事/朋友在背后说了你的坏话，但说的内容也不算完全捏造。你会：", options:[
            { text:"直接找他对质，把话当面说清楚。", scores:{"武道":1,"逆天道":1} },
            { text:"记在心里，从此对他留个心眼，但表面上维持原样。", scores:{"魔道":1,"御器道":1} },
            { text:"反思自己是不是确实有问题，他说的是不是有道理。", scores:{"文道":1,"医道":1} },
            { text:"算了，谁人背后无人说，不影响我就行。", scores:{"逍遥道":1,"凡人道":1} },
            { text:"疏远他，但不会撕破脸。成年人的绝交都是无声的。", scores:{"无情道":1,"长生道":1} }
        ]},
        { text:"如果你的人生中有一段“意难平”的感情（爱情或友情），多年后对方突然联系你，想见一面。你会：", options:[
            { text:"不见。过去的就让它过去，掀开旧伤疤没意义。", scores:{"无情道":1,"神道":1} },
            { text:"见一面。我也想看看自己还会不会心动，给自己一个交代。", scores:{"红尘道":1,"凡人道":1} },
            { text:"见一面，但心里很清楚我们回不去了，就当见个老朋友。", scores:{"苍生道":1,"医道":1} },
            { text:"犹豫很久，最后还是决定不见。我怕自己控制不住情绪。", scores:{"长生道":1,"顺天道":1} },
            { text:"随缘。如果刚好方便就见，不方便就算了，不特意安排。", scores:{"逍遥道":1,"禅道":1} }
        ]},
        { text:"你养了多年的宠物去世了。你身边的人说“不就是个动物吗，再养一只就是了”。你的反应是：", options:[
            { text:"很难过，但不会和人争辩。悲伤是我自己的事，不需要别人理解。", scores:{"无情道":1,"神道":1} },
            { text:"当面怼回去。生命没有高低，你不懂就别乱说。", scores:{"武道":1,"杀道":1} },
            { text:"正常表达悲伤，让身边的人知道这对我很重要。", scores:{"红尘道":1,"苍生道":1} },
            { text:"告诉自己万物有生有灭，放下执念，不再养了。", scores:{"禅道":1,"逍遥道":1} },
            { text:"难过一阵子，然后领养另一只需要帮助的动物，把爱延续下去。", scores:{"医道":1,"众生道":1} }
        ]},
        { text:"你是一个容易被别人的情绪影响的人吗？朋友心情不好找你倾诉，你通常会：", options:[
            { text:"不会。我能听，但我心里有一道墙，不会被带进去。", scores:{"无情道":1,"神道":1} },
            { text:"会。朋友难过我也跟着难过，朋友哭我也想哭。", scores:{"红尘道":1,"众生道":1} },
            { text:"会受到影响，但我能帮对方分析问题，提供解决方案。", scores:{"医道":1,"文道":1} },
            { text:"看是谁。重要的人我会全身心投入，普通朋友就客气一下。", scores:{"长生道":1,"炼器道":1} },
            { text:"不会太久。听的时候共情，听完我就放下了。", scores:{"逍遥道":1,"凡人道":1} }
        ]},
        { text:"如果用一个比喻来形容你对待情感的态度，最接近的是：", options:[
            { text:"情感像衣裳，冷了就穿，热了就脱，不必执着。", scores:{"无情道":1,"禅道":1} },
            { text:"情感像酒，越陈越香，值得细细品味和珍藏。", scores:{"红尘道":1,"凡人道":1} },
            { text:"情感像树，需要浇灌和修剪，才能长得健康长久。", scores:{"苍生道":1,"医道":1} },
            { text:"情感像河流，顺其自然，流向哪里算哪里。", scores:{"逍遥道":1,"顺天道":1} },
            { text:"情感像武器，可以温暖人，也可以伤害人，看怎么用。", scores:{"魔道":1,"御器道":1} }
        ]},
        // 维度四：生死与自我 (25-32)
        { text:"你突然得知自己只剩下一年寿命（假设无法改变）。你第一个冒出来的念头是：", options:[
            { text:"列一张清单，把想做的事做完，然后坦然接受。", scores:{"逍遥道":1,"禅道":1} },
            { text:"我不信命，翻遍所有方法也要找到活下去的办法。", scores:{"逆天道":1,"武道":1} },
            { text:"用剩下的一年时间，为家人/在乎的人安排好一切。", scores:{"苍生道":1,"红尘道":1} },
            { text:"一年也够长了，该吃吃该喝喝，和往常一样过日子。", scores:{"凡人道":1,"顺天道":1} },
            { text:"既然快死了，有些不敢做的事终于敢做了，有些账也该清了。", scores:{"魔道":1,"杀道":1} }
        ]},
        { text:"你路过一个事故现场，有人受伤需要帮助，但施救可能会让你卷入麻烦（比如被讹、被调查）。你会：", options:[
            { text:"毫不犹豫上前帮忙，人命关天，其他都是次要的。", scores:{"苍生道":1,"医道":1} },
            { text:"帮忙报警叫救护车，但保持距离，不直接接触伤者。", scores:{"长生道":1,"御器道":1} },
            { text:"犹豫一下，看看有没有其他人先上，有人带头我就帮。", scores:{"凡人道":1,"众生道":1} },
            { text:"走开。这种事太麻烦了，我不想惹祸上身。", scores:{"无情道":1,"神道":1} },
            { text:"看情况。如果明显是对方自己作死就不管，如果是无辜受害就帮。", scores:{"杀道":1,"武道":1} }
        ]},
        { text:"如果有人问你“你觉得人活着是为了什么”，你的答案最接近：", options:[
            { text:"活着本身就是意义，不需要额外赋予。", scores:{"禅道":1,"逍遥道":1} },
            { text:"为了体验。酸甜苦辣、爱恨情仇，都尝一遍才不枉此生。", scores:{"红尘道":1,"凡人道":1} },
            { text:"为了留下点什么。作品、后代、影响，证明我来过。", scores:{"文道":1,"众生道":1} },
            { text:"为了实现某个目标或使命，不达目的不罢休。", scores:{"武道":1,"逆天道":1} },
            { text:"为了守护想守护的人，他们好我就好。", scores:{"苍生道":1,"炼器道":1} }
        ]},
        { text:"你想象自己临终时的场景，你更希望：", options:[
            { text:"独自一人安静地离开，不给任何人添麻烦。", scores:{"无情道":1,"禅道":1} },
            { text:"被在意的人围绕着，在爱和温暖中闭上眼睛。", scores:{"红尘道":1,"苍生道":1} },
            { text:"在完成最后一件事的途中倒下，死在路上而不是床上。", scores:{"武道":1,"逆天道":1} },
            { text:"无所谓，死都死了，怎么死的不重要。", scores:{"逍遥道":1,"凡人道":1} },
            { text:"安排好后事，体面地、有计划地告别。", scores:{"神道":1,"长生道":1} }
        ]},
        
// 接上一段 buildQuestions 函数内的数组，继续添加第29-56题
        // 维度四续 (29-32)
        { text:"你如何看待“有人为救陌生人而牺牲自己”这种行为？", options:[
            { text:"伟大，但我不确定自己能不能做到。", scores:{"凡人道":1,"顺天道":1} },
            { text:"敬佩，但不会效仿。我的命不只是我自己的，还有在乎我的人。", scores:{"长生道":1,"红尘道":1} },
            { text:"如果是值得救的人就会，不值得的就算了。", scores:{"杀道":1,"魔道":1} },
            { text:"每个人都有选择自己死亡方式的自由，尊重但不感动。", scores:{"无情道":1,"神道":1} },
            { text:"那是最高的生命境界，我愿成为这样的人。", scores:{"众生道":1,"医道":1} }
        ]},
        { text:"你体检发现一个指标异常，医生说“有恶化风险，需要改变生活方式，定期复查”。你会：", options:[
            { text:"严格遵医嘱，立刻改变生活方式，定期检查一个不落。", scores:{"长生道":1,"炼器道":1} },
            { text:"查大量资料，了解这个病的一切，主动参与治疗方案制定。", scores:{"医道":1,"文道":1} },
            { text:"该注意的注意，但不会让这件事主导我的生活。", scores:{"逍遥道":1,"凡人道":1} },
            { text:"紧张一阵子，复查没事后就慢慢松懈了。", scores:{"顺天道":1,"众生道":1} },
            { text:"不管它，生死有命，真得了大病再说。", scores:{"武道":1,"禅道":1} }
        ]},
        { text:"如果有一天你发现，你所坚持的一切（事业、信仰、感情）最终可能都没有意义，你会：", options:[
            { text:"继续坚持。意义是自己赋予的，我认为有意义就有意义。", scores:{"逆天道":1,"神道":1} },
            { text:"重新审视，如果确实没意义就换个方向。", scores:{"长生道":1,"御器道":1} },
            { text:"无所谓，过程开心就好，有没有意义不重要。", scores:{"逍遥道":1,"凡人道":1} },
            { text:"既然没有终极意义，那就活在当下，珍惜眼前人。", scores:{"红尘道":1,"苍生道":1} },
            { text:"没有意义也是一种意义，虚无不也挺好的。", scores:{"禅道":1,"无情道":1} }
        ]},
        { text:"如果用一个比喻来形容你对自己生命的看法，最接近的是：", options:[
            { text:"生命是一把火，烧得旺就行，不在乎烧多久。", scores:{"武道":1,"红尘道":1} },
            { text:"生命是一条河，该转弯就转弯，最后汇入大海。", scores:{"顺天道":1,"禅道":1} },
            { text:"生命是一本书，我想自己写内容，而不是照着别人的剧本。", scores:{"逆天道":1,"文道":1} },
            { text:"生命是一颗种子，长成什么样不重要，重要的是它曾经生长过。", scores:{"逍遥道":1,"众生道":1} },
            { text:"生命是一座桥，连接着过去和未来，我是其中的一环。", scores:{"苍生道":1,"炼器道":1} }
        ]},
        // 维度五：秩序与变革 (33-40)
        { text:"你所在的公司/学校有一套沿用多年的规章制度，你觉得其中某条明显不合理，但大部分人已经习惯了。你会：", options:[
            { text:"尊重规则。存在即合理，能沿用多年一定有它的道理。", scores:{"顺天道":1,"神道":1} },
            { text:"私下吐槽，但不会做什么。改变规则太难了，别给自己找麻烦。", scores:{"凡人道":1,"长生道":1} },
            { text:"想办法绕过去。规则是死的，人是活的，不被抓到就行。", scores:{"魔道":1,"御器道":1} },
            { text:"正式提出修改建议，哪怕被驳回也要把自己的想法说出来。", scores:{"文道":1,"苍生道":1} },
            { text:"找志同道合的人一起推动改变，人多力量大。", scores:{"众生道":1,"逆天道":1} }
        ]},
        { text:"过年回家，长辈要求你按照传统习俗完成一系列仪式（比如磕头拜年、祭祖、走亲戚等）。你内心对这些仪式的意义并不认同。你会：", options:[
            { text:"照做。过年图个团圆气氛，没必要在这种事上和长辈争执。", scores:{"顺天道":1,"凡人道":1} },
            { text:"有选择地做。重要的仪式参与一下，不重要的找借口推掉。", scores:{"长生道":1,"炼器道":1} },
            { text:"明确表达自己的看法，用温和的方式拒绝不想做的部分。", scores:{"文道":1,"医道":1} },
            { text:"心里不屑，但面上过得去就行，反正一年就几天。", scores:{"逍遥道":1,"无情道":1} },
            { text:"拒绝。我有权利按照自己的方式生活，不被传统绑架。", scores:{"逆天道":1,"武道":1} }
        ]},
        { text:"你发现一个系统性的问题（比如行业潜规则、职场不公现象），它伤害了很多人，但大家都默默忍受。你会：", options:[
            { text:"愤怒，但觉得自己改变不了什么，只能适应。", scores:{"凡人道":1,"顺天道":1} },
            { text:"先保护好自己不被伤害，如果有余力再考虑帮别人。", scores:{"长生道":1,"神道":1} },
            { text:"尝试从小处着手，能改变一点是一点。", scores:{"医道":1,"文道":1} },
            { text:"联合受害者一起发声，集体的声音比个人大。", scores:{"众生道":1,"苍生道":1} },
            { text:"如果有机会，我要成为改变规则的那个人。", scores:{"逆天道":1,"魔道":1} }
        ]},
        { text:"你加入一个新团队，发现团队里有一个不成文的“规矩”：新人要请大家吃饭/喝奶茶，否则会被认为不懂事。你并不认同这个规矩。你会：", options:[
            { text:"入乡随俗。请一次也无所谓，没必要刚来就搞特殊。", scores:{"顺天道":1,"凡人道":1} },
            { text:"请，但心里记着，等我混熟了再慢慢改变这个风气。", scores:{"御器道":1,"魔道":1} },
            { text:"找个折中方式，比如请大家吃点零食，既不失礼又不完全妥协。", scores:{"炼器道":1,"医道":1} },
            { text:"不请。用工作能力证明自己，不需要靠这个拉关系。", scores:{"逆天道":1,"无情道":1} },
            { text:"看情况。如果这个团队值得融入就请，不值得就算了。", scores:{"长生道":1,"神道":1} }
        ]},
        { text:"你如何看待“老一辈人说的一定有道理”这句话？", options:[
            { text:"基本认同。经验是时间的沉淀，不听老人言吃亏在眼前。", scores:{"顺天道":1,"神道":1} },
            { text:"部分认同。有用的听，过时的就左耳进右耳出。", scores:{"长生道":1,"炼器道":1} },
            { text:"尊重但不盲从。时代变了，有些道理需要重新检验。", scores:{"文道":1,"医道":1} },
            { text:"不太认同。很多“道理”只是权力关系的包装。", scores:{"逆天道":1,"杀道":1} },
            { text:"无所谓。听听就好，不往心里去，我按我的方式来。", scores:{"逍遥道":1,"凡人道":1} }
        ]},
        { text:"如果社会发生剧烈的变革（比如行业洗牌、技术革命、规则重写），你的心态更接近：", options:[
            { text:"不安。我希望世界是稳定可预期的，不喜欢动荡。", scores:{"顺天道":1,"神道":1} },
            { text:"谨慎观察。先看看风向，再决定自己怎么走。", scores:{"长生道":1,"御器道":1} },
            { text:"兴奋。乱世出英雄，动荡意味着机会重新分配。", scores:{"魔道":1,"逆天道":1} },
            { text:"从容。万变不离其宗，不管怎么变，做好自己就行。", scores:{"逍遥道":1,"禅道":1} },
            { text:"思考。变革背后一定有逻辑，理解逻辑就能应对。", scores:{"文道":1,"炼器道":1} }
        ]},
        { text:"你发现一个朋友在社交媒体上发表了你强烈反对的观点（比如涉及价值观、社会议题）。你会：", options:[
            { text:"取关/拉黑。道不同不相为谋，没必要污染自己的信息流。", scores:{"无情道":1,"逆天道":1} },
            { text:"公开反驳。观点不同就辩论，真理越辩越明。", scores:{"武道":1,"杀道":1} },
            { text:"私下沟通。公开辩论容易伤感情，私下聊聊看能不能互相理解。", scores:{"医道":1,"苍生道":1} },
            { text:"装没看见。朋友之间不必事事较真，维持表面的和平。", scores:{"长生道":1,"凡人道":1} },
            { text:"心里减分，但不表现出来。以后在这类话题上避开他。", scores:{"神道":1,"御器道":1} }
        ]},
        { text:"如果用一个比喻来形容你和社会规则的关系，最接近的是：", options:[
            { text:"我是棋子，棋盘是规则。既然在棋盘上，就按规则下棋。", scores:{"顺天道":1,"神道":1} },
            { text:"我是棋手，规则是工具。我用规则来达成自己的目的。", scores:{"御器道":1,"魔道":1} },
            { text:"我是观棋者，规则与我无关。我在局外看着就好。", scores:{"逍遥道":1,"禅道":1} },
            { text:"我是修改规则的人。如果规则不合理，我就想办法改掉它。", scores:{"逆天道":1,"文道":1} },
            { text:"我是规则的翻译者。帮助看不懂规则的人理解和适应。", scores:{"医道":1,"众生道":1} }
        ]},
        // 维度六：绝境与代价 (41-48)
        { text:"你为了一个重要的目标（比如创业、考研、转行）已经投入了两年时间和大量积蓄，但目前进展不顺，继续下去可能血本无归，放弃又觉得不甘心。你会：", options:[
            { text:"继续投入。既然已经付出这么多，现在放弃就是前功尽弃。", scores:{"武道":1,"逆天道":1} },
            { text:"立刻止损。沉没成本不是成本，及时抽身还能保住剩下的。", scores:{"长生道":1,"神道":1} },
            { text:"设定一个底线（比如再试三个月/再投入多少钱），到了还不行就放弃。", scores:{"炼器道":1,"医道":1} },
            { text:"换一条路，但不完全放弃。先找个稳定工作养活自己，业余时间继续搞。", scores:{"凡人道":1,"御器道":1} },
            { text:"无所谓成不成功，这段经历本身就有价值，我不后悔。", scores:{"逍遥道":1,"禅道":1} }
        ]},
        { text:"你被卷入一场职场/社交冲突，你是无辜的，但解释清楚需要公开一些对自己不利的信息（虽然不是致命的）。你会：", options:[
            { text:"选择沉默。不解释，清者自清，时间会证明一切。", scores:{"神道":1,"无情道":1} },
            { text:"全部说出来。宁可承受不利也要还自己清白，我受不了被冤枉。", scores:{"武道":1,"逆天道":1} },
            { text:"选择性地说。只公开对自己有利的部分，不利的部分想办法圆过去。", scores:{"魔道":1,"御器道":1} },
            { text:"私下找关键人物沟通。不在公开场合撕，但要让该知道的人知道真相。", scores:{"长生道":1,"文道":1} },
            { text:"看对方是谁。如果是重要的人就解释，不重要的无所谓。", scores:{"苍生道":1,"凡人道":1} }
        ]},
        { text:"你有一个纠缠多年的心结（比如一段失败的感情、一个错失的机会、一个伤害过你的人）。它时不时会冒出来影响你的情绪。你会：", options:[
            { text:"直面它，想办法做一个了结，哪怕过程很痛苦。", scores:{"红尘道":1,"逆天道":1} },
            { text:"尝试放下，告诉自己过去的已经过去了，人要向前看。", scores:{"禅道":1,"顺天道":1} },
            { text:"不去碰它。有些伤口不碰就不疼，时间会慢慢冲淡。", scores:{"长生道":1,"凡人道":1} },
            { text:"把它变成动力。正是因为有过这些遗憾，我才更要变强。", scores:{"武道":1,"魔道":1} },
            { text:"找人倾诉或者写下来。把情绪排解出去，心里就舒服了。", scores:{"医道":1,"文道":1} }
        ]},
        { text:"你最好的朋友陷入了严重的困境（比如债务、疾病、官司），你帮他需要付出很大代价（比如拿出积蓄、影响工作、惹上麻烦）。你会：", options:[
            { text:"全力以赴帮。朋友有难，义不容辞，代价再大也认了。", scores:{"红尘道":1,"苍生道":1} },
            { text:"在保护好自己的前提下尽力帮。帮人可以，但不能把自己搭进去。", scores:{"长生道":1,"神道":1} },
            { text:"看情况。如果是他自己作的就不帮，如果是天灾人祸就帮。", scores:{"杀道":1,"医道":1} },
            { text:"帮他找资源、出主意，但不直接出钱出力。授人以渔不如授人以渔。", scores:{"文道":1,"炼器道":1} },
            { text:"心里想帮，但大概率不会真的行动。我连自己都顾不好，没能力帮别人。", scores:{"凡人道":1,"无情道":1} }
        ]},
        { text:"有人用你最在意的东西威胁你（比如你的名誉、职位、一段关系），要求你做一个违背原则的让步。你会：", options:[
            { text:"拒绝让步。宁可失去，也不能破了底线。", scores:{"神道":1,"逆天道":1} },
            { text:"先假装让步，收集对方把柄，找机会反击。", scores:{"魔道":1,"御器道":1} },
            { text:"评估得失。如果失去的代价大于让步的代价，那就让一步。", scores:{"长生道":1,"炼器道":1} },
            { text:"找一个中间方案，既不完全让步，也不让威胁得逞。", scores:{"文道":1,"医道":1} },
            { text:"让步。我最在意的东西不能失去，原则可以以后再找回来。", scores:{"凡人道":1,"红尘道":1} }
        ]},
        { text:"如果有一天你发现自己一直坚信的某个信念是错的（比如崇拜的人塌房了、信奉的价值观被现实打脸），你会：", options:[
            { text:"痛苦，但接受现实。错了就错了，重新建立认知。", scores:{"文道":1,"苍生道":1} },
            { text:"抗拒。不愿意相信，找各种理由证明它可能还是对的。", scores:{"红尘道":1,"顺天道":1} },
            { text:"无所谓。本来也没什么是绝对正确的，有这一天很正常。", scores:{"逍遥道":1,"禅道":1} },
            { text:"愤怒。感觉自己被欺骗了，要找那个让自己相信的人/事算账。", scores:{"武道":1,"杀道":1} },
            { text:"庆幸。早点发现是错的比一直错下去好。", scores:{"长生道":1,"医道":1} }
        ]},
        { text:"你身处一个竞争激烈的环境，发现有人通过不正当手段获得了优势，而你坚持公平竞争导致自己处于劣势。你会：", options:[
            { text:"继续坚持公平。输赢不重要，重要的是我认可自己的方式。", scores:{"神道":1,"顺天道":1} },
            { text:"也开始用一些手段。既然规则如此，我也不装清高了。", scores:{"魔道":1,"御器道":1} },
            { text:"退出这个环境。与其同流合污，不如换个干净的赛道。", scores:{"逍遥道":1,"无情道":1} },
            { text:"提升自己的实力，用硬实力碾压，让他耍手段也没用。", scores:{"武道":1,"逆天道":1} },
            { text:"在规则允许的范围内更努力，但不越过底线。", scores:{"苍生道":1,"众生道":1} }
        ]},
        { text:"如果用一个比喻来形容你面对“失去”时的状态，最接近的是：", options:[
            { text:"像被砍了一刀。会痛很久，伤口会留疤，但最终会愈合。", scores:{"红尘道":1,"凡人道":1} },
            { text:"像丢掉一件行李。有点可惜，但轻装上阵更重要。", scores:{"逍遥道":1,"禅道":1} },
            { text:"像壁虎断尾。果断舍弃，保住核心，以后再长回来。", scores:{"长生道":1,"炼器道":1} },
            { text:"像淬火。失去让我更硬、更强，杀不死我的让我更强大。", scores:{"武道":1,"杀道":1} },
            { text:"像翻过一页书。这一章结束了，下一页还有新的故事。", scores:{"文道":1,"神道":1} }
        ]},
        // 维度七：终极与不朽 (49-56)
        { text:"如果死后有一个机会，你可以选择一种方式“继续存在”，你会选：", options:[
            { text:"被后人记住和传颂，名字留在历史里。", scores:{"神道":1,"文道":1} },
            { text:"化作天地的一部分，与万物同在。", scores:{"顺天道":1,"禅道":1} },
            { text:"转世轮回，重新体验一次人生。", scores:{"凡人道":1,"众生道":1} },
            { text:"不去。死了就是死了，彻底消失也挺好。", scores:{"逍遥道":1,"无情道":1} },
            { text:"留下血脉或作品，让我的基因/思想延续下去。", scores:{"长生道":1,"红尘道":1} }
        ]},
        { text:"你希望自己离开这个世界时，认识你的人对你的评价是：", options:[
            { text:"一个好人，帮助过很多人。", scores:{"苍生道":1,"医道":1} },
            { text:"一个强者，从不认输，活出了自己的样子。", scores:{"武道":1,"逆天道":1} },
            { text:"一个智者，看透了世事，活得通透。", scores:{"禅道":1,"文道":1} },
            { text:"一个有趣的人，活得精彩，不枉此生。", scores:{"逍遥道":1,"红尘道":1} },
            { text:"无所谓别人怎么评价，我自己知道我是谁就行。", scores:{"无情道":1,"神道":1} }
        ]},
        { text:"如果可以选择，你更希望自己的人生像：", options:[
            { text:"一座山峰——稳定、崇高、被人仰望。", scores:{"神道":1,"炼器道":1} },
            { text:"一条大河——奔流不息，最终汇入大海。", scores:{"顺天道":1,"苍生道":1} },
            { text:"一阵风——自由自在，来去无痕。", scores:{"逍遥道":1,"禅道":1} },
            { text:"一把火——热烈燃烧，哪怕短暂。", scores:{"武道":1,"红尘道":1} },
            { text:"一棵树——扎根一处，生长、开花、结果、落叶。", scores:{"长生道":1,"凡人道":1} }
        ]},
        { text:"你认为“不朽”最重要的形式是：", options:[
            { text:"功业不朽——做过的事、创下的基业被后人继承。", scores:{"神道":1,"武道":1} },
            { text:"精神不朽——思想、价值观、作品流传后世。", scores:{"文道":1,"苍生道":1} },
            { text:"血脉不朽——子子孙孙延续下去。", scores:{"长生道":1,"凡人道":1} },
            { text:"体验不朽——活着的每一刻都尽兴，本身就是不朽。", scores:{"逍遥道":1,"红尘道":1} },
            { text:"我不追求不朽。有限的生命才有意义。", scores:{"禅道":1,"无情道":1} }
        ]},
        { text:"你如何看待那些为了某个信念或事业奉献一生的人？", options:[
            { text:"敬佩，他们是社会的脊梁，我也希望成为这样的人。", scores:{"苍生道":1,"医道":1} },
            { text:"尊重，但我不会。我的人生还有其他想体验的东西。", scores:{"凡人道":1,"长生道":1} },
            { text:"看那个信念是什么。如果我也认同就敬佩，不认同就觉得可惜了。", scores:{"神道":1,"文道":1} },
            { text:"每个人都有自己的选择，他们选择了他们的路，我选择了我的。", scores:{"逍遥道":1,"顺天道":1} },
            { text:"太累了。人生苦短，何必把自己绑在一件事上。", scores:{"魔道":1,"杀道":1} }
        ]},
        { text:"当你感到自己渺小无力、人生短暂的时候，你通常如何获得安慰？", options:[
            { text:"想想那些比我更苦的人，我已经很幸运了。", scores:{"苍生道":1,"顺天道":1} },
            { text:"告诉自己：渺小又怎样，短暂又怎样，我来过、我活过、我战斗过。", scores:{"武道":1,"逆天道":1} },
            { text:"接受它。渺小和短暂是事实，不需要安慰，习惯了就好。", scores:{"禅道":1,"无情道":1} },
            { text:"找点开心的事做，忙着开心就没空想这些了。", scores:{"逍遥道":1,"红尘道":1} },
            { text:"和在意的人待在一起，温暖的人际关系让我觉得活着有意义。", scores:{"凡人道":1,"众生道":1} }
        ]},
        { text:"如果有一天科技允许，可以让你的意识上传到网络实现“数字永生”，代价是失去肉体、永远无法和现实世界互动。你会：", options:[
            { text:"拒绝。没有肉体的存在不完整，那不是真正的活着。", scores:{"凡人道":1,"武道":1} },
            { text:"接受。意识存在就够了，肉体只是皮囊。", scores:{"文道":1,"神道":1} },
            { text:"看情况。如果在意的人也都上传了就去，否则不去。", scores:{"红尘道":1,"苍生道":1} },
            { text:"不感兴趣。永生是诅咒，有限的生命才有滋味。", scores:{"逍遥道":1,"禅道":1} },
            { text:"接受，但目的是利用无限的时间学习一切知识、探索一切可能。", scores:{"长生道":1,"御器道":1} }
        ]},
        { text:"如果用一个词来概括你对自己人生的终极期待，最接近的是：", options:[
            { text:"圆满——方方面面都照顾到，不留遗憾。", scores:{"苍生道":1,"长生道":1} },
            { text:"精彩——波澜壮阔，不白活一回。", scores:{"红尘道":1,"武道":1} },
            { text:"通透——看明白这个世界，活得明明白白。", scores:{"禅道":1,"文道":1} },
            { text:"自在——不被任何东西束缚，想怎样就怎样。", scores:{"逍遥道":1,"逆天道":1} },
            { text:"有用——对别人、对社会有价值，没白来过。", scores:{"医道":1,"众生道":1} }
        ]}
    ];
}

// ========================  分页与全局变量  ========================
const QUESTIONS_PER_PAGE = 8;
let currentPage = 0;
let totalPages = 0;
let userAnswers = [];
let questions = [];

function initQuestions() {
    questions = buildQuestions();
    totalPages = Math.ceil(questions.length / QUESTIONS_PER_PAGE);
    userAnswers = new Array(questions.length).fill(null);
}

// ========================  页面渲染  ========================
function renderPage() {
    const container = document.getElementById('pages-container');
    const start = currentPage * QUESTIONS_PER_PAGE;
    const end = Math.min(start + QUESTIONS_PER_PAGE, questions.length);
    let html = '';
    for (let i = start; i < end; i++) {
        const q = questions[i];
        html += `<div class="question-item"><div class="q-title">${i+1}. ${q.text}</div>`;
        q.options.forEach((opt, optIdx) => {
            const checked = userAnswers[i] === optIdx ? 'checked' : '';
            html += `<label class="option-label"><input type="radio" name="q${i}" value="${optIdx}" ${checked}> ${opt.text}</label>`;
        });
        html += `</div>`;
    }
    container.innerHTML = html;

    for (let i = start; i < end; i++) {
        const radios = document.getElementsByName(`q${i}`);
        radios.forEach(r => r.addEventListener('change', (e) => {
            userAnswers[i] = parseInt(e.target.value);
            updateButtons();
        }));
    }

    document.getElementById('page-indicator').textContent = `第 ${currentPage+1} / ${totalPages} 页`;
    updateButtons();
}


// ========================  按钮更新逻辑  ========================
function updateButtons() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const submitBtn = document.getElementById('submit-btn');
    
    prevBtn.disabled = (currentPage === 0);
    
    // 核心修改：无论有没有答完，都允许点击，把检查工作交给点击事件！
    if (currentPage === totalPages - 1) {
        nextBtn.classList.add('hidden');
        submitBtn.classList.remove('hidden');
        submitBtn.disabled = false; // 永远不禁用
    } else {
        nextBtn.classList.remove('hidden');
        submitBtn.classList.add('hidden');
        nextBtn.disabled = false; // 永远不禁用
    }
}

// ========================  新增：统一的漏题高亮动画功能  ========================
// ========================  新增：统一的漏题高亮动画功能（移动端修复版） ========================
function highlightQuestion(globalIndex) {
    const targetPage = Math.floor(globalIndex / QUESTIONS_PER_PAGE);
    
    // 1. 如果不在同一页，先翻页
    if (currentPage !== targetPage) {
        currentPage = targetPage;
        renderPage();
    }
    
    // 2. 缓冲 150ms：给手机浏览器足够的时间把新题目渲染出来，算准高度
    setTimeout(() => {
        const questionItems = document.querySelectorAll('.question-item');
        const targetIndexOnPage = globalIndex % QUESTIONS_PER_PAGE;
        const targetElement = questionItems[targetIndexOnPage];
        
        if (targetElement) {
            // 3. 开始平滑滑动
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // 4. 添加高亮红框
            targetElement.style.transition = 'box-shadow 0.3s';
            targetElement.style.boxShadow = '0 0 0 4px rgba(200, 80, 50, 0.4)';
            setTimeout(() => {
                targetElement.style.boxShadow = '';
            }, 2000);
            
            // 5. 核心修复：等滑动动画差不多结束了（约400ms后），再弹窗！防止阻断动画！
            setTimeout(() => {
                alert(`请先完成第 ${globalIndex + 1} 题`);
            }, 400); 
        }
    }, 150);
}

// ========================  新增：点击“下一页”时的拦截检查  ========================
function handleNext() {
    // 检查【当前页】是否有未答题目
    const start = currentPage * QUESTIONS_PER_PAGE;
    const end = Math.min(start + QUESTIONS_PER_PAGE, questions.length);
    let missedIndex = -1;
    for (let i = start; i < end; i++) {
        if (userAnswers[i] === null) {
            missedIndex = i;
            break;
        }
    }
    
    // 如果当前页有漏题，拦截并高亮
    if (missedIndex !== -1) {
        highlightQuestion(missedIndex);
        return; 
    }
    
    // 当前页全答完了，放心放行去下一页
    goToPage(1);
}

function goToPage(delta) {
    const newPage = currentPage + delta;
    if (newPage < 0 || newPage >= totalPages) return;
    
    currentPage = newPage;
    renderPage(); // 渲染新页面
    
    // 核心修复：给手机 50ms 缓冲时间重绘 DOM，然后再滑到顶部
    setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 50);
}

// ========================  计分与结果生成  ========================
function calculateScores() {
    const scores = {};
    DAO_LIST.forEach(d => scores[d] = 0);
    for (let i = 0; i < questions.length; i++) {
        const ans = userAnswers[i];
        if (ans !== null) {
            const selected = questions[i].options[ans];
            for (let dao in selected.scores) scores[dao] += selected.scores[dao];
        }
    }
    return scores;
}

function selectBestSubDao(mainDaos, candidates, scores) {
    if (candidates.length <= 1) return candidates;
    const affinitySet = new Set();
    mainDaos.forEach(m => (DAO_AFFINITY[m] || []).forEach(a => affinitySet.add(a)));
    return candidates.sort((a, b) => {
        const aAff = affinitySet.has(a) ? 1 : 0;
        const bAff = affinitySet.has(b) ? 1 : 0;
        if (aAff !== bAff) return bAff - aAff;
        return scores[b] - scores[a];
    });
}

function generateResultData(scores) {
    const maxScore = Math.max(...Object.values(scores));
    const topDaos = DAO_LIST.filter(d => scores[d] === maxScore);
    
    if (topDaos.length >= 4) return { isChaos: true, scores };
    
    let mainDaos = [...topDaos];
    let subDaos = [];
    let title = '', subTitle = '';
    
    if (mainDaos.length === 1) {
        title = mainDaos[0];
        const candidates = DAO_LIST.filter(d => d !== mainDaos[0])
                           .sort((a,b) => scores[b] - scores[a]);
        subDaos = candidates.slice(0, 2);
        subTitle = subDaos.join(' · ');
    } else if (mainDaos.length === 2) {
        title = '双道同修';
        subTitle = mainDaos.join(' · ');
        const candidates = DAO_LIST.filter(d => !mainDaos.includes(d));
        if (candidates.length) {
            const maxSub = Math.max(...candidates.map(d => scores[d]));
            let best = candidates.filter(d => scores[d] === maxSub);
            best = selectBestSubDao(mainDaos, best, scores);
            if (best.length) {
                subDaos = [best[0]];
                subTitle += ' · ' + best[0];
            }
        }
    } else if (mainDaos.length === 3) {
        title = '三道同修';
        subTitle = mainDaos.join(' · ');
    }
    
    return { isChaos: false, title, subTitle, mainDaos, subDaos, scores };
}

// ========================  雷达图绘制（完整） ========================
function drawRadar(scores) {
    const canvas = document.getElementById('radarChart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = 500, h = 500;
    canvas.width = w; canvas.height = h;
    const centerX = w/2, centerY = h/2, radius = 180;
    const count = DAO_LIST.length, angleStep = (Math.PI*2)/count;
    const maxScore = Math.max(...Object.values(scores), 1);
    
    ctx.clearRect(0,0,w,h);
    
    // 网格
    for (let lvl=1; lvl<=5; lvl++) {
        ctx.beginPath();
        const r = (radius*lvl)/5;
        for (let i=0; i<count; i++) {
            const ang = i*angleStep - Math.PI/2;
            const x = centerX + r*Math.cos(ang), y = centerY + r*Math.sin(ang);
            i===0 ? ctx.moveTo(x,y) : ctx.lineTo(x,y);
        }
        ctx.closePath();
        ctx.strokeStyle = "#c4b4a2"; ctx.lineWidth = 0.6; ctx.stroke();
    }
    
    // 轴与标签
    ctx.font = "12px 'Microsoft YaHei'"; ctx.fillStyle = "#3e2e1f";
    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    for (let i=0; i<count; i++) {
        const ang = i*angleStep - Math.PI/2;
        const x = centerX + radius*Math.cos(ang), y = centerY + radius*Math.sin(ang);
        ctx.beginPath(); ctx.moveTo(centerX, centerY); ctx.lineTo(x, y);
        ctx.strokeStyle = "#b8a690"; ctx.lineWidth = 0.8; ctx.stroke();
        const lx = centerX + (radius+18)*Math.cos(ang), ly = centerY + (radius+18)*Math.sin(ang);
        ctx.fillText(DAO_LIST[i], lx, ly);
    }
    
    // 数据多边形
    const points = [];
    for (let i=0; i<count; i++) {
        const val = scores[DAO_LIST[i]] || 0;
        const r = (val / maxScore) * radius;
        const ang = i*angleStep - Math.PI/2;
        points.push({ x: centerX + r*Math.cos(ang), y: centerY + r*Math.sin(ang) });
    }
    ctx.beginPath(); ctx.moveTo(points[0].x, points[0].y);
    for (let i=1; i<points.length; i++) ctx.lineTo(points[i].x, points[i].y);
    ctx.closePath();
    ctx.fillStyle = "rgba(107,78,46,0.3)"; ctx.fill();
    ctx.strokeStyle = "#5f3f24"; ctx.lineWidth = 2.5; ctx.stroke();
    points.forEach(p => { ctx.beginPath(); ctx.arc(p.x, p.y, 4, 0, 2*Math.PI); ctx.fillStyle = "#4a2c16"; ctx.fill(); });
}

// ========================  结果展示（结合漏题检查与全新排版） ========================
function displayResult() {
    // 1. 全局检查是否有任何漏题
    const firstUnansweredIndex = userAnswers.findIndex(ans => ans === null);
    
    if (firstUnansweredIndex !== -1) {
        highlightQuestion(firstUnansweredIndex);
        return; // 强制打断
    }
    
    // 2. 所有题目已答，开始计算并渲染结果
    const scores = calculateScores();
    const result = generateResultData(scores);
    const resultDiv = document.getElementById('result-content');
    const area = document.getElementById('result-area');
    area.classList.remove('hidden');
    
    // 走火入魔特殊处理
    if (result.isChaos) return showChaosMode(resultDiv, scores);
    
    // 3. 构建结果 HTML 结构
    let html = `<div class="result-text">`;
    html += `<div class="dao-name">${result.title}</div>`;
    
    if (result.subTitle) {
        html += `<div class="sub-dao">${result.subTitle}</div>`;
    }
    
    html += `<div class="radar-container"><canvas id="radarChart" width="500" height="500"></canvas></div>`;
    
   
    // 1. 渲染主修道途
    result.mainDaos.forEach(dao => {
        const d = DAO_DESCRIPTIONS[dao];
        // 核心修改：使用了 .is-main 样式包住，并在道名前加上了 [主修] 标签
        html += `
        <div class="dao-desc-item is-main">
            <div class="dao-quote-title">
                <span class="dao-tag tag-main">主修</span>
                <strong>${dao}</strong>：「${d.quote}」
            </div>
            <div class="dao-desc-text">${d.desc}</div>
        </div>`;
    });

    // 2. 渲染辅修道途（如果有辅修数据的话）
    result.subDaos.forEach(dao => {
        const d = DAO_DESCRIPTIONS[dao];
        // 核心修改：使用了 .is-sub 样式包住，并在道名前加上了 [辅修] 标签
        html += `
        <div class="dao-desc-item is-sub">
            <div class="dao-quote-title">
                <span class="dao-tag tag-sub">辅修</span>
                <strong>${dao}</strong>：「${d.quote}」
            </div>
            <div class="dao-desc-text">${d.desc}</div>
        </div>`;
    });
    
    html += `</div>`;
    
    // 4. 渲染上墙与画图
    resultDiv.innerHTML = html;
    drawRadar(scores);
    area.scrollIntoView({ behavior: 'smooth' });
}

// ========================  彩蛋/走火入魔模式（全新：羽化飞升与大道解构特效） ========================
function showChaosMode(container, scores) {
    const area = document.getElementById('result-area');
    
    // 1. 打破桎梏：直接清除常规的结果框背景和阴影，让它融入整个网页
    area.style.background = 'transparent';
    area.style.boxShadow = 'none';
    area.style.border = 'none';
    area.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // 2. 注入动态飞升场景容器
    container.innerHTML = `
        <div id="ascension-scene" style="position: relative; width: 100%; min-height: 65vh; display: flex; align-items: center; justify-content: center; overflow: hidden;">
            <div id="glitch-particles" style="position: absolute; inset: 0; pointer-events: none;"></div>
            <div id="core-text" style="position: relative; z-index: 10; text-align: center; color: #2b1b0e; width: 100%;"></div>
        </div>
    `;

    const particleContainer = document.getElementById('glitch-particles');
    const coreText = document.getElementById('core-text');
    // 仙侠与赛博混杂的字符库
    const chars = '道心无相天地玄黄宇宙洪荒!@#$%^&*()_+☯☰☱☲☳☴☵☶☷01';

    let particleCount = 0;
    
    // 3. 制造“层次感飞升”的粒子特效
    const spawnInterval = setInterval(() => {
        if (particleCount > 50) return; // 生成约50个飞升字符
        particleCount++;

        const p = document.createElement('div');
        p.innerText = chars[Math.floor(Math.random() * chars.length)];
        
        // 随机层级：前景清晰且快，背景模糊且慢
        const isForeground = Math.random() > 0.5;
        const size = isForeground ? (Math.random() * 2 + 1.5) : (Math.random() * 1 + 0.8);
        const startX = Math.random() * 100; // 横向随机分布
        const startY = Math.random() * 20 + 80; // 从底部 80%~100% 区域出生

        // 粒子的初始状态
        p.style.position = 'absolute';
        p.style.left = `${startX}%`;
        p.style.top = `${startY}%`;
        p.style.fontSize = `${size}rem`;
        p.style.color = isForeground ? '#6b4e2e' : '#d8caba'; // 前景深色，背景浅色
        p.style.opacity = '0';
        p.style.filter = isForeground ? 'none' : 'blur(3px)'; // 制造景深层次感
        p.style.transition = 'all 2s cubic-bezier(0.25, 1, 0.5, 1)'; // 顺滑的上浮动画
        p.style.transform = `translate(-50%, -50%) rotate(${Math.random() * 90 - 45}deg)`;

        particleContainer.appendChild(p);

        // 延时极短时间后，触发粒子的 CSS 过渡动画（上浮、放大、显现）
        setTimeout(() => {
            p.style.opacity = isForeground ? '0.8' : '0.3';
            p.style.top = `${startY - 40 - Math.random() * 50}%`; // 往上飘 40%~90% 的高度
            p.style.transform = `translate(-50%, -50%) rotate(${Math.random() * 180 - 90}deg) scale(1.2)`;
        }, 50);

        // 中心文本的疯狂闪动干扰
        coreText.innerHTML = `<span style="font-size: clamp(2rem, 8vw, 4rem); letter-spacing: ${Math.random()*20}px; opacity: ${Math.random()}; filter: blur(${Math.random()*3}px)">???</span>`;
    }, 40); // 每40毫秒吐出一个新粒子

    // 4. 飞升结束，大象无形：呈现终极高级排版
    setTimeout(() => {
        clearInterval(spawnInterval);
        particleContainer.style.opacity = '0'; // 隐去粒子残骸
        particleContainer.style.transition = 'opacity 1s ease';

        // 如果没有全局动画样式，就临时注入一个淡入效果
        if(!document.getElementById('chaos-styles')) {
            const style = document.createElement('style');
            style.id = 'chaos-styles';
            style.innerHTML = `
                @keyframes transcendFade {
                    0% { opacity: 0; transform: scale(0.95) translateY(10px); filter: blur(8px); }
                    100% { opacity: 1; transform: scale(1) translateY(0); filter: blur(0); }
                }
            `;
            document.head.appendChild(style);
        }

        // 极其惊艳的海报级排版（包含超大水印）
        coreText.innerHTML = `
            <div style="animation: transcendFade 2s ease-out forwards; width: 100%;">
                <div style="position: absolute; top: 30%; left: 50%; transform: translate(-50%, -50%); font-size: clamp(8rem, 35vw, 25rem); color: #6b4e2e; opacity: 0.04; white-space: nowrap; z-index: -1; pointer-events: none; font-weight: bold; letter-spacing: -2vw;">
                    超脱
                </div>

                <div style="font-size: clamp(3.5rem, 15vw, 5rem); letter-spacing: clamp(10px, 4vw, 24px); margin-bottom: 20px; font-weight: bold; color: #1e1a16;">
                    超脱
                </div>
                <div style="font-size: clamp(1.1rem, 4.5vw, 1.6rem); letter-spacing: clamp(6px, 2.5vw, 12px); color: #5f4a32; font-weight: 500; margin-bottom: 40px; text-align: center;">
                    万道归虚 不着于相
                </div>
                <div class="radar-container" style="position: relative; z-index: 5; filter: drop-shadow(0 0 30px rgba(107,78,46,0.15));">
                    <canvas id="radarChart" width="500" height="500"></canvas>
                </div>
            </div>
        `;

        // 5. 动态开启0.5秒一跳的混沌雷达图
        if(window.chaosRadarInterval) clearInterval(window.chaosRadarInterval);
        window.chaosRadarInterval = setInterval(() => {
            const canvas = document.getElementById('radarChart');
            if(canvas) {
                const glitchScores = {};
                DAO_LIST.forEach(dao => {
                    glitchScores[dao] = Math.random() > 0.5 ? (Math.floor(Math.random() * 15) + 3) : (Math.floor(Math.random() * 5));
                });
                drawRadar(glitchScores);
            } else {
                clearInterval(window.chaosRadarInterval);
            }
        }, 500);

        // 先画出第一帧垫底
        const initialScores = {};
        DAO_LIST.forEach(dao => initialScores[dao] = Math.floor(Math.random() * 10) + 5);
        drawRadar(initialScores);

    }, 2400); // 让飞升粒子飞满 2.4 秒后，展现真相
}

// ========================  初始化  ========================
window.onload = () => {
    initQuestions();
    renderPage();
    document.getElementById('prev-btn').addEventListener('click', () => goToPage(-1));
    
    // 这里原来是 ()=>goToPage(1)，现在换成我们带有漏题检查的 handleNext
    document.getElementById('next-btn').addEventListener('click', handleNext); 
    
    document.getElementById('submit-btn').addEventListener('click', displayResult);
};