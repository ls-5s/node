// 立即执行函数，避免全局变量污染全局作用域
(function () {
    // 初始化ECharts实例，绑定到class为"box"的DOM元素上
    var myChart = echarts.init(document.querySelector(".box"));

    // 声明颜色数组，用于给不同类别的柱子设置不同颜色
    

    option = {
       
        tooltip: {
            trigger: 'axis'
        },
        // 图例组件
        legend: {
            textStyle: {
                color: '#4c9bfd' // 图例文字颜色
            },
            right: '10%' // 距离右边10%
        },
        // 设置网格样式
        grid: {
            top: '20%',
            left: '3%',
            right: '4%',
            bottom: '3%',
            show: true,// 显示边框
            borderColor: '#012f4a',// 边框颜色
            containLabel: true // 包含刻度文字在内
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            axisTick: {
                show: false // 去除刻度线
            },
            axisLabel: {
                color: '#4c9bfd' // 文本颜色
            },
            axisLine: {
                show: false // 去除轴线
            },
            boundaryGap: false  // 去除轴内间距
        },
        yAxis: {
            type: 'value',
            axisTick: {
                show: false  // 去除刻度
            },
            axisLabel: {
                color: '#4c9bfd' // 文字颜色
            },
            splitLine: {
                lineStyle: {
                    color: '#012f4a' // 分割线颜色
                }
            }
        },
        color: ['#00f2f1', '#ed3f35'],
        series: [{
            name: '新增粉丝',
            data: [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
            type: 'line',
            // 折线修饰为圆滑
            smooth: true,
        }, {
            name: '新增游客',
            data: [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79],
            type: 'line',
            smooth: true,
        }]
    };
    // 将配置项应用到图表实例，渲染图表
    myChart.setOption(option);

    // 监听窗口大小变化，让图表自动适应容器尺寸
    window.addEventListener("resize", function () {
        myChart.resize();
    });
})();