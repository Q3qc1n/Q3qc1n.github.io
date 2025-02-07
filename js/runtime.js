
  function updateRuntime() {
    // 建站时间
    let create_time = Math.round(new Date('2024/11/29 17:38:00').getTime() / 1000);
    let timestamp = Math.round((new Date().getTime()) / 1000);
    let second = timestamp - create_time;
    let time = [0, 0, 0, 0, 0]; // 年、天、小时、分钟、秒

    const nol = function(h) {
        return h > 9 ? h : '0' + h;
    };

    if (second >= 365 * 24 * 3600) {
        time[0] = parseInt(second / (365 * 24 * 3600));
        second %= 365 * 24 * 3600;
    }
    if (second >= 24 * 3600) {
        time[1] = parseInt(second / (24 * 3600));
        second %= 24 * 3600;
    }
    if (second >= 3600) {
        time[2] = nol(parseInt(second / 3600));
        second %= 3600;
    }
    if (second >= 60) {
        time[3] = nol(parseInt(second / 60));
        second %= 60;
    }
    if (second > 0) {
        time[4] = nol(second);
    }

    // 当前时间
    let now = new Date();
    let e = new Date('2024/11/29 17:38:00');
    let t = Math.trunc(234e8 + (now - e) / 1e3 * 17);
    let a = (t / 1496e5).toFixed(6);
    let o = new Date('2024/11/29 17:38:00');
    let n = (now - o) / 1e3 / 60 / 60 / 24;
    let r = Math.floor(n);
    let i = (now - o) / 1e3 / 60 / 60 - 24 * r;
    let s = Math.floor(i);

    if (String(s).length === 1) {
        s = "0" + s;
    }

    let d = (now - o) / 1e3 / 60 - 1440 * r - 60 * s;
    let l = Math.floor(d);

    if (String(l).length === 1) {
        l = "0" + l;
    }

    let g = (now - o) / 1e3 - 86400 * r - 3600 * s - 60 * l;
    let b = Math.round(g);

    if (String(b).length === 1) {
        b = "0" + b;
    }

    // 根据时间决定显示内容
    let currentTimeHtml = "";
    if (Number(time[2]) < 22 && Number(time[2]) >= 7) {
        currentTimeHtml = `<img class='boardsign' src='https://img.shields.io/badge/蟹堡王餐厅-营业中-6adea8?style=social&logo=cakephp' title='距离百年老店也就差不到一百年~'>
            <div id='runtime'>${time[0]} YEAR ${time[1]} DAYS ${time[2]} : ${time[3]} : ${time[4]}</div>
            <br>
            <div style="font-size:13px;font-weight:bold">本站居然运行了 ${r} 天 ${s} 小时 ${l} 分 ${b} 秒 
            <i id="heartbeat" class='fas fa-heartbeat'></i> <br> 
            旅行者 1 号当前距离地球 ${t} 千米，约为 ${a} 个天文单位 🚀</div>`;
    } else {
        currentTimeHtml = `<img class='boardsign' src='https://img.shields.io/badge/蟹堡王餐厅-打烊了-6adea8?style=social&logo=coffeescript' title='这个点了应该去睡觉啦，熬夜对身体不好哦'>
            <div id='runtime'>${time[0]} YEAR ${time[1]} DAYS ${time[2]} : ${time[3]} : ${time[4]}</div>
            <br>
            <div style="font-size:13px;font-weight:bold">本站居然运行了 ${r} 天 ${s} 小时 ${l} 分 ${b} 秒 
            <i id="heartbeat" class='fas fa-heartbeat'></i> <br> 
            旅行者 1 号当前距离地球 ${t} 千米，约为 ${a} 个天文单位 🚀</div>`;
    }

    document.getElementById("workboard").innerHTML = currentTimeHtml;
}

// 每秒更新一次
setInterval(updateRuntime, 1000);






// 防抖全局计时器
let TT = null;    //time用来控制事件的触发
// 防抖函数:fn->逻辑 time->防抖时间
function debounce(fn, time) {
    if (TT !== null) clearTimeout(TT);
    TT = setTimeout(fn, time);
}



