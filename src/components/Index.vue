<template>
  <div class="index container">
   <div class="card" v-for="pizza in pizzas" :key="pizza.id"> 

  <div class="card-content">
    <i class="material-icons" @click="deletePizza(pizza.id)"> delete</i>
    <h2 class="indigo-text">{{pizza.title}} </h2>
      <ul class="ingredients">
        <li v-for="(ing,index) in pizza.ingredients" :key="index">
        <span class="chip">
             {{ing}}
        </span>
        
        </li>

      </ul>  
  </div>
  <span class="btn-floating btn-large halfway-fab pink">
    <router-link :to="{name: 'EditPizza', params:{pizza_slug:pizza.slug}}"> 

    <i class="material-icons edit">edit</i>
    </router-link>

  </span>
   </div>
  </div>
</template>

<script>
import db from '@/firebase/init';
export default {
  name: 'Index',
  data () {
    return {
    pizzas:[]
    }
  },

  methods: {
    deletePizza(id){

      db.collection('pizzas').doc(id).delete().then(()=>{
        this.pizzas = this.pizzas.filter(pizza=>{
          return pizza.id !=id
        })
      })

        // this.pizzas  = this.pizzas.filter(pizza =>{
        //   return pizza.id != id;
        // })

    }
  },

  created(){
    db.collection('pizzas').get().then(snapshot=>{
      snapshot.forEach(element => {
        //console.log(element.data(), element.id);
        let pizza = element.data()
        pizza.id = element.id
        this.pizzas.push(pizza)
      });
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >

.index{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;
  margin-top: 60px;
}
.index.h2{
  font-size: 1.8em;
  text-align: center;
  margin-top: 0;

}
.index .ingredients{
  margin:30px auto;
}
.index .ingredients li{
  display: inline-block;
}

.index .delete{
  position: absolute;
  top:4px;
  right: 4px;
  cursor: pointer;
  color: #aaa;
  font-size: 1.4em

}

</style>
