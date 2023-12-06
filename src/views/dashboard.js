import { html } from "../../node_modules/lit-html/lit-html.js";
import { dataService } from "../dataService.js";

const dashboardTemp = (data)=> html`
    <h2>Fun Facts</h2>
    ${data.length > 0 ? 
        html`
            <section id="dashboard">    
                ${data.map(item => factCard(item))};
            </section>
        `: html`<h2>No Fun Facts yet.</h2>`
    }
        
`;

const factCard = (item) => html`
        <div class="fact">
            <img src=${item.imageUrl} alt="example3" />
            <h3 class="category">${item.category}</h3>
            <p class="description">${item.description}</p>
            <a class="details-btn" href="/details/${item._id}">More Info</a>
        </div>
`

export async function showDashboardView(ctx){
    const data = await dataService.getAllFacts();
    ctx.render(dashboardTemp(data));
}