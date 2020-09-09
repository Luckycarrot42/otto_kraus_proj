<template>
  <v-container class="py-5">
    <v-form ref="form">
      <v-text-field v-model="currentToy.data.name" label="Nombre del Producto" required ></v-text-field>
      <v-text-field v-model="currentToy.data.price" label="Precio" required></v-text-field>
      <v-text-field v-model="currentToy.data.code" label="Código" required></v-text-field>
      <v-text-field v-model="currentToy.data.stock" label="Cantidad en Stock" required></v-text-field>
      <v-btn @click="submitForm" color="success" class="mr-4">{{ currentToy.id ? 'Actualizar' : 'Crear' }}</v-btn>
      <v-btn @click="cleanCurrentToy" color="error" class="mr-4">Cancelar</v-btn>
    </v-form>
    <v-container class="py-5">
      <input class="input" type="text" placeholder="Ingrese producto a buscar" v-model="search">
    </v-container> 
    <h2>Listado de Juguetes</h2>
    <v-simple-table fixed-header>
      <thead>
        <tr>
          <th class="text-left">Nombre</th>
          <th class="text-left">Precio</th>
          <th class="text-left">Código</th>
          <th class="text-left">Stock</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="toy in filterList" :key="toy.id">
          <td>{{ toy.data.name }}</td>
          <td>{{ toy.data.price }}</td>
          <td>{{ toy.data.code }}</td>
          <td>{{ toy.data.stock }}</td>
          <td><v-icon @click="editProduct(toy)">mdi-pencil-outline</v-icon></td>
          <td><v-icon @click="removeToy(toy.id)">mdi-delete</v-icon></td>
        </tr>
      </tbody>
  </v-simple-table>
  <v-overlay :value="overlay">
    <v-progress-circular indeterminate size="64"></v-progress-circular>
  </v-overlay>
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  data(){
    return{
      currentToy: {
        id: undefined,
        data:{
          name: '',
          price: 0,
          code: '',
          stock:0
        }
      },
      search: ''
    }
  },
  computed:{
    ...mapState(['toys', 'overlay']),
    filterList() {
      return this.toys.filter((toy) => {
        return toy.data.name.toLowerCase().includes(this.search.toLowerCase())
      })
    }

  },
   created(){
    this.setToys()
  },
  methods: {
    ...mapActions(['setToys', 'submitToy', 'updateToy', 'deleteToy']),
    submitForm(){
      if(!this.currentToy.id){
        this.createToy()
      }else{
        this.update(this.currentToy)
      }
    },
    update(){
      this.updateToy(this.currentToy)
      this.cleanCurrentToy()
    },
    createToy(){
      const toy = this.currentToy.data
      this.submitToy(toy)
      this.cleanCurrentToy()
    },
    removeToy(id){
      let confirmation = confirm("Estas seguro?")
      if(confirmation){
        this.deleteToy(id)
        this.cleanCurrentToy()
      }
    },
    setCurrentToy(toy){
      this.currentToy = toy
    },
    cleanCurrentToy(){
      this.currentToy.data.name = '',
      this.currentToy.data.code = '',
      this.currentToy.data.price = 0,
      this.currentToy.data.stock = 0
      this.currentToy.id = undefined
    },
    editProduct(toy){
      this.currentToy.data.name = toy.data.name
      this.currentToy.data.code = toy.data.code
      this.currentToy.data.price = toy.data.stock
      this.currentToy.data.stock = toy.data.price
      this.currentToy.id = toy.id
    }
  }
}
</script>

