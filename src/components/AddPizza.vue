<template>
    <div class="add-pizza container">
        <h2 class="center-align indigo-text"> Add New Pizza Recipe </h2>
        <form @submit.prevent="addPizza">
            <div class="field title">
                <label for="title">Pizza Title:</label>
                <input type="text" name="title" v-model="title"> 
            </div>  
            <div v-for="(ing, index) in ingredients" :key="index" class="field">
                <label for="ingredient">
                    Ingredient:
                </label>
                <input type="text" name="ingredient" v-model="ingredients[index]">
            <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
 
             </div>
              <div class="field add-ingredient">
                  <label for="add-ingredient">Add Ingredient </label>
                    <input type="text" name="add-ingredient" @keydown.tab.prevent="addIng" v-model="another">
                     
              </div>  
              <div class="field center-align">
                  <p class="red-text" v-if="feedback" >{{feedback}} </p>
                    <button class="btn pink"> Add Pizza </button>
              </div>        
        </form>   

    </div>
</template>

<script>
import db from '@/firebase/init';
import slugify from 'slugify';
import { log } from 'util';
export default {
    
    name:'AddPizza',
    data() {
        return {
        title:null,
        another:null,
        ingredients:[],
        feedback:null,
        slug:null

        }
    },
    methods: {
        addPizza(){ 
            //console.log(this.title)
            if(this.title){
                this.feedback=null

                this.slug = slugify(this.title,{ //creating dynamic slugs
                    replacement:'-',
                    remove:/[$*_+~.()'"!\-:@]/g,
                    lower:true
                })

               db.collection('pizzas').add({
                   title:this.title,
                   ingredients:this.ingredients,
                   slug:this.slug
                    
               }).then(()=>{
                   this.$router.push({
                     name:'Index' 
                   })
               }).catch(err=>{
                   console.log(err)
               })
               
            }
            else{
            this.feedback = "Please enter a pizza category"
            }
        },
        addIng(){
            if(this.another){
                this.ingredients.push(this.another)

                this.another=null
                this.feedback=null
            }

            else{
                this.feedback="You must enter a value to add an ingredient"
            }
        },

        deleteIng(ing){
            this.ingredients = this.ingredients.filter(ingredient=>{
                return ingredient != ing
            })
        }
    },
}
</script>

<style scoped>
 .add-pizza{
     margin-top: 60px;
     padding: 20px;
     max-width: 500px;
 }
 .add-pizza h2{
     font-size: 2em;
     margin: 20px auto;
 }
 .add-smoothie .field{
     margin: 20px auto;
 }

 .add-pizza .delete{
     /* position: absolute;
     right: 0;
     bottom: 16px;
     
     font-size: 1.4em;
     cursor: pointer; */
color: #aaa;
 }
</style>