sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("projetonetflix.controller.Inicio", {
            onInit: function () {
               
                var menu = {
                    primeiro : "BEGIN",
                    segundo  : "MOVIES"
                };

                //CRIAR MODELO E PREENCHER COM DADOS 
                var menuModel = new JSONModel();
                menuModel.setData(menu);

                //ATRIBUIR O MODELO NA TELA
                var tela = this.getView();
                tela.setModel(menuModel, "ModeloMenu");

                var resultados = {
                    titles : []
                };
                var filmesModel = new JSONModel();
                filmesModel.setData(resultados);
                tela.setModel(filmesModel, "APIFilmes");

            
            },
            
            onPressLinkInicio: function(){
                alert("Você clicou em Início.")
            },
            
            onPressLinkSerie: function(){
                alert("Você clicou em Série.")
            },
            
            onApertarBuscar: function(){
                //OBTER O VALOR DO CAMPO DE BUSCA
                var filtro = this.byId("inputBuscar").getValue();
               //alert(query);

                const settings = {
                    async: true,
                    crossDomain: true,
                    url: 'https://netflix54.p.rapidapi.com/search/?query='
                    + filtro + '&offset=0&limit_titles=50&limit_suggestions=20&lang=en',
                    method: 'GET',
                    headers: {
                        'X-RapidAPI-Key': '0f41e8a5bbmsh9a127395cf77372p1ebc45jsn08bfe8105fb2',
                        'X-RapidAPI-Host': 'netflix54.p.rapidapi.com'
                    }
                };
                
                $.ajax(settings).done(function (response) {
                    console.log(response);
                    //RESGATAR MODELO E ATUALIZAR OS DADOS
                    var view = this.getView();
                    var model = view.getModel("APIFilmes");
                    var dados = model.getData();

                    //LIMPAR A LISTA
                    dados.titles = [];
                    dados.titles = response.titles;
                    model.refresh();

                }.bind(this) );


            }
        });
    });
