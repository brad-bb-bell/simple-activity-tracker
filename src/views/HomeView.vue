<script>
import axios from "axios";
export default {
  data: function () {
    return {
      user: {},
    };
  },
  created: function () {
    axios.get("/users/" + localStorage.user_id + ".json").then((response) => {
      this.user = response.data;
      console.log("Current user", response.data);
    });
  },
};
</script>
