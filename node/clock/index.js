
        // 获取显示元素
        const timeDisplay = document.getElementById('timeDisplay');
        const dateDisplay = document.getElementById('dateDisplay');

        // 星期和月份的中文名称
        const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
        const months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];

        // 更新时间和日期的函数
        function updateDateTime() {
            const now = new Date();

            // 格式化时间
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            const seconds = now.getSeconds().toString().padStart(2, '0');
            timeDisplay.textContent = `${hours}:${minutes}:${seconds}`;

            // 格式化日期
            const year = now.getFullYear();
            const month = months[now.getMonth()];
            const day = now.getDate();
            const weekday = weekdays[now.getDay()];
            dateDisplay.textContent = `${year}年 ${month} ${day}日 ${weekday}`;
        }

        // 初始更新一次
        updateDateTime();
        // 每秒更新一次
        setInterval(updateDateTime, 1000);
    