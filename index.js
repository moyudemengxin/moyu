// 题目数据，包含题干、四个选项、每个选项对四个维度的加分
// MBTI 四个维度：E/I, S/N, T/F, J/P
// 每个选项的加分格式：[维度索引, 方向] ，例如 [0, 'E'] 表示第一个维度加 E 分
const questions = [
    {
        text: "在社交场合，你通常：",
        options: [
            { text: "认识新朋友让你精力充沛", scores: [[0, 'E']] },
            { text: "更喜欢和熟悉的人待在一起", scores: [[0, 'I']] },
            { text: "看情况，有时活跃有时安静", scores: [[0, 'E'], [0, 'I']] },
            { text: "感到疲惫，只想早点离开", scores: [[0, 'I']] }
        ]
    },
    {
        text: "你更倾向于相信：",
        options: [
            { text: "眼见为实，具体的经验", scores: [[1, 'S']] },
            { text: "直觉和灵感，未来的可能性", scores: [[1, 'N']] },
            { text: "两者结合，但更依赖经验", scores: [[1, 'S']] },
            { text: "天马行空的想象", scores: [[1, 'N']] }
        ]
    },
    {
        text: "在做决定时，你更看重：",
        options: [
            { text: "逻辑和公平", scores: [[2, 'T']] },
            { text: "人情和和谐", scores: [[2, 'F']] },
            { text: "原则第一，但也考虑他人感受", scores: [[2, 'T']] },
            { text: "跟着心走", scores: [[2, 'F']] }
        ]
    },
    {
        text: "你更喜欢的生活方式是：",
        options: [
            { text: "按计划行事，有条不紊", scores: [[3, 'J']] },
            { text: "灵活随性，随遇而安", scores: [[3, 'P']] },
            { text: "有大致计划，但随时调整", scores: [[3, 'J']] },
            { text: "完全即兴发挥", scores: [[3, 'P']] }
        ]
    }
    // 你可以继续添加更多题目，格式同上
];

// 用于存储用户每题的选择（索引）
let userAnswers = new Array(questions.length).fill(null);

// 渲染题目到 HTML 中
function renderQuestions() {
    const container = document.getElementById('questions-container');
    if (!container) return;

    let html = '';
    questions.forEach((q, qIndex) => {
        html += `<div class="question-item">`;
        html += `<p><strong>${qIndex + 1}. ${q.text}</strong></p>`;

        q.options.forEach((opt, optIndex) => {
            html += `<label style="display:block; margin-bottom:5px;">`;
            html += `<input type="radio" name="q${qIndex}" value="${optIndex}" `;
            // 如果已经选过，就保持选中状态
            if (userAnswers[qIndex] === optIndex) {
                html += `checked`;
            }
            html += `> ${opt.text}`;
            html += `</label>`;
        });

        html += `</div><hr>`;
    });

    container.innerHTML = html;

    // 给所有 radio 绑定 change 事件，记录用户选择
    questions.forEach((_, qIndex) => {
        const radios = document.getElementsByName(`q${qIndex}`);
        radios.forEach(radio => {
            radio.addEventListener('change', (e) => {
                userAnswers[qIndex] = parseInt(e.target.value);
            });
        });
    });
}

// 计算 MBTI 结果
function calculateResult() {
    // 初始化分数：四个维度，每个维度两个方向
    let scores = {
        E: 0, I: 0,
        S: 0, N: 0,
        T: 0, F: 0,
        J: 0, P: 0
    };

    // 遍历每一题，累加已选选项的分数
    questions.forEach((q, qIndex) => {
        const selectedIdx = userAnswers[qIndex];
        if (selectedIdx !== null && selectedIdx !== undefined) {
            const selectedOption = q.options[selectedIdx];
            // 累加该选项定义的所有分数
            selectedOption.scores.forEach(([dimIndex, direction]) => {
                scores[direction] += 1; // 简单计分，每题加1分，也可以加权
            });
        }
    });

    // 根据分数高低确定四个字母
    let result = '';
    result += scores.E >= scores.I ? 'E' : 'I';
    result += scores.S >= scores.N ? 'S' : 'N';
    result += scores.T >= scores.F ? 'T' : 'F';
    result += scores.J >= scores.P ? 'J' : 'P';

    return result;
}

// 结果描述（简单示例）
const typeDescriptions = {
    'INTJ': '建筑师：富有想象力和战略性的思想家，一切皆在计划之中。',
    'INTP': '逻辑学家：具有创造力的发明家，对知识有着止不住的渴望。',
    'ENTJ': '指挥官：大胆、富有想象力且意志强大的领导者，总能找到解决方法。',
    'ENTP': '辩论家：聪明好奇的思想者，不会放弃任何智力上的挑战。',
    'INFJ': '提倡者：安静而神秘，同时鼓舞人心且不知疲倦的理想主义者。',
    'INFP': '调停者：诗意、善良的利他主义者，总是热情地为正义提供帮助。',
    'ENFJ': '主人公：富有魅力、鼓舞人心的领导者，有着让听众着迷的能力。',
    'ENFP': '竞选者：热情、有创造力、爱社交的自由精神，总能找到理由微笑。',
    'ISTJ': '物流师：实际且注重事实的个人，可靠性不容置疑。',
    'ISFJ': '守卫者：非常专注且温暖的保护者，时刻准备着保护所爱之人。',
    'ESTJ': '总经理：出色的管理者，在管理具体事务和人员方面无与伦比。',
    'ESFJ': '执政官：非常乐于助人，享受助人和社交的快乐。',
    'ISTP': '鉴赏家：大胆而实际的实验者，擅长使用任何形式的工具。',
    'ISFP': '探险家：灵活有魅力的艺术家，时刻准备着探索和体验新鲜事物。',
    'ESTP': '企业家：聪明、精力充沛且善于感知，乐于冒险。',
    'ESFP': '表演者：自发而动感十足的表演者，生活在他们周围永不无聊。'
};

// 显示结果
function showResult() {
    // 检查是否所有题都已选
    for (let i = 0; i < userAnswers.length; i++) {
        if (userAnswers[i] === null) {
            alert(`请先回答第 ${i + 1} 题`);
            return;
        }
    }

    const resultType = calculateResult();
    const description = typeDescriptions[resultType] || '一种独特的组合，具体描述待补充。';

    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <h2>你的 MBTI 类型是：${resultType}</h2>
        <p>${description}</p>
    `;
}

// 页面加载时初始化
window.onload = function() {
    renderQuestions();

    const submitBtn = document.getElementById('submit-btn');
    if (submitBtn) {
        submitBtn.addEventListener('click', showResult);
    }
};