import styled ,{css} from 'styled-components';
import { shade } from 'polished';


interface FormProps {
    hasError: boolean;
}

//criar componentes estilizados
 export const Title = styled.h1`
font-size: 48px;
color: #3A3A3A;
max-width: 450px;
line-height: 56px;

margin-top: 80px;
`;

export const Form = styled.form<FormProps>`
margin-top: 40px;
max-width: 700px;

display:flex;

input {
    flex:1;
    height: 70px;
    padding: 0 24px;
    border: 0;
    border-radius: 5px 0px 0px 5px;
    color: #3A3A3A;
    border: 2px solid #fff;
    border-right:0;

/* estilizaçao hasError caso tiver erro no input */
${  (props) =>
props.hasError && css`
  border-color: #c53030;
  `}


    &::placeholder {
       color: #a8a8b3;
    }
    
}

button {
    width: 210px;
    height:70px;
    background: #04D361;
    border-radius:0px 5px 5px 0px;
    border: 0;
    color: #fff;
    font-weight: bold;
    transition: background-color 0.2s;

    &:hover {
        background: ${shade(0.2,'#04D361')}
    }
}
`
/* componente Error */
export const Error = styled.span`
display:block;
color:#c53030;
margin-top: 8px;
`;

export const Repositories = styled.div`
margin-top: 80px;
max-width: 700px;

 a {
     background: #fff;
     border-radius: 5px;
     width: 100%;
     padding: 24px;
     display: block;
     text-decoration: none;

     display: flex;
     align-items: center;
     transition: transform 0.2s;

      &:hover {
          transform: translateX(10px);
      }
       
      & + a {
    margin-top: 16px;
}

      img {
           width: 64px;
           height: 64px;
           border-radius: 50%;
           
      }

      div {
          margin: 0px 16px;
          flex:1
           
           strong{
               font-size: 20px;
               color: #3D3D4D;
           }

           P {
               font-size: 18px;
               color: #A8A8B3;
               margin-top: 4px;
           }
      }
svg {
    margin-left: auto;
    color: #cbcbd6;
}
 }

`