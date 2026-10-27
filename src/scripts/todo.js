import Alpine from "alpinejs"
import axios from "axios"
window.Alpine = Alpine

function TodoApp() {
  return {
    page: "login",
    email: "",
    password: "",
    hasToken: false,
    todos: [],
    task: "",

    init() {
      // 檢查是否有 JWT
      const token = localStorage.getItem("jwt")
      if (token) {
        this.hasToken = true
        this.gotoTaskForm()

        // 抓 Todos
        this.getTodos()
      }
    },

    async addTodo() {
      if (this.task != "") {
        const url = "https://todoo.5xcamp.us/todos"
        const todoData = {
          todo: {
            content: this.task,
          },
        }
        const token = localStorage.getItem("jwt")
        const headers = { Authorization: token }

        try {
          // 演戲
          const fakeTask = { id: 1232331232, content: this.task }
          this.todos.unshift(fakeTask)

          // 真的打
          await axios.post(url, todoData, { headers: headers })
          this.getTodos()
        } catch (err) {
          console.log(err)
        }
      }
    },

    async getTodos() {
      const url = "https://todoo.5xcamp.us/todos"
      const token = localStorage.getItem("jwt")
      const headers = { Authorization: token }

      try {
        const resp = await axios.get(url, { headers: headers })
        const todos = resp.data.todos
        console.log(todos)

        this.todos = todos
      } catch (err) {
        console.log(err)
      }
    },

    async logout() {
      // 登出
      // 1. storage 的 token 刪除
      localStorage.removeItem("jwt")
      this.hasToken = false
      this.gotoLogin()

      // 2. session 刪除 = 登出 API
    },
    async login() {
      if (this.email == "" || this.password == "") {
        console.log("請輸入 email 或密碼")
      } else {
        // 打 API
        const userData = {
          user: {
            email: this.email,
            password: this.password,
          },
        }

        const url = "https://todoo.5xcamp.us/users/sign_in"
        try {
          const resp = await axios.post(url, userData)
          const token = resp.headers.authorization
          localStorage.setItem("jwt", token)
          this.hasToken = true
          this.email = ""
          this.password = ""

          this.gotoTaskForm()
          // 抓 todo
          this.getTodos()
        } catch (err) {
          // 加錯誤提示
          console.log(err)
        }
      }
    },
    gotoLogin() {
      this.page = "login"
    },
    gotoSignUp() {
      this.page = "signup"
    },
    gotoTaskForm() {
      this.page = "task"
    },

    isLogin() {
      return this.page == "login"
    },
    isSignUp() {
      return this.page == "signup"
    },
    isTaskForm() {
      return this.page == "task"
    },
  }
}

Alpine.data("todoapp", TodoApp)

Alpine.start()