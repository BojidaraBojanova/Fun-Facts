import { html } from "../../node_modules/lit-html/lit-html.js";
import { userService } from "../userService.js";


const loginTemp = ()=>html`
        <section id="login">
          <div class="form">
            <h2>Login</h2>
            <form @submit=${submitHandler} class="login-form">
              <input type="text" name="email" id="email" placeholder="email" />
              <input
                type="password"
                name="password"
                id="password"
                placeholder="password"
              />
              <button type="submit">login</button>
              <p class="message">
                Not registered? <a href="/register">Create an account</a>
              </p>
            </form>
          </div>
        </section>
`
let context = null;
export function showLoginView(ctx){
    context = ctx;
    context.render(loginTemp());
}

async function submitHandler(e){
    e.preventDefault();

    const formData = new FormData(e.target)
    const {email, password} = Object.fromEntries(formData);

    if(!email || !password){
        return window.alert("Error");
    }

    // await userService.login(email, password);
    // context.updateNav();
    // context.goTo("/");
   
    try {
        await userService.login(email, password)

        context.updateNav();
        context.goTo("/");
        
    } catch (error) {
        window.alert('Error!')
    }
    
}
    