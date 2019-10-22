export const config ={
    ueUrl:'http://10.101.20.100:8080',
    uePassword: 'a53bf4c1d9be195f807e6ae8ee22f09c',
    baseUrl:'http://10.101.20.100',

    // ueUrl:'http://47.104.161.130:8080',
    // uePassword: '319a5d2ce2e52aaec8c09008ee85517f',
    // baseUrl:'http://47.104.161.130:8061',
    // baseUrl:'http://localhost:80',
    apiPrefix:'api',
    dateRangePickDay: {
        shortcuts: [{
            text: '最近一周',
            onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setDate(start.getDate() - 7);
                picker.$emit('pick', [start, end]);
            }
        }, {
            text: '最近一个月',
            onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setMonth(start.getMonth() - 1);
                picker.$emit('pick', [start, end]);
            }
        }, {
            text: '最近三个月',
            onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setMonth(start.getMonth() - 3);
                picker.$emit('pick', [start, end]);
            }
        }, {
            text: '最近半年',
            onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setMonth(start.getMonth() - 6);
                picker.$emit('pick', [start, end]);
            }
        }, {
            text: '最近一年',
            onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setFullYear(start.getFullYear() - 1);
                picker.$emit('pick', [start, end]);
            }
        }, {
            text: '截止今日',
            onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setFullYear(0);
                picker.$emit('pick', [start, end]);
            }
        }]
    }
};
