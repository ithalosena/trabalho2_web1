const { createApp } = Vue;

    createApp({
      data() {
        return {
          time: '',
          isDarkMode: false
        };
      },
      methods: {
        toggleDarkMode() {
          this.isDarkMode = !this.isDarkMode;
          localStorage.setItem('isDarkMode', this.isDarkMode);
        },
        checkLocalStorage() {
          const isDarkMode = localStorage.getItem('isDarkMode');
          if (isDarkMode !== null) {
            this.isDarkMode = JSON.parse(isDarkMode);
          }
        }
      },
      created() {
        this.checkLocalStorage();
      },
      computed: {
        dataAtual() {
          let data = new Date();
          let dia = data.getDate();
          let mes = data.getMonth() + 1;
          let ano = data.getFullYear();
          let hora = new Date().toLocaleTimeString();

          return dia + '/' + mes + '/' + ano + ' às ' + hora;
        },
        darkModeClass() {
          return this.isDarkMode ? 'dark-mode' : '';
        }
      },
      mounted() {
        setInterval(() => {
          this.time = this.dataAtual;
        }, 1000)
      },
    }).directive('focus', {
      mounted(el) {
        el.focus();
      },
    }).component('conversor', {
      template: `
        <div>
          <button @click="convertHtmlToPdf">Converter para PDF</button>
        </div>
      `,
      methods: {
        convertHtmlToPdf() {
          const element = document.getElementById('html-content'); // id do elemento HTML que queremos converter
  
          html2pdf().from(element).save();
        },
      },
    }).mount('#app');

    const meuBotao = document.querySelector("#dark-mode");
    meuBotao.addEventListener('click', function() {
      app.toggleDarkMode();
    });