import dados  from "../models/dados.js";
const { funcionarios } = dados;

const getALLfuncionarios = (req, res) => {
    const resultado = funcionarios;
    

    res.status(200).json({
        total:funcionarios.lenght,
        funcionarios:resultado,
    });
    
};
const getFuncionariosByid = (req, res) => {
    let id = parseInt(req.params.id);

    const funcionario = funcionarios.find(f => f.id === id);

    if(funcionario){
        res.status(200).json({
            sucess: true ,
            funcionario:funcionario
        });
    }
    
        res.status(400).json({
            sucess:false,
            message: "funcionario não encontrado"
        });
};
const createFuncionario = (req, res) => {
    const  {nome, cargo, departamento, salario, dataAdmissao, email, telefone} = req.body;

    if (!nome) {
        return res.status(400).json ({
            sucess:false,
            message:"o campo 'nome' e obrigatorio"
        })
    }

    if (!cargo) {
        return res.status(400).json ({
            sucess:false,
            message:"o campo 'cargo' e obrigatorio"
        })
    }

    if (!departamento) {
        return res.status(400).json ({
            sucess:false,
            message:"o campo 'departamento' e obrigatorio"
        })
    }

    if (!salario) {
        return res.status(400).json ({
            sucess:false,
            message:"o campo 'salario' e obrigatorio"
        })
    }

    if (!dataAdmissao) {
        return res.status(400).json ({
            sucess:false,
            message:"o campo 'Data de admissão' e obrigatorio"
        })
    }

    if (!email) {
        return res.status(400).json ({
            sucess:false,
            message:"o campo 'email' e obrigatorio"
        })
    }

    if (!telefone) {
        return res.status(400).json ({
            sucess:false,
            message:"o campo 'telefone' e obrigatorio"
        })
    }
    //regras de negocios
    
    



    //criar/adicionar um novo funcionario

    const novoFuncionario ={
        id:funcionarios.length + 1,
        nome: nome,
        cargo:cargo,
        departamento:departamento,
        salario:salario,
        dataAdmissao:dataAdmissao,
        email:email,
        telefone:telefone
    }

    funcionarios.push(novoFuncionario);

    res.status(201).json({
        sucess: true,
        message: "novo funcionario na sua empresa",
        personagen: novoFuncionario, 
    })
}
const deleteFuncionario = (req,res) => {

    const { id } = req.params;
    // Validar ID
    if (isNaN(id)) {
        return res.status(400).json({
            success: false,
            message: "ID deve ser um número válido!"
        });
    }

    const idParaApagar = parseInt(id);

    const funcionarioParaRemover = funcionarios.find(f => f.id === idParaApagar);
    if (!funcionarioParaRemover) {
        return res.status(404).json({
            success: false,
            message: `funcionario com ID ${id} não encontrado para remoção!`
        });
    }

    // Remover bruxo usando filter
    const funcionariosFiltrados = funcionarios.filter(funcionario => funcionario.id !== idParaApagar);
    
    // Atualizar array global
    funcionarios.splice(0, funcionarios.length, ...funcionariosFiltrados);

    res.status(200).json({
        success: true,
        message: `funcionario ${funcionarioParaRemover.nome} (ID: ${id}) foi removido dos registros do sistema.`,
        funcionarioRemovido:funcionarioParaRemover
    });
};

  const updateFuncionario = (req, res) => {
    const id = parseInt(req.params.id);
  
    const  {nome, cargo, departamento, salario, dataAdmissao, email, telefone} = req.body;
  
    const idParaEditar = id;
    //verificar se o id e valido
    if (isNaN(idParaEditar)) {
      return res.status(400).json({
        sucess: false,
        message: "o id deve ser um numero valido!!",
      });
    }

    const funcionarioExiste = funcionarios.find((funcionario) => funcionario.id === idParaEditar);
  
    if (!funcionarioExiste) {
      return res.status(404).json({
        sucess: false,
        message: `funcionario com id: ${id} não existe`,
      });
    }

    const funcionariosAtualizados = funcionarios.map((funcionario) =>
        funcionario.id === idParaEditar
          ? {
              ...funcionario,
              ...(nome && { nome }),
              ...(cargo && { cargo }),
              ...(departamento && { departamento: parseInt(departamento) }),
              ...(salario && { salario:parseInt(salario)}),
              ...(dataAdmissao && { dataAdmissao }),
              ...(email && { email}),
              ...(telefone && {telefone})
            }
          : funcionario
      );

      funcionarios.splice(0, funcionarios.length, ...funcionariosAtualizados);

      // Buscar bruxo atualizado para retorno
      const funcinarioNovo = funcionarios.find((f) => f.id === idParaEditar);
    
      res.status(200).json({
        success: true,
        message: `Dados de funcionario ID ${id} atualizados com sucesso!`,
        funcionario: funcinarioNovo
  
  })

}


export {
    getALLfuncionarios,
    getFuncionariosByid,
    createFuncionario,
    deleteFuncionario,
    updateFuncionario
};