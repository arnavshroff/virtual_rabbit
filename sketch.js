//Create variables here
var rabbitImage;
var rabbitImage2;
var rabbit;
var database;
var food,foodStock,nameref,foodS;
var feed,addfood;
var fedTime,lastFed;
var input,button,greeting,Name;
var washroomI,bedroomI,mainroomI,gardenI,kitchenI;
var washroom,bedroom,mainroom,garden,kitchen;
var houseI
var mainroomObj;
var washroomObj;
var bedroomObj;
var kitchenObj;

function preload()
{
  //load images here
  rabbitImage = loadImage("rabbit.png");
  rabbitImage2 = loadImage("rabbit2.png");
  washroomI = loadImage("washroom.png");
  bedroomI = loadImage("sleeping.png");
  mainroomI = loadImage("mainroom.png");
  gardenI = loadImage("garden5.png");
  houseI = loadImage("house.png");
  kitchenI = loadImage("kitchen.png");
}

function setup() {
  createCanvas(500, 500);

  

  gardenObj = createSprite(250,250,400,400);
  gardenObj.addImage(gardenI);
  //gardenObj.scale = 0.7
  gardenObj.visible = false;

  kitchenObj = createSprite(250,250,400,400);
  kitchenObj.addImage(kitchenI);
  kitchenObj.scale = 2
  kitchenObj.visible = false;

  
  garden=createButton("garden")
  garden.position(650,520);
  garden.mousePressed(gardens);

  kitchen = createButton("kitchen")
  kitchen.position(750,520);
  kitchen.mousePressed(kitchens)

  food = new Food()

  rabbit = createSprite(250,250,50,50);
  rabbit.addImage(rabbitImage2);
  rabbit.scale = 0.3;

  mainroomObj = createSprite(250,250,500,500);
  mainroomObj.addImage(mainroomI);
  //mainroomObj.scale = 0.8
  mainroomObj.visible = false;

  washroomObj = createSprite(250,250,400,400);
  washroomObj.addImage(washroomI);
  //washroomObj.scale = 0.72
  washroomObj.visible = false;

  bedroomObj = createSprite(250,250,400,400);
  bedroomObj.addImage(bedroomI);
  bedroomObj.scale = 1.2
  bedroomObj.visible = false;

  food = new Food()

  

  database = firebase.database();

  //Reference for food
  foodStock = database.ref("Food");
  foodStock.on("value",read,console.log("error"));

  //foodRef.set(50);
  nameref=database.ref("name");
  nameref.on("value",function(data)
  {
    name=data.val();
  })
  
  //feed the rabbit button
  feed=createButton("Feed the rabbit");
  feed.position(580,67);
  feed.mousePressed(feedrabbit);
  feed.hide()

  //add food button
  addFood=createButton("Add Food")
  addFood.position(600,88);
  addFood.mousePressed(addFoods);
  addFood.hide()

  
  mainroom=createButton("mainroom")
  mainroom.position(360,520);
  mainroom.mousePressed(mainrooms);

  

  
  washroom=createButton("washroom")
  washroom.position(450,520);
  washroom.mousePressed(washrooms);

  
  bedroom=createButton("bedroom")
  bedroom.position(550,520);
  bedroom.mousePressed(bedrooms);


  input=createInput("Change Pet Name");
  input.position(400,67);
  
  
  button=createButton("SUBMIT");
  button.position(450,90);
  button.mousePressed(renamingrabbit)

  
// add = createButton("ADD FOOD")
// add.position(400,15)
// add.mousePressed(AddFood)
  
  
}


