import axios from "axios";

export const instance = axios.create({
	baseURL: 'https://moviesdatabase.p.rapidapi.com',
	headers: {
		'X-RapidAPI-Key': 'a990caa5d1msh553b1cc7736967ap1fb16ejsnfd7c2d8ab4b6',
		'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com',
	},
});