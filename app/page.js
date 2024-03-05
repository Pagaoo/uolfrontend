'use client'

import { useState } from 'react';
import { GetAllHeroes, CreateHero} from '@/app/api/requests'

export default function Home() {
  const [listHeroes, setListHeroes] = useState();

  function Cadastrar(event){
    event.preventDefault(); // Prevent default form submission
    const formData = new FormData(event.target); // Create FormData object from form
    const hero = Object.fromEntries(formData.entries()); // Convert FormData to plain object
    console.log('Form data:', hero); // Log form data

    console.log(hero.nome);
    
    CreateHero(hero);
  }

  function GetHeroesList(){
    GetAllHeroes((callback)=>{
      setListHeroes(callback)
    })
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

      {listHeroes && (
        <div>
          <p>{listHeroes[0].name}</p>
        </div>

      )}
    </div>
  );
}