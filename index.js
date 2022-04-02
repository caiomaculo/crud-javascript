
var dados = []

function ApagaCadastro(id){
    let_confirm = confirm ("Deseja excluir?")

    if(_confirm) {
        for(let i=0; i < dados.length; i++){
            if (dados[i].ID == id){
                dados.splice(i, 1)
            }
        }

        linhasTabela()
    }

}

function EditaCadastro(id){

    $("#modalCadastro").modal("show")

    dados.forEach(function(indices){
        if(indices.ID == id){
            $("#txtUsuario").val(indices.Usuario)
            $("#txtNome").val(indices.Nome)
            $("#txtEmail").val(indices.Email)
            $("#txtCPF").val(indices.CPF)
            $("#txtData").val(indices.Data)
            $("#txtSenha").val(indices.Senha)
        }
    }
    )

}

function linhasTabela(){

    if(Array.isArray(dados)){

        localStorage.setItem("__dados__",JSON.stringify(dados))

        $("#tableCrud tbody").html("")

        dados.forEach(function (indices) {
            $("#tableCrud tbody").append(`<tr>
            <td>${indices.ID}</td>
            <td>${indices.Usuario}</td>
            <td>${indices.Nome}</td>
            <td>${indices.Email}</td>
            <td>${indices.CPF}</td>
            <td>${indices.DataNascimento}</td>
            <td>${indices.Senha}</td>
            <td><button>Editar</button></td>
            <td><button onclick="javascript:ApagaCadastro(${indices.ID});">Excluir</button></td>
            </tr>`)
        }
        )}
}

$(function () {
dados = JSON.parse(localStorage.getItem("__dados__")) ??[]

if (dados) {

    linhasTabela()
}

//Evento SAVE
$("#btnSalvar").click(function(){

    let Usuario = $("#txtUsuario").val()
    let Nome = $("#txtNome").val()
    let Email = $("#txtEmail").val()
    let CPF = $("#txtCPF").val()
    let DataNascimento = new Date($("#txtDataNascimento").val()).toLocaleDateString("pt-br", { timeZone: "UTC"})
    let Senha = $("#txtSenha").val()

    let cadastro = {}

    cadastro.Usuario = Usuario
    cadastro.Nome = Nome
    cadastro.Email = Email
    cadastro.CPF = CPF
    cadastro.DataNascimento = DataNascimento
    cadastro.Senha = Senha

    cadastro.ID = dados.lenght + 1

    dados.push(cadastro)
    alert("Cadastro Realizado")
    $("#modalCadastro").modal("hide")
    $("#txtUsuario").val("")
    $("#txtNome").val("")
    $("#txtEmail").val("")
    $("#txtCPF").val("")
    $("#txtDateNascimento").val("")
    $("#txtSenha").val("")

    linhasTabela()
})

})