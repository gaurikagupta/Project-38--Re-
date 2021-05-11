//Declaring variables
var fish, happyFish, database, foodS, foodStock, foodCount;
var fishImg, happyFishImg;
var sleepyFish, sleepyFishImage;
var addB, feedB, fullB, sleepB;
var lastFed;
var food;
var changeState;
var readState;
var gameState;
var bg1, bgImg1;
var bg2, bgImg2;
var bg3, bgImg3;


//Loading the images
function preload(){
fishImg=loadImage("fish.png");
happyFishImg=loadImage("happyFish.png");
sleepyFishImage=loadImage("sleepyfish.png");
bgImg1=loadImage("Image2.png");
bgImg2=loadImage("Image.jpg");
bgImg3=loadImage("Image3.jpg");
}

function setup() {
	createCanvas(800,600);
  database=firebase.database();

  foodS=10;

  //Creating hungry background
  bg1=createSprite(250,250,500,500);
  bg1.addImage(bgImg1);

  //Creating the fish
  fish=createSprite(320,250,40,40);
  fish.addImage(fishImg);
  fish.scale=0.3;

  //Creating the fish-food
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  //Creating food
  food=new Food(0);

  //Creating the FEED BUTTON
  feedB=createButton("Feed Goldie");
  feedB.position(450,100,40,40);
  feedB.mousePressed(feedFish);

  //Creating the ADD BUTTON
  addB=createButton("Refresh Stock");
  addB.position(700,100,40,40);
  addB.mousePressed(addFood);

  //Creating the FULL BUTTON
  fullB=createButton("Visit the Aquarium");
  fullB.position(435,150,40,40);
  fullB.mousePressed(full);

  //Creating the SLEEP BUTTON
  sleepB=createButton("Sleep Time!");
  sleepB.position(705,150,40,40);
  sleepB.mousePressed(sleep);
  
  //Creating the time
  lastFed=hour();

  

}


function draw() {  
drawSprites();
textSize(17);
text("Dark background: Goldie is Hungry",500,200);
text("Once Goldie is full, you can take her ",500,250);
text("to the aquarium or put her to sleep!",500,270);


//Displaying text for the time 
fill("white");
textSize(20);
if(lastFed>=12){
  text("Last you fed Goldie: "+ lastFed%12+" PM ",150,460);
}
else if(lastFed==0){
 text("Last you fed Goldie:12 AM",150,460);

}
else{
 text("Last you fed Goldie: "+lastFed+" AM ",150,460);
}


//Displaying  text for FOOD LEFT 
fill("white");
textSize(20);
text("Fish food left: "+foodS,190,30);
}

//Creating function for reading the databse value
function readStock(data){
  foodS=data.val();
}

function writeStock(x){
  //Decreasing the number of food if only foodS>0 
  if(x<=0){
  x=0;
  textSize(50);
  fill("red");
  text("Goldie is full!!!",100,400);
  fish.scale=0.3;

  }
  else{
  x=x-1;  
  food.display();
  fish.scale=fish.scale+0.1;
    feedB.show();
    addB.show();
  

  }
  database.ref('/').update({
  Food:x
  })
}

//Creating function for feeding fish
function addFood(){
  if(foodS>=10){
    foodS=10;
  }
  else{
    foodS=foodS+1;
  }
}

//Creating function for adding food
function feedFish(){
  writeStock(foodS);
  fish.addImage(happyFishImg);
}

//Creating function for when goldie is full
function full(){
  fish.addImage(fishImg);
  bg1.addImage(bgImg2);
  bg1.scale=1.8;
  feedB.hide();
  addB.hide();
}

//Creating function for when goldie is sleepy
function sleep(){
  bg1.addImage(bgImg3);
  fish.addImage(sleepyFishImage);
}


