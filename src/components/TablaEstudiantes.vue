<template>
  <v-data-table
    :headers="headers"
    :items="estudiantes"
    sort-by="matricula"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Estudiantes</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="#F1C40F"  dark class="mb-2" v-on="on">Agregar Estudiante</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.matricula" label="Matricula"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.nombre" label="Nombre"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.semestreIngreso" label="Semestre de Ingreso"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.creditosCursados" label="Creditos Cursados"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <!-- <v-btn color="primary" @click="mostrarEstudiantes">Reset</v-btn> -->
    </template>
  </v-data-table>
</template>

<script>
  export default {
      name:"Estudiantes-Tabla",
    data: () => ({
      dialog: false,
      headers: [
        {
          text: 'Matricula',
          align: 'start',
          sortable: false,
          value: 'matricula',
        },
        { text: 'Nombre', value: 'nombre' },
        { text: 'Semestre Ingreso', value: 'semestreIngreso' },
        { text: 'Creditos Cursados', value: 'creditosCursados' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      estudiantes: [],
      editedIndex: -1,
      editedItem: {
        nombre: '',
        matricula: 0,
        semestreIngreso: '',
        creditosCursados: 0
      },
      defaultItem: {
        nombre: '',
        matricula: 0,
        semestreIngreso: '',
        creditosCursados: 0,
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Nuevo estudiante' : 'Editar estudiante'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
    },

    created () {
      this.mostrarEstudiantes()
    },

    methods: {
       mostrarEstudiantes () {
        this.axios.get("/estudiantes").then((res)=>{
            this.estudiantes=res.data;
        }).catch((err)=>{
            console.log(err);
        })
        },

      editItem (item) {
        this.editedIndex = this.estudiantes.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.estudiantes.indexOf(item)
        let confirmacion=confirm('¿Esta seguro que desea elimnar este estudiante?') && this.estudiantes.splice(index, 1)
        if (confirmacion) {
            this.axios.delete(`/estudiantes/${item.matricula}`).then((res) => {
            console.log(res.data);
          }).catch((err) => {
            console.log(err);
          });
        }
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
            const estudianteModificar={
                nombre: this.editedItem.nombre,
                matricula:this.editedItem.matricula,
                semestreIngreso:this.editedItem.semestreIngreso,
                creditosCursados: this.editedItem.creditosCursados
            };
            console.log(this.editedItem.matricula);
            this.axios.put(`/estudiantes/`,estudianteModificar).then((res)=>{
                 Object.assign(this.estudiantes[this.editedIndex], this.editedItem)
                 console.log(res.data);
            }).catch((err)=>{
                console.log(err);
            });
         
        } else {
            this.axios.post("/estudiantes/", this.editedItem).then((res) => {
            this.estudiantes.push(this.editedItem);
                console.log(res.data);
            }).catch((err) => {
                console.log(err);
            });
        }
        this.close()
      },
    },
  }
</script>