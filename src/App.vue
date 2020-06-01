<template>
  <v-app>
    <v-navigation-drawer app  v-model="drawer">
      <v-list dense>
        <v-list-item color="#F1C40F">
          <v-list-item-content >
            <v-list-item-title class="title">
             ESCOLAR
            </v-list-item-title>
            <v-list-item-subtitle>
              
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>

        <v-list-item  color="#F1C40F" v-for="item in items" :key="item.title"  link route :to="item.route">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="#2ECC71"
      dark
      hide-on-scroll
      prominent
      scroll-target="#scrolling-techniques-4"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title >Información escolar</v-toolbar-title>

      <v-spacer></v-spacer>
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-content>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
    </v-content>

  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    items: [
      { title: "Home", icon: "mdi-home" , route: "/"},
      { title: "Estudiantes", icon: "mdi-account-group" , route: "/estudiantes"},
      { title: "Cursos", icon: "mdi-bookshelf" , route: "/cursos" },
      { title: "Inscripción", icon: "mdi-calendar-edit",route:"/inscribir" }
    ],
    drawer: false,
  }),
};
</script>
