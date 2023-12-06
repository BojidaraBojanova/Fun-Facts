import page from "./node_modules/page/page.mjs";
import { render } from "./node_modules/lit-html/lit-html.js";

import { userHelper } from "./src/userHelper.js";
import { userService } from "./src/userService.js";

import { showHomeView } from "./src/views/home.js";
import { showLoginView } from "./src/views/login.js";
import { showRegisterView } from "./src/views/register.js";
import { showDashboardView } from "./src/views/dashboard.js";
import { showAddView } from "./src/views/add.js";
import { showDetailsView } from "./src/views/details.js";
import { showEditView } from "./src/views/edit.js";


const root = document.querySelector('main');/*ADD ROOT ELEMENT*/; 
const userNav = document.querySelector(".user")/*ADD USER NAV*/;
const guestNav = document.querySelector(".guest") /*ADD GUEST NAV*/;

page(decorationContext);

page("/", showHomeView);
page("/dashboard", showDashboardView);
page("/add", showAddView);
page("/login", showLoginView);
page("/register", showRegisterView);
page("/logout", logout);

page("/details/:id", showDetailsView);
page("/edit/:id", showEditView);




page.start();
updateNav();

async function logout(){
    await userService.logout();
    updateNav();
    goTo("/");
}

function renderer(template){
    render(template, root);
}

function updateNav(){
    const userData = userHelper.getUserData();
    if(userData){
        userNav.style.display = "block";
        guestNav.style.display = "none";
        // userA.forEach(a => a.style.display = "inline");
        // guestA.forEach(a => a.style.display = "none");
    }else{
        userNav.style.display = "none";
        guestNav.style.display = "block";
        // userA.forEach(a => a.style.display = "none");
        // guestA.forEach(a => a.style.display = "inline");
    }
}

function goTo(path){
    page.redirect(path);
}

function decorationContext(ctx, next){
    ctx.render = renderer;
    ctx.updateNav = updateNav;
    ctx.goTo = goTo;

    next();
}