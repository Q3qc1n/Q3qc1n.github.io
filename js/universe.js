// 封装函数确保DOM加载完成
function whenDOMReady() {
  return new Promise(resolve => {
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      resolve();
    } else {
      document.addEventListener('DOMContentLoaded', resolve);
    }
  });
}

// 主函数改造为异步
async function initUniverse() {
  await whenDOMReady();
  
  const universe = document.getElementById("universe");
  if (!universe) {
    console.warn('未找到#universe元素');
    return;
  }

  // 原有dark函数内容（稍作修改）
  function dark() {
    window.requestAnimationFrame = window.requestAnimationFrame || 
      window.mozRequestAnimationFrame || 
      window.webkitRequestAnimationFrame || 
      window.msRequestAnimationFrame;
    
    var n, e, i, h, t = .05, 
      s = universe, // 使用已获取的元素
      o = !0, 
      a = "180,184,240", 
      r = "226,225,142", 
      d = "226,225,224", 
      c = [];

    function f() {
      n = window.innerWidth;
      e = window.innerHeight;
      i = .216 * n;
      s.setAttribute("width", n);
      s.setAttribute("height", e);
    }

    function u() {
      if (!h) return;
      h.clearRect(0, 0, n, e);
      for (var t = c.length, i = 0; i < t; i++) {
        var s = c[i];
        s.move();
        s.fadeIn();
        s.fadeOut();
        s.draw();
      }
    }

    function y() {
      this.reset = function() {
        this.giant = m(3);
        this.comet = !this.giant && !o && m(10);
        this.x = l(0, n - 10);
        this.y = l(0, e);
        this.r = l(1.1, 2.6);
        this.dx = l(t, 6 * t) + (this.comet + 1 - 1) * t * l(50, 120) + 2 * t;
        this.dy = -l(t, 6 * t) - (this.comet + 1 - 1) * t * l(50, 120);
        this.fadingOut = null;
        this.fadingIn = !0;
        this.opacity = 0;
        this.opacityTresh = l(.2, 1 - .4 * (this.comet + 1 - 1));
        this.do = l(5e-4, .002) + .001 * (this.comet + 1 - 1);
      };
      // ... 保持其余y()函数内容不变 ...
    }

    function m(t) { return Math.floor(1e3 * Math.random()) + 1 < 10 * t; }
    function l(t, i) { return Math.random() * (i - t) + t; }

    f();
    window.addEventListener("resize", f, !1);

    // 初始化画布
    h = s.getContext("2d");
    if (!h) {
      console.error('无法获取canvas上下文');
      return;
    }

    for (var t = 0; t < i; t++) {
      c[t] = new y();
      c[t].reset();
    }
    u();

    function animationLoop() {
      if (document.documentElement.getAttribute('data-theme') == 'dark') {
        u();
      }
      window.requestAnimationFrame(animationLoop);
    }
    animationLoop();
  }

  dark();

  // 文章统计明暗适配函数
  function switchPostChart() {
    let color = document.documentElement.getAttribute('data-theme') === 'light' ? '#4C4948' : 'rgba(255,255,255,0.7)';
    
    // 添加图表元素存在性检查
    const updateChart = (chartId, chartInstance, option) => {
      if (!document.getElementById(chartId) || !chartInstance || !option) return;
      
      try {
        let optionNew = JSON.parse(JSON.stringify(option)); // 深拷贝
        // ... 保持原有样式更新逻辑 ...
        chartInstance.setOption(optionNew);
      } catch (error) {
        console.error('更新图表出错:', error);
      }
    };

    updateChart('posts-chart', postsChart, postsOption);
    updateChart('tags-chart', tagsChart, tagsOption);
    updateChart('categories-chart', categoriesChart, categoriesOption);
  }

  // 安全添加事件监听
  const modeButton = document.getElementById("mode-button");
  if (modeButton) {
    modeButton.addEventListener("click", function() { 
      setTimeout(switchPostChart, 100); 
    });
  } else {
    console.warn('未找到#mode-button元素');
  }
}

// 启动初始化
initUniverse().catch(console.error);