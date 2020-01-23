const axios = require('axios');
const Dev = require('../models/Dev')
const parseStringAsArray = require('../utils/parseStringAsArray')
const { findConnections, sendMessage } = require('../websocket')

//geralmente possui 5 funções
// index lista todos
// show lista apenas 1
// store salva um novo
// update atualiza um
// destroy apaga um

module.exports = {
    //async eu digo que vai ser assincrono, e o código aceita demorar
    async index(request, response) {
        const devs = await Dev.find();
        return response.json(devs);
    },

    async store(request, response) {
        const { github_username, techs, latitude, longitude } = request.body;
        
        let dev = await Dev.findOne({ github_username });

            if (!dev) {
                //await eu defino que independente da demora, o código vai esperar para dar continuidade
                const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
            
                const { name = github_username, avatar_url, bio } = apiResponse.data;
                
                const techsArray = parseStringAsArray(techs);
            
                const location = {
                    type: 'Point',
                    coordinates: [longitude, latitude],
            };
        
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            })

             
            const sendSocketMessageTo = findConnections(
                {latitude, longitude},
                techsArray,
            );

            sendMessage( sendSocketMessageTo, 'new-dev', dev );
        }

        return response.json(dev);
    }
};