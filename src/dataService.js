import { api } from "./api.js"

const dataEndPoints = {
    getAll: "data/facts?sortBy=_createdOn%20desc",
    createSingleFact: "data/facts",
    singleFact: "data/facts/"
}

async function getAllFacts(){
    return api.get(dataEndPoints.getAll);
}

async function getSingleFact(id){
    return api.get(dataEndPoints.singleFact + id);
}

async function createFact(data){
    return api.post(dataEndPoints.createSingleFact, data);
}

async function updateFact(id, data){
    return api.put(dataEndPoints.singleFact + id, data);
}

async function deleteFact(id){
    return api.del(dataEndPoints.singleFact + id);
}

async function like(factId){
    return api.post("data/likes", {factId})
}

async function getLikesCount(factId){
    return api.get(`data/likes?where=factId%3D%22${factId}%22&distinct=_ownerId&count`)
}

async function isLikedByUser(factId, userId){
    return api.get(`data/likes?where=factId%3D%22${factId}%22%20and%20_ownerId%3D%22${userId}%22&count`)

}
export const dataService = {
    getAllFacts,
    createFact,
    getSingleFact,
    updateFact,
    deleteFact,
    like,
    getLikesCount,
    isLikedByUser

}