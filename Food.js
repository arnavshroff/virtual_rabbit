class Food{
    constructor(){
        this.image=loadImage("carrot.png");

        this.foodStock=0;
        this.lastFed;  
    }
    getFoodStock()
    {
    return this.foodStock;
    }

    updateFoodStock(foodStock)
    {
        this.foodStock=foodStock;
    }

    getFedTime(lastFed){
        this.lastFed=lastFed;
      }
   

    deductFood()
    {
      if(this.foodStock>0 && kitchenObj.visible === true){
        this.foodStock=this.foodStock-1;
      }
        
    }
    
    display(){
    var x=80,y=150;
    
    imageMode(CENTER);
 
    
    if(this.foodStock!=0){
      for(var i=0;i<this.foodStock;i++){
        if(i%10==0){
          x=30;
          y=y+50;
        }
        image(this.image,x,y,50,50);
        x=x+30;
      }
    }
  
}
   bedroom(){
    background(bedroomI)
   }
   garden(){
    background(gardenI)
   }
   washroom(){
    background(washroomI)
  }
  mainroom(){
    background(mainroomI)
  }
} 

