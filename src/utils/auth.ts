const TOKEN_KEY = "admin_token";

// 仅管理员登录使用
export function setToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
  window.location.href = "/";
}

// 检查是否是管理员
export function isAdmin(): boolean {
  const token = getToken();
  if (!token) return false;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.role === "admin";
  } catch {
    return false;
  }
}

// 检查是否已登录（仅管理员）
export function isLoggedIn(): boolean {
  return isAdmin();
}

// 页面权限判断（仅管理员可访问设置页面）
export function canVisit(path: string): boolean {
  const admin = isAdmin();
  const publicPages = ["/", "/about-me", "/subscribe"];
  
  // 公开页面所有人可访问
  if (publicPages.includes(path)) return true;
  
  // 设置页面仅管理员可访问
  if (path === "/settings" || path === "/admin") {
    return admin;
  }
  
  return true;
}

// 订阅功能（不需要登录）
export function subscribe(email: string): boolean {
  try {
    const subscribers = JSON.parse(localStorage.getItem("subscribers") || "[]");
    if (!subscribers.includes(email)) {
      subscribers.push(email);
      localStorage.setItem("subscribers", JSON.stringify(subscribers));
    }
    return true;
  } catch {
    return false;
  }
}

// 获取订阅列表（仅管理员）
export function getSubscribers(): string[] {
  if (!isAdmin()) return [];
  try {
    return JSON.parse(localStorage.getItem("subscribers") || "[]");
  } catch {
    return [];
  }
}
