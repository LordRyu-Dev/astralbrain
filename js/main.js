const app = Vue.createApp({
  data: () => ({
    newText: '',
    newName: '',
    responses: [],
    names: [],
  }),
  methods: {
    addResponse: function (event) {
      //console.log('Clicked!');
      if(this.newText === '' || this.newName === '') return
      let response = {
        text: this.newText,
        name: this.newName,
        check: false
      };
      this.responses.push(response);
      if (!this.names.includes(this.newName)) this.names.push(this.newName);
      this.newText = '';
      this.newName = '';
    },
    deleteResponse: function (index) {
      // console.log('Delete!');
      // console.log(index);
      this.responses.splice(index, 1);
    }
  },
})
app.mount('#app')
