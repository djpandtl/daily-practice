console.log('hangman!')

// 动态生成 26 个字母并创建 字母div
function createAlphabetSpans() {
    const alphabet = document.querySelector('.alphabet')

    for (let i = 97; i <= 122; i++) {
        let span = document.createElement('span')
        span.innerText = String.fromCharCode(i)
        span.classList.add('key')
        alphabet.append(span)
    }
}
createAlphabetSpans()

// 用到的数据
const categories = [
    ["everton", "liverpool", "swansea", "chelsea", "hull", "manchester-city", "newcastle-united"],
    ["alien", "dirty-harry", "gladiator", "finding-nemo", "jaws"],
    ["manchester", "milan", "madrid", "amsterdam", "prague"]
];
const hints = [
    ["Based in Mersyside", "Based in Mersyside", "First Welsh team to reach the Premier Leauge", "Owned by A russian Billionaire", "Once managed by Phil Brown", "2013 FA Cup runners up", "Gazza's first club"],
    ["Science-Fiction horror film", "1971 American action film", "Historical drama", "Anamated Fish", "Giant great white shark"],
    ["Northern city in the UK", "Home of AC and Inter", "Spanish capital", "Netherlands capital", "Czech Republic capital"]
];

function chooseWordByRandom() {
    let n1 = Math.floor(Math.random() * categories.length)
    let selectedArr = categories[n1]
    let n2 = Math.floor(Math.random() * selectedArr.length)
    
    let result = [selectedArr[n2], hints[n1][n2]]
    console.log('result', result)
    return result
}

// 存储结果，包括hint
const answer = []
let lives = 10

// 提示和再玩一次按钮
const operator = document.querySelector('.operator')
operator.addEventListener('click', function(event) {
    if (event.target.innerText === "Hint") {
        showHint()
        return
    }
    play()

    // 恢复 lives 的值 并清空 canvas
    lives = 10
    document.getElementById('lives').innerText = lives
    let canvas = document.querySelector('canvas')
    canvas.width = canvas.width
})

function showHint() {
    if(answer.length === 0) return

    const hint = document.querySelector('#clue')
    // hint.innerText = ""
    hint.innerText = answer[1]
}
function play() {
    const result = document.querySelector('.result')
    // 当已经生成 spans 之后，在玩一次应该清空
    while(result.firstChild) {
        result.removeChild(result.firstChild)
    }

    // 生成答案
    let res = chooseWordByRandom()

    // 清空原来的答案
    answer.length = 0
    answer.push(...res)
    console.log('answer 0', answer[0])
    // 根据答案单词的个数生成 span ，注意 '-'
    for (let i = 0; i < answer[0].length; i++) {
        let span = document.createElement('span')

        // 处理字符为 '-'的情况
        if(answer[0][i] === '-') {
            span.innerText = '-'
        }
        result.append(span)
    }
}

// 处理字母点击事件
const alphabet = document.querySelector('.alphabet')
alphabet.addEventListener('click', function(event) {
    // 当点击对象时父元素的时候
    if(event.target === event.currentTarget) return

    // 获取字母key
    let key = event.target.innerText
    // 为什么加不上？？？
    // event.target.classList.add('key-clicked')
    event.target.opacity = 0.5
    // 在 answer 里面，填充 span
    let words = answer[0]
    if (words.includes(key)) {
        const spans = Array.from(document.querySelector('.result').children)

        Array.from(words).forEach((value, index) => {
            if (value === key) {
                spans[index].innerText = key
            }
        })
        // 填充完之后判断是否全部填完了
        showResult()
        return
    }

    // 不在 里面，减少 lives 和画图
    // 当 lives == 0 或者 全部填完之后显示 win or lose
    lives -= 1
    // if(lives === 0) showResult(lives)
    document.getElementById('lives').innerText = lives

    // draw1()
    stpesOfHangman[lives]()
})

function showResult(lives) {
    if (lives === 0) {
        let myLives = document.getElementById('mylives')
        Array.from(myLives.childNodes).forEach(node => {
            if(node.nodeType === 3) { // 文本节点
                node.innerText = ""
                // return
            }
            node.innerText = "Game Over !"
        })
    }

    // 判断当前是否完全正确了
    const result = document.querySelector('.result')
    let hasEmptySpan = Array.from(result.children).every(node => {
        return node.innerText !== ''
    })

    if (hasEmptySpan) alert('Win!!!!!!!!!!')
    
}

function drawHangman(x1, y1, x2, y2) {
    const canvas = document.querySelector('canvas')
    const ctx = canvas.getContext('2d')
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.closePath();
    ctx.stroke();
}

let draw1 = function() {
    drawHangman(30, 130, 130, 130)
}
let draw2 = function() {
    drawHangman(50, 130, 50, 15)
}
let draw3 = function() {
    drawHangman(40, 15, 100, 15)
}
let draw4 = function() {
    drawHangman(90, 15, 90, 30)
}

let drawCircle = function() {
    var c=document.querySelector("canvas");
    var ctx=c.getContext("2d");
    ctx.beginPath();
    ctx.arc(90,45,15,0,2*Math.PI);
    ctx.stroke();
}
let draw6 = function() {
    drawHangman(90, 60, 90, 100)
}
let draw7 = function() {
    drawHangman(90, 70, 60, 80)
}
let draw8 = function() {
    drawHangman(90, 70, 120, 80)
}
let draw9 = function() {
    drawHangman(90, 100, 70, 125)
}
let draw10 = function() {
    drawHangman(90, 100, 110, 125)
}

// 根据 lives 的大小调用对应的函数
const stpesOfHangman = [
    draw10,
    draw9,
    draw8,
    draw7,
    draw6,
    drawCircle,
    draw4,
    draw3,
    draw2,
    draw1
]

// 初始化
play()