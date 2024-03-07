'use client'

import { useState } from 'react';
import { GetAllHeroes, CreateHero} from '@/app/api/requests'

export default function Home() {
  const [heroesList, setHeroesList] = useState();

  function Cadastrar(event){
    event.preventDefault(); // Prevent default form submission
    const formData = new FormData(event.target); // Create FormData object from form
    const hero = Object.fromEntries(formData.entries()); // Convert FormData to plain object
    
    CreateHero(hero);
  }

  function GetHeroesList(){
    GetAllHeroes((callback)=>{
      setHeroesList(callback)
    })
  }

  const heroGroupToDisplay = (heroGroup) => {
    const heroGroupMap = {
      'VINGADORES': 'Vingadores',
      'LIGA_DA_JUSTICA': 'Liga da Justiça'
    };
    return heroGroupMap[heroGroup] || heroGroup;
  }

  return (
    <div className='flex flex-col items-center'>
      <div className="ml-4 mt-4">
        <button className="bg-gray-300 p-2 rounded-md" onClick={() => GetHeroesList()}>
          Listar Herois
        </button>
      </div>
      <hr className='w-full border mt-4'></hr>     
      <div>
        <form className='flex flex-col items-center justify-center' onSubmit={Cadastrar}>
          <input name="nome" placeholder='nome' className='border rounded-md border-black mt-4 ml-4 pl-2'></input>
          <input name="email" placeholder='email' className='border rounded-md border-black mt-4 ml-4 pl-2'></input>
          <input name="telefone" placeholder='telefone' className='border rounded-md border-black mt-4 ml-4 pl-2'></input>
          <div className='flex justify-center items-center'>
            <div>
              <input id='vingadores' name="grupo" type='radio' value='VINGADORES' className='border rounded-md border-black mt-4 ml-4 pl-2'></input>
              <label htmlFor='vingadores'>vingadores</label>
            </div>
            <div>
              <input id='liga-da-justica' name="grupo" type='radio' value='LIGA_DA_JUSTICA' className='border rounded-md border-black mt-4 ml-4 pl-2'></input>
              <label htmlFor='liga-da-justica'>liga da justiça</label>
            </div>
          </div>
          <button type="submit" className='ml-4 mt-4 bg-gray-300 p-2 rounded-md'>Cadastrar</button>
        </form>
      </div>

      {heroesList && heroesList.length > 0 && (
        <div className='mt-4 text-left'>
          <h1 className='mb-4 font-bold'>Lista de Heróis</h1>
          <table className='border-collapse w-full mt-4'>
            <thead>
              <tr className='border-b'>
                <th className="p-2">Nome</th>
                <th className="p-2">|</th>
                <th className="p-2">Email</th>
                <th className="p-2">|</th>
                <th className="p-2">Telefone</th>
                <th className="p-2">|</th>
                <th className="p-2">Codinome</th>
                <th className="p-2">|</th>
                <th className="p-2">Grupo</th>
              </tr>
            </thead>
            <tbody>
              {heroesList.map((hero, index) => (
                <tr key={index}>
                  <td className='p-2'>{hero.name}</td>
                  <td className='p-2'>|</td>
                  <td className='p-2'>{hero.email}</td>
                  <td className='p-2'>|</td>
                  <td className='p-2'>{hero.phoneNumber}</td>
                  <td className='p-2'>|</td>
                  <td className='p-2'>{hero.codiname}</td>
                  <td className='p-2'>|</td>
                  <td className='p-2'>{heroGroupToDisplay(hero.heroGroup)}</td>
              </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}