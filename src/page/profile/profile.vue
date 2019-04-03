<template>
  <div class="profile_page">
    <headTop go-back="true" :head-title="profiletitle"></headTop>
    <section>
      <section class="profile-number">
        <router-link to="/home" class="profile-link">
          <!-- <img src="imgBaseUrl + userInfo.avatar" class="privateImage" v-if="userInfo&&userInfo.user_id"> -->
          <span class="privateImage">
            <svg class="privateImage-svg">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#avatar-default"></use>
            </svg>
          </span>
          <div class="user-info">
            <p>登录/注册</p>
            <p>
              <span class="user-icon">
                <svg class="icon-mobile" fill="#fff">
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#mobile"></use>
                </svg>
              </span>
              <span class="icon-mobile-number">暂无绑定手机号</span>
            </p>
          </div>
          <span class="arrow">
            <svg class="arrow-svg" fill="#fff">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
            </svg>
          </span>
        </router-link>
      </section>
      <section class="info-data">
        <ul class="clear">
          <li class="info-data-link">
            <span class="info-data-top">
              <b>{{balance}}</b>元
            </span>
            <span class="info-data-bottom">我的余额</span>
          </li>
          <li class="info-data-link">
            <span class="info-data-top">
              <b>{{count}}</b>元
            </span>
            <span class="info-data-bottom">我的优惠</span>
          </li>
          <li class="info-data-link">
            <span class="info-data-top">
              <b>{{pointNumber}}</b>元
            </span>
            <span class="info-data-bottom">我的积分</span>
          </li>
        </ul>
      </section>

      <section class="profile-1reTe">
        <!-- 我的订单 -->
        <a href="#" class="myorder">
          <aside>
            <svg fill="#4aa5f0">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#order"></use>
            </svg>
          </aside>
          <div class="myorder-div">
            <span>我的订单</span>
            <span class="myorder-divsvg">
              <svg fill="#bbb">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
              </svg>
            </span>
          </div>
        </a>
        <!-- 积分商城 -->
        <a href="https://home.m.duiba.com.cn/#/chome/index" class="myorder">
          <aside>
            <svg fill="#fc7b53">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#point"></use>
            </svg>
          </aside>
          <div class="myorder-div">
            <span>积分商城</span>
            <span class="myorder-divsvg">
              <svg fill="#bbb">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
              </svg>
            </span>
          </div>
        </a>
        <!-- 饿了么会员卡 -->
        <router-link to="/vipcard" class="myorder">
          <aside>
            <svg fill="#ffc636">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#vip"></use>
            </svg>
          </aside>
          <div class="myorder-div">
            <span>饿了么会员卡</span>
            <span class="myorder-divsvg">
              <svg fill="#bbb">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
              </svg>
            </span>
          </div>
        </router-link>
      </section>
      <section class="profile-1reTe">
        <!-- 服务中心 -->
        <router-link to="/service" class="myorder">
          <aside>
            <svg fill="#4aa5f0">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#service"></use>
            </svg>
          </aside>
          <div class="myorder-div">
            <span>服务中心</span>
            <span class="myorder-divsvg">
              <svg fill="#bbb">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
              </svg>
            </span>
          </div>
        </router-link>
        <!-- 下载饿了么APP -->
        <router-link to="/download" class="myorder">
          <aside>
            <svg fill="#3cabff">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#download"></use>
            </svg>
          </aside>
          <div class="myorder-div" style="border-bottom:0;">
            <span>下载饿了么APP</span>
            <span class="myorder-divsvg">
              <svg fill="#bbb">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
              </svg>
            </span>
          </div>
        </router-link>
      </section>
    </section>
    <footerBt></footerBt>
  </div>
</template>

<script>
import { mapState } from "vuex";
import headTop from "../../components/header/head";
import footerBt from "../../components/footer/footerBt";
export default {
  data() {
    return {
      profiletitle: "我的",
      username: "登录/注册", //用户名
      resetname: "",
      mobile: "暂无绑定手机号", //电话号码
      balance: 0, //我的余额
      count: 0, //优惠券个数
      pointNumber: 0, //积分数
      avatar: "", //头像地址
      imgBaseUrl: "//elm.cangdu.org/img/"
    };
  },
  computed: {
    ...mapState(["userInfo"])
  },
  components: {
    headTop,
    footerBt
  }
};
</script>

<style lang="scss" scoped>
@import "src/style/mixin";
.profile_page {
  p,
  span {
    font-family: Helvetica Neue, Tahoma, Arial;
  }
}
.profile-number {
  padding-top: 1.95rem;
  .profile-link {
    display: block;
    display: flex;
    box-align: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    background: $blue;
    padding: 0.666667rem 0.6rem;
    .privateImage {
      display: inline-block;
      @include wh(2.5rem, 2.5rem);
      border-radius: 50%;
      vertical-align: middle;
      .privateImage-svg {
        background: $fc;
        border-radius: 50%;
        @include wh(2.5rem, 2.5rem);
      }
    }
    .user-info {
      margin-left: 0.48rem;
      flex-grow: 1;
      p {
        font-weight: 700;
        @include sc(0.8rem, $fc);
        .user-icon {
          @include wh(0.5rem, 0.75rem);
          display: inline-block;
          vertical-align: middle;
          line-height: 0.75rem;
          .icon-mobile {
            @include wh(100%, 100%);
          }
        }
        .icon-mobile-number {
          display: inline-block;
          @include sc(0.57333rem, $fc);
        }
      }
    }
    .arrow {
      @include wh(0.46667rem, 0.98rem);
      display: inline-block;
      svg {
        @include wh(100%, 100%);
      }
    }
  }
}

.info-data {
  width: 100%;
  background: #fff;
  box-sizing: border-box;
  ul {
    .info-data-link {
      float: left;
      width: 33.3%;
      display: inline-block;
      border-right: 1px solid #f1f1f1;
      span {
        display: block;
        width: 100%;
        text-align: center;
      }
      .info-data-top {
        @include sc(0.55rem, #333);
        padding: 0.853333rem 0 0.453333rem;
        b {
          display: inline-block;
          @include sc(1.2rem, #f90);
          font-weight: 700;
          line-height: 1rem;
          font-family: Helvetica Neue, Tahoma;
        }
      }
      .info-data-bottom {
        @include sc(0.57333rem, #666);
        font-weight: 400;
        padding-bottom: 0.453333rem;
      }
      &:nth-of-type(2) {
        .info-data-top {
          b {
            color: #ff5f3e;
          }
        }
      }
      &:nth-of-type(3) {
        border: 0;
        .info-data-top {
          b {
            color: #6ac20b;
          }
        }
      }
    }
  }
}

.profile-1reTe {
  margin-top: 0.4rem;
  background: $fc;
  .myorder {
    padding-left: 1.6rem;
    display: flex;
    align-items: center;
    aside {
      @include wh(0.7rem, 0.7rem);
      margin-left: -0.866667rem;
      margin-right: 0.266667rem;
      display: flex;
      align-items: center;
      svg {
        @include wh(100%, 100%);
      }
    }
    .myorder-div {
      width: 100%;
      border-bottom: 1px solid #f1f1f1;
      padding: 0.433333rem 0.266667rem 0.433333rem 0;
      @include sc(0.7rem, #333);
      display: flex;
      justify-content: space-between;
      span {
        display: block;
      }
      .myorder-divsvg {
        @include wh(0.46667rem, 0.466667rem);
        svg {
          @include wh(100%, 100%);
        }
      }
      &:nth-of-type(3) .myorder-div {
        border: 0;
      }
    }
  }
}
</style>
