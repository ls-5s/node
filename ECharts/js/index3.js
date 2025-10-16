// 立即执行函数，避免全局变量污染全局作用域
(function () {
    // 初始化ECharts实例，绑定到class为"box"的DOM元素上
    var myChart = echarts.init(document.querySelector(".box"));

    // 声明颜色数组，用于给不同类别的柱子设置不同颜色


    option = {
        tooltip: {
            trigger: 'item'
        },
        legend: {
            // 距离底部为0%
            bottom: "0%",
            // 小图标的宽度和高度
            itemWidth: 10,
            itemHeight: 10,
            data: ["0岁以下", "20-29岁", "30-39岁", "40-49岁", "50岁以上"],
            // 修改图例组件的文字为 12px
            textStyle: {
                color: "rgba(255,255,255,.5)",
                fontSize: "12"
            }
        },
        color: [
            "#065aab",
            "#066eab",
            "#0682ab",
            "#0696ab",
            "#06a0ab",
        ],
        series: [
            {
                name: "年龄分布",
                type: "pie",
                // 设置饼形图在容器中的位置
                center: ["50%", "50%"],
                //  修改内圆半径和外圆半径为  百分比是相对于容器宽度来说的
                radius: ["40%", "60%"],
                // 不显示标签文字
                label: { show: false },
                // 不显示连接线
                labelLine: { show: false},
                data: [
                    { value: 1, name: "0岁以下" },
                    { value: 4, name: "20-29岁" },
                    { value: 2, name: "30-39岁" },
                    { value: 2, name: "40-49岁" },
                    { value: 1, name: "50岁以上" }
                ],
            }
        ]
    };

      
    // 将配置项应用到图表实例，渲染图表
    myChart.setOption(option);

    // 监听窗口大小变化，让图表自动适应容器尺寸
    window.addEventListener("resize", function () {
        myChart.resize();
    });
})();