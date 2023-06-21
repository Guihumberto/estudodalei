<template>
  <div class="text-center">
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-width="200"
      offset-x
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="indigo"
          dark
          v-bind="attrs"
          v-on="on"
          small elevation="0"
          fab
        >
          <span class="text-h6">{{startsName.sigla}}</span>
        </v-btn>
      </template>

      <v-card>
        <v-list>
          <v-list-item>
            <v-list-item-avatar color="purple">
              <span class="white--text text-h6">{{startsName.sigla}}</span>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title class="nameShow">{{startsName.name}}</v-list-item-title>
              <v-list-item-subtitle>{{user.email}}</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <v-btn
                outlined
                color="purple"
                small
                to="/user"
                @click="menu = false"
              >
                PERFIL
                <v-icon small class="ml-1">mdi-account</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list>
          <v-list-item>
            <v-list-item-action>
              <v-switch
                v-model="message"
                color="purple"
              ></v-switch>
            </v-list-item-action>
            <v-list-item-title>Notificações</v-list-item-title>
          </v-list-item>
        </v-list>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="error"
            outlined
            small
            @click="$emit('logout')"
          >
            Sair
            <v-icon small class="ml-1">mdi-logout</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
  export default {
    data: () => ({
      menu: false,
      message: false,
    }),
    props:{
        user: Object
    },
    computed:{
        startsName(){
            const name = this.user.name
            const nameAbrev = name.split(' ').slice(0, 2).join(' ')
            const sigla = name.split(' ').map(i =>i.substr(0, 1).toUpperCase()).join('')
            return {sigla: sigla.substr(0, 2), name: nameAbrev}
        }
    }
  }
</script>

<style scoped>
.nameShow{
    text-transform: capitalize;
}
</style>