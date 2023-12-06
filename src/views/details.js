import { html } from "../../node_modules/lit-html/lit-html.js";
import { dataService } from "../dataService.js";
import { userHelper } from "../userHelper.js";

const detailsTemp = (item, isOwner, isLoggedIn, likesCount, isLikedByUser)=> html`
    <section id="details">
          <div id="details-wrapper">
            <img id="details-img" src=${item.imageUrl} alt="example1" />
            <p id="details-category">${item.category}</p>
            <div id="info-wrapper">
              <div id="details-description">
                <p id="description">${item.description}</p>
                    <p id ="more-info">${item.moreInfo}</p>
              </div>

              <h3>Likes:<span id="likes">${likesCount}</span></h3>

             
               <!--Edit and Delete are only for creator-->
          <div id="action-buttons">
                ${isOwner ? 
                    html`
                        <a href="/edit/${item._id}" id="edit-btn">Edit</a>
                        <a href="" id="delete-btn" @click=${delFact}>Delete</a>
                    ` : isLoggedIn && !isLikedByUser ? html`<a href="" id="like-btn" @click=${likeFact}>Like</a>` : ""
                }          
          </div>
            </div>
        </div>
    </section>
`;
let context = null;
export async function showDetailsView(ctx){
    const id = ctx.params.id;
    const data = await dataService.getSingleFact(id);
    
    let isOwner;
    let isLoggedIn;
    let isUserLikedFact;

    const userData = userHelper.getUserData();
    isLoggedIn = !!userData;

    if(isLoggedIn){
        isOwner = userHelper.getUserID() === data._ownerId;
        isUserLikedFact = await dataService.isLikedByUser(id,userHelper.getUserID());

    }

    const likesCount = await dataService.getLikesCount(id);
    await ctx.render(detailsTemp(data, isOwner, isLoggedIn, likesCount, isUserLikedFact));
    context = ctx;
    
}

async function delFact(e){
    e.preventDefault();

    const confirmed = window.confirm("Are you sure you want to delete the fact?");

    if(confirmed) {
        const id = context.params.id;
        await dataService.deleteFact(id);
        context.goTo("/dashboard");
    }
}

async function likeFact(e){
    e.preventDefault();
    const id = context.params.id;
    await dataService.like(id);
    const likesCount = await dataService.getLikesCount(id);
    document.getElementById('likes').innerText = likesCount;
    context.goTo(`/details/${id}`);
}