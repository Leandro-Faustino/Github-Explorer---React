import React, { useEffect, useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { Header, RepositoryInfo, Issues } from './styles';
import logo from '../../assets/logo.svg';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import  api  from '../../services/api';

// para que o browser consiga definir que meu params tem o repository,preciso tipar ele.
interface RepositoryParams {
    repository: string;
};

interface IRepository {
    full_name: string;
    description: string;
    stargazers_count:number;
    forks_count:number;
    open_issues_count:number;
    owner: {
      login: string;
      avatar_url: string;
    };
}

interface Issue {
    id: number;
    title:string;
    html_url:string;
    user: {
        login:string
    }
    
}
const Repository: React.FC = () => {
    //dentro do routeMatch vou ter os paramtros da minha rota
const { params } = useRouteMatch<RepositoryParams>();

const [repository,setRepository] = useState<IRepository | null>(null);
const [ issues, setIssues] = useState<Issue[]>([]);

useEffect(() => {
    api.get(`repos/${params.repository}`).then(response => {
        setRepository(response.data);
    });

    api.get(`repos/${params.repository}/issues`).then(response => {
        setIssues(response.data);
    });
}, [params.repository]);

return (
    <>
<Header>
<img src={logo} alt="Github Explorer" />
<Link to="/">
<FiChevronLeft size={16} />
    Voltar
</Link>
</Header>

{ repository ? ( // condicional so vai ser exibido se o repositorio existir
<RepositoryInfo>
<header>
<img src={ repository.owner.avatar_url} alt={ repository.owner.login} />
<div>
     <strong>{ repository.full_name}</strong>
     <p>{ repository.description}</p>
</div>
</header>
<ul>
<li>
 <strong>{ repository.stargazers_count}</strong>
 <span>Stars</span>
</li> 
<li>
 <strong>{ repository.forks_count}</strong>
 <span>Forks</span>
</li>
<li>
 <strong>{ repository.open_issues_count}</strong>
 <span>Issues Abertas</span>
</li>
</ul>
</RepositoryInfo>
) : (
    <p>Carregando ... </p>
)}

<Issues>
{issues.map(issue => (
<a key={issue.id} href={issue.html_url}>
<div>
    <strong>{issue.title}</strong>
    <p>{issue.user.login}</p>
</div>
<FiChevronRight size={20} />
</a>
))}
</Issues>
   </>
);
};

export default Repository;