let randomImg = document.getElementById("random-img")
let randomDishName = document.getElementById("random-dish-name")
let cate = document.getElementById("category")
let cateImg = document.getElementById("categoryImg")
let modal = document.getElementById("modal")
let cross = document.getElementById("cross")
let notMyType = document.getElementById("getmore")
let searchedFor = document.getElementById("searched-for")
let searchedItem = document.getElementById("searched-item")
let mealSearch =document.getElementById('search-input') 
let mealType = document.getElementById('search-input').value;
const resultsDiv = document.getElementById("searched-results");

randomImg.addEventListener("click",()=>{
    modal.style.display = "flex";

})
cross.addEventListener("click",()=>{
    modal.style.display = "none"
})

// notMyType.addEventListener("click",()=>{
//     getDataRandom()
// })

let randomApi = "https://www.themealdb.com/api/json/v1/1/random.php"

async function getDataRandom(){
    try{
        const apiFetch = await axios.get(randomApi)
        const data = await apiFetch.data
        const meal = await data.meals[0]
        console.log(meal)
        
        randomImg.src = meal.strMealThumb
        randomDishName.innerText = meal.strMeal
        cate.innerText = meal.strCategory
        if(cate.innerText=="Vegetarian"){
            cateImg.src = "./Assets/Veg.png"
        }else if(cate.innerText =="Chicken" || cate.innerText =="Beef"||cate.innerText =="Pork" || cate.innerText=="Seafood" || cate.innerText=="Lamb"){
            cateImg.src = "./Assets/Non-veg.png"
        }else if(cate.innerText=="Dessert"){
            cateImg.src = "./Assets/dessert.png"
        }else{
            cateImg.src = "./Assets/break-fast.png"
        }
        
        let order = document.getElementById("order")
        order.innerHTML=""
        for(let i=1;i<=20;i++){
            let totalIngridents= meal[`strIngredient${i}`]
            if(totalIngridents!=""){
            let list = document.createElement("li")
            list.innerHTML= totalIngridents
            order.append(list);
            }
        }
        let instruction = document.getElementById("para")
        instruction.innerText=meal.strInstructions      
    }catch(err){
        console.log(err)
    }
}
getDataRandom()

notMyType.addEventListener("click",()=>{
getDataRandom()
})

document.getElementById('search-btn').addEventListener('click', () => {
    let mealType = document.getElementById('search-input').value;
    // getData(mealType)
  if (mealType===""){
    const resultsDiv = document.getElementById("searched-results");
    resultsDiv.innerHTML = "";
    searchedFor.innerHTML = "You didn't searched anything.."
    searchedItem.innerHTML = ""

} else {
    getData(mealType);
    document.getElementById("searched-for").innerText="You Searched for"
    document.getElementById("searched-item").innerHTML = mealType
}
});

async function getData(category){
    try{
        let api = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
        const apiFetch = await axios.get(api)
        const data = await apiFetch.data
                        
        let meals = await data.meals
        console.log(meals)

        resultsDiv.innerHTML = "";
        if (meals && meals.length > 0) {
            meals.forEach((meal) => {
                const mealDiv = document.createElement("div");
                mealDiv.classList.add("result-meal");
                
                
                const mealImage = document.createElement("img");
                mealImage.src = meal.strMealThumb;
                mealImage.alt = meal.strMeal;
                
                const mealName = document.createElement("h3");
                mealName.textContent = meal.strMeal;
                
                mealDiv.appendChild(mealImage);
                mealDiv.appendChild(mealName);
                
                resultsDiv.appendChild(mealDiv);
            });
        } 
        
        
        
        
    }catch(err){
        console.log(err)
        

    }
}
getData()



//button redirect

document.getElementById("search-btn").addEventListener("click",()=>{
    window.location.href = "#searched-results"
})

document.getElementById("search").addEventListener("click",()=>{
    window.location.href = "#search-meal"
})

document.getElementById("discover").addEventListener("click",()=>{
    window.location.href = "#discover-meal"
})
// enter button event
mealSearch.addEventListener("keypress",()=>{ 
    if(event.key=="Enter"|| event.KeyCode ==13){
        let mealType = document.getElementById('search-input').value;
        // getData(mealType)
      if (mealType===""){
        const resultsDiv = document.getElementById("searched-results");
        resultsDiv.innerHTML = "";
        searchedFor.innerHTML = "You didn't searched anything.."
        searchedItem.innerHTML = ""
        window.location.href = "#searched-results"
    
    } else {
        getData(mealType);
        document.getElementById("searched-for").innerText="You Searched for"
        document.getElementById("searched-item").innerHTML = mealType
        window.location.href = "#searched-results"
    }
    }
})