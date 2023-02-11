import { login } from './utils';
import './index.css';
import { useState } from 'react';

// Instruções:
// * Você tem um formulário de login INCOMPLETO
// * Não é permitido adicionar novos elementos HTML
// * Não é permitido usar refs
//
// Tarefas:
// O botão de login deve disparar a função login(), importada no topo deste arquivo, e passar os dados necessários.
// Desabilite o botão de Login caso o e-mail esteja em branco OU a senha for menor que 6 dígitos.
// Desabilite o botão de Login equanto você está executando o login.
// Mostre uma mensagem de erro de login() caso o Login falhe. A mensagem deve ser limpa a cada nova tentativa de Login.
// Mostre um alerta caso o login seja efetuado com sucesso (javascript alert). Investigue a função login() para entender como ter sucesso na requisição.

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disable, setDisable] = useState(true);
  const [error, setError] = useState('');

  function handleEmail(e) {
    setEmail(e.target.value);
    validaLogin();
  }
  
  function handlePassword(e) {
    setPassword(e.target.value);
    validaLogin();
  }

  function validaLogin() {
    if (email === '' || password.length < 6) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }

  async function handleLogin() {
    try {
      setError('');
      setDisable(true);
      await login({ email, password });
      setDisable(false);
      alert('Login validado com sucesso!');
    } catch (error) {
      setError(error.message)
      setDisable(false);
    }
  }

  return (
    <div className='wrapper'>
      <div className='login-form'>
        <h1>Login Form 🐞</h1>
        {/* Coloque a mensagem de erro de login na div abaixo. Mostre a div somente se houver uma mensagem de erro. */}
        {error && <div className='errorMessage'>{error}</div>}
        <div className='row'>
          <label htmlFor={'email'}>Email</label>
          <input id={'email'} type={'email'}  value={email} onChange={(e) => handleEmail(e)} autoComplete='off' />
        </div>
        <div className='row'>
          <label htmlFor={'password'}>Password</label>
          <input id={'password'} type={'password'} value={password} onChange={(e) => handlePassword(e)}/>
        </div>

        <div className='button'>
          <button disabled={disable} onClick={handleLogin}>Login</button>
        </div>
      </div>
    </div>
  );
}
