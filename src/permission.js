import router from "./router";
import store from "./store";
import { getToken } from "@/utils/auth"; // get token from cookie

const whiteList = ["/login", "/auth-redirect"]; // no redirect whitelist
router.beforeEach(async (to, from, next) => {
  const hasToken = getToken();
  if (hasToken) {
    // // 如果已登录，请重定向到主页
    console.log(1);
    if (to.path === "/login") {
      next({ path: "/" });
    } else {
      // 确定用户是否已通过getInfo获得其权限角色
      // if (hasRoles) {
      //   next()
      // } else {
      try {
        // 获取用户信息
        // 注意：角色必须是对象数组！ 例如：['admin']或，['developer'，'editor']
        // const { roles } = await store.dispatch('user/getInfo')
        // 根据角色生成可访问的路线图
        let roles = ["admin"];
        const accessRoutes = await store.dispatch(
          "permission/generateRoutes",
          roles
        );
        // 动态添加可访问的路线
        console.log(accessRoutes)
        router.addRoutes(accessRoutes);
        // 以确保addRoutes是完整的
        // 设置replace：true，因此导航将不会留下历史记录
        next({ ...to, replace: true });
      } catch (error) {
        next("/login");
        // }
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next();
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login`);
    }
  }
});
