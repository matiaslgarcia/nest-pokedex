import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios, { AxiosInstance } from 'axios';
import { Model } from 'mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { PokeResponse } from './interfaces/poke-response.interface';
import { AxiosAdapter } from '../common/adapters/axios.adapter';


@Injectable()
export class SeedService {
  
  private readonly http: AxiosAdapter

  constructor(

    @InjectModel( Pokemon.name) // Pokemon.name es el nombre del modelo de la database
    private readonly pokemonModel: Model<Pokemon>
  ){}

  async executeSeed() {

    await this.pokemonModel.deleteMany({}); //delete * from pokemons;

    const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');

  //n°1 manera de insertar data de una
  // const insertPromisesArray = [];

  //   data.results.forEach(async({name,url}) =>{
  //     const segments = url.split('/')
  //     const no = +segments[segments.length-2]

  //     // const pokemon =  await this.pokemonModel.create({name,no});
  //     insertPromisesArray.push(
  //       this.pokemonModel.create({name,no})
  //     )
  //   })

  //   await Promise.all(insertPromisesArray)
  //   return 'seed executed'
  // }

  //n°2 manera de insertar data de una
  const pokemonToInsert:{
    name:string,
    no: number
  }[] = [];

    data.results.forEach(async({name,url}) =>{
      const segments = url.split('/')
      const no = +segments[segments.length-2]

     pokemonToInsert.push({name,no})
    });

    await this.pokemonModel.insertMany(pokemonToInsert)
    //insert into pokemons (name, no) value ...
    return 'Seed Executed'
  }
}