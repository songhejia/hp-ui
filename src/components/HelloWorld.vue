<template>
  <div class="hello">
    <hp-layout :count="4"
               :horizontal="false">
      <div slot="item-1">
        <hp-hello></hp-hello>
      </div>
      <div slot="item-2">
        <hp-hello></hp-hello>
      </div>
      <div slot="item-3">
        <hp-hello></hp-hello>
      </div>
      <hp-layout slot="item-4"
                 :count="2"
                 horizontal>
        <div slot="item-1">
          <hp-hello></hp-hello>
        </div>
        <div slot="item-2">
          <hp-hello></hp-hello>
        </div>
      </hp-layout>
    </hp-layout>
    <hp-top-nav-bar :menus="menus"
                    :letter-info="letterInfo"
                    :letter-total="999" />
    <hp-header-bar>
      <div slot="left">卓聘·顾问执行系统</div>
      <div slot="right">卓聘·顾问执行系统</div>
    </hp-header-bar>
    <!-- <hp-icon-button name="power-off"
                    tool-tip="退出"
                    effect="light" /> -->
    <br/>
    <hp-job-type-dialog v-model="jobType"
                        @confirmClick="confirmClick"
                        label="职位类别"
                        title="职位类别"
                        :limit="3"></hp-job-type-dialog>
    <hp-city-dialog v-model="citys"
                    @confirmClick="confirmCityClick"
                    label="工作地点"
                    title="城市"
                    :limit="6"
                    dialog-id="city-1"></hp-city-dialog>

    <hp-city-dialog v-model="citys2"
                    @confirmClick="confirmCityClick"
                    label="工作地点"
                    title="城市"
                    :limit="6"
                    dialog-id="city-2"></hp-city-dialog>
    <hp-industry-dialog v-model="industry"
                        @confirmClick="confirmIndustryClick"
                        label="所在行业"
                        title="所在行业"
                        :limit="3"
                        dialog-id="industry-1"></hp-industry-dialog>
    <hp-salary-scope v-model="salary"
                     @change="salaryChange"></hp-salary-scope>
  </div>
</template>

<script>
import hello from "../../packages/hello";
import layout from "../../packages/layout";
import TopNavBar from "../../packages/top-nav-bar";
import HeaderBar from "../../packages/header-bar";
import IconButton from "../../packages/icon-button";
import JobTypeDialog from "../../packages/job-type-dialog";
import CityDialog from "../../packages/city-dialog";
import IndustryDialog from "../../packages/industry-dialog";
import SalaryScope from "../../packages/salary-scope";
export default {
  name: "HelloWorld",
  data() {
    return {
      menus: [
        {
          title: "首页",
          path: "todo.html"
        },
        {
          title: "统计分析",
          path: "stats.html"
        },
        {
          title: "保面试看板",
          path: "board.html"
        }
      ],
      letterInfo: {
        jobStatusCount: 25,
        newJobCount: 8,
        jobOutCount: 1
      },
      jobType: ["4010200", "7001000", '095'],
      citys: ["530"],
      citys2: [],
      industry: ["210500", "120400", "160000"],
      salary: '0100002000'
    };
  },
  components: {
    [hello.name]: hello,
    [layout.name]: layout,
    [TopNavBar.name]: TopNavBar,
    [HeaderBar.name]: HeaderBar,
    [IconButton.name]: IconButton,
    [JobTypeDialog.name]: JobTypeDialog,
    [CityDialog.name]: CityDialog,
    [IndustryDialog.name]: IndustryDialog,
    [SalaryScope.name]: SalaryScope
  },
  methods: {
    confirmClick(confirmList) {
      /* eslint-disable no-alert, no-console */
      console.log("confirmClick", this.jobType, confirmList);
    },
    confirmCityClick(confirmList) {
      /* eslint-disable no-alert, no-console */
      console.log("confirmClick", this.citys2, confirmList);
    },
    confirmIndustryClick(confirmList) {
      /* eslint-disable no-alert, no-console */
      console.log("confirmClick", this.industry, confirmList);
    },
    salaryChange(value, label) {
      console.log(value, label)
    }
  },
  mounted() {
    setTimeout(() => {
      this.citys2.push('530')
    }, 1000);
  }
};
</script>
