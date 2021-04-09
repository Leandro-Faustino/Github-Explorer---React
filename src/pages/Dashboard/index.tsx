import React, { useState, FormEvent, useEffect} from 'react';
import { Link } from 'react-router-dom';
import {Title, Form, Repositories,Error} from './styles';
import logo from '../../assets/logo.svg';
import { FiChevronRight } from 'react-icons/fi';
import api from '../../services/api';

interface Repository {
full_name: string;
description: string;
owner: {
  login: string;
  avatar_url: string;
};

}

const Dashboard: React.FC = () => {
const [newRepo, setNewRepo] = useState('');
const [inputError, setInputError] = useState('');
const [repositories, setRepositories] = useState<Repository[]>(() => {
  const storageRepositories = localStorage.getItem(
    '@GithubExplorer:repositories',
  );
  if (storageRepositories) {
    return JSON.parse(storageRepositories);
  }
  return [];
});


useEffect(() => {
localStorage.setItem('@GithubExplorer:repositories', JSON.stringify(repositories));
}, [repositories])

  async function handleAddRepository(event: FormEvent<HTMLFormElement>): Promise<void> {
event.preventDefault(); //comportamento de submit do form
 
if( !newRepo ) {
  setInputError(' Digite o autor/nome do repositório');
  
};

try {

//https://api.github.com/repos/...nome do repo
const response = await api.get<Repository>(`repos/${newRepo}`);
const repository = response.data;

setRepositories([...repositories, repository]);
setNewRepo('');  //limpar input
setInputError('');//limpar input
    } catch (err) {
       setInputError(' Erro na busca por este repositório');
 }
  } 

return (
<>
<img src={logo} alt="Github Explorer" />
<Title>Explore repositórios no Github</Title>

<Form  hasError={!!inputError}  onSubmit={ handleAddRepository }>
       <input value={newRepo}
       onChange={ (e) => 
       setNewRepo(e.target.value) } 
       placeholder="digite o nome do repositório" />
<button type="submit" >Pesquisar</button>

</Form>
 
 {/*mostrar erro-  É criado componente error que so é mostrado caso variavel [inputError] esteje preenchida*/}
{ inputError && <Error>{ inputError }</Error>}



{/*  atraves dos dados da minha variavel de estado vou popular meu html*/ }

<Repositories> 
    {repositories.map(repository => (
<Link key={repository.full_name}  to={`/repositories/${repository.full_name}`}>
<img src={repository.owner.avatar_url} 
     alt={repository.owner.login} />
<div>
<strong>{repository.full_name}</strong>
<p>{repository.description}</p>

</div>
<FiChevronRight size={20} />
</Link>
))}

</Repositories>
</>

)

}

export default Dashboard;