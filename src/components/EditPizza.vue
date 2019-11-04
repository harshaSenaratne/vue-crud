<template>
  <div v-if="pizza" class="edit-pizza container">
      <h2>Edit {{pizza.title}}</h2>
         <form @submit.prevent="editPizza">
            <div class="field title">
                <label for="title">Pizza Title:</label>
                <input type="text" name="title" v-model="pizza.title"> 
            </div>  
            <div v-for="(ing, index) in pizza.ingredients" :key="index" class="field">
                <label for="ingredient">
                    Ingredient:
                </label>
                <input type="text" name="ingredient" v-model="pizza.ingredients[index]">
            <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
 
             </div>
              <div class="field edit-ingredient">
                  <label for="edit-ingredient">Add Ingredient </label>
                    <input type="text" name="edit-ingredient" @keydown.tab.prevent="addIng" v-model="another">
                     
              </div>  
              <div class="field center-align">
                  <p class="red-text" v-if="feedback" >{{feedback}} </p>
                    <button class="btn pink"> Update Pizza </button>
              </div>        
        </form>   
      </div>  
</template>

<script>
import db from '@/firebase/init';
import slugify from 'slugify';
export default {
    name:"EditPizza",
    data(){
        return{
            pizza:null,
            another:null,
            feedback:null
        }
    },
    methods: {
         addIng(){
            if(this.another){
                this.pizza.ingredients.push(this.another)
                this.another=null
                this.feedback=null
            }

            else{
                this.feedback="You must enter a value to add an ingredient"
            }
        },

        deleteIng(ing){
            this.pizza.ingredients = this.pizza.ingredients.filter(ingredient=>{
                return ingredient != ing
            })
        },

        editPizza(){
            if(this.pizza.title){
                this.feedback=null

                this.pizza.slug = slugify(this.pizza.title,{ //creating dynamic slugs
                    replacement:'-',
                    remove:/[$*_+~.()'"!\-:@]/g,
                    lower:true
                })

                console.log('updated ingredients',this.pizza.ingredients)

               db.collection('pizzas').doc(this.pizza.id).update({
                   title:this.pizza.title,
                   ingredients:this.pizza.ingredients,
                   slug:this.pizza.slug       
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
        }
    },
    created(){
        let ref = db.collection('pizzas').where('slug','==',this.$route.params.pizza_slug)
        ref.get().then(snapshot=>{
            snapshot.forEach(doc => {
                console.log(doc.data())
                this.pizza=doc.data()
                this.pizza.id = doc.id
            });
        })
    }
}
</script>

<style>
.edit-pizza{
     margin-top: 60px;
     padding: 20px;
     max-width: 500px;
 }
 .edit-pizza h2{
     font-size: 2em;
     margin: 20px auto;
 }
 .edit-smoothie .field{
     margin: 20px auto;
 }

 .edit-pizza .delete{
     /* position: absolute;
     right: 0;
     bottom: 16px;
     
     font-size: 1.4em;
     cursor: pointer; */
color: #aaa;
 }
</style>