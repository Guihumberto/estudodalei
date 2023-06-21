export default ({ store, redirect }) => {
    if (!store.state.user.uid) {
        redirect("/login");
      }
  }