function draw() {  
    background(houseI)
    textSize(32)
    strokeWeight(3)
    stroke("black")
    fill("black");
    text("Welcome",200,100)
    //food.display()
  drawSprites();
if(kitchenObj.visible === true){
  food.display()
}
   //fetching fedtime from database
   fedTime=database.ref("FeedTime");
   fedTime.on("value",function(data)
   {
     lastFed=data.val();
   })
  
   //food.visible = false;
   
   addFood.visible = false
   feed.visible = false
   
 
   fill("white");
   textSize(15);
   if(lastFed>=12)
   {
    fill("purple")
     text("Last Feed : "+ lastFed%12 + " PM",350,30);
   }
   else if(lastFed===0)
   {
    fill("purple")
     text("Last Feed : 12 AM",350,30)
   }
   else
   {
     fill("purple")
     text("Last Feed : "+ lastFed + " AM",350,30);
   }
 
   if(Name!==undefined)
   {
   text("Your Pet Name: "+ name,55,100);
   }
 
   //To draw the sprites on canvas
   //drawSprites();
 
  
   
 }

  // decreaseFood();

  // textSize(32);
  // fill("blue");
  // text("Bones in the Stock: "+foodStock,50,100);

  // if(foodStock === 0){
  //   textSize(32);
  //   fill("red");
  //   text("No More Food",50,300);
  //   food.visible = false;
  // }
  

function read(data){
  foodS= data.val();
  food.updateFoodStock(foodS);
}

// function decreaseFood(){
//   if(keyWentDown(UP_ARROW)&& foodStock>0){
//   foodRef = database.ref("Food");
//   foodStock = foodStock - 1;
//   foodRef.set(foodStock);
//   rabbit.addImage(rabbitImage);
//   rabbit.scale = 0.7;
  
//   textSize(28)
//   fill("yellow");
//   text("Thank you",10,50);
//   // food.x = 350;
//   // food.y = 200;
//   food.visible = false;
//   //food.scale = 0.1;

//   }
  
//   if(keyWentUp(UP_ARROW)){
    
//     foodStock = foodStock;
//     rabbit.addImage(rabbitImage2);
//     rabbit.scale = 0.3;
//     food.x = 100;
//     food.y = 300;
//     food.visible = true;
//     //food.scale = 0.2;
    
//   }
// }
function feedrabbit()
{ if(foodS>0 && kitchenObj.visible ===true){
  rabbit.addImage(rabbitImage);
  rabbit.scale = 0.7
  rabbit.y = 400
}
else{
  rabbit.addImage(rabbitImage2);
  rabbit.scale = 0.3
  rabbit.y = 350
}

  food.updateFoodStock(food.getFoodStock()-1);
  database.ref("/").update({
    Food: food.getFoodStock(),
    FeedTime: hour()
  })
  
}

//function to add the rabbit
function addFoods()
{
  foodS++;
  database.ref("/").update({
    Food:foodS
  })
}

function renamingrabbit()
{
  Name=input.value();
  button.visible = false;
  input.visible = false;
  database.ref("/").update({
    name:Name
  })

}
function mainrooms(){
  mainroomObj.visible = true
  washroomObj.visible = false
  bedroomObj.visible = false
  kitchenObj.visible = false
  gardenObj.visible = false
  //food.hide()
  //input.visible = false
  //button.visible = false
  addFood.hide()
  feed.hide()
}
function washrooms(){
  washroomObj.visible = true
  mainroomObj.visible = false
  bedroomObj.visible = false;
  kitchenObj.visible = false
  gardenObj.visible = false
  //food.hide()
  //input.visible = false
  //button.visible = false
  addFood.hide()
  feed.hide()
}
function bedrooms(){
  bedroomObj.visible = true
  mainroomObj.visible = false
  washroomObj.visible = false
  kitchenObj.visible = false
  gardenObj.visible = false
  //food.hide()
  //input.visible = false
  //button.visible = false
  addFood.hide()
  feed.hide()
}
function gardens(){
  gardenObj.visible = true
  mainroomObj.visible = false
  bedroomObj.visible = false
  kitchenObj.visible = false
  //mainroomObj.visible = false
  washroomObj.visible = false
  rabbit.y = 350;
  rabbit.x = 250
  //food.hide()
  //input.visible = false
  //button.visible = false
  addFood.hide()
  feed.hide()
}
function kitchens(){
  kitchenObj.visible = true;
  bedroomObj.visible = false
  mainroomObj.visible = false
  washroomObj.visible = false
  gardenObj.visible = false
  rabbit.y = 350;
  rabbit.x = 350
  //food.visible = true
  //input.visible = false
  //button.visible = false
  //food.display()
  addFood.show()
  feed.show()
}




