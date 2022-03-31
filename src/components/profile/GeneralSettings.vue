<template>
  <div>
    <ul>
      <label for="user-type">Benutzer</label>
      <div>
        <select
          class="dropdown-user-type"
          id="user-type"
          name="user-type"
          v-model="userType"
        >
          <option value="students">Student</option>
          <option value="employees">Mitarbeiter</option>
          <option value="others">Gast</option>
        </select>
      </div>
      <label for="user-type"
        >Benachrichtigungen <i class="fas solid fa-bell"></i
      ></label>
      <div
        class="toggle-switch"
        @click="toggleSwitchActive = !toggleSwitchActive"
        :class="{ active: toggleSwitchActive }"
      >
        <i
          class="fas solid fa-circle"
          :class="{ move: toggleSwitchActive }"
        ></i>
      </div>
    </ul>
  </div>
</template>

<script>
import { get } from "idb-keyval";
export default {
  data() {
    return {
      userType: "",
      toggleSwitchActive: false,
    };
  },
  watch: {
    userType(_, oldValue) {
      if (oldValue != "") {
        this.$store.dispatch("updateUserType", this.userType);
      }
    },
  },
  created() {
    get("userType").then((data) => {
      if (data == null) {
        this.userType = "students";
      } else {
        this.userType = data;
      }
    });
  },
};
</script>

<style scoped>
ul {
  padding-left: 0.5rem;
  justify-content: left;
  text-align: left;
}

label {
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  font-size: 1rem;
  color: rgba(0, 0, 0, 0.7);
}

select:focus {
  outline: none !important;
  border: solid 1.5px rgba(128, 128, 128, 0.5);
}

.dropdown-user-type {
  border: solid 1.5px rgba(128, 128, 128, 0.2);
  margin-top: 0.5rem;
  margin-bottom: 1.5rem;
  border-radius: 15px;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 0.25rem;
  padding-right: 1rem;
  font-family: "Roboto", sans-serif;
  font-weight: 300;
  font-size: 1rem;
}

option {
  font-family: "Roboto", sans-serif;
  font-weight: 300;
  font-size: 1rem;
}

.fas.solid.fa-bell {
  padding-left: 0.25rem;
  color: rgba(128, 128, 128, 0.5);
}

.toggle-switch {
  border: solid 1.5px rgba(128, 128, 128, 0.2);
  border-radius: 25px;
  margin-top: 0.5rem;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  padding-left: 0.25rem;
  width: 50px;
}
.fas.solid.fa-circle {
  color: rgba(0, 0, 0, 0.2);
}

.active {
  background-color: rgba(0, 128, 0, 0.2);
}

.move {
  margin-left: 1.9rem;
}
</style>