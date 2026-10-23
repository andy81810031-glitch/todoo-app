import axios from "axios"
console.log("--------")
console.log(axios)
console.log("--------")



const taskSection = document.querySelector("#taskSection")
const loginSection = document.querySelector("#loginSection")
const signUpSection = document.querySelector("#signUpSection")
const loginLinks = document.querySelectorAll(".loginLink")
const signUpLinks = document.querySelectorAll(".signUpLink")
const taskLinks = document.querySelectorAll(".taskLink")
const signUpForm = document.querySelector("#signUpForm")
const loginForm = document.querySelector("#loginForm")



// 登入功能
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault()

  const emailField = document.querySelector("#loginEmail")
  const passwordField = document.querySelector("#loginPassword")
  // 打 API
  const url = "https://todoo.5xcamp.us/users/sign_in"
  const userInfo = {
    user: {
    email: emailField.value,
    password: passwordField.value,
    },
  }

  try {
    const resp = await axios.post(url, userInfo)
    console.log("登入成功", resp.data)

    showTaskPage()
  } catch (err) {
    console.log("登入失敗", err.response?.data ?? err)
  }
})



// 註冊功能
signUpForm.addEventListener("submit", async (e) => {
  e.preventDefault()

  // 抓欄位
  const emailField = document.querySelector("#signUpEmail")
  const nicknameField = document.querySelector("#signUpNickname")
  const passwordField = document.querySelector("#signUpPassword")
  // 準備
  const url = "https://todoo.5xcamp.us/users"
  const userInfo = {
    user: {
    email: emailField.value,
    nickname: nicknameField.value,
    password: passwordField.value,
    },
  }
  // 打API
  // 方法一
  try {
    await axios.post(url, userInfo)
    emailField.value = ""
    nicknameField.value = ""
    passwordField.value = ""
    // 跳轉
    showLoginPage()
  } catch (err) {
    console.log("註冊失敗", err.response?.data ?? err)
  }
})
// 方法二
  // axios
  // .post(url, userInfo)
  // .then((resp) => {
  //   // 成功
  //   // 清理
  //   emailField.value = ""
  //   nicknameField.value = ""
  //   passwordField.value = ""
  //   // 跳轉
  //   showLoginPage()
  //   // console.log(resp.data)
  // })
  // .catch((err) => {
  //   // 失敗
  //   console.log(err)
  // })



taskLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault()
    showTaskPage()
  })
})

loginLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault()
    showLoginPage()
  })
})

signUpLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault()
    showSignUpPage()
  })
})

const initPages = () => {
  showLoginPage()
}

const showTaskPage = () => {
  taskSection.classList.remove("hidden")
  loginSection.classList.add("hidden")
  signUpSection.classList.add("hidden")
}

const showLoginPage = () => {
  taskSection.classList.add("hidden")
  loginSection.classList.remove("hidden")
  signUpSection.classList.add("hidden")
}

const showSignUpPage = () => {
  taskSection.classList.add("hidden")
  loginSection.classList.add("hidden")
  signUpSection.classList.remove("hidden")
}

export { initPages, showTaskPage, showLoginPage, showSignUpPage }