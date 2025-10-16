(function () {
    var myChart = echarts.init(document.querySelector(".box"));

    // 指定图表的配置项和数据
    option = {
        color: ["#2f89cf"],
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow' // line 线
            }
        },
        grid: {
            left: '0%',
            right: '0%',
            top: '10%',
            bottom: '4%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: [
                    "旅游行业",   // 数据项：旅游行业，可作为类目轴（如 X 轴）的分类名称
                    "教育培训",   // 数据项：教育培训，用于标识一类数据对应的分类
                    "游戏行业",   // 数据项：游戏行业，作为分类数据展示
                    "医疗行业",   // 数据项：医疗行业，代表特定业务分类
                    "电商行业",   // 数据项：电商行业，分类标识
                    "社交行业",   // 数据项：社交行业，用于数据分类
                    "金融行业"    // 数据项：金融行业，作为分类数据
                ],
                axisTick: {
                    // 使坐标轴刻度与标签对齐
                    // 当设置为true时，刻度的位置会根据标签的位置进行调整，确保刻度线与标签居中对齐
                    // 特别适用于标签可能因旋转、过长等原因导致与刻度错位的场景，提升图表可读性
                    alignWithLabel: true
                },
                axisLabel: {
                    // 刻度标签文字颜色，使用 rgba 格式，这里是白色带 0.6 透明度
                    color: "rgba(255,255,255,0.6)",
                    // 刻度标签字体大小，设置为 12px
                    fontSize: "12"
                },
                // x轴样式不显示
                axisLine: {
                    // show 用于控制坐标轴轴线（比如 x 轴的那条直线）是否显示
                    // false 表示隐藏 x 轴的轴线，true 则为显示
                    show: false,

                    // 如果想要设置单独的线条样式（当 show 为 true 时可生效）
                    // lineStyle: {
                    //   // 线条颜色，使用 rgba 格式，这里是白色且透明度 0.1 
                    //   color: "rgba(255,255,255,.1)", 
                    //   // 线条宽度，单位像素 
                    //   width: 1, 
                    //   // 线条类型，solid 表示实线，还可设置 dashed（虚线）等 
                    //   type: "solid" 
                    // }
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                // y 轴文字标签样式配置
                axisLabel: {
                    // 文字颜色，使用 rgba 格式，红色、绿色、蓝色均为 255（即白色），透明度 0.6
                    // 这里写法注意：原代码中 rgba 参数逗号后直接跟.6，规范写法建议补 0 写成 0.6，如 "rgba(255,255,255,0.6)"
                    color: "rgba(255,255,255,.6)",
                    // 文字大小，设置为 12px
                    fontSize: "12"
                },
                // y 轴线条样式配置（注意：规范写法是 axisLine，区分大小写，ECharts 中配置项需严格对应）
                axisLine: {
                    lineStyle: {
                        // 线条颜色，同样 rgba 格式，白色且透明度 0.1，规范写法建议写成 0.1
                        color: "rgba(255,255,255,.1)",
                        // 线条宽度，当前注释掉了，若启用可设置线条粗细，单位像素
                        // width: 1, 
                        // 线条类型，当前注释掉了，solid 表示实线，还可设置 dashed（虚线）等
                        // type: "solid" 
                    }
                },
                // y 轴分隔线样式配置（分隔线是坐标轴上用于辅助刻度标识的线条，比如 y 轴上水平的间隔线 ）
                splitLine: {
                    lineStyle: {
                        // 分隔线颜色，rgba 格式，白色且透明度 0.1，规范写法建议补 0 成 0.1
                        color: "rgba(255,255,255,.1)"
                    }
                }
            }

        ],
        series: [
            {
                // 系列名称，用于标识该数据系列， tooltip 等场景会显示
                name: "直接访问",
                // 图表类型，这里是柱状图（bar）
                type: "bar",
                // 修改柱子宽度，值可以是百分比（基于类目宽度的占比）或具体数值（如 20，单位像素 ）
                barWidth: "35%",
                // 系列数据，是柱状图每个柱子对应的值
                data: [10, 52, 200, 334, 390, 330, 220],
                itemStyle: {
                    // 修改柱子圆角，让柱子边角变圆润，数值为圆角半径（单位像素 ）
                    barBorderRadius: 5
                }
            }
        ]
    };
    myChart.setOption(option);
    // 4. 让图表跟随屏幕自动的去适应
    window.addEventListener("resize", function () {
        myChart.resize();
    });
})();