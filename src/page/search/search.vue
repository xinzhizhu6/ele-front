<template>
  <div class="paddingTop search_page">
    <headTop head-title="搜索" goBack="true"></headTop>
    <form class="search_form">
      <input
        type="search"
        name="search"
        placeholder="请输入商家或美食名称"
        class="search_input"
        v-model="searchValue"
        @input="checkInput"
      >
      <input
        type="submit"
        name="submit"
        class="search_submit"
        value="提交查询"
        @click.prevent="searchTarget('')"
      >
    </form>

    <section v-if="restaurantList.length">
      <h4 class="title_restaurant">商家</h4>
      <ul class="list_container">
        <li v-for="item in restaurantList" :key="item.id" class="list_li">
          <section class="item_left">
            <img :src="imgBaseUrl + item.image_path" class="restaurant_img">
          </section>
          <section class="item_right">
            <p>
              <span>肯德基</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                width="24"
                height="14"
                class="pay_icon"
              >
                <polygon
                  points="0,14 4,0 24,0 20,14"
                  style="fill:none;stroke:#FF6000;stroke-width:1"
                ></polygon>
                <line x1="1.5" y1="12" x2="20" y2="12" style="stroke:#FF6000;stroke-width:1.5"></line>
                <text x="3.5" y="9" style="fill:#FF6000;font-size:9;font-weight:bold;">支付</text>
              </svg>
            </p>
            <p>月售 1 单</p>
            <p>1元起送 / 距离11</p>
          </section>
        </li>
      </ul>
    </section>

    <section class="search_history" v-if="searchHistory.length && showHistory">
      <h4 class="title_restaurant">搜索历史</h4>
      <ul>
        <li class="history_list" v-for="(item, index) in searchHistory" :key="index">
          <span class="history_text ellipsis" @click="searchTarget(item)">{{ item }}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            class="delete_icon"
            @click="deleteHistory(index)"
          >
            <line x1="8" y1="8" x2="18" y2="18" style="stroke:#999;stroke-width:3"></line>
            <line x1="18" y1="8" x2="8" y2="18" style="stroke:#999;stroke-width:3"></line>
          </svg>
        </li>
      </ul>
      <footer class="clear_history" @click="clearAllHistory">清空搜索历史</footer>
    </section>
    <div class="search_none" v-if="emptyResult">很抱歉！无搜索结果</div>
    <footerBt></footerBt>
  </div>
</template>

<script>
import headTop from "../../components/header/head";
import footerBt from "../../components/footer/footerBt";
import { searchRestaurant } from "../../service/getData.js";
import { getStore, setStore } from "../../config/mUtil";
export default {
  data() {
    return {
      geohash: "", // msite页面传递过来的地址信息
      searchValue: "", // 搜索内容
      restaurantList: [], //搜索返回的结果
      searchHistory: [], // 搜索历史记录
      showHistory: true, // 是否显示历史记录，只有在返回搜索结果后隐藏
      emptyResult: false, // 搜索结果为空时显示
      imgBaseUrl: "//elm.cangdu.org/img/"
    };
  },
  mounted() {
    this.geohash = this.$route.params.geohash;
    //获取搜索历史记录
    if (getStore("searchHistory")) {
      this.searchHistory = JSON.parse(getStore("searchHistory"));
    }
  },
  methods: {
    //点击提交按钮，搜索结果并显示，同时将搜索内容存入历史记录
    async searchTarget(historyValue) {
      if (historyValue) {
        this.searchValue = historyValue;
      } else if (!this.searchValue) {
        return;
      }
      //隐藏历史记录
      this.showHistory = false;

      this.restaurantList = await searchRestaurant(
        this.geohash,
        this.searchValue
      );
      this.emptyResult = !this.restaurantList.length;
      console.log(this.restaurantList);

      let history = getStore("searchHistory");
      if (history) {
        let checkrepeat = false;
        this.searchHistory = JSON.parse(history);
        this.searchHistory.forEach(item => {
          if (item == this.searchValue) {
            checkrepeat = true;
          }
        });
        if (!checkrepeat) {
          this.searchHistory.push(this.searchValue);
        }
      }
      setStore("searchHistory", this.searchHistory);
    },
    //搜索结束后，删除搜索内容直到为空时清空搜索结果，并显示历史记录
    checkInput() {},

    //点击删除按钮，删除当前历史记录
    deleteHistory(index) {
      this.searchHistory.splice(index, 1);
      setStore("searchHistory", this.searchHistory);
    },
    //清除所有历史记录
    clearAllHistory() {
      this.searchHistory = [];
      setStore("searchHistory", this.searchHistory);
    }
  },
  components: {
    headTop,
    footerBt
  }
};
</script>

<style lang="scss" scoped>
@import "../../style/mixin.scss";
.search_page {
  margin-bottom: 2rem;
}
.search_form {
  background-color: #fff;
  padding: 0.5rem;
  display: flex;
  input {
    height: 1.5rem;
  }
  .search_input {
    flex: 4;
    border: 0.025rem solid $bc;
    @include sc(0.65rem, #333);
    border-radius: 0.125rem;
    background-color: #f2f2f2;
    font-weight: bold;
    padding: 0 0.25rem;
  }
  .search_submit {
    flex: 1;
    border: 0.025rem solid $blue;
    margin-left: 0.2rem;
    @include sc(0.65rem, #fff);
    border-radius: 0.125rem;
    background-color: $blue;
    font-weight: bold;
    padding: 0 0.25rem;
  }
}
.list_container {
  background-color: #fff;
  .list_li {
    display: flex;
    justify-content: center;
    padding: 0.5rem;
    border-bottom: 0.025rem solid $bc;
    .item_left {
      margin-right: 0.5rem;
      .restaurant_img {
        @include wh(2rem, 2rem);
      }
    }
    .item_right {
      font-size: 0.55rem;
      flex: 1;
      .item_right_text {
        padding-bottom: 0.25rem;
        border-bottom: 0.025rem solid $bc;
        p {
          line-height: 0.9rem;
        }
        .pay_icon {
          margin-bottom: -0.08rem;
        }
      }
    }
  }
}
.title_restaurant {
  font-size: 0.6rem;
  line-height: 2rem;
  text-indent: 0.5rem;
  font-weight: bold;
  color: #666;
}
.search_history {
  .history_list {
    background-color: #fff;
    border-bottom: 0.025rem solid $bc;
    @include font(0.7rem, 2rem);
    padding: 0 0.3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .history_text {
      display: inline-block;
      width: 80%;
    }
    .delete_icon {
      @include wh(1rem, 1rem);
    }
  }
  .clear_history {
    background-color: #fff;
    color: $blue;
    @include font(0.7rem, 2rem);
    font-weight: bold;
    text-align: center;
  }
}
.search_none {
  margin: 0 auto;
  @include font(0.65rem, 1.75rem);
  color: #333;
  background-color: #fff;
  text-align: center;
  margin-top: 0.125rem;
}
</style>
