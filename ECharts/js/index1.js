// 立即执行函数，避免全局变量污染全局作用域
(function () {
    // 初始化ECharts实例，绑定到class为"box"的DOM元素上
    var myChart = echarts.init(document.querySelector(".box"));

    // 声明颜色数组，用于给不同类别的柱子设置不同颜色
    var myColor = ["#1089E7", "#F57474", "#56D0E3", "#F8B448", "#8B78F6"];

    // 指定图表的配置项和数据
    option = {
        // 网格配置：控制图表在容器中的边距
        grid: {
            top: "10%",    // 距离容器顶部10%
            left: "22%",   // 距离容器左侧22%
            bottom: "10%"  // 距离容器底部10%
        },

        // x轴配置（数值轴）
        xAxis: {
            type: 'value',          // 轴类型为数值轴（适用于连续数据）
            show: false,            // 不显示x轴（隐藏线条和刻度）
            boundaryGap: [0, 0.01]  // 数据最小值与最大值和坐标轴两端的间隙（[左间隙, 右间隙]）
        },

        // y轴配置：使用双y轴实现多层数据展示
        yAxis: [
            // 第一个y轴：用于显示技术类别名称
            {
                type: "category",       // 轴类型为类目轴（适用于离散分类数据）
                data: ["HTML5", "CSS3", "javascript", "VUE", "NODE"],  // 类目数据
                axisLine: { show: false },  // 不显示y轴线
                axisTick: { show: false },  // 不显示刻度线
                axisLabel: { color: "#fff" } // 刻度标签文字颜色为白色
            },
            // 第二个y轴：用于显示具体数值数据
            {
                show: true,                 // 显示该y轴
                data: [702, 350, 610, 793, 664],  // 数值数据
                axisLine: { show: false },  // 不显示y轴线
                axisTick: { show: false },  // 不显示刻度线
                axisLabel: {                // 刻度标签样式
                    textStyle: {
                        fontSize: 12,       // 文字大小12px
                        color: "#fff"       // 文字颜色白色
                    }
                }
            }
        ],

        // 系列数据配置：包含两组柱状图
        series: [
            // 第一组：带颜色填充的柱子（显示百分比数据）
            {
                type: 'bar',               // 图表类型为柱状图
                name: "条",                // 系列名称（用于标识）
                yAxisIndex: 0,             // 使用第一个y轴（类目轴）
                barCategoryGap: 50,        // 类目之间的间距（百分比）
                barWidth: 10,              // 柱子宽度10px
                data: [70, 34, 60, 78, 69],// 百分比数据（如掌握程度）
                itemStyle: {               // 柱子样式配置
                    normal: {
                        barBorderRadius: 20, // 柱子圆角半径20px
                        // 动态设置颜色：根据数据索引从myColor数组中取色
                        color: function (params) {
                            return myColor[params.dataIndex]
                        }
                    }
                },
                label: {                    // 柱子内部文本标签配置
                    normal: {
                        show: true,         // 显示标签
                        position: "inside", // 标签位置：柱子内部
                        formatter: "{c}%"   // 标签格式：数据值+百分号（{c}代表数据）
                    }
                }
            },
            // 第二组：边框柱子（作为背景参考框）
            {
                name: "框",                // 系列名称（用于标识）
                type: "bar",               // 图表类型为柱状图
                yAxisIndex: 1,             // 使用第二个y轴（数值轴）
                barCategoryGap: 50,        // 与第一组保持一致的类目间距
                barWidth: 15,              // 边框宽度15px（比第一组略宽）
                itemStyle: {               // 边框样式配置
                    color: "none",         // 填充色透明（只显示边框）
                    borderColor: "#00c1de",// 边框颜色为亮青色
                    borderWidth: 3,        // 边框宽度3px
                    barBorderRadius: 15    // 边框圆角半径15px
                },
                data: [100, 100, 100, 100, 100] // 数据全为100（作为满值参考线）
